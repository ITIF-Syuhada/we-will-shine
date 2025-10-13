<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { students } from '$lib/data/students';

	let isAuthenticated = $state(false);

	onMount(() => {
		if (browser) {
			const authStatus = localStorage.getItem('admin-auth');
			if (authStatus !== 'true') {
				goto(`${base}/admin`);
			} else {
				isAuthenticated = true;
			}
		}
	});

	function handleLogout() {
		if (browser) {
			localStorage.removeItem('admin-auth');
		}
		goto(`${base}/admin`);
	}

	// Get analytics from localStorage (aggregate all students data)
	let totalStudentsLoggedIn = $state(0);
	let totalPoints = $state(0);
	let totalCareersExplored = $state(0);
	let totalQuizCompleted = $state(0);

	onMount(() => {
		if (browser) {
			// This is a simple approach - in production, use Supabase
			let loggedIn = 0;
			let points = 0;
			let careers = 0;
			let quizzes = 0;

			students.forEach((student) => {
				const key = `we-will-shine-progress`;
				const stored = localStorage.getItem(key);
				if (stored) {
					try {
						const data = JSON.parse(stored);
						if (data.studentCode === student.code) {
							loggedIn++;
							points += data.points || 0;
							careers += (data.exploredCareers || []).length;
							if (data.quizCompleted) quizzes++;
						}
					} catch {
						// ignore
					}
				}
			});

			totalStudentsLoggedIn = loggedIn;
			totalPoints = points;
			totalCareersExplored = careers;
			totalQuizCompleted = quizzes;
		}
	});
</script>

<svelte:head>
	<title>Admin Dashboard - We Will Shine</title>
</svelte:head>

{#if isAuthenticated}
	<div class="min-h-screen bg-gray-50 p-4">
		<!-- Header -->
		<header class="mb-6 rounded-2xl border border-purple-200 bg-white p-6 shadow-lg">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="rounded-full bg-gradient-to-br from-purple-200 to-pink-200 p-3">
						<span class="text-3xl">🎓</span>
					</div>
					<div>
						<h1 class="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
						<p class="text-sm text-gray-600">We Will Shine - Career Quest</p>
					</div>
				</div>
				<button
					onclick={handleLogout}
					class="rounded-xl border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
				>
					🚪 Logout
				</button>
			</div>
		</header>

		<!-- Quick Stats -->
		<div class="mb-6 grid gap-4 md:grid-cols-4">
			<div class="rounded-xl border border-purple-100 bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl">👥</div>
				<div class="text-3xl font-bold text-purple-600">{totalStudentsLoggedIn}</div>
				<div class="text-sm text-gray-600">Siswa Login</div>
			</div>
			<div class="rounded-xl border border-blue-100 bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl">⭐</div>
				<div class="text-3xl font-bold text-blue-600">{totalPoints}</div>
				<div class="text-sm text-gray-600">Total Points</div>
			</div>
			<div class="rounded-xl border border-green-100 bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl">🎯</div>
				<div class="text-3xl font-bold text-green-600">{totalCareersExplored}</div>
				<div class="text-sm text-gray-600">Karir Explored</div>
			</div>
			<div class="rounded-xl border border-yellow-100 bg-white p-6 shadow-md">
				<div class="mb-2 text-3xl">🧠</div>
				<div class="text-3xl font-bold text-yellow-600">{totalQuizCompleted}</div>
				<div class="text-sm text-gray-600">Quiz Completed</div>
			</div>
		</div>

		<!-- Navigation Cards -->
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			<a
				href="{base}/admin/students"
				class="group rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-md transition-all hover:scale-105 hover:shadow-xl"
			>
				<div class="mb-4 text-5xl transition-transform group-hover:scale-110">👥</div>
				<h3 class="mb-2 text-lg font-bold text-gray-800">Manage Students</h3>
				<p class="text-sm text-gray-600">Lihat daftar siswa & progress mereka</p>
			</a>

			<a
				href="{base}/admin/analytics"
				class="group rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-md transition-all hover:scale-105 hover:shadow-xl"
			>
				<div class="mb-4 text-5xl transition-transform group-hover:scale-110">📊</div>
				<h3 class="mb-2 text-lg font-bold text-gray-800">Analytics</h3>
				<p class="text-sm text-gray-600">Lihat statistik penggunaan aplikasi</p>
			</a>

			<a
				href="{base}/admin/qr-generator"
				class="group rounded-2xl border-2 border-green-200 bg-white p-6 shadow-md transition-all hover:scale-105 hover:shadow-xl"
			>
				<div class="mb-4 text-5xl transition-transform group-hover:scale-110">📱</div>
				<h3 class="mb-2 text-lg font-bold text-gray-800">QR Generator</h3>
				<p class="text-sm text-gray-600">Generate QR codes untuk sticker coklat</p>
			</a>
		</div>

		<!-- Info Section -->
		<div
			class="mt-6 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-6"
		>
			<h3 class="mb-2 text-lg font-bold text-purple-600">ℹ️ Informasi</h3>
			<ul class="space-y-2 text-sm text-gray-700">
				<li>✅ Total Siswa Terdaftar: <strong>{students.length} siswa</strong></li>
				<li>✅ Kelas yang Didukung: <strong>Semua kelas SMP IT Masjid Syuhada</strong></li>
				<li>✅ Fitur: 8 Karir, Quiz, AI Mentor, Dream Board, Achievements</li>
			</ul>
		</div>
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<div class="mb-4 text-6xl">⏳</div>
			<p class="text-gray-600">Loading...</p>
		</div>
	</div>
{/if}
