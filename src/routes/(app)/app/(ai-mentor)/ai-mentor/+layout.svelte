<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { userProgress } from '$lib/stores/user';
	import { studentCode } from '$lib/stores/session';
	import { onMount } from 'svelte';
	import DashboardNavbar from '$lib/components/DashboardNavbar.svelte';

	let { children } = $props();

	// Check if user is logged in
	onMount(() => {
		if (!$userProgress) {
			goto(`${base}/unlock`);
			return;
		}

		// Check if code matches
		const code = $studentCode;
		if (!code || $userProgress.studentCode !== code) {
			goto(`${base}/unlock`);
		}
	});
</script>

<svelte:head>
	<title>AI Mentor - We Will Shine</title>
	<style>
		:global(body) {
			overflow: hidden;
		}
	</style>
</svelte:head>

<!-- AI Mentor Full-Screen Layout -->
<div class="flex h-screen flex-col">
	<!-- Main Content -->
	<main class="flex-1 overflow-hidden">
		{@render children()}
	</main>

	<!-- Dashboard Navbar Component (Inside viewport for AI Mentor) -->
	<DashboardNavbar fixed={false} />
</div>
