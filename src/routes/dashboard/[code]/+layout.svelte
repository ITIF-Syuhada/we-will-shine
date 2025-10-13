<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { userProgress, levelProgress } from '$lib/stores/user';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Check if user is logged in
	onMount(() => {
		if (!$userProgress) {
			goto(`${base}/unlock`);
			return;
		}

		// Check if code matches
		const code = $page.params.code;
		if ($userProgress.studentCode !== code) {
			goto(`${base}/unlock`);
		}
	});

	const navItems = [
		{ path: '', label: 'Home', icon: '🏠' },
		{ path: '/careers', label: 'Karir', icon: '🎯' },
		{ path: '/ai-mentor', label: 'AI', icon: '🤖' },
		{ path: '/quiz', label: 'Quiz', icon: '🧠' },
		{ path: '/achievements', label: 'Trophy', icon: '🏆' }
	];

	function isActive(path: string): boolean {
		const basePath = `${base}/dashboard/${$page.params.code}`;
		const fullPath = path ? `${basePath}${path}` : basePath;
		return $page.url.pathname === fullPath;
	}

	function handleLogout() {
		if (confirm('Yakin ingin keluar? Progress kamu akan tetap tersimpan.')) {
			userProgress.logout();
			goto(`${base}/`);
		}
	}

	const firstName = $derived($userProgress?.studentName.split(' ')[0] || '');
	const points = $derived($userProgress?.points || 0);
	const level = $derived($userProgress?.level || 1);
	const progress = $derived($levelProgress * 100);
</script>

<div class="min-h-screen pb-20">
	<!-- Compact Header -->
	<header
		class="sticky top-0 z-50 border-b border-purple-100 bg-white/95 shadow-sm backdrop-blur-md"
	>
		<div class="mx-auto max-w-7xl px-4 py-3">
			<div class="flex items-center justify-between">
				<!-- Greeting -->
				<div class="flex items-center space-x-2">
					<div class="rounded-full bg-gradient-to-br from-purple-200 to-pink-200 p-2">
						<span class="text-xl">🌟</span>
					</div>
					<div>
						<h1 class="text-sm font-bold text-gray-800">{firstName}</h1>
						<p class="text-xs text-gray-500">Level {level}</p>
					</div>
				</div>

				<!-- Stats -->
				<div class="flex items-center space-x-2">
					<!-- Level Progress Bar (Desktop) -->
					<div
						class="hidden items-center space-x-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 md:flex"
					>
						<div class="h-2 w-20 overflow-hidden rounded-full bg-purple-200">
							<div
								class="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500"
								style="width: {progress}%"
							></div>
						</div>
					</div>

					<!-- Points -->
					<div
						class="flex items-center space-x-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-3 py-1.5"
					>
						<span class="text-sm">⭐</span>
						<span class="text-sm font-bold text-yellow-700">{points}</span>
					</div>

					<!-- Logout -->
					<button
						onclick={handleLogout}
						class="rounded-full border border-gray-200 bg-gray-50 p-1.5 transition-all hover:bg-gray-100"
						title="Keluar"
					>
						<span class="text-sm">🚪</span>
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-4">
		{@render children()}
	</main>

	<!-- Bottom Navigation (Mobile-Friendly) -->
	<nav
		class="fixed right-0 bottom-0 left-0 z-50 border-t border-purple-100 bg-white/95 shadow-2xl backdrop-blur-md"
	>
		<div class="mx-auto grid max-w-md grid-cols-5 gap-1 px-2 py-2">
			{#each navItems as item (item.path)}
				{@const active = isActive(item.path)}
				<a
					href="{base}/dashboard/{$page.params.code}{item.path}"
					class="group flex flex-col items-center justify-center space-y-1 rounded-xl px-2 py-2.5 transition-all {active
						? 'bg-gradient-to-br from-purple-100 to-pink-100'
						: 'hover:bg-purple-50'}"
				>
					<span
						class="text-2xl transition-transform group-hover:scale-110 {active ? '' : 'opacity-60'}"
					>
						{item.icon}
					</span>
					<span class="text-xs font-semibold {active ? 'text-purple-600' : 'text-gray-500'}">
						{item.label}
					</span>
				</a>
			{/each}
		</div>
	</nav>

	<!-- Floating Background Decorations (subtle) -->
	<div class="pointer-events-none fixed inset-0 overflow-hidden">
		<div
			class="animate-blob absolute top-20 -left-20 h-64 w-64 rounded-full bg-purple-200 opacity-10 mix-blend-multiply blur-3xl"
		></div>
		<div
			class="animation-delay-2000 animate-blob absolute top-40 right-20 h-64 w-64 rounded-full bg-pink-200 opacity-10 mix-blend-multiply blur-3xl"
		></div>
		<div
			class="animation-delay-4000 animate-blob absolute bottom-20 left-1/3 h-64 w-64 rounded-full bg-blue-200 opacity-10 mix-blend-multiply blur-3xl"
		></div>
	</div>
</div>

<style>
	@keyframes blob {
		0%,
		100% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
	}

	.animate-blob {
		animation: blob 20s infinite;
	}

	.animation-delay-2000 {
		animation-delay: 2s;
	}

	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>
