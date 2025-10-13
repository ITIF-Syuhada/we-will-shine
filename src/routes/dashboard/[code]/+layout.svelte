<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { userProgress } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

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
		const currentPath = $page.url.pathname;
		const basePath = `${base}/dashboard/${$page.params.code}`;

		if (path === '') {
			// Home is active only if exact match
			return currentPath === basePath || currentPath === `${basePath}/`;
		} else {
			// Other paths are active if they start with the path
			return currentPath.startsWith(`${basePath}${path}`);
		}
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

	// Check if current page is AI Mentor (hide header completely)
	const isAIMentorPage = $derived($page.url.pathname.includes('/ai-mentor'));

	// Dynamic page title based on route
	const pageInfo = $derived.by(() => {
		const currentPath = $page.url.pathname;
		const basePath = `${base}/dashboard/${$page.params.code}`;

		if (currentPath.startsWith(`${basePath}/careers`)) {
			return { icon: '🎯', title: 'Jelajah Karir Teknologi', desc: 'Explore 8 profesi tech!' };
		} else if (currentPath.startsWith(`${basePath}/ai-mentor`)) {
			return { icon: '🤖', title: 'AI Mentor Kamu', desc: 'Tanya tentang karir!' };
		} else if (currentPath.startsWith(`${basePath}/quiz`)) {
			return { icon: '🧠', title: 'Kenali Dirimu', desc: 'Quiz kepribadian!' };
		} else if (currentPath.startsWith(`${basePath}/achievements`)) {
			return { icon: '🏆', title: 'Pencapaian & Trophy', desc: 'Kumpulkan trophy!' };
		} else if (currentPath.startsWith(`${basePath}/dreams`)) {
			return { icon: '✨', title: 'Dream Board', desc: 'Tuliskan impianmu!' };
		}
		return null; // Home page - no dynamic title
	});
</script>

<div class="min-h-screen pb-20">
	<!-- Super Compact Header - Hidden on AI Mentor page -->
	{#if !isAIMentorPage}
		<header
			transition:slide={{ duration: 300, axis: 'y' }}
			class="sticky top-0 z-50 border-b-2 border-purple-100/50 bg-gradient-to-r from-white via-purple-50/30 to-pink-50/30 shadow-sm backdrop-blur-md"
		>
			<div class="mx-auto max-w-7xl px-3 py-2">
				<div class="flex items-center justify-between gap-2">
					<!-- Left: Name + Level + Page Title (with soft separator) -->
					<div class="flex min-w-0 flex-1 items-center gap-2">
						<!-- Name + Level - Compact Card -->
						<div class="flex items-center gap-1 rounded-lg bg-white/60 px-1.5 py-1 shadow-sm">
							<div class="min-w-0">
								<div class="truncate text-[18px] leading-tight font-bold text-gray-800">
									{firstName}
								</div>
								<div class="text-[8px] leading-tight font-semibold text-purple-600">Lv.{level}</div>
							</div>
						</div>

						<!-- Soft Separator + Page Title (if not home) -->
						{#if pageInfo}
							<!-- Separator: Soft dots -->
							<div class="flex items-center gap-0.5 opacity-40">
								<div class="h-1 w-1 rounded-full bg-purple-300"></div>
								<div class="h-1 w-1 rounded-full bg-pink-300"></div>
								<div class="h-1 w-1 rounded-full bg-purple-300"></div>
							</div>

							<!-- Page Title - Always Visible -->
							<div class="flex min-w-0 flex-1 items-center gap-1.5">
								<div class="rounded-lg bg-white/60 p-1 shadow-sm">
									<span class="text-sm">{pageInfo.icon}</span>
								</div>
								<div class="min-w-0 flex-1">
									<div class="truncate text-[10px] leading-tight font-bold text-gray-800">
										{pageInfo.title}
									</div>
									<div class="truncate text-[8px] leading-tight text-gray-600">{pageInfo.desc}</div>
								</div>
							</div>
						{/if}
					</div>

					<!-- Right: Points + Logout -->
					<div class="flex flex-shrink-0 items-center gap-1.5">
						<!-- Points - Soft Card -->
						<div
							class="flex items-center gap-1 rounded-lg border border-yellow-200/50 bg-gradient-to-r from-yellow-50 to-orange-50/50 px-2 py-1 shadow-sm"
						>
							<span class="text-xs">⭐</span>
							<span class="text-[11px] font-bold text-yellow-700">{points}</span>
						</div>

						<!-- Logout - With Text -->
						<button
							onclick={handleLogout}
							class="flex items-center gap-1 rounded-lg border border-gray-200/50 bg-gray-50/50 px-2 py-1 transition-all hover:bg-gray-100 active:scale-95"
							title="Keluar"
						>
							<span class="text-[10px]">🚪</span>
							<span class="text-[9px] font-semibold text-gray-700">Logout</span>
						</button>
					</div>
				</div>
			</div>
		</header>
	{/if}

	<!-- Main Content -->
	<main class="mx-auto max-w-7xl px-4 py-4">
		{@render children()}
	</main>

	<!-- Bottom Navigation - Rounded top only -->
	<nav class="fixed right-0 bottom-0 left-0 z-50 flex justify-center">
		<div
			class="w-full rounded-t-2xl border-2 border-b-0 border-purple-200/50 bg-white/95 shadow-2xl backdrop-blur-md sm:w-auto sm:max-w-2xl"
		>
			<div class="mx-auto grid grid-cols-5 gap-1 px-2 py-2 sm:gap-2 sm:px-4">
				{#each navItems as item (item.path)}
					{@const active = isActive(item.path)}
					<a
						href="{base}/dashboard/{$page.params.code}{item.path}"
						class="group flex flex-col items-center justify-center space-y-0.5 rounded-xl px-3 py-2 transition-all {active
							? 'bg-gradient-to-br from-purple-100 to-pink-100 shadow-sm'
							: 'hover:bg-purple-50'}"
					>
						<span
							class="text-xl transition-transform group-hover:scale-110 {active
								? ''
								: 'opacity-60'}"
						>
							{item.icon}
						</span>
						<span class="text-[9px] font-semibold {active ? 'text-purple-600' : 'text-gray-500'}">
							{item.label}
						</span>
					</a>
				{/each}
			</div>
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
