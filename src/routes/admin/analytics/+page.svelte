<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { students } from '$lib/data/students';
	import { careers } from '$lib/data/careers';
	let analyticsData = $state({
		totalStudents: students.length,
		activeStudents: 0,
		totalPoints: 0,
		avgPoints: 0,
		totalLogins: 0,
		quizCompleted: 0,
		achievementsUnlocked: 0,
		careerPopularity: [] as { careerId: number; title: string; count: number }[],
		topStudents: [] as {
			name: string;
			code: string;
			points: number;
			level: number;
			careers: number;
		}[]
	});

	onMount(() => {
		calculateAnalytics();
	});

	function calculateAnalytics() {
		if (!browser) return;

		let active = 0;
		let points = 0;
		let quizzes = 0;
		let achievements = 0;
		const careerCounts: Record<number, number> = {};
		const studentsList: {
			name: string;
			code: string;
			points: number;
			level: number;
			careers: number;
		}[] = [];

		students.forEach((student) => {
			try {
				const stored = localStorage.getItem('we-will-shine-progress');
				if (stored) {
					const data = JSON.parse(stored);
					if (data.studentCode === student.code) {
						active++;
						points += data.points || 0;
						if (data.quizCompleted) quizzes++;
						achievements +=
							data.achievements?.filter((a: { unlocked: boolean }) => a.unlocked).length || 0;

						// Career popularity
						if (data.exploredCareers) {
							data.exploredCareers.forEach((careerId: number) => {
								careerCounts[careerId] = (careerCounts[careerId] || 0) + 1;
							});
						}

						studentsList.push({
							name: student.name,
							code: student.code,
							points: data.points || 0,
							level: data.level || 1,
							careers: data.exploredCareers?.length || 0
						});
					}
				}
			} catch {
				// ignore
			}
		});

		// Sort top students
		studentsList.sort((a, b) => b.points - a.points);

		// Career popularity
		const careerPop = Object.entries(careerCounts).map(([id, count]) => ({
			careerId: parseInt(id),
			title: careers.find((c) => c.id === parseInt(id))?.title || 'Unknown',
			count: count as number
		}));
		careerPop.sort((a, b) => b.count - a.count);

		analyticsData = {
			totalStudents: students.length,
			activeStudents: active,
			totalPoints: points,
			avgPoints: active > 0 ? Math.round(points / active) : 0,
			totalLogins: active,
			quizCompleted: quizzes,
			achievementsUnlocked: achievements,
			careerPopularity: careerPop.slice(0, 5),
			topStudents: studentsList.slice(0, 10)
		};
	}

	function exportToCSV() {
		if (!browser) return;

		const csv = [
			['Nama', 'Kode', 'Points', 'Level', 'Karir Explored', 'Quiz', 'Status'].join(','),
			...students.map((s) => {
				const progress = getStudentProgress(s.code);
				return [
					s.name,
					s.code,
					progress?.points || 0,
					progress?.level || 0,
					progress?.exploredCareers?.length || 0,
					progress?.quizCompleted ? 'Yes' : 'No',
					progress ? 'Active' : 'Never'
				].join(',');
			})
		].join('\n');

		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `students-data-${new Date().toISOString().split('T')[0]}.csv`;
		link.click();
	}

	function getStudentProgress(code: string) {
		if (!browser) return null;
		try {
			const stored = localStorage.getItem('we-will-shine-progress');
			if (stored) {
				const data = JSON.parse(stored);
				if (data.studentCode === code) {
					return data;
				}
			}
		} catch {
			// ignore
		}
		return null;
	}
</script>

<svelte:head>
	<title>Analytics - Admin</title>
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
						<h1 class="text-2xl font-bold text-gray-800">Analytics & Reports</h1>
						<p class="text-sm text-gray-600">Statistik penggunaan aplikasi</p>
					</div>
				</div>
				<button
					onclick={exportToCSV}
					class="rounded-xl bg-green-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-green-600"
				>
					📥 Export CSV
				</button>
			</div>
		</header>

		<!-- Main Stats -->
		<div class="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-xl border border-blue-100 bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl">👥</div>
				<div class="text-3xl font-bold text-blue-600">
					{analyticsData.activeStudents}/{analyticsData.totalStudents}
				</div>
				<div class="text-sm text-gray-600">Siswa Aktif</div>
				<div class="mt-2 text-xs text-gray-500">
					{Math.round((analyticsData.activeStudents / analyticsData.totalStudents) * 100)}%
					engagement
				</div>
			</div>

			<div class="rounded-xl border border-purple-100 bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl">⭐</div>
				<div class="text-3xl font-bold text-purple-600">{analyticsData.totalPoints}</div>
				<div class="text-sm text-gray-600">Total Points</div>
				<div class="mt-2 text-xs text-gray-500">Avg: {analyticsData.avgPoints} per siswa</div>
			</div>

			<div class="rounded-xl border border-green-100 bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl">🧠</div>
				<div class="text-3xl font-bold text-green-600">{analyticsData.quizCompleted}</div>
				<div class="text-sm text-gray-600">Quiz Completed</div>
				<div class="mt-2 text-xs text-gray-500">
					{analyticsData.activeStudents > 0
						? Math.round((analyticsData.quizCompleted / analyticsData.activeStudents) * 100)
						: 0}% completion
				</div>
			</div>

			<div class="rounded-xl border border-yellow-100 bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl">🏆</div>
				<div class="text-3xl font-bold text-yellow-600">{analyticsData.achievementsUnlocked}</div>
				<div class="text-sm text-gray-600">Achievements</div>
				<div class="mt-2 text-xs text-gray-500">Total unlocked</div>
			</div>
		</div>

		<!-- Career Popularity -->
		{#if analyticsData.careerPopularity.length > 0}
			<div class="mb-6 rounded-2xl border border-purple-100 bg-white p-6 shadow-md">
				<h3 class="mb-4 text-lg font-bold text-gray-800">🎯 Karir Paling Populer</h3>
				<div class="space-y-3">
					{#each analyticsData.careerPopularity as career, idx (career.careerId)}
						<div class="flex items-center gap-3">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600"
							>
								{idx + 1}
							</div>
							<div class="flex-1">
								<div class="mb-1 flex items-center justify-between">
									<span class="text-sm font-semibold text-gray-800">{career.title}</span>
									<span class="text-sm font-bold text-purple-600">{career.count} views</span>
								</div>
								<div class="h-2 overflow-hidden rounded-full bg-gray-100">
									<div
										class="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
										style="width: {(career.count / analyticsData.activeStudents) * 100}%"
									></div>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Top Students -->
		{#if analyticsData.topStudents.length > 0}
			<div class="rounded-2xl border border-purple-100 bg-white p-6 shadow-md">
				<h3 class="mb-4 text-lg font-bold text-gray-800">🏆 Top Students</h3>
				<div class="space-y-2">
					{#each analyticsData.topStudents as student, idx (student.code)}
						<div
							class="flex items-center gap-3 rounded-lg border border-purple-100 bg-purple-50/30 p-3"
						>
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full {idx ===
								0
									? 'bg-yellow-100 text-yellow-700'
									: idx === 1
										? 'bg-gray-200 text-gray-700'
										: idx === 2
											? 'bg-orange-100 text-orange-700'
											: 'bg-purple-100 text-purple-600'} text-sm font-bold"
							>
								{idx + 1}
							</div>
							<div class="flex-1">
								<div class="text-sm font-semibold text-gray-800">{student.name}</div>
								<div class="text-xs text-gray-500">{student.code}</div>
							</div>
							<div class="text-right">
								<div class="text-sm font-bold text-purple-600">{student.points} pts</div>
								<div class="text-xs text-gray-500">Lv.{student.level}</div>
							</div>
						</div>
					{/each}
				</div>
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
