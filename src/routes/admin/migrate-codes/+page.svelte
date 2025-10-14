<script lang="ts">
	import { db } from '$lib/supabase';
	import type { Student } from '$lib/supabase';

	let migrating = $state(false);
	let students = $state<Student[]>([]);
	let previewData = $state<
		{ old: string; new: string; name: string; kelas: string; rombel: string }[]
	>([]);
	let migrationComplete = $state(false);
	let error = $state('');
	let success = $state('');

	async function loadStudents() {
		try {
			const result = await db.getStudentsWithFilter({ limit: 1000 });
			students = result.students;
			generatePreview();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load students';
		}
	}

	function generateNewCode(student: Student): string {
		const name = student.student_name;
		const kelas = student.kelas || '';
		const rombel = student.rombel || '';
		const angkatan = student.angkatan || '2025';

		// Clean name
		const cleanName = name
			.trim()
			.toUpperCase()
			.replace(/[^A-Z\s]/g, '')
			.replace(/\s+/g, ' ');

		const words = cleanName.split(' ').filter((w) => w.length > 0);

		// Build name code
		let nameCode = '';
		if (words.length === 1) {
			nameCode = words[0].substring(0, 6).padEnd(6, 'X');
		} else if (words.length === 2) {
			const firstName = words[0].substring(0, 4);
			const lastName = words[1].substring(0, 2);
			nameCode = (firstName + lastName).padEnd(6, 'X');
		} else {
			const firstName = words[0].substring(0, 3);
			const middleName = words[1].substring(0, 1);
			const lastName = words[words.length - 1].substring(0, 2);
			nameCode = (firstName + middleName + lastName).padEnd(6, 'X');
		}

		// Format kelas+rombel
		const kelasCode = (kelas + rombel).replace(/[^A-Z0-9]/g, '').toUpperCase();

		return `${nameCode}${kelasCode}${angkatan}`;
	}

	function generatePreview() {
		previewData = students
			.filter((s) => {
				const newCode = generateNewCode(s);
				return s.student_code !== newCode; // Only show students that will change
			})
			.map((s) => ({
				old: s.student_code,
				new: generateNewCode(s),
				name: s.student_name,
				kelas: s.kelas || '-',
				rombel: s.rombel || '-'
			}));
	}

	async function runMigration() {
		if (
			!confirm(
				`Migrate ${previewData.length} student codes?\n\nThis will update the database. Continue?`
			)
		) {
			return;
		}

		migrating = true;
		error = '';
		success = '';

		try {
			// Update each student with new code
			let updated = 0;
			for (const preview of previewData) {
				const student = students.find((s) => s.student_code === preview.old);
				if (student) {
					await db.updateStudent(student.id, { student_code: preview.new });
					updated++;
				}
			}

			success = `✅ Successfully migrated ${updated} student codes!`;
			migrationComplete = true;

			// Reload to show updated data
			await loadStudents();
		} catch (err) {
			error = err instanceof Error ? err.message : 'Migration failed';
		} finally {
			migrating = false;
		}
	}

	$effect(() => {
		loadStudents();
	});
</script>

<svelte:head>
	<title>Migrate Student Codes - Admin</title>
</svelte:head>

<div class="space-y-6 pb-6">
	<!-- Page Header -->
	<div
		class="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-100 to-red-100 p-6 shadow-lg"
	>
		<h1 class="text-2xl font-bold text-orange-800">🔧 Migrate Student Codes</h1>
		<p class="text-sm text-orange-600">Update student codes to new consistent format</p>
	</div>

	<!-- Warning Box -->
	<div class="rounded-2xl border-2 border-yellow-200 bg-yellow-50 p-6 shadow-lg">
		<h2 class="mb-3 flex items-center gap-2 text-xl font-bold text-yellow-800">
			<span>⚠️</span>
			<span>Important Information</span>
		</h2>
		<div class="space-y-2 text-sm text-yellow-800">
			<p><strong>What this does:</strong></p>
			<ul class="ml-5 list-disc space-y-1">
				<li>Updates old format codes (INSPIRE2025XXX) to new format (NAMEVIIC2025)</li>
				<li>Makes all student codes consistent</li>
				<li>Includes kelas+rombel in code for uniqueness</li>
			</ul>
			<p class="mt-3"><strong>⚠️ Warning:</strong> This operation will modify the database!</p>
		</div>
	</div>

	<!-- Format Comparison -->
	<div class="rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-lg">
		<h2 class="mb-4 text-xl font-bold text-blue-800">📋 Format Comparison</h2>
		<div class="grid gap-4 md:grid-cols-2">
			<div class="rounded-lg border-2 border-red-200 bg-red-50 p-4">
				<p class="mb-2 font-bold text-red-800">❌ Old Format</p>
				<code class="block rounded bg-red-100 p-2 text-sm">INSPIRE2025NSZ</code>
				<p class="mt-2 text-xs text-red-700">
					- No kelas/rombel info<br />
					- Can have duplicates<br />
					- Hard to identify student
				</p>
			</div>
			<div class="rounded-lg border-2 border-green-200 bg-green-50 p-4">
				<p class="mb-2 font-bold text-green-800">✅ New Format</p>
				<code class="block rounded bg-green-100 p-2 text-sm">NAMSYAVIIC2025</code>
				<p class="mt-2 text-xs text-green-700">
					- Includes kelas+rombel (VIIC)<br />
					- Unique per student<br />
					- Easy to identify
				</p>
			</div>
		</div>
	</div>

	<!-- Preview -->
	{#if previewData.length > 0}
		<div class="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
			<h2 class="mb-4 text-xl font-bold text-purple-800">
				🔄 Migration Preview ({previewData.length} students will be updated)
			</h2>

			<div class="mb-4 overflow-x-auto rounded-xl border-2 border-purple-100">
				<table class="w-full">
					<thead class="bg-purple-50">
						<tr>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Name</th>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Kelas</th>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Rombel</th>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Old Code</th>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">New Code</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-purple-100">
						{#each previewData.slice(0, 20) as item (item.old)}
							<tr class="hover:bg-purple-50">
								<td class="px-4 py-3 text-sm">{item.name}</td>
								<td class="px-4 py-3 text-sm">{item.kelas}</td>
								<td class="px-4 py-3 text-sm">{item.rombel}</td>
								<td class="px-4 py-3">
									<code class="rounded bg-red-100 px-2 py-1 text-xs text-red-700">{item.old}</code>
								</td>
								<td class="px-4 py-3">
									<code class="rounded bg-green-100 px-2 py-1 text-xs text-green-700"
										>{item.new}</code
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			{#if previewData.length > 20}
				<p class="text-sm text-gray-600">Showing first 20 of {previewData.length} students...</p>
			{/if}

			<!-- Migration Button -->
			<button
				onclick={runMigration}
				disabled={migrating || migrationComplete}
				class="mt-4 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if migrating}
					⏳ Migrating...
				{:else if migrationComplete}
					✅ Migration Complete
				{:else}
					🚀 Run Migration ({previewData.length} students)
				{/if}
			</button>
		</div>
	{:else if students.length > 0}
		<div class="rounded-2xl border-2 border-green-200 bg-green-50 p-6 text-center shadow-lg">
			<div class="mb-4 text-4xl">✅</div>
			<p class="text-lg font-bold text-green-800">All student codes are already in new format!</p>
			<p class="mt-2 text-sm text-green-600">No migration needed.</p>
		</div>
	{/if}

	<!-- Error Message -->
	{#if error}
		<div class="rounded-2xl border-2 border-red-200 bg-red-50 p-4">
			<p class="font-semibold text-red-800">❌ {error}</p>
		</div>
	{/if}

	<!-- Success Message -->
	{#if success}
		<div class="rounded-2xl border-2 border-green-200 bg-green-50 p-4">
			<p class="font-semibold text-green-800">{success}</p>
		</div>
	{/if}
</div>
