<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { students } from '$lib/data/students';

	let isAuthenticated = $state(false);
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
		if (browser) {
			const authStatus = localStorage.getItem('admin-auth');
			if (authStatus !== 'true') {
				goto(`${base}/admin`);
			} else {
				isAuthenticated = true;
				loadStudentsData();
			}
		}
	});

	function loadStudentsData() {
		if (!browser) return;

		const data = students.map((student) => {
			// Try to get progress from localStorage
			// In real app, this would come from Supabase
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

{#if isAuthenticated}
	<div class="min-h-screen bg-gray-50 p-4">
		<!-- Header -->
		<header class="mb-6 rounded-2xl border border-purple-200 bg-white p-6 shadow-lg">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<a
						href="{base}/admin/dashboard"
						class="rounded-full border-2 border-gray-200 bg-gray-50 p-2 transition-all hover:bg-gray-100"
					>
						<span>←</span>
					</a>
					<div>
						<h1 class="text-2xl font-bold text-gray-800">Manage Students</h1>
						<p class="text-sm text-gray-600">{students.length} siswa terdaftar</p>
					</div>
				</div>
			</div>
		</header>

		<!-- Quick Stats -->
		<div class="mb-6 grid gap-4 md:grid-cols-3">
			<div class="rounded-xl border border-blue-100 bg-white p-4 shadow-md">
				<div class="text-2xl font-bold text-blue-600">{activeStudents}/{students.length}</div>
				<div class="text-sm text-gray-600">Siswa Aktif</div>
			</div>
			<div class="rounded-xl border border-purple-100 bg-white p-4 shadow-md">
				<div class="text-2xl font-bold text-purple-600">{totalPoints}</div>
				<div class="text-sm text-gray-600">Total Points</div>
			</div>
			<div class="rounded-xl border border-green-100 bg-white p-4 shadow-md">
				<div class="text-2xl font-bold text-green-600">{avgPoints}</div>
				<div class="text-sm text-gray-600">Avg Points/Siswa</div>
			</div>
		</div>

		<!-- Search & Filters -->
		<div class="mb-6 rounded-2xl border border-purple-100 bg-white p-4 shadow-md">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Cari siswa (nama atau kode)..."
				class="w-full rounded-xl border-2 border-purple-200 px-4 py-3 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
			/>
		</div>

		<!-- Students Table -->
		<div class="rounded-2xl border border-purple-100 bg-white shadow-md">
			<div class="overflow-x-auto">
				<table class="w-full">
					<thead class="border-b border-purple-100 bg-purple-50">
						<tr>
							<th class="p-4 text-left text-sm font-bold text-gray-700">Nama</th>
							<th class="p-4 text-left text-sm font-bold text-gray-700">Kode</th>
							<th class="p-4 text-center text-sm font-bold text-gray-700">Status</th>
							<th class="p-4 text-center text-sm font-bold text-gray-700">Points</th>
							<th class="p-4 text-center text-sm font-bold text-gray-700">Level</th>
							<th class="p-4 text-center text-sm font-bold text-gray-700">Karir</th>
							<th class="p-4 text-center text-sm font-bold text-gray-700">Quiz</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredStudents as student (student.id)}
							<tr class="border-b border-gray-100 transition-colors hover:bg-purple-50/30">
								<td class="p-4 text-sm text-gray-800">{student.name}</td>
								<td class="p-4">
									<code
										class="rounded bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-700"
									>
										{student.code}
									</code>
								</td>
								<td class="p-4 text-center">
									{#if student.hasLoggedIn}
										<span
											class="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600"
										>
											✓ Active
										</span>
									{:else}
										<span
											class="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-500"
										>
											- Never
										</span>
									{/if}
								</td>
								<td class="p-4 text-center text-sm font-semibold text-gray-700">
									{student.points}
								</td>
								<td class="p-4 text-center text-sm text-gray-600">{student.level || '-'}</td>
								<td class="p-4 text-center text-sm text-gray-600">
									{student.exploredCareers}/8
								</td>
								<td class="p-4 text-center">
									{#if student.quizCompleted}
										<span class="text-lg">✓</span>
									{:else}
										<span class="text-gray-400">-</span>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		{#if filteredStudents.length === 0}
			<div class="mt-6 rounded-xl bg-gray-50 p-8 text-center">
				<div class="mb-2 text-4xl">🔍</div>
				<p class="text-gray-600">Tidak ada siswa yang cocok dengan pencarian.</p>
			</div>
		{/if}
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<div class="mb-4 text-6xl">⏳</div>
			<p class="text-gray-600">Loading...</p>
		</div>
	</div>
{/if}
