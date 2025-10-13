<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<!-- Clean layout without default header/footer -->
<div class="app">
	{@render children()}
</div>

<style>
	.app {
		min-height: 100vh;
		width: 100%;
	}
</style>
