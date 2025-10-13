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
		{ path: '/ai-mentor', label: 'AI Mentor', icon: '🤖' },
		{ path: '/dreams', label: 'Dreams', icon: '✨' },
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

<div class="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300">
	<!-- Header -->
	<header
		class="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
	>
		<div class="mx-auto max-w-7xl px-4 py-3">
			<div class="flex items-center justify-between">
				<!-- Logo & Name -->
				<div class="flex items-center space-x-3">
					<span class="animate-pulse text-3xl">🌟</span>
					<div>
						<h1 class="text-lg font-bold">Halo, {firstName}!</h1>
						<p class="text-xs opacity-90">Dream Explorer</p>
					</div>
				</div>

				<!-- Stats & Logout -->
				<div class="flex items-center space-x-3">
					<!-- Level Progress -->
					<div
						class="hidden items-center space-x-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm md:flex"
					>
						<span class="text-sm font-semibold">Level {level}</span>
						<div class="h-2 w-24 overflow-hidden rounded-full bg-white/30">
							<div
								class="h-full bg-yellow-400 transition-all duration-500"
								style="width: {progress}%"
							></div>
						</div>
					</div>

					<!-- Points -->
					<div
						class="flex items-center space-x-1 rounded-full bg-yellow-400 px-3 py-2 text-yellow-900"
					>
						<span class="text-sm font-bold">⭐</span>
						<span class="text-sm font-bold">{points}</span>
					</div>

					<!-- Logout Button -->
					<button
						onclick={handleLogout}
						class="rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:bg-white/30"
						title="Keluar"
					>
						<span class="text-sm">🚪</span>
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Navigation -->
	<nav class="sticky top-[72px] z-40 bg-white/90 shadow-md backdrop-blur-sm">
		<div class="mx-auto max-w-7xl px-2">
			<div class="flex justify-center space-x-1 overflow-x-auto py-3">
				{#each navItems as item (item.path)}
					{@const active = isActive(item.path)}
					<a
						href="{base}/dashboard/{$page.params.code}{item.path}"
						class="flex flex-shrink-0 items-center space-x-2 rounded-full px-4 py-2 text-sm font-semibold transition-all {active
							? 'bg-purple-100 text-purple-600'
							: 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'}"
					>
						<span>{item.icon}</span>
						<span class="hidden sm:inline">{item.label}</span>
					</a>
				{/each}
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-6 pb-20">
		{@render children()}
	</main>
</div>
