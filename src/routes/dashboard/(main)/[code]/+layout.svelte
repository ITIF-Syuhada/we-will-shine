<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { userProgress } from '$lib/stores/user';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import DashboardHeader from '$lib/components/DashboardHeader.svelte';
	import DashboardNavbar from '$lib/components/DashboardNavbar.svelte';

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

	// Check if current page is AI Mentor (hide header completely)
	const isAIMentorPage = $derived($page.url.pathname.includes('/ai-mentor'));
</script>

<div class="flex h-screen flex-col">
	<!-- Dashboard Header Component - Sticky Top -->
	{#if !isAIMentorPage}
		<div transition:slide={{ duration: 300, axis: 'y' }} class="relative z-[999]">
			<DashboardHeader />
		</div>
	{/if}

	<!-- Main Content - Scrollable -->
	<main class="flex-1 overflow-y-auto">
		<div class="mx-auto max-w-7xl px-4 py-4 pb-22">
			{@render children()}
		</div>
	</main>

	<!-- Dashboard Navbar Component - Fixed Bottom -->
	<DashboardNavbar />
</div>
