<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	// Redirect to new database-driven login
	onMount(() => {
		goto(`${base}/admin/login`);
	});
</script>

<svelte:head>
	<title>Admin - We Will Shine</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50"
>
	<div class="text-center">
		<div class="mb-4 text-6xl">🔄</div>
		<p class="text-lg text-purple-700">Redirecting to admin login...</p>
	</div>
</div>
