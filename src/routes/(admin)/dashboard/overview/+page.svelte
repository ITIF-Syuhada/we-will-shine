<script lang="ts">
	import { db } from '$lib/supabase';
	import type { Student } from '$lib/supabase';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	let students = $state<Student[]>([]);
	let loading = $state(true);

	// Stats
	const totalStudents = $derived(students.length);
	const activeStudents = $derived(students.filter((s) => s.points > 0).length);
	const totalPoints = $derived(students.reduce((sum, s) => sum + s.points, 0));
	const avgPoints = $derived(activeStudents > 0 ? Math.round(totalPoints / activeStudents) : 0);

	// Top students by points
	const topStudents = $derived([...students].sort((a, b) => b.points - a.points).slice(0, 10));

	// Recent students (last 10 created)
	const recentStudents = $derived(
		[...students]
			.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
			.slice(0, 10)
	);

	// Level distribution
	const levelDistribution = $derived(() => {
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const dist = new Map<number, number>();
		students.forEach((s) => {
			dist.set(s.level, (dist.get(s.level) || 0) + 1);
		});
		return Array.from(dist.entries())
			.sort((a, b) => a[0] - b[0])
			.map(([level, count]) => ({ level, count }));
	});

	// Points distribution (grouped)
	const pointsDistribution = $derived(() => {
		const ranges = [
			{ label: '0', min: 0, max: 0 },
			{ label: '1-50', min: 1, max: 50 },
			{ label: '51-100', min: 51, max: 100 },
			{ label: '101-200', min: 101, max: 200 },
			{ label: '201+', min: 201, max: Infinity }
		];

		return ranges.map((range) => ({
			label: range.label,
			count: students.filter((s) => s.points >= range.min && s.points <= range.max).length
		}));
	});

	onMount(async () => {
		try {
			const data = await db.getAllStudents();
			students = data;
		} catch (error) {
			console.error('Failed to load students:', error);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Student Overview - Admin</title>
</svelte:head>

<div class="space-y-6 pb-6">
	<!-- Page Header -->
	<div
		class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-lg"
	>
		<h1 class="text-2xl font-bold text-purple-800">📊 Dashboard Overview</h1>
		<p class="text-sm text-purple-600">Monitor student progress, engagement, and statistics</p>
	</div>

	{#if loading}
		<!-- Loading State -->
		<div class="grid gap-6 sm:grid-cols-4">
			{#each Array.from({ length: 4 }, (_, i) => i) as idx (idx)}
				<div class="animate-pulse rounded-2xl border-2 border-gray-200 bg-white p-6">
					<div class="mb-2 h-4 w-1/2 rounded bg-gray-300"></div>
					<div class="h-8 w-3/4 rounded bg-gray-300"></div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Stats Cards -->
		<div class="grid gap-4 md:grid-cols-4">
			<!-- Total Students -->
			<div class="rounded-xl border-2 border-purple-200 bg-white p-4 shadow-md">
				<div class="mb-2 text-3xl">👥</div>
				<div class="text-sm text-gray-600">Total Students</div>
				<div class="text-2xl font-bold text-purple-600">{totalStudents}</div>
			</div>

			<!-- Active Students -->
			<div class="rounded-xl border-2 border-green-200 bg-white p-4 shadow-md">
				<div class="mb-2 text-3xl">✨</div>
				<div class="text-sm text-gray-600">Active Students</div>
				<div class="text-2xl font-bold text-green-600">{activeStudents}</div>
			</div>

			<!-- Total Points -->
			<div class="rounded-xl border-2 border-yellow-200 bg-white p-4 shadow-md">
				<div class="mb-2 text-3xl">⭐</div>
				<div class="text-sm text-gray-600">Total Points</div>
				<div class="text-2xl font-bold text-yellow-600">{totalPoints.toLocaleString()}</div>
			</div>

			<!-- Average Points -->
			<div class="rounded-xl border-2 border-blue-200 bg-white p-4 shadow-md">
				<div class="mb-2 text-3xl">📊</div>
				<div class="text-sm text-gray-600">Avg Points</div>
				<div class="text-2xl font-bold text-blue-600">{avgPoints}</div>
			</div>
		</div>

		<!-- Charts Grid -->
		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Level Distribution Chart -->
			<div class="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
				<h3 class="mb-4 text-lg font-bold text-gray-800">📈 Level Distribution</h3>
				<div class="space-y-3">
					{#each levelDistribution() as { level, count } (level)}
						{@const maxCount = Math.max(...levelDistribution().map((d) => d.count), 1)}
						{@const percentage = (count / maxCount) * 100}
						<div>
							<div class="mb-1 flex items-center justify-between text-sm">
								<span class="font-semibold text-purple-700">Level {level}</span>
								<span class="text-gray-600">{count} siswa</span>
							</div>
							<div class="h-8 w-full overflow-hidden rounded-lg bg-purple-100">
								<div
									class="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
									style="width: {percentage}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Points Distribution Chart -->
			<div class="rounded-2xl border-2 border-yellow-200 bg-white p-6 shadow-lg">
				<h3 class="mb-4 text-lg font-bold text-gray-800">💰 Points Distribution</h3>
				<div class="space-y-3">
					{#each pointsDistribution() as { label, count } (label)}
						{@const maxCount = Math.max(...pointsDistribution().map((d) => d.count), 1)}
						{@const percentage = (count / maxCount) * 100}
						<div>
							<div class="mb-1 flex items-center justify-between text-sm">
								<span class="font-semibold text-yellow-700">{label} points</span>
								<span class="text-gray-600">{count} siswa</span>
							</div>
							<div class="h-8 w-full overflow-hidden rounded-lg bg-yellow-100">
								<div
									class="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500"
									style="width: {percentage}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Top Students & Recent Activity -->
		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Top 10 Students -->
			<div class="rounded-2xl border-2 border-green-200 bg-white shadow-lg">
				<div class="border-b-2 border-green-100 p-4">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-bold text-gray-800">🏆 Top 10 Students</h3>
						<a
							href="{base}/dashboard/students"
							class="text-xs font-semibold text-green-600 hover:text-green-700"
						>
							View All →
						</a>
					</div>
				</div>
				<div class="divide-y divide-green-50">
					{#each topStudents as student, index (student.id)}
						<div class="flex items-center gap-3 p-4 transition-colors hover:bg-green-50">
							<div
								class="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold {index <
								3
									? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white'
									: 'bg-gray-200 text-gray-600'}"
							>
								{index + 1}
							</div>
							<div class="flex-1">
								<div class="text-sm font-semibold text-gray-800">{student.student_name}</div>
								<div class="text-xs text-gray-500">{student.student_code}</div>
							</div>
							<div class="text-right">
								<div class="text-sm font-bold text-yellow-600">{student.points} pts</div>
								<div class="text-xs text-purple-600">Lv.{student.level}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Recent Students -->
			<div class="rounded-2xl border-2 border-blue-200 bg-white shadow-lg">
				<div class="border-b-2 border-blue-100 p-4">
					<div class="flex items-center justify-between">
						<h3 class="text-lg font-bold text-gray-800">🆕 Recent Students</h3>
						<a
							href="{base}/dashboard/students"
							class="text-xs font-semibold text-blue-600 hover:text-blue-700"
						>
							View All →
						</a>
					</div>
				</div>
				<div class="divide-y divide-blue-50">
					{#each recentStudents as student (student.id)}
						<div class="flex items-center gap-3 p-4 transition-colors hover:bg-blue-50">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg"
							>
								👤
							</div>
							<div class="flex-1">
								<div class="text-sm font-semibold text-gray-800">{student.student_name}</div>
								<div class="text-xs text-gray-500">
									Joined {new Date(student.created_at).toLocaleDateString('id-ID', {
										day: 'numeric',
										month: 'short',
										year: 'numeric'
									})}
								</div>
							</div>
							<div class="text-right">
								<div class="text-xs text-gray-600">
									{student.kelas || '-'}
									{student.rombel || ''}
								</div>
								<div class="text-xs text-purple-600">Lv.{student.level}</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Quick Actions -->
		<div
			class="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 shadow-lg"
		>
			<h3 class="mb-4 text-lg font-bold text-indigo-800">⚡ Quick Actions</h3>
			<div class="flex flex-wrap gap-3">
				<a
					href="{base}/dashboard/students"
					class="rounded-xl border-2 border-purple-200 bg-white px-4 py-2 text-sm font-semibold text-purple-700 transition-all hover:bg-purple-50 active:scale-95"
				>
					📚 Manage Students
				</a>
				<a
					href="{base}/dashboard/qr-generator"
					class="rounded-xl border-2 border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 transition-all hover:bg-blue-50 active:scale-95"
				>
					🎫 Generate QR Codes
				</a>
				<a
					href="{base}/dashboard/analytics"
					class="rounded-xl border-2 border-green-200 bg-white px-4 py-2 text-sm font-semibold text-green-700 transition-all hover:bg-green-50 active:scale-95"
				>
					📊 View Analytics
				</a>
				<a
					href="{base}/dashboard/settings"
					class="rounded-xl border-2 border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-700 transition-all hover:bg-orange-50 active:scale-95"
				>
					⚙️ Settings
				</a>
			</div>
		</div>
	{/if}
</div>
