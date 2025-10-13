<script lang="ts">
	import { adminStore } from '$lib/stores/admin';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	onMount(() => {
		// Check if admin is logged in
		if (!$adminStore) {
			goto(`${base}/admin/login`);
			return;
		}
	});

	function handleLogout() {
		if (confirm('Yakin ingin logout?')) {
			adminStore.logout();
			goto(`${base}/admin/login`);
		}
	}
</script>

<svelte:head>
	<title>Admin Dashboard - We Will Shine</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
	<!-- Header -->
	<header class="border-b-2 border-purple-200 bg-white shadow-md">
		<div class="mx-auto max-w-7xl px-4 py-4">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-2xl"
					>
						🌟
					</div>
					<div>
						<h1 class="text-xl font-bold text-gray-800">Admin Dashboard</h1>
						<p class="text-xs text-gray-600">Welcome, {$adminStore?.name || 'Admin'}</p>
					</div>
				</div>

				<button
					onclick={handleLogout}
					class="rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200 active:scale-95"
				>
					🚪 Logout
				</button>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-6">
		<!-- Welcome Card -->
		<div
			class="mb-6 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-8 shadow-lg"
		>
			<h2 class="mb-2 text-3xl font-bold text-purple-800">Welcome to Admin Portal! 👋</h2>
			<p class="text-purple-600">
				Role: <span class="font-bold capitalize">{$adminStore?.role || 'Admin'}</span>
			</p>
		</div>

		<!-- Quick Actions Grid -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<!-- Overview -->
			<a
				href="{base}/admin/overview"
				class="group rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
			>
				<div class="mb-4 flex items-center justify-between">
					<div class="rounded-full bg-blue-100 p-4 transition-transform group-hover:scale-110">
						<span class="text-3xl">📊</span>
					</div>
					<span class="text-sm text-blue-600">→</span>
				</div>
				<h3 class="mb-2 text-xl font-bold text-blue-800">Overview</h3>
				<p class="text-sm text-gray-600">Student list & statistics</p>
			</a>

			<!-- Analytics -->
			<a
				href="{base}/admin/analytics"
				class="group rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
			>
				<div class="mb-4 flex items-center justify-between">
					<div class="rounded-full bg-purple-100 p-4 transition-transform group-hover:scale-110">
						<span class="text-3xl">📈</span>
					</div>
					<span class="text-sm text-purple-600">→</span>
				</div>
				<h3 class="mb-2 text-xl font-bold text-purple-800">Analytics</h3>
				<p class="text-sm text-gray-600">Platform insights & metrics</p>
			</a>

			<!-- Students -->
			<a
				href="{base}/admin/students"
				class="group rounded-2xl border-2 border-green-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
			>
				<div class="mb-4 flex items-center justify-between">
					<div class="rounded-full bg-green-100 p-4 transition-transform group-hover:scale-110">
						<span class="text-3xl">👥</span>
					</div>
					<span class="text-sm text-green-600">→</span>
				</div>
				<h3 class="mb-2 text-xl font-bold text-green-800">Students</h3>
				<p class="text-sm text-gray-600">Manage student accounts</p>
			</a>

			<!-- Settings -->
			<a
				href="{base}/admin/settings"
				class="group rounded-2xl border-2 border-yellow-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
			>
				<div class="mb-4 flex items-center justify-between">
					<div class="rounded-full bg-yellow-100 p-4 transition-transform group-hover:scale-110">
						<span class="text-3xl">⚙️</span>
					</div>
					<span class="text-sm text-yellow-600">→</span>
				</div>
				<h3 class="mb-2 text-xl font-bold text-yellow-800">Settings</h3>
				<p class="text-sm text-gray-600">AI API & app configuration</p>
			</a>

			<!-- QR Generator -->
			<a
				href="{base}/admin/qr-generator"
				class="group rounded-2xl border-2 border-pink-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
			>
				<div class="mb-4 flex items-center justify-between">
					<div class="rounded-full bg-pink-100 p-4 transition-transform group-hover:scale-110">
						<span class="text-3xl">📱</span>
					</div>
					<span class="text-sm text-pink-600">→</span>
				</div>
				<h3 class="mb-2 text-xl font-bold text-pink-800">QR Generator</h3>
				<p class="text-sm text-gray-600">Generate student access codes</p>
			</a>

			<!-- Auth Management -->
			<a
				href="{base}/admin/auth"
				class="group rounded-2xl border-2 border-red-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
			>
				<div class="mb-4 flex items-center justify-between">
					<div class="rounded-full bg-red-100 p-4 transition-transform group-hover:scale-110">
						<span class="text-3xl">🔐</span>
					</div>
					<span class="text-sm text-red-600">→</span>
				</div>
				<h3 class="mb-2 text-xl font-bold text-red-800">Auth Management</h3>
				<p class="text-sm text-gray-600">Manage admin accounts</p>
			</a>
		</div>

		<!-- Quick Stats -->
		<div class="mt-6 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg">
			<h3 class="mb-4 text-lg font-bold text-gray-800">📌 Quick Info</h3>
			<div class="space-y-2 text-sm text-gray-600">
				<p>✅ Database migrations applied</p>
				<p>✅ Admin authentication working</p>
				<p>✅ Student portal active</p>
				<p>✅ AI Mentor ready</p>
			</div>
		</div>
	</main>
</div>
