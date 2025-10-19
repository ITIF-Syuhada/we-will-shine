<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<!-- Root layout - no header, handled by route groups -->
<div class="app">
	{@render children()}
</div>

<style lang="postcss">
	@reference "tailwindcss";
	.app {
		min-height: 100vh;
		width: 100%;
	}
</style>
