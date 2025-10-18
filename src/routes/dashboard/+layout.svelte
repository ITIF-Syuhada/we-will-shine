<script lang="ts">
	import { adminStore } from '$lib/stores/admin';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Check authentication on mount
	onMount(() => {
		// Redirect to login if not authenticated
		if (!$adminStore) {
			goto(`${base}/login`);
		}
	});

	function handleLogout() {
		if (confirm('Yakin ingin logout?')) {
			adminStore.logout();
			goto(`${base}/login`);
		}
	}
</script>

<!-- Admin pages with header (login page is now separate) -->
<div class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
	<!-- Admin Header -->
	<header class="border-b-2 border-purple-200 bg-white shadow-md">
		<div class="mx-auto max-w-7xl px-4 py-4">
			<div class="flex items-center justify-between">
				<!-- Left: Logo + Title -->
				<a href="{base}/dashboard" class="flex items-center gap-3 transition-all hover:scale-105">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-2xl"
					>
						🌟
					</div>
					<div>
						<h1 class="text-xl font-bold text-gray-800">Admin Portal</h1>
						<p class="text-xs text-gray-600">We Will Shine</p>
					</div>
				</a>

				<!-- Right: Admin Info + Logout -->
				<div class="flex items-center gap-3">
					<div class="rounded-lg bg-purple-100 px-3 py-2">
						<p class="text-xs text-purple-600">
							<span class="font-bold">{$adminStore?.name || 'Admin'}</span>
							<span class="mx-1">•</span>
							<span class="capitalize">{$adminStore?.role || 'admin'}</span>
						</p>
					</div>
					<button
						onclick={handleLogout}
						class="rounded-lg border-2 border-gray-300 bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-200 active:scale-95"
					>
						🚪 Logout
					</button>
				</div>
			</div>

			<!-- Navigation -->
			<nav class="mt-4 flex gap-2 overflow-x-auto pb-2">
				<a
					href="{base}/dashboard"
					class="rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all {$page
						.url.pathname === `${base}/dashboard` || $page.url.pathname === `${base}/dashboard/`
						? 'bg-purple-500 text-white shadow-md'
						: 'bg-white text-gray-700 hover:bg-purple-50'}"
				>
					🏠 Dashboard
				</a>
				<a
					href="{base}/dashboard/overview"
					class="rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all {$page.url.pathname.includes(
						'/overview'
					)
						? 'bg-purple-500 text-white shadow-md'
						: 'bg-white text-gray-700 hover:bg-purple-50'}"
				>
					📊 Overview
				</a>
				<a
					href="{base}/dashboard/analytics"
					class="rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all {$page.url.pathname.includes(
						'/analytics'
					)
						? 'bg-purple-500 text-white shadow-md'
						: 'bg-white text-gray-700 hover:bg-purple-50'}"
				>
					📈 Analytics
				</a>
				<a
					href="{base}/dashboard/students"
					class="rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all {$page.url.pathname.includes(
						'/students'
					)
						? 'bg-purple-500 text-white shadow-md'
						: 'bg-white text-gray-700 hover:bg-purple-50'}"
				>
					👥 Students
				</a>
				<a
					href="{base}/dashboard/settings"
					class="rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all {$page.url.pathname.includes(
						'/settings'
					)
						? 'bg-purple-500 text-white shadow-md'
						: 'bg-white text-gray-700 hover:bg-purple-50'}"
				>
					⚙️ Settings
				</a>
				<a
					href="{base}/dashboard/qr-generator"
					class="rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all {$page.url.pathname.includes(
						'/qr-generator'
					)
						? 'bg-purple-500 text-white shadow-md'
						: 'bg-white text-gray-700 hover:bg-purple-50'}"
				>
					📱 QR Generator
				</a>
			</nav>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-6">
		{@render children()}
	</main>
</div>
