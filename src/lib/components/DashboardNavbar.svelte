<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	// Props for flexibility
	let { fixed = true } = $props();

	// Navigation items
	const navItems = [
		{ path: '', icon: '🏠', label: 'Home' },
		{ path: '/careers', icon: '🎯', label: 'Karir' },
		{ path: '/ai-mentor', icon: '🤖', label: 'AI' },
		{ path: '/quiz', icon: '💬', label: 'Quiz' },
		{ path: '/achievements', icon: '🏆', label: 'Trophy' }
	];

	function isActive(path: string): boolean {
		const currentPath = $page.url.pathname;
		const basePath = `${base}/dashboard/${$page.params.code}`;

		if (path === '') {
			// Home page - exact match (with or without trailing slash)
			return currentPath === basePath || currentPath === `${basePath}/`;
		} else {
			// Other pages - starts with
			return currentPath.startsWith(basePath + path);
		}
	}
</script>

<!-- Super Playful Bottom Navigation Component -->
<nav
	class="{fixed
		? 'fixed right-0 bottom-0 left-0 z-50'
		: 'flex-shrink-0'} group/nav flex justify-center"
>
	<div
		class="w-full rounded-t-3xl border-2 border-b-0 border-purple-200/50 bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-purple-300 hover:shadow-[0_-10px_40px_rgba(168,85,247,0.3)] sm:w-auto sm:max-w-2xl"
	>
		<div class="mx-auto grid grid-cols-5 gap-1 px-2 py-2 sm:gap-2 sm:px-4">
			{#each navItems as item (item.path)}
				{@const active = isActive(item.path)}
				<a
					href="{base}/dashboard/{$page.params.code}{item.path}"
					class="group/item flex flex-col items-center justify-center space-y-0.5 rounded-2xl px-3 py-2 transition-all duration-300 {active
						? 'scale-105 bg-gradient-to-br from-purple-100 to-pink-100 shadow-md'
						: 'hover:scale-110 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 hover:shadow-md'}"
				>
					<span
						class="text-xl transition-all duration-300 {active
							? 'scale-110 animate-bounce'
							: 'opacity-60 group-hover/item:scale-125 group-hover/item:rotate-12 group-hover/item:opacity-100'}"
					>
						{item.icon}
					</span>
					<span
						class="text-[9px] font-semibold transition-all duration-300 {active
							? 'scale-105 text-purple-600'
							: 'text-gray-500 group-hover/item:scale-105 group-hover/item:text-purple-600'}"
					>
						{item.label}
					</span>

					<!-- Active indicator with sparkle -->
					{#if active}
						<div class="absolute -top-1 -right-1 animate-pulse text-xs">✨</div>
					{/if}

					<!-- Hover effect - Glow dots -->
					<div
						class="absolute -top-0.5 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover/item:opacity-100"
					>
						<div class="h-1 w-1 animate-ping rounded-full bg-purple-400"></div>
					</div>
				</a>
			{/each}
		</div>

		<!-- Decorative top border animation -->
		<div
			class="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 transition-opacity duration-500 group-hover/nav:opacity-100"
		></div>
	</div>
</nav>
