<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { db } from '$lib/supabase';
	import type { Student } from '$lib/supabase';
	import ImportStudents from '$lib/components/ImportStudents.svelte';

	let students = $state<Student[]>([]);
	let totalStudents = $state(0);
	let loading = $state(true);

	// Filter states
	let searchQuery = $state('');
	let selectedKelas = $state('');
	let selectedRombel = $state('');
	let selectedAngkatan = $state('');

	// Pagination states
	let currentPage = $state(1);
	let itemsPerPage = $state(10);
	const pageOptions = [10, 20, 30, 40, 50];

	// Unique values for filters
	let availableKelas = $state<string[]>([]);
	let availableRombel = $state<string[]>([]);
	let availableAngkatan = $state<string[]>([]);

	// Column visibility (default all visible)
	interface ColumnVisibility {
		code: boolean;
		name: boolean;
		kelas: boolean;
		rombel: boolean;
		angkatan: boolean;
		points: boolean;
		level: boolean;
	}

	const defaultColumns: ColumnVisibility = {
		code: true,
		name: true,
		kelas: true,
		rombel: true,
		angkatan: true,
		points: true,
		level: true
	};

	let visibleColumns = $state<ColumnVisibility>(defaultColumns);
	let showColumnSettings = $state(false);

	// Computed values
	const totalPages = $derived(Math.ceil(totalStudents / itemsPerPage));
	const activeStudents = $derived(students.filter((s) => s.points > 0).length);
	const totalPoints = $derived(students.reduce((sum, s) => sum + s.points, 0));
	const avgPoints = $derived(activeStudents > 0 ? Math.round(totalPoints / activeStudents) : 0);
	const visibleColumnCount = $derived(Object.values(visibleColumns).filter((v) => v).length);

	onMount(() => {
		loadColumnSettings();
		loadUniqueValues();
		loadStudents();
	});

	function loadColumnSettings() {
		if (!browser) return;
		const saved = localStorage.getItem('admin-students-columns');
		if (saved) {
			try {
				visibleColumns = JSON.parse(saved);
			} catch (e) {
				console.error('Failed to parse column settings:', e);
				visibleColumns = defaultColumns;
			}
		}
	}

	function saveColumnSettings() {
		if (!browser) return;
		localStorage.setItem('admin-students-columns', JSON.stringify(visibleColumns));
	}

	function toggleColumn(column: keyof ColumnVisibility) {
		visibleColumns[column] = !visibleColumns[column];
		saveColumnSettings();
	}

	function resetColumns() {
		visibleColumns = { ...defaultColumns };
		saveColumnSettings();
	}

	// Click outside handler to close column settings
	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.column-settings-container')) {
			showColumnSettings = false;
		}
	}

	$effect(() => {
		if (browser && showColumnSettings) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});

	async function loadUniqueValues() {
		try {
			const values = await db.getUniqueValues();
			availableKelas = values.kelas as string[];
			availableRombel = values.rombel as string[];
			availableAngkatan = values.angkatan as string[];
		} catch (error) {
			console.error('Failed to load unique values:', error);
		}
	}

	async function loadStudents() {
		loading = true;
		try {
			const offset = (currentPage - 1) * itemsPerPage;
			const result = await db.getStudentsWithFilter({
				kelas: selectedKelas || undefined,
				rombel: selectedRombel || undefined,
				angkatan: selectedAngkatan || undefined,
				search: searchQuery || undefined,
				limit: itemsPerPage,
				offset
			});

			students = result.students;
			totalStudents = result.total;
		} catch (error) {
			console.error('Failed to load students:', error);
		} finally {
			loading = false;
		}
	}

	function handleFilterChange() {
		currentPage = 1; // Reset to first page
		loadStudents();
	}

	function handlePageChange(page: number) {
		currentPage = page;
		loadStudents();
	}

	function handleImportComplete() {
		loadUniqueValues();
		loadStudents();
	}

	function clearFilters() {
		searchQuery = '';
		selectedKelas = '';
		selectedRombel = '';
		selectedAngkatan = '';
		currentPage = 1;
		loadStudents();
	}

	// Generate page numbers for pagination
	const pageNumbers = $derived(() => {
		const pages = [];
		const maxVisible = 5;
		let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
		let end = Math.min(totalPages, start + maxVisible - 1);

		if (end - start + 1 < maxVisible) {
			start = Math.max(1, end - maxVisible + 1);
		}

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		return pages;
	});
</script>

<svelte:head>
	<title>Manage Students - Admin</title>
</svelte:head>

<div class="space-y-6 pb-6">
	<!-- Page Header -->
	<div
		class="flex items-center justify-between rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-6 shadow-lg"
	>
		<div>
			<h1 class="text-2xl font-bold text-green-800">👥 Manage Students</h1>
			<p class="text-sm text-green-600">{totalStudents} students registered</p>
		</div>
		<ImportStudents onImportComplete={handleImportComplete} />
	</div>

	<!-- Quick Stats -->
	<div class="grid gap-4 md:grid-cols-3">
		<div class="rounded-xl border-2 border-blue-200 bg-white p-4 shadow-md">
			<div class="mb-2 text-3xl">👥</div>
			<div class="text-sm text-gray-600">Active Students</div>
			<div class="text-2xl font-bold text-blue-600">{activeStudents}</div>
		</div>
		<div class="rounded-xl border-2 border-yellow-200 bg-white p-4 shadow-md">
			<div class="mb-2 text-3xl">⭐</div>
			<div class="text-sm text-gray-600">Total Points</div>
			<div class="text-2xl font-bold text-yellow-600">{totalPoints}</div>
		</div>
		<div class="rounded-xl border-2 border-purple-200 bg-white p-4 shadow-md">
			<div class="mb-2 text-3xl">📊</div>
			<div class="text-sm text-gray-600">Avg Points</div>
			<div class="text-2xl font-bold text-purple-600">{avgPoints}</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="text-lg font-bold text-gray-800">🔍 Filters</h2>
			<button
				onclick={clearFilters}
				class="rounded-lg border-2 border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-200 active:scale-95"
			>
				Clear All
			</button>
		</div>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Search -->
			<div>
				<label for="search" class="mb-2 block text-sm font-semibold text-gray-700"> Search </label>
				<input
					id="search"
					type="text"
					bind:value={searchQuery}
					onkeyup={handleFilterChange}
					placeholder="Name or code..."
					class="w-full rounded-lg border-2 border-purple-200 px-4 py-2 text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
				/>
			</div>

			<!-- Kelas Filter -->
			<div>
				<label for="kelas" class="mb-2 block text-sm font-semibold text-gray-700"> Kelas </label>
				<select
					id="kelas"
					bind:value={selectedKelas}
					onchange={handleFilterChange}
					class="w-full rounded-lg border-2 border-purple-200 px-4 py-2 text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
				>
					<option value="">All Kelas</option>
					{#each availableKelas as kelas (kelas)}
						<option value={kelas}>{kelas}</option>
					{/each}
				</select>
			</div>

			<!-- Rombel Filter -->
			<div>
				<label for="rombel" class="mb-2 block text-sm font-semibold text-gray-700"> Rombel </label>
				<select
					id="rombel"
					bind:value={selectedRombel}
					onchange={handleFilterChange}
					class="w-full rounded-lg border-2 border-purple-200 px-4 py-2 text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
				>
					<option value="">All Rombel</option>
					{#each availableRombel as rombel (rombel)}
						<option value={rombel}>{rombel}</option>
					{/each}
				</select>
			</div>

			<!-- Angkatan Filter -->
			<div>
				<label for="angkatan" class="mb-2 block text-sm font-semibold text-gray-700">
					Angkatan
				</label>
				<select
					id="angkatan"
					bind:value={selectedAngkatan}
					onchange={handleFilterChange}
					class="w-full rounded-lg border-2 border-purple-200 px-4 py-2 text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
				>
					<option value="">All Angkatan</option>
					{#each availableAngkatan as angkatan (angkatan)}
						<option value={angkatan}>{angkatan}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!-- Students Table -->
	<div class="rounded-2xl border-2 border-purple-200 bg-white shadow-lg">
		<div class="flex items-center justify-between border-b-2 border-purple-100 p-4">
			<h2 class="text-lg font-bold text-gray-800">
				📚 Students List ({students.length} of {totalStudents})
			</h2>

			<div class="flex items-center gap-3">
				<!-- Column Settings Button -->
				<div class="column-settings-container relative">
					<button
						onclick={() => (showColumnSettings = !showColumnSettings)}
						class="rounded-lg border-2 border-purple-200 bg-white px-3 py-2 text-sm font-semibold text-purple-700 transition-all hover:bg-purple-50 active:scale-95"
						title="Column Settings"
					>
						⚙️ Columns ({visibleColumnCount})
					</button>

					{#if showColumnSettings}
						<div
							class="absolute right-0 top-full z-10 mt-2 w-48 rounded-lg border-2 border-purple-200 bg-white p-3 shadow-xl"
						>
							<div class="mb-2 text-xs font-bold text-gray-700">Show/Hide Columns</div>
							<div class="space-y-2">
								<label class="flex cursor-pointer items-center gap-2">
									<input
										type="checkbox"
										checked={visibleColumns.code}
										onchange={() => toggleColumn('code')}
										class="cursor-pointer"
									/>
									<span class="text-sm">Code</span>
								</label>
								<label class="flex cursor-pointer items-center gap-2">
									<input
										type="checkbox"
										checked={visibleColumns.name}
										onchange={() => toggleColumn('name')}
										class="cursor-pointer"
									/>
									<span class="text-sm">Name</span>
								</label>
								<label class="flex cursor-pointer items-center gap-2">
									<input
										type="checkbox"
										checked={visibleColumns.kelas}
										onchange={() => toggleColumn('kelas')}
										class="cursor-pointer"
									/>
									<span class="text-sm">Kelas</span>
								</label>
								<label class="flex cursor-pointer items-center gap-2">
									<input
										type="checkbox"
										checked={visibleColumns.rombel}
										onchange={() => toggleColumn('rombel')}
										class="cursor-pointer"
									/>
									<span class="text-sm">Rombel</span>
								</label>
								<label class="flex cursor-pointer items-center gap-2">
									<input
										type="checkbox"
										checked={visibleColumns.angkatan}
										onchange={() => toggleColumn('angkatan')}
										class="cursor-pointer"
									/>
									<span class="text-sm">Angkatan</span>
								</label>
								<label class="flex cursor-pointer items-center gap-2">
									<input
										type="checkbox"
										checked={visibleColumns.points}
										onchange={() => toggleColumn('points')}
										class="cursor-pointer"
									/>
									<span class="text-sm">Points</span>
								</label>
								<label class="flex cursor-pointer items-center gap-2">
									<input
										type="checkbox"
										checked={visibleColumns.level}
										onchange={() => toggleColumn('level')}
										class="cursor-pointer"
									/>
									<span class="text-sm">Level</span>
								</label>
							</div>
							<button
								onclick={resetColumns}
								class="mt-3 w-full rounded-lg border-2 border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-200 active:scale-95"
							>
								Reset to Default
							</button>
						</div>
					{/if}
				</div>

				<!-- Items Per Page -->
				<div class="flex items-center gap-2">
					<span class="text-sm font-semibold text-gray-700">Items per page:</span>
					<select
						bind:value={itemsPerPage}
						onchange={() => {
							currentPage = 1;
							loadStudents();
						}}
						class="rounded-lg border-2 border-purple-200 px-3 py-2 text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
					>
						{#each pageOptions as option (option)}
							<option value={option}>{option}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		{#if loading}
			<div class="p-12 text-center">
				<div class="mb-4 text-4xl">⏳</div>
				<p class="text-gray-600">Loading students...</p>
			</div>
		{:else if students.length === 0}
			<div class="p-12 text-center">
				<div class="mb-4 text-4xl">📭</div>
				<p class="text-gray-600">No students found</p>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-purple-50">
						<tr>
							{#if visibleColumns.code}
								<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Code</th>
							{/if}
							{#if visibleColumns.name}
								<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Name</th>
							{/if}
							{#if visibleColumns.kelas}
								<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Kelas</th>
							{/if}
							{#if visibleColumns.rombel}
								<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Rombel</th>
							{/if}
							{#if visibleColumns.angkatan}
								<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Angkatan</th>
							{/if}
							{#if visibleColumns.points}
								<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Points</th>
							{/if}
							{#if visibleColumns.level}
								<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Level</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						{#each students as student (student.id)}
							<tr class="border-b border-purple-50 transition-colors hover:bg-purple-50">
								{#if visibleColumns.code}
									<td class="px-4 py-3 text-sm font-medium text-gray-800">{student.student_code}</td
									>
								{/if}
								{#if visibleColumns.name}
									<td class="px-4 py-3 text-sm text-gray-700">{student.student_name}</td>
								{/if}
								{#if visibleColumns.kelas}
									<td class="px-4 py-3 text-sm text-gray-600">{student.kelas || '-'}</td>
								{/if}
								{#if visibleColumns.rombel}
									<td class="px-4 py-3 text-sm text-gray-600">{student.rombel || '-'}</td>
								{/if}
								{#if visibleColumns.angkatan}
									<td class="px-4 py-3 text-sm text-gray-600">{student.angkatan || '-'}</td>
								{/if}
								{#if visibleColumns.points}
									<td class="px-4 py-3 text-sm font-bold text-yellow-600">{student.points}</td>
								{/if}
								{#if visibleColumns.level}
									<td class="px-4 py-3 text-sm font-bold text-purple-600">Lv.{student.level}</td>
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>

	<!-- Pagination -->
	{#if totalPages > 1}
		<div
			class="flex items-center justify-between rounded-2xl border-2 border-purple-200 bg-white p-4 shadow-lg"
		>
			<div class="text-sm text-gray-600">
				Page {currentPage} of {totalPages} • Total: {totalStudents} students
			</div>

			<div class="flex gap-2">
				<!-- Previous Button -->
				<button
					onclick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					class="rounded-lg border-2 border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition-all hover:bg-purple-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
				>
					← Previous
				</button>

				<!-- Page Numbers -->
				{#each pageNumbers() as page (page)}
					<button
						onclick={() => handlePageChange(page)}
						class="rounded-lg border-2 px-4 py-2 text-sm font-semibold transition-all active:scale-95 {page ===
						currentPage
							? 'border-purple-400 bg-purple-500 text-white'
							: 'border-purple-200 bg-white text-purple-700 hover:bg-purple-50'}"
					>
						{page}
					</button>
				{/each}

				<!-- Next Button -->
				<button
					onclick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					class="rounded-lg border-2 border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition-all hover:bg-purple-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Next →
				</button>
			</div>
		</div>
	{/if}
</div>
