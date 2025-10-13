<script lang="ts">
	import { db } from '$lib/supabase';
	import type { Student } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let students = $state<Student[]>([]);
	let loading = $state(true);
	let searchQuery = $state('');

	// Filtered students
	const filteredStudents = $derived(
		students.filter(
			(s) =>
				s.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				s.student_code.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);

	// Stats
	const totalStudents = $derived(students.length);
	const totalPoints = $derived(students.reduce((sum, s) => sum + s.points, 0));
	const avgLevel = $derived(
		students.length > 0
			? (students.reduce((sum, s) => sum + s.level, 0) / students.length).toFixed(1)
			: 0
	);

	onMount(async () => {
		try {
			// Load all students
			const data = await db.getAllStudents();
			students = data;
		} catch (error) {
			console.error('Failed to load students:', error);
		} finally {
			loading = false;
		}
	});

	function viewStudent(studentId: string) {
		goto(`${base}/admin/students/${studentId}`);
	}
</script>

<svelte:head>
	<title>Student Overview - Admin - We Will Shine</title>
</svelte:head>

<div class="space-y-6 pb-6">
	{#if loading}
		<!-- Loading State -->
		<div class="grid gap-6 sm:grid-cols-3">
			{#each Array.from({ length: 3 }, (_, i) => i) as idx (idx)}
				<div class="animate-pulse rounded-2xl border-2 border-gray-200 bg-white p-6">
					<div class="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
					<div class="h-8 w-3/4 rounded bg-gray-300"></div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Stats Cards -->
		<div class="grid gap-6 sm:grid-cols-3">
			<!-- Total Students -->
			<div
				class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-lg"
			>
				<p class="text-sm font-semibold text-purple-700">Total Students</p>
				<p class="mt-2 text-4xl font-bold text-purple-800">{totalStudents}</p>
			</div>

			<!-- Total Points -->
			<div
				class="rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-100 to-orange-100 p-6 shadow-lg"
			>
				<p class="text-sm font-semibold text-yellow-700">Total Points</p>
				<p class="mt-2 text-4xl font-bold text-yellow-800">{totalPoints}</p>
			</div>

			<!-- Average Level -->
			<div
				class="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-100 to-cyan-100 p-6 shadow-lg"
			>
				<p class="text-sm font-semibold text-blue-700">Average Level</p>
				<p class="mt-2 text-4xl font-bold text-blue-800">{avgLevel}</p>
			</div>
		</div>

		<!-- Search & Filter -->
		<div class="rounded-2xl border-2 border-purple-200 bg-white p-4 shadow-lg">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="🔍 Search by name or code..."
				class="w-full rounded-lg border-2 border-purple-200 px-4 py-3 text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
			/>
		</div>

		<!-- Students Table -->
		<div class="rounded-2xl border-2 border-purple-200 bg-white shadow-lg">
			<div class="border-b-2 border-purple-100 p-4">
				<h2 class="text-lg font-bold text-gray-800">
					📚 Students ({filteredStudents.length})
				</h2>
			</div>

			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="bg-purple-50">
						<tr>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Code</th>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Name</th>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Points</th>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Level</th>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Joined</th>
							<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredStudents as student (student.id)}
							<tr class="border-b border-purple-50 transition-colors hover:bg-purple-50">
								<td class="px-4 py-3 text-sm font-medium text-gray-800">{student.student_code}</td>
								<td class="px-4 py-3 text-sm text-gray-700">{student.student_name}</td>
								<td class="px-4 py-3 text-sm font-bold text-yellow-600">{student.points}</td>
								<td class="px-4 py-3 text-sm font-bold text-purple-600">Lv.{student.level}</td>
								<td class="px-4 py-3 text-xs text-gray-500">
									{new Date(student.created_at).toLocaleDateString('id-ID', {
										day: 'numeric',
										month: 'short',
										year: 'numeric'
									})}
								</td>
								<td class="px-4 py-3">
									<button
										onclick={() => viewStudent(student.id)}
										class="rounded-lg bg-purple-500 px-3 py-1 text-xs font-bold text-white transition-all hover:bg-purple-600 active:scale-95"
									>
										View Details
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>

				{#if filteredStudents.length === 0}
					<div class="py-12 text-center">
						<p class="text-sm text-gray-500">
							{searchQuery ? 'No students found' : 'No students yet'}
						</p>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
