<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { userProgress } from '$lib/stores/user';

	const firstName = $derived($userProgress?.studentName.split(' ')[0] || '');
	const points = $derived($userProgress?.points || 0);
	const level = $derived($userProgress?.level || 1);

	// Sprinkle animation state
	let sprinkleStars = $state<Array<{ id: number; x: number; y: number; delay: number }>>([]);
	let sprinkleId = $state(0);

	function handleLogout() {
		if (confirm('Yakin ingin keluar?')) {
			userProgress.logout();
			goto(`${base}/`);
		}
	}

	function createSprinkleEffect(event: MouseEvent) {
		const rect = (event.target as HTMLElement).getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;

		// Create multiple sprinkle stars
		for (let i = 0; i < 15; i++) {
			const angle = i * 24 + Math.random() * 20 - 10; // Spread with some randomness
			const distance = 60 + Math.random() * 40; // Random distance
			const x = centerX + Math.cos((angle * Math.PI) / 180) * distance;
			const y = centerY + Math.sin((angle * Math.PI) / 180) * distance;

			sprinkleStars = [
				...sprinkleStars,
				{
					id: sprinkleId++,
					x,
					y,
					delay: i * 50 // Staggered animation
				}
			];
		}

		// Remove stars after animation
		setTimeout(() => {
			sprinkleStars = [];
		}, 2000);
	}

	// Dynamic page title based on route
	const pageInfo = $derived.by(() => {
		const currentPath = $page.url.pathname;

		if (currentPath.includes('/careers')) {
			return {
				icon: '🎯',
				title: 'Karir',
				desc: 'Explore career paths'
			};
		} else if (currentPath.includes('/quiz')) {
			return {
				icon: '💬',
				title: 'Quiz',
				desc: 'Test your knowledge'
			};
		} else if (currentPath.includes('/achievements')) {
			return {
				icon: '🏆',
				title: 'Achievements',
				desc: 'Your accomplishments'
			};
		} else if (currentPath.includes('/dreams')) {
			return {
				icon: '🌟',
				title: 'Dreams',
				desc: 'Your aspirations'
			};
		}
		return null; // Home page - no dynamic title
	});
</script>

<!-- Super Playful Header Component -->
<header
	class="group/header relative flex-shrink-0 overflow-hidden border-b-2 border-purple-200/60 bg-gradient-to-r from-purple-100 via-pink-50 to-blue-50 shadow-lg backdrop-blur-md transition-all duration-500 select-none hover:border-purple-300 hover:shadow-2xl"
>
	<!-- Animated Background Elements with Hover Effects -->
	<div
		class="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover/header:opacity-40"
	>
		<div
			class="absolute top-2 left-4 h-2 w-2 animate-pulse rounded-full bg-purple-400 transition-all duration-300 group-hover/header:h-3 group-hover/header:w-3"
		></div>
		<div
			class="absolute top-4 right-8 h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400 transition-all duration-300 group-hover/header:h-2.5 group-hover/header:w-2.5"
			style="animation-delay: 0.5s"
		></div>
		<div
			class="absolute bottom-2 left-12 h-1 w-1 animate-ping rounded-full bg-blue-400 transition-all duration-300 group-hover/header:h-2 group-hover/header:w-2"
			style="animation-delay: 1s"
		></div>
		<div
			class="absolute top-3 right-16 h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-400 transition-all duration-300 group-hover/header:h-2.5 group-hover/header:w-2.5"
			style="animation-delay: 1.5s"
		></div>

		<!-- Additional floating elements on hover -->
		<div
			class="absolute top-1 left-1/3 h-1 w-1 rounded-full bg-pink-300 opacity-0 transition-opacity duration-500 group-hover/header:animate-bounce group-hover/header:opacity-100"
		></div>
		<div
			class="absolute right-1/4 bottom-1 h-1 w-1 rounded-full bg-blue-300 opacity-0 transition-opacity duration-500 group-hover/header:animate-pulse group-hover/header:opacity-100"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-3 py-2">
		<div class="flex items-center justify-between gap-2">
			<!-- Left: Name + Level + Page Title (with soft separator) -->
			<div class="flex min-w-0 flex-1 items-center gap-2">
				<!-- Name + Level - Super Playful Card -->
				<div
					class="group/name flex cursor-pointer items-center gap-1 rounded-xl bg-white/70 px-2 py-1.5 shadow-md transition-all duration-300 hover:scale-110 hover:rotate-2 hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 hover:shadow-2xl"
				>
					<div class="min-w-0">
						<div
							class="truncate text-[18px] leading-tight font-bold text-gray-800 transition-all duration-300 group-hover/name:scale-105 group-hover/name:text-purple-700"
						>
							{firstName}
						</div>
						<div
							class="flex items-center gap-1 text-[8px] leading-tight font-semibold text-purple-600"
						>
							<span
								class="animate-pulse transition-colors group-hover/name:animate-spin group-hover/name:text-yellow-500"
								>✨</span
							>
							<span class="transition-colors group-hover/name:text-pink-600">Lv.{level}</span>
							<span
								class="animate-bounce transition-colors group-hover/name:animate-ping group-hover/name:text-blue-500"
								>🚀</span
							>
						</div>
					</div>
				</div>

				<!-- Soft Separator + Page Title (if not home) -->
				{#if pageInfo}
					<!-- Separator: Super Animated dots -->
					<div
						class="flex items-center gap-1 opacity-60 transition-opacity group-hover/header:opacity-100"
					>
						<div
							class="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400 transition-transform group-hover/header:scale-150"
						></div>
						<div
							class="h-1.5 w-1.5 animate-pulse rounded-full bg-pink-400 transition-transform group-hover/header:scale-150"
							style="animation-delay: 0.3s"
						></div>
						<div
							class="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400 transition-transform group-hover/header:scale-150"
							style="animation-delay: 0.6s"
						></div>
					</div>

					<!-- Page Title - Super Playful -->
					<div class="group/page flex min-w-0 flex-1 items-center gap-1.5">
						<div
							class="cursor-pointer rounded-xl bg-white/70 p-1.5 shadow-md transition-all duration-300 hover:scale-125 hover:rotate-12 hover:bg-gradient-to-br hover:from-yellow-100 hover:to-orange-100 hover:shadow-2xl"
						>
							<span class="animate-bounce text-sm group-hover/page:animate-spin"
								>{pageInfo.icon}</span
							>
						</div>
						<div class="min-w-0 flex-1 cursor-pointer">
							<div
								class="truncate text-[10px] leading-tight font-bold text-gray-800 transition-all duration-300 group-hover/page:scale-105 group-hover/page:text-purple-700"
							>
								{pageInfo.title}
							</div>
							<div
								class="truncate text-[8px] leading-tight text-gray-600 transition-colors group-hover/page:text-pink-600"
							>
								{pageInfo.desc}
							</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Right: Points + Logout -->
			<div class="flex flex-shrink-0 items-center gap-2">
				<!-- Points - Super Playful Card with Sprinkle Effect -->
				<button
					type="button"
					onclick={createSprinkleEffect}
					class="group/points flex h-8 cursor-pointer items-center gap-1.5 rounded-xl border-2 border-yellow-300/60 bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1.5 shadow-md transition-all duration-300 select-none hover:scale-110 hover:rotate-3 hover:border-yellow-400 hover:from-yellow-200 hover:to-orange-200 hover:shadow-2xl active:scale-95"
				>
					<span
						class="animate-spin text-sm transition-transform group-hover/points:scale-125 group-hover/points:animate-bounce"
						>⭐</span
					>
					<span
						class="text-[11px] font-bold text-yellow-700 transition-all group-hover/points:scale-110 group-hover/points:text-yellow-900"
						>{points}</span
					>
					<span
						class="animate-pulse text-xs opacity-0 transition-opacity group-hover/points:opacity-100"
						>💰</span
					>
				</button>

				<!-- Logout - Super Playful Button -->
				<button
					onclick={handleLogout}
					class="group/logout flex h-8 items-center gap-1.5 rounded-xl border-2 border-gray-300/60 bg-gradient-to-r from-gray-100 to-gray-200 px-3 py-1.5 transition-all duration-300 hover:scale-110 hover:-rotate-2 hover:border-red-300/60 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 hover:shadow-2xl active:scale-90"
					title="Keluar"
				>
					<span
						class="text-[10px] transition-transform group-hover/logout:scale-125 group-hover/logout:animate-bounce"
						>🚪</span
					>
					<span
						class="text-[9px] font-semibold text-gray-700 transition-all group-hover/logout:scale-105 group-hover/logout:text-red-600"
						>Logout</span
					>
					<span
						class="animate-pulse text-[10px] opacity-0 transition-opacity group-hover/logout:opacity-100"
						>👋</span
					>
				</button>
			</div>
		</div>
	</div>
</header>

<!-- Sprinkle Stars Animation -->
{#each sprinkleStars as star (star.id)}
	<div
		class="pointer-events-none fixed z-[999999] animate-ping text-2xl"
		style="left: {star.x}px; top: {star.y}px; animation-delay: {star.delay}ms; animation-duration: 1.5s; transform: translate(-50%, -50%);"
	>
		⭐
	</div>
{/each}
