<!-- App Layout - Student Application Interface -->
<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Header />
<main class="min-h-screen">
	<slot />
</main>
<Footer />

<style lang="postcss">
	@reference "tailwindcss";
</style>
