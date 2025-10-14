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

	function handleFileSelect(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files[0]) {
			file = input.files[0];
			error = '';
			previewData = [];
		}
	}

	async function parseCSV(text: string) {
		const lines = text.split('\n').filter((line) => line.trim());
		if (lines.length < 2) {
			throw new Error('File CSV kosong atau tidak valid');
		}

		const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
		const students: Omit<Student, 'id' | 'created_at' | 'updated_at'>[] = [];

		// Validate headers
		const requiredHeaders = ['student_code', 'student_name'];
		const missingHeaders = requiredHeaders.filter((h) => !headers.includes(h));
		if (missingHeaders.length > 0) {
			throw new Error(`Header yang diperlukan tidak ditemukan: ${missingHeaders.join(', ')}`);
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
			previewData = students.slice(0, 10); // Show first 10 for preview
			success = `Ditemukan ${students.length} siswa. Preview 10 data pertama.`;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Gagal membaca file';
			previewData = [];
		} finally {
			importing = false;
		}
	}

	async function handleImport() {
		if (!file) {
			error = 'Pilih file terlebih dahulu';
			return;
		}

		error = '';
		success = '';
		importing = true;

		try {
			const text = await file.text();
			const students = await parseCSV(text);

			// Import to Supabase
			await db.bulkCreateStudents(students);

			success = `✅ Berhasil import ${students.length} siswa!`;
			file = null;
			previewData = [];

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
			class="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border-2 border-green-200 bg-white p-6 shadow-2xl"
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
					<li>• <strong>Required:</strong> student_code, student_name</li>
					<li>• <strong>Optional:</strong> kelas, rombel, angkatan, points, level</li>
					<li>• Gunakan koma (,) sebagai separator</li>
					<li>• Header harus di baris pertama</li>
				</ul>
				<button
					onclick={downloadTemplate}
					class="mt-3 rounded-lg border-2 border-blue-300 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-200 active:scale-95"
				>
					📄 Download Template
				</button>
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
								<tr class="border-b border-purple-100">
									<td class="px-4 py-2 text-sm">{student.student_code}</td>
									<td class="px-4 py-2 text-sm">{student.student_name}</td>
									<td class="px-4 py-2 text-sm">{student.kelas || '-'}</td>
									<td class="px-4 py-2 text-sm">{student.rombel || '-'}</td>
									<td class="px-4 py-2 text-sm">{student.angkatan || '-'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Import Button -->
				<button
					onclick={handleImport}
					disabled={importing}
					class="w-full rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:opacity-50"
				>
					{importing ? '⏳ Importing...' : '✅ Confirm Import'}
				</button>
			{/if}
		</div>
	</div>
{/if}
