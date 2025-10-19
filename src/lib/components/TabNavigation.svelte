<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Props interface
	interface TabSection {
		id: string;
		label: string;
		icon: string;
	}

	interface Props {
		sections: TabSection[];
		activeSection?: string;
		queryParam?: string;
		position?: 'sticky' | 'static' | 'floating-right' | 'header';
		topOffset?: string;
		backgroundColor?: string;
		className?: string;
	}

	// Props with defaults
	let {
		sections,
		activeSection = $bindable(),
		queryParam = 'tab',
		position = 'sticky',
		topOffset = 'top-14',
		backgroundColor = 'bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50',
		className = ''
	}: Props = $props();

	// Set default activeSection if not provided
	if (!activeSection && sections.length > 0) {
		activeSection = sections[0].id;
	}

	// Track scroll state for sticky navigation
	let isStuck = $state(false);
	let navElement: HTMLElement;

	// Switch to section
	function switchToSection(sectionId: string) {
		activeSection = sectionId;
		
		// Update URL query
		goto(`?${queryParam}=${sectionId}`, { replaceState: true, noScroll: true });
		
		// Scroll to the target section
		const targetSection = document.getElementById(sectionId);
		if (targetSection) {
			const rect = targetSection.getBoundingClientRect();
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			const sectionTop = rect.top + scrollTop;
			
			// Offset for header + tab navigation (approximately 120px)
			const headerOffset = 120;
			const targetScroll = sectionTop - headerOffset;
			
			window.scrollTo({
				top: targetScroll,
				behavior: 'smooth'
			});
		}
	}

	onMount(() => {
		// Check URL query for initial tab
		const urlTab = $page.url.searchParams.get(queryParam);
		if (urlTab && sections.some(s => s.id === urlTab)) {
			activeSection = urlTab;
			// Scroll to initial section if from URL
			setTimeout(() => switchToSection(urlTab), 100);
		}

		// Detect when sticky nav is stuck at top (only for sticky position)
		if (position === 'sticky') {
			const handleScroll = () => {
				// Adjusted threshold for header height (header top-4 + height + small gap)
				isStuck = window.scrollY > 80;
			};

			window.addEventListener('scroll', handleScroll);
			handleScroll(); // Initial check

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}

		// Intersection Observer to auto-update active tab based on scroll position
		const observerOptions = {
			root: null,
			rootMargin: '-150px 0px -50% 0px', // Trigger when section is near top
			threshold: 0
		};

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const sectionId = entry.target.id;
					if (sections.some(s => s.id === sectionId)) {
						activeSection = sectionId;
						// Update URL without scrolling
						goto(`?${queryParam}=${sectionId}`, { replaceState: true, noScroll: true });
					}
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, observerOptions);

		// Observe all sections
		sections.forEach(section => {
			const element = document.getElementById(section.id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			observer.disconnect();
		};
	});
</script>

<!-- Tab Navigation -->
<nav 
	bind:this={navElement}
	class="tab-navigation {topOffset} {backgroundColor} {className}" 
	class:sticky={position === 'sticky'} 
	class:static={position === 'static'}
	class:floating-right={position === 'floating-right'}
	class:stuck={isStuck && position === 'sticky'}
>
	<div class="tab-nav-container" class:stuck={isStuck && position === 'sticky'}>
		{#each sections as section}
			<button
				class="tab-nav-item"
				class:active={activeSection === section.id}
				onclick={() => switchToSection(section.id)}
				type="button"
				title={section.label}
			>
				<span class="tab-nav-icon">{section.icon}</span>
				<span class="tab-nav-label">{section.label}</span>
			</button>
		{/each}
	</div>
</nav>

<style lang="postcss">
	@reference "tailwindcss";

	/* Tab Navigation Base */
	.tab-navigation {
		@apply border-y border-indigo-100 py-2;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		z-index: 99;
		transition: all 0.3s ease;
	}

	.tab-navigation.sticky {
		@apply sticky left-0 right-0;
	}

	/* When sticky nav is stuck at top, make it fixed and align with header */
	.tab-navigation.sticky.stuck {
		@apply fixed left-4 z-40;
		width: max-content;
		border: none;
		box-shadow: none;
		backdrop-filter: none;
		background: transparent;
		padding: 0;
	}

	/* Stuck state items - compact styling */
	.tab-navigation.sticky.stuck .tab-nav-item {
		@apply flex items-center gap-1 px-2 py-1.5 rounded-xl;
		@apply text-xs font-medium text-gray-600;
		background: transparent;
		border: 1px solid rgba(99, 102, 241, 0.1);
		min-height: 2rem;
	}

	.tab-navigation.sticky.stuck .tab-nav-item:hover {
		@apply text-indigo-700;
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(99, 102, 241, 0.12);
	}

	.tab-navigation.sticky.stuck .tab-nav-item.active {
		@apply bg-gradient-to-r from-indigo-600 to-purple-600 text-white;
		border-color: transparent;
		box-shadow: 0 3px 12px rgba(99, 102, 241, 0.3);
		transform: translateY(-1px) scale(1.02);
	}

	.tab-navigation.sticky.stuck .tab-nav-icon {
		@apply text-xs;
	}

	.tab-navigation.sticky.stuck .tab-nav-label {
		@apply text-xs font-semibold;
	}

	.tab-navigation.static {
		@apply relative;
	}

	/* Header Position - Compact inline navigation */
	.tab-navigation.header {
		@apply relative;
		border: none;
		box-shadow: none;
		background: transparent;
		padding: 0;
		z-index: auto;
	}

	/* Floating Right Position */
	.tab-navigation.floating-right {
		@apply fixed right-6 z-50;
		top: 50vh;
		transform: translateY(-50%);
		border: none;
		box-shadow: 0 4px 24px rgba(99, 102, 241, 0.15);
		background: transparent;
		padding: 0;
		max-height: calc(100vh - 8rem);
		overflow-y: auto;
	}

	.tab-navigation.floating-right .tab-nav-container {
		@apply flex-col gap-3 p-0 max-w-none;
	}

	.tab-navigation.floating-right .tab-nav-item {
		@apply flex-col gap-1 px-3 py-3 rounded-2xl;
		min-width: 64px;
		backdrop-filter: blur(12px);
	}

	.tab-navigation.floating-right .tab-nav-label {
		@apply text-xs text-center;
		writing-mode: horizontal-tb;
	}

	.tab-navigation.floating-right .tab-nav-icon {
		@apply text-xl;
	}

	/* Top offset classes */
	.tab-navigation.top-14 {
		top: 3.5rem; /* 56px */
	}

	.tab-navigation.top-16 {
		top: 4rem; /* 64px */
	}

	.tab-navigation.top-20 {
		top: 5rem; /* 80px */
	}

	.tab-navigation.top-24 {
		top: 6rem; /* 96px */
	}

	.tab-nav-container {
		@apply flex items-center justify-center gap-2 flex-wrap;
		@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
		transition: justify-content 0.3s ease;
	}

	/* When stuck at top, align left and remove container constraints */
	.tab-nav-container.stuck {
		@apply justify-start max-w-none mx-0 px-0;
	}

	/* Header Position Container */
	.tab-navigation.header .tab-nav-container {
		@apply flex items-center gap-1 max-w-none mx-0 px-0;
	}

	.tab-nav-item {
		@apply flex items-center gap-2 px-4 py-2.5 rounded-2xl;
		@apply text-sm font-medium text-gray-600;
		@apply transition-all duration-300;
		@apply whitespace-nowrap;
		background: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(99, 102, 241, 0.15);
		cursor: pointer;
	}

	.tab-nav-item:hover {
		@apply bg-white text-indigo-700;
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(99, 102, 241, 0.12);
	}

	.tab-nav-item.active {
		@apply bg-gradient-to-r from-indigo-600 to-purple-600 text-white;
		border-color: transparent;
		box-shadow: 0 3px 12px rgba(99, 102, 241, 0.3);
		transform: translateY(-1px) scale(1.02);
	}

	.tab-nav-item.active:hover {
		@apply bg-gradient-to-r from-indigo-700 to-purple-700;
		box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
	}

	.tab-nav-icon {
		@apply text-base;
		transition: transform 0.2s ease;
	}

	.tab-nav-item:hover .tab-nav-icon,
	.tab-nav-item.active .tab-nav-icon {
		transform: scale(1.1);
	}

	.tab-nav-label {
		@apply text-sm font-semibold;
	}

	/* Header Position Items - More compact, no background */
	.tab-navigation.header .tab-nav-item {
		@apply flex items-center gap-1 px-2 py-1.5 rounded-xl;
		@apply text-xs font-medium text-gray-600;
		@apply transition-all duration-300;
		@apply whitespace-nowrap;
		background: transparent;
		border: 1px solid rgba(99, 102, 241, 0.1);
		cursor: pointer;
		min-height: 2rem;
	}

	.tab-navigation.header .tab-nav-item:hover {
		@apply text-indigo-700;
		border-color: rgba(99, 102, 241, 0.3);
		transform: translateY(-1px);
		box-shadow: 0 2px 8px rgba(99, 102, 241, 0.12);
	}

	.tab-navigation.header .tab-nav-item.active {
		@apply bg-gradient-to-r from-indigo-600 to-purple-600 text-white;
		border-color: transparent;
		box-shadow: 0 3px 12px rgba(99, 102, 241, 0.3);
		transform: translateY(-1px) scale(1.02);
	}

	.tab-navigation.header .tab-nav-item.active:hover {
		@apply bg-gradient-to-r from-indigo-700 to-purple-700;
		box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
	}

	.tab-navigation.header .tab-nav-icon {
		@apply text-xs;
		transition: transform 0.2s ease;
	}

	.tab-navigation.header .tab-nav-label {
		@apply text-xs font-semibold;
	}

	/* Mobile responsive */
	@media (max-width: 1023px) {
		/* On tablet/mobile, floating-right becomes horizontal at top */
		.tab-navigation.floating-right {
			@apply fixed top-16 right-0 left-0;
			transform: none;
			top: 4rem;
			max-height: none;
			overflow-y: visible;
			box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
			@apply bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50;
			@apply border-b border-indigo-100 py-2;
		}

		.tab-navigation.floating-right .tab-nav-container {
			@apply flex-row gap-2 justify-start overflow-x-auto px-4;
			scrollbar-width: none;
			-ms-overflow-style: none;
		}

		.tab-navigation.floating-right .tab-nav-container::-webkit-scrollbar {
			display: none;
		}

		.tab-navigation.floating-right .tab-nav-item {
			@apply flex-row gap-2 px-3 py-2 rounded-2xl;
			min-width: auto;
			flex-shrink: 0;
		}

		.tab-navigation.floating-right .tab-nav-label {
			@apply text-xs;
			writing-mode: horizontal-tb;
		}

		.tab-navigation.floating-right .tab-nav-icon {
			@apply text-sm;
		}
	}

	@media (max-width: 640px) {
		.tab-navigation.top-14 {
			top: 3.5rem;
		}

		.tab-navigation.top-16 {
			top: 4rem;
		}

		.tab-navigation.top-20 {
			top: 5rem;
		}

		.tab-navigation.top-24 {
			top: 6rem;
		}
		
		.tab-nav-container {
			@apply justify-start overflow-x-auto gap-1;
			scrollbar-width: none;
			-ms-overflow-style: none;
		}

		.tab-nav-container::-webkit-scrollbar {
			display: none;
		}

		.tab-nav-item {
			@apply px-2.5 py-1.5 gap-1;
			flex-shrink: 0;
		}

		.tab-nav-label {
			@apply text-xs;
		}

		.tab-nav-icon {
			@apply text-xs;
		}
	}

	/* Dark mode support */
	@media (prefers-color-scheme: dark) {
		.tab-navigation {
			@apply border-gray-700;
		}

		.tab-nav-item {
			background: rgba(17, 24, 39, 0.6);
			border-color: rgba(255, 255, 255, 0.1);
			@apply text-gray-300;
		}

		.tab-nav-item:hover {
			@apply bg-gray-800 text-white;
			border-color: rgba(255, 255, 255, 0.3);
		}
	}
</style>
