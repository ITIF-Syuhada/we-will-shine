<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { students } from '$lib/data/students';

	interface StudentData {
		id: string;
		name: string;
		code: string;
		hasLoggedIn: boolean;
		points: number;
		level: number;
		exploredCareers: number;
		quizCompleted: boolean;
		dreamsCount: number;
		lastActive: string;
	}

	let studentsData = $state<StudentData[]>([]);
	let searchQuery = $state('');

	onMount(() => {
		loadStudentsData();
	});

	function loadStudentsData() {
		if (!browser) return;

		const data = students.map((student) => {
			let progress = null;
			try {
				const stored = localStorage.getItem('we-will-shine-progress');
				if (stored) {
					const parsed = JSON.parse(stored);
					if (parsed.studentCode === student.code) {
						progress = parsed;
					}
				}
			} catch {
				// ignore
			}

			return {
				...student,
				hasLoggedIn: progress !== null,
				points: progress?.points || 0,
				level: progress?.level || 0,
				exploredCareers: progress?.exploredCareers?.length || 0,
				quizCompleted: progress?.quizCompleted || false,
				dreamsCount: progress?.dreams?.length || 0,
				lastActive: progress ? 'Active' : 'Never'
			};
		});

		studentsData = data;
	}

	const filteredStudents = $derived(
		searchQuery.trim() === ''
			? studentsData
			: studentsData.filter(
					(s) =>
						s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
						s.code.toLowerCase().includes(searchQuery.toLowerCase())
				)
	);

	const activeStudents = $derived(studentsData.filter((s) => s.hasLoggedIn).length);
	const totalPoints = $derived(studentsData.reduce((sum, s) => sum + s.points, 0));
	const avgPoints = $derived(activeStudents > 0 ? Math.round(totalPoints / activeStudents) : 0);
</script>

<svelte:head>
	<title>Manage Students - Admin</title>
</svelte:head>

<div class="space-y-6 pb-6">
	<!-- Page Header -->
	<div
		class="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-100 to-emerald-100 p-6 shadow-lg"
	>
		<h1 class="text-2xl font-bold text-green-800">👥 Manage Students</h1>
		<p class="text-sm text-green-600">{students.length} students registered</p>
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

	<!-- Search -->
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
				📚 Students List ({filteredStudents.length})
			</h2>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-purple-50">
					<tr>
						<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Code</th>
						<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Name</th>
						<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Status</th>
						<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Points</th>
						<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Level</th>
						<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Careers</th>
						<th class="px-4 py-3 text-left text-xs font-bold text-purple-700">Quiz</th>
					</tr>
				</thead>
				<tbody>
					{#each filteredStudents as student (student.id)}
						<tr class="border-b border-purple-50 transition-colors hover:bg-purple-50">
							<td class="px-4 py-3 text-sm font-medium text-gray-800">{student.code}</td>
							<td class="px-4 py-3 text-sm text-gray-700">{student.name}</td>
							<td class="px-4 py-3">
								{#if student.hasLoggedIn}
									<span
										class="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700"
									>
										Active
									</span>
								{:else}
									<span
										class="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-600"
									>
										Not Active
									</span>
								{/if}
							</td>
							<td class="px-4 py-3 text-sm font-bold text-yellow-600">{student.points}</td>
							<td class="px-4 py-3 text-sm font-bold text-purple-600">Lv.{student.level}</td>
							<td class="px-4 py-3 text-sm text-gray-600">{student.exploredCareers}/8</td>
							<td class="px-4 py-3">
								{#if student.quizCompleted}
									<span class="text-green-600">✅</span>
								{:else}
									<span class="text-gray-400">⬜</span>
								{/if}
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
</div>
