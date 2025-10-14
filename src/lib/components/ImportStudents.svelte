<script lang="ts">
	import { db } from '$lib/supabase';
	import type { Student } from '$lib/supabase';

	let { onImportComplete } = $props<{
		onImportComplete?: () => void;
	}>();

	let showModal = $state(false);
	let file = $state<File | null>(null);
	let importing = $state(false);
	let error = $state('');
	let success = $state('');
	let previewData = $state<Omit<Student, 'id' | 'created_at' | 'updated_at'>[]>([]);
	let totalStudents = $state(0); // Total students in CSV
	let conflicts = $state<{ code: string; name: string; existing?: boolean }[]>([]);
	let showConfirmation = $state(false);

	// Computed: check if there are students that can be imported
	const canImport = $derived(() => {
		if (totalStudents === 0) return false;

		// Count conflicts that exist in DB (will be skipped)
		const dbConflicts = conflicts.filter((c) => c.existing).length;

		// If all students have DB conflicts, cannot import
		if (dbConflicts >= totalStudents) return false;

		return true;
	});

	// Computed: count valid students (not in DB)
	const validStudentsCount = $derived(() => {
		const dbConflicts = conflicts.filter((c) => c.existing).length;
		return totalStudents - dbConflicts;
	});

	// Computed: has conflicts (DB conflicts only)
	const hasConflicts = $derived(conflicts.filter((c) => c.existing).length > 0);

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			file = input.files[0];
			error = '';
			previewData = [];
			conflicts = [];
			showConfirmation = false;
		}
	}

	function generateStudentCode(
		name: string,
		kelas: string = '',
		rombel: string = '',
		angkatan: string = '2025'
	): string {
		// Clean name: remove special chars and extra spaces
		const cleanName = name
			.trim()
			.toUpperCase()
			.replace(/[^A-Z\s]/g, '')
			.replace(/\s+/g, ' ');

		const words = cleanName.split(' ').filter((w) => w.length > 0);

		// Take first 4 letters of first name
		const firstName = words[0] || '';
		const firstPart = firstName.substring(0, 4).padEnd(4, 'X');

		// Format kelas+rombel (e.g., VII-D → VIID, X-A → XA)
		const kelasCode = (kelas + rombel).replace(/[^A-Z0-9]/g, '').toUpperCase();

		return `${firstPart}${kelasCode}${angkatan}`;
	}

	async function checkExistingCodes(codes: string[]): Promise<Set<string>> {
		try {
			// Check which codes already exist in database
			const result = await db.getStudentsWithFilter({
				limit: 1000 // Check up to 1000 existing students
			});

			const existingCodes = new Set(result.students.map((s) => s.student_code));
			return new Set(codes.filter((code) => existingCodes.has(code)));
		} catch (err) {
			console.error('Failed to check existing codes:', err);
			return new Set();
		}
	}

	async function parseCSV(text: string) {
		const lines = text.split('\n').filter((line) => line.trim());
		if (lines.length < 2) {
			throw new Error('File CSV kosong atau tidak valid');
		}

		const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
		const students: Omit<Student, 'id' | 'created_at' | 'updated_at'>[] = [];

		// Check if student_name exists (required)
		if (!headers.includes('student_name')) {
			throw new Error('Header "student_name" wajib ada dalam CSV');
		}

		for (let i = 1; i < lines.length; i++) {
			const values = lines[i].split(',').map((v) => v.trim());
			if (values.length !== headers.length) continue;

			const student: Omit<Student, 'id' | 'created_at' | 'updated_at'> = {
				student_code: '',
				student_name: '',
				points: 0,
				level: 1
			};

			headers.forEach((header, index) => {
				const value = values[index];
				if (header === 'student_code') student.student_code = value;
				else if (header === 'student_name') student.student_name = value;
				else if (header === 'kelas') student.kelas = value;
				else if (header === 'rombel') student.rombel = value;
				else if (header === 'angkatan') student.angkatan = value;
				else if (header === 'points') student.points = parseInt(value) || 0;
				else if (header === 'level') student.level = parseInt(value) || 1;
			});

			// Auto-generate student_code if not provided
			if (!student.student_code && student.student_name) {
				student.student_code = generateStudentCode(
					student.student_name,
					student.kelas || '',
					student.rombel || '',
					student.angkatan || '2025'
				);
			}

			if (student.student_code && student.student_name) {
				students.push(student);
			}
		}

		return students;
	}

	async function handlePreview() {
		if (!file) {
			error = 'Pilih file terlebih dahulu';
			return;
		}

		error = '';
		importing = true;

		try {
			const text = await file.text();
			const students = await parseCSV(text);

			// Set total students count
			totalStudents = students.length;

			// Check for conflicts in database
			const studentCodes = students.map((s) => s.student_code);
			const existingCodes = await checkExistingCodes(studentCodes);

			// Check for duplicates within CSV itself
			// eslint-disable-next-line svelte/prefer-svelte-reactivity
			const codeCount = new Map<string, number>();
			studentCodes.forEach((code) => {
				codeCount.set(code, (codeCount.get(code) || 0) + 1);
			});
			const duplicatesInCSV = Array.from(codeCount.entries())
				.filter(([, count]) => count > 1)
				.map(([code]) => code);

			// Prepare conflicts list
			conflicts = [];
			students.forEach((student) => {
				if (existingCodes.has(student.student_code)) {
					conflicts.push({
						code: student.student_code,
						name: student.student_name,
						existing: true
					});
				} else if (duplicatesInCSV.includes(student.student_code)) {
					conflicts.push({
						code: student.student_code,
						name: student.student_name,
						existing: false
					});
				}
			});

			previewData = students.slice(0, 10); // Show first 10 for preview

			if (conflicts.length > 0) {
				success = `⚠️ Ditemukan ${students.length} siswa, ${conflicts.length} conflict/duplicate!`;
			} else {
				success = `✅ Ditemukan ${students.length} siswa, siap import!`;
			}
		} catch (err) {
			error = err instanceof Error ? err.message : 'Gagal membaca file';
			previewData = [];
			totalStudents = 0;
			conflicts = [];
		} finally {
			importing = false;
		}
	}

	async function handleImport() {
		if (!file) {
			error = 'Pilih file terlebih dahulu';
			return;
		}

		// Show confirmation if there are conflicts
		if (conflicts.length > 0 && !showConfirmation) {
			showConfirmation = true;
			return;
		}

		error = '';
		success = '';
		importing = true;

		try {
			const text = await file.text();
			const students = await parseCSV(text);

			// Filter out conflicting students if user didn't confirm
			const conflictCodes = new Set(conflicts.filter((c) => c.existing).map((c) => c.code));
			const studentsToImport = students.filter((s) => !conflictCodes.has(s.student_code));

			if (studentsToImport.length === 0) {
				error = 'Tidak ada siswa yang bisa diimport setelah menghapus conflicts';
				importing = false;
				return;
			}

			// Import to Supabase
			await db.bulkCreateStudents(studentsToImport);

			const skipped = students.length - studentsToImport.length;
			if (skipped > 0) {
				success = `✅ Berhasil import ${studentsToImport.length} siswa! (${skipped} dilewati karena sudah ada)`;
			} else {
				success = `✅ Berhasil import ${studentsToImport.length} siswa!`;
			}

			file = null;
			previewData = [];
			conflicts = [];
			showConfirmation = false;

			// Close modal after 2 seconds
			setTimeout(() => {
				showModal = false;
				success = '';
				if (onImportComplete) onImportComplete();
			}, 2000);
		} catch (err) {
			error = err instanceof Error ? err.message : 'Gagal import data';
		} finally {
			importing = false;
		}
	}

	function downloadTemplate() {
		const csv = `student_code,student_name,kelas,rombel,angkatan,points,level
INSPIRE2025AS,Ahmad Syahid,X,A,2025,0,1
INSPIRE2025BS,Budi Santoso,X,A,2025,0,1
INSPIRE2025CS,Citra Sari,X,B,2025,0,1`;

		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'template_import_siswa.csv';
		a.click();
		URL.revokeObjectURL(url);
	}

	function downloadTemplateAutoCode() {
		const csv = `student_name,kelas,rombel,angkatan,points,level
Ahmad Syahid,X,A,2025,0,1
Budi Santoso,X,A,2025,0,1
Citra Sari,X,B,2025,0,1`;

		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'template_auto_code.csv';
		a.click();
		URL.revokeObjectURL(url);
	}
</script>

<button
	onclick={() => (showModal = true)}
	class="rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
>
	📥 Import Data Siswa
</button>

{#if showModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
		<div
			class="max-h-[90vh] w-full max-w-4xl space-y-2 overflow-y-auto rounded-2xl border-2 border-green-200 bg-white p-6 shadow-2xl"
		>
			<!-- Header -->
			<div class="mb-6 flex items-center justify-between">
				<div>
					<h2 class="text-2xl font-bold text-green-800">📥 Import Data Siswa</h2>
					<p class="text-sm text-green-600">Upload file CSV dengan data siswa</p>
				</div>
				<button
					onclick={() => {
						showModal = false;
						error = '';
						success = '';
						file = null;
						previewData = [];
					}}
					class="rounded-lg border-2 border-gray-200 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200 active:scale-95"
				>
					✕ Close
				</button>
			</div>

			<!-- Instructions -->
			<div class="mb-6 rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
				<h3 class="mb-2 font-bold text-blue-800">📋 Format CSV:</h3>
				<ul class="space-y-1 text-sm text-blue-700">
					<li>• <strong>Required:</strong> student_name</li>
					<li>
						• <strong>Optional:</strong> student_code (auto-generate jika kosong), kelas, rombel, angkatan,
						points, level
					</li>
					<li>• Gunakan koma (,) sebagai separator</li>
					<li>• Header harus di baris pertama</li>
					<li>• Student code akan di-generate otomatis jika tidak disediakan</li>
				</ul>
				<div class="mt-3 flex gap-2">
					<button
						onclick={downloadTemplate}
						class="rounded-lg border-2 border-blue-300 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-200 active:scale-95"
					>
						📄 Template (With Code)
					</button>
					<button
						onclick={downloadTemplateAutoCode}
						class="rounded-lg border-2 border-green-300 bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 transition-all hover:bg-green-200 active:scale-95"
					>
						🤖 Template (Auto Code)
					</button>
				</div>
			</div>

			<!-- File Upload -->
			<div class="mb-6">
				<label for="csv-file" class="mb-2 block text-sm font-semibold text-gray-700">
					Pilih File CSV
				</label>
				<input
					id="csv-file"
					type="file"
					accept=".csv"
					onchange={handleFileSelect}
					class="w-full rounded-lg border-2 border-green-200 px-4 py-3 text-sm transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-green-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 focus:outline-none"
				/>
			</div>

			<!-- Preview Button -->
			{#if file && !previewData.length}
				<button
					onclick={handlePreview}
					disabled={importing}
					class="mb-4 w-full rounded-xl border-2 border-blue-200 bg-blue-500 px-6 py-3 font-bold text-white transition-all hover:bg-blue-600 active:scale-95 disabled:opacity-50"
				>
					{importing ? '⏳ Loading...' : '👁️ Preview Data'}
				</button>
			{/if}

			<!-- Error Message -->
			{#if error}
				<div class="mb-4 rounded-xl border-2 border-red-200 bg-red-50 p-4">
					<p class="font-semibold text-red-800">❌ {error}</p>
				</div>
			{/if}

			<!-- Success Message -->
			{#if success}
				<div class="mb-4 rounded-xl border-2 border-green-200 bg-green-50 p-4">
					<p class="font-semibold text-green-800">{success}</p>
				</div>
			{/if}

			<!-- Conflicts Warning -->
			{#if conflicts.length > 0}
				<div class="mb-6 rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4">
					<h3 class="mb-2 font-bold text-yellow-800">
						⚠️ Conflicts/Duplicates Detected ({conflicts.length})
					</h3>
					<div class="max-h-48 overflow-y-auto rounded-lg border-2 border-yellow-200 bg-white p-3">
						{#each conflicts as conflict (conflict.code)}
							<div
								class="mb-2 flex items-center justify-between rounded-lg bg-yellow-50 p-2 text-sm"
							>
								<div>
									<span class="font-bold text-yellow-800">{conflict.code}</span>
									<span class="text-yellow-700"> - {conflict.name}</span>
								</div>
								<span
									class="rounded-full bg-yellow-200 px-2 py-1 text-xs font-semibold text-yellow-800"
								>
									{conflict.existing ? '🔄 Already in DB' : '🔁 Duplicate in CSV'}
								</span>
							</div>
						{/each}
					</div>
					<p class="mt-2 text-xs text-yellow-700">
						❗ Siswa dengan conflict akan <strong>dilewati</strong> saat import
					</p>
				</div>
			{/if}

			<!-- Preview Table -->
			{#if previewData.length > 0}
				<div class="mb-6 overflow-x-auto rounded-xl border-2 border-purple-200">
					<table class="w-full">
						<thead class="bg-purple-100">
							<tr>
								<th class="px-4 py-2 text-left text-xs font-bold text-purple-700">Code</th>
								<th class="px-4 py-2 text-left text-xs font-bold text-purple-700">Name</th>
								<th class="px-4 py-2 text-left text-xs font-bold text-purple-700">Kelas</th>
								<th class="px-4 py-2 text-left text-xs font-bold text-purple-700">Rombel</th>
								<th class="px-4 py-2 text-left text-xs font-bold text-purple-700">Angkatan</th>
							</tr>
						</thead>
						<tbody>
							{#each previewData as student (student.student_code)}
								<tr
									class="border-b border-purple-100 {conflicts.some(
										(c) => c.code === student.student_code
									)
										? 'bg-yellow-50 opacity-50'
										: ''}"
								>
									<td class="px-4 py-2 text-sm font-medium">
										{student.student_code}
										{#if conflicts.some((c) => c.code === student.student_code)}
											<span class="ml-1 text-xs text-yellow-600">⚠️</span>
										{/if}
									</td>
									<td class="px-4 py-2 text-sm">{student.student_name}</td>
									<td class="px-4 py-2 text-sm">{student.kelas || '-'}</td>
									<td class="px-4 py-2 text-sm">{student.rombel || '-'}</td>
									<td class="px-4 py-2 text-sm">{student.angkatan || '-'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Warning if all students will be skipped -->
				{#if !canImport() && conflicts.length > 0}
					<div class="rounded-xl border-2 border-red-200 bg-red-50 p-4">
						<p class="font-bold text-red-800">❌ Cannot Import</p>
						<p class="text-sm text-red-700">
							Semua siswa dalam file sudah ada di database. Tidak ada yang bisa diimport.
						</p>
					</div>
				{/if}

				<!-- Debug Info (remove after testing) -->
				<div class="mb-4 rounded-lg border-2 border-gray-300 bg-gray-100 p-3 text-xs">
					<p><strong>Debug:</strong></p>
					<p>totalStudents: {totalStudents}</p>
					<p>previewData.length: {previewData.length} (showing first 10)</p>
					<p>conflicts.length: {conflicts.length}</p>
					<p>conflicts (existing): {conflicts.filter((c) => c.existing).length}</p>
					<p>hasConflicts: {hasConflicts}</p>
					<p>canImport(): {canImport()}</p>
					<p>validStudentsCount(): {validStudentsCount()}</p>
				</div>

				<!-- Info box if has conflicts but can still import -->
				{#if hasConflicts && canImport()}
					<div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
						<p class="font-bold text-blue-800">ℹ️ Import Summary</p>
						<div class="mt-2 space-y-1 text-sm text-blue-700">
							<p>✅ <strong>{validStudentsCount()}</strong> siswa baru akan ditambahkan</p>
							<p>
								⚠️ <strong>{conflicts.filter((c) => c.existing).length}</strong> siswa sudah ada (akan
								di-skip)
							</p>
							<p class="mt-2 text-xs text-blue-600">
								💡 Hanya siswa baru yang akan ditambahkan ke database
							</p>
						</div>
					</div>
				{/if}

				<!-- Import Buttons -->
				<div class="space-y-2">
					{#if canImport() && hasConflicts}
						<!-- Button for importing only valid students -->
						<button
							onclick={handleImport}
							disabled={importing}
							class="w-full rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{#if importing}
								⏳ Importing...
							{:else}
								➕ Add {validStudentsCount()} New Student{validStudentsCount() > 1 ? 's' : ''} Only
							{/if}
						</button>
						<p class="text-center text-xs text-gray-500">
							Akan menambahkan siswa baru dan skip yang sudah ada
						</p>
					{:else}
						<!-- Normal import button -->
						<button
							onclick={handleImport}
							disabled={importing || !canImport()}
							class="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
						>
							{#if importing}
								⏳ Importing...
							{:else if !canImport()}
								🚫 Cannot Import (All Duplicates)
							{:else}
								✅ Confirm Import ({totalStudents} students)
							{/if}
						</button>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}
