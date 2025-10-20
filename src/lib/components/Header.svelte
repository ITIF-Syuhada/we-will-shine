<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { adminStore } from '$lib/stores/admin';
	import { studentCode } from '$lib/stores/session';
	import { tabNavigationStore } from '$lib/stores/tabNavigation';
	import TabNavigation from './TabNavigation.svelte';

	// Check if we're on pages that don't need header
	const hideHeader = $derived($page.url.pathname === '/');

	// Tab navigation state
	let tabNavState = $state($tabNavigationStore);

	// Update tabNavState when store changes
	$effect(() => {
		tabNavState = $tabNavigationStore;
	});

	// Shortcut buttons configuration
	const shortcutButtons = [
		{
			href: `${base}/features`,
			icon: '⚡',
			title: 'Features',
			label: 'Lihat fitur-fitur We Will Shine'
		},
		{
			href: `${base}/pricing`,
			icon: '💰',
			title: 'Pricing',
			label: 'Lihat paket dan harga'
		},
		{
			href: `${base}/about`,
			icon: 'ℹ️',
			title: 'About',
			label: 'Tentang We Will Shine'
		},
		{
			href: `${base}/roadmap`,
			icon: '🗺️',
			title: 'Roadmap',
			label: 'Lihat roadmap pengembangan'
		}
	];

	// Toggle shortcuts visibility
	let showShortcuts = $state(false);
	
	// Scroll state for header transformation
	let isScrolled = $state(false);
	let scrollY = $state(0);

	// User authentication state
	let isLoggedIn = $state(false);
	let userType = $state<'admin' | 'student' | 'guest'>('guest');

	// Handle scroll events
	const handleScroll = () => {
		scrollY = window.scrollY;
		isScrolled = scrollY > 20; // Transform when scrolled more than 20px
	};

	// Check user authentication status
	const checkAuthStatus = () => {
		const admin = $adminStore;
		const student = $studentCode;
		
		if (admin) {
			isLoggedIn = true;
			userType = 'admin';
		} else if (student) {
			isLoggedIn = true;
			userType = 'student';
		} else {
			isLoggedIn = false;
			userType = 'guest';
		}
	};

	// Reactive statement to auto-update when stores change
	$effect(() => {
		checkAuthStatus();
	});

	onMount(() => {
		// Check authentication status
		checkAuthStatus();
		
		// Add scroll listener
		window.addEventListener('scroll', handleScroll, { passive: true });
		
		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

{#if !hideHeader}
	<!-- Floating Header with Logo, Title & Shortcuts -->
	<div class="floating-header-container" class:scrolled={isScrolled}>
		<!-- Left Section: Navigation -->
		<div class="left-section">
			<!-- Main Header Button -->
			<a 
				href="{base}/" 
				class="floating-header-button"
				title="Kembali ke Home"
				aria-label="Kembali ke halaman utama We Will Shine"
			>
				<!-- Back Arrow -->
				<svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M19 12H5M12 19l-7-7 7-7"/>
				</svg>
				
				<!-- Logo & Brand -->
				<div class="brand-section">
					<div class="logo-container">
						<span class="logo-star">🌟</span>
					</div>
					<div class="brand-text">
						<span class="brand-title">We Will Shine</span>
					</div>
				</div>
			</a>

			<!-- Shortcut Buttons -->
			{#if showShortcuts}
				<div class="shortcuts-container">
					{#each shortcutButtons as button, index (button.href)}
						<a
							href={button.href}
							class="shortcut-button"
							style="animation-delay: {index * 80}ms;"
							title={button.title}
							aria-label={button.label}
						>
							<span class="shortcut-icon">{button.icon}</span>
							<span class="shortcut-text">{button.title}</span>
						</a>
					{/each}
				</div>
			{/if}

			<!-- Dynamic Toggle Button -->
			<button
				class="toggle-shortcuts"
				class:menu-open={showShortcuts}
				onclick={() => showShortcuts = !showShortcuts}
				title={showShortcuts ? "Tutup Menu" : "Buka Menu"}
				aria-label={showShortcuts ? "Tutup menu navigasi" : "Buka menu navigasi"}
			>
				{#if showShortcuts}
					<!-- X icon when menu is open -->
					<svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 6L6 18M6 6l12 12"/>
					</svg>
				{:else}
					<!-- Hamburger icon when menu is closed -->
					<svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M3 12h18M3 6h18M3 18h18"/>
					</svg>
				{/if}
			</button>
		</div>

		<!-- Right Section: Tab Navigation + CTA Button -->
		<div class="right-section">
			<!-- Tab Navigation Slot -->
			{#if tabNavState.isVisible && tabNavState.showInHeader}
				<div class="tab-nav-slot">
					<TabNavigation 
						sections={tabNavState.sections}
						activeSection={tabNavState.activeSection}
						queryParam={tabNavState.queryParam}
						position="header"
					/>
				</div>
			{/if}
			
			<!-- CTA Button -->
			{#if isLoggedIn}
				<!-- Logged in: Dashboard/App button -->
				<a
					href={userType === 'admin' ? `${base}/dashboard` : `${base}/app`}
					class="cta-button logged-in"
					title={userType === 'admin' ? 'Buka Dashboard Admin' : 'Buka Aplikasi'}
				>
					<span class="cta-icon">
						{#if userType === 'admin'}
							🏢
						{:else}
							📚
						{/if}
					</span>
					<span class="cta-text">
						{#if userType === 'admin'}
							Dashboard
						{:else}
							Aplikasi
						{/if}
					</span>
				</a>
			{:else}
				<!-- Guest: Sign up/Get started button -->
				<a
					href="{base}/signin"
					class="cta-button guest"
					title="Mulai Belajar dengan We Will Shine"
				>
					<span class="cta-icon">🚀</span>
					<span class="cta-text">Mulai Gratis</span>
				</a>
			{/if}
		</div>
	</div>
{/if}

<style lang="postcss">
	@reference "tailwindcss";

	/* Main Container - Sticky with transformation */
	.floating-header-container {
		@apply sticky top-0 left-0 z-50;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		gap: 2px;
		animation: fadeInSlideDown 0.3s ease-out;
		
		/* Default state: Full-width glassmorphism when at top */
		width: 100%;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(20px);
		padding: 1rem 2rem;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}
	
	/* Scrolled state: Rounded floating container */
	.floating-header-container.scrolled {
		width: auto;
		background: transparent;
		backdrop-filter: none;
		border-bottom: none;
        @apply px-3 pt-2;
		border-radius: 1rem;
		/* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); */
	}

	/* Left Section: Navigation elements grouped */
	.left-section {
		@apply flex items-center gap-1;
	}

	/* Right Section: Tab Navigation + CTA Button */
	.right-section {
		@apply flex items-center justify-end gap-1;
	}

	/* Tab Navigation Slot */
	.tab-nav-slot {
		@apply flex items-center;
	}

	/* Main Header Button - Fixed width to match toggle button */
	.floating-header-button {
		@apply flex items-center gap-2 rounded-2xl px-3 py-2;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		@apply text-gray-700 transition-all duration-300;
		@apply hover:bg-white hover:shadow-lg hover:scale-105 active:scale-95;
		text-decoration: none;
		min-width: 2.5rem; /* Same as toggle button */
		height: 2.5rem; /* Same as toggle button */
	}

	.back-icon {
		@apply h-4 w-4;
		transition: transform 0.2s ease;
	}

	.floating-header-button:hover .back-icon {
		transform: translateX(-2px);
	}

	/* Brand Section */
	.brand-section {
		@apply flex items-center gap-2;
	}

	.logo-container {
		@apply flex items-center justify-center;
	}

	.logo-star {
		@apply text-lg;
		animation: logoPulse 2s ease-in-out infinite;
	}

	.floating-header-button:hover .logo-star {
		animation: logoSpin 0.5s ease-out;
	}

	.brand-text {
		@apply flex items-center;
	}

	.brand-title {
		@apply text-sm font-bold;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		transition: filter 0.3s ease;
	}

	.floating-header-button:hover .brand-title {
		filter: brightness(1.2);
	}

	/* Toggle Button - Fixed size to match other buttons */
	.toggle-shortcuts {
		@apply flex items-center justify-center rounded-2xl;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		@apply text-gray-700;
		transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		@apply hover:bg-white hover:shadow-lg hover:scale-105 active:scale-95;
		cursor: pointer;
		position: relative;
		z-index: 10;
		
		/* Fixed dimensions to match other buttons */
		width: 2.5rem;
		height: 2.5rem;
		
		/* Smooth animation for appearing/disappearing */
		animation: fadeInSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.toggle-icon {
		@apply h-4 w-4;
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.toggle-shortcuts:hover .toggle-icon {
		transform: scale(1.1);
	}

	/* CTA Button - Eye-catching call-to-action */
	.cta-button {
		@apply flex items-center gap-2 rounded-2xl px-4 py-2.5;
		text-decoration: none;
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
		position: relative;
		z-index: 10;
		
		/* Fixed dimensions */
		min-width: 2.5rem;
		height: 2.5rem;
		
		/* Smooth animation */
		animation: fadeInSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	/* Guest CTA Button - Primary action */
	.cta-button.guest {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		@apply text-white;
		box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	.cta-button.guest:hover {
		background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
		box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
		transform: translateY(-2px) scale(1.05);
	}

	/* Logged in CTA Button - Secondary action */
	.cta-button.logged-in {
		background: rgba(255, 255, 255, 0.95);
		@apply text-gray-700;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		border: 1px solid rgba(0, 0, 0, 0.1);
	}

	.cta-button.logged-in:hover {
		background: white;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
		transform: translateY(-2px) scale(1.05);
	}

	.cta-icon {
		@apply text-sm;
		transition: transform 0.2s ease;
	}

	.cta-button:hover .cta-icon {
		transform: scale(1.1);
	}

	.cta-text {
		@apply text-sm font-semibold;
		white-space: nowrap;
	}

	/* Shortcuts Container */
	.shortcuts-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 2px; /* Added spacing between shortcut buttons */
	}

	/* Shortcut Buttons - Fixed size to match other buttons */
	.shortcut-button {
		@apply flex items-center gap-2 rounded-2xl px-3 py-2;
		background: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(0, 0, 0, 0.1);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		@apply text-gray-700;
		@apply hover:bg-white hover:shadow-lg hover:scale-105 active:scale-95;
		text-decoration: none;
		white-space: nowrap;
		transition: all 0.3s ease;
		animation: slideInFromLeft 0.4s cubic-bezier(0.4, 0, 0.2, 1) both;
		min-width: 2.5rem; /* Same as other buttons */
		height: 2.5rem; /* Same as other buttons */
	}

	.shortcut-icon {
		@apply text-sm;
		transition: transform 0.2s ease;
	}

	.shortcut-button:hover .shortcut-icon {
		transform: scale(1.2);
	}

	.shortcut-text {
		@apply text-xs font-medium;
	}

	/* Animations */
	@keyframes fadeInSlideDown {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes logoPulse {
		0%, 100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}

	@keyframes logoSpin {
		from {
			transform: rotate(0deg) scale(1);
		}
		to {
			transform: rotate(360deg) scale(1.1);
		}
	}

	@keyframes slideInFromLeft {
		from {
			opacity: 0;
			transform: translateX(-20px) scale(0.8);
		}
		to {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
	}

	@keyframes fadeInSlide {
		from {
			opacity: 0;
			transform: translateX(-10px) scale(0.9);
		}
		to {
			opacity: 1;
			transform: translateX(0) scale(1);
		}
	}

	/* Mobile Responsiveness */
	@media (max-width: 640px) {
		.floating-header-container {
			padding: 0.75rem 1rem;
		}
		
		.floating-header-container.scrolled {
			margin: 0.75rem;
		}

		.floating-header-button {
			@apply gap-2 px-2.5 py-2;
			min-width: 2rem;
			height: 2rem;
		}

		.back-icon {
			@apply h-3 w-3;
		}

		.logo-star {
			@apply text-sm;
		}

		.brand-title {
			@apply text-xs;
		}

		.shortcut-button {
			@apply px-2.5 py-2;
			min-width: 2rem;
			height: 2rem;
		}

		.shortcut-text {
			@apply text-xs;
		}

		.toggle-shortcuts {
			width: 2rem;
			height: 2rem;
		}

		.toggle-icon {
			@apply h-3 w-3;
		}

		.cta-button {
			@apply px-2.5 py-2;
			min-width: 2rem;
			height: 2rem;
		}

		.cta-text {
			@apply text-xs;
		}
	}

	/* Very Small Screens */
	@media (max-width: 480px) {
		.shortcut-text {
			@apply hidden;
		}

		.shortcut-button {
			@apply px-2 py-1.5;
			min-width: 1.75rem;
			height: 1.75rem;
		}

		.toggle-shortcuts {
			width: 1.75rem;
			height: 1.75rem;
		}

		.cta-button {
			@apply px-2 py-1.5;
			min-width: 1.75rem;
			height: 1.75rem;
		}

		.cta-text {
			@apply text-xs;
		}
	}

	/* Dark Mode */
	@media (prefers-color-scheme: dark) {
		.floating-header-button,
		.shortcut-button,
		.toggle-shortcuts {
			background: rgba(17, 24, 39, 0.9);
			border-color: rgba(255, 255, 255, 0.2);
			@apply text-gray-300 hover:bg-gray-800 hover:text-white;
		}
	}
</style>
