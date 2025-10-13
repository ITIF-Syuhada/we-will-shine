<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { userProgress, isLoggedIn } from '$lib/stores/user';
	import { onMount } from 'svelte';

	onMount(() => {
		// If already logged in, redirect to dashboard
		if ($isLoggedIn && $userProgress) {
			goto(`${base}/dashboard/${$userProgress.studentCode}`);
		}
	});
</script>

<svelte:head>
	<title>We Will Shine - Jelajah Karir</title>
	<meta name="description" content="Aplikasi eksplorasi karir untuk masa depan cerah" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center p-4">
	<div class="w-full max-w-md">
		<!-- Logo Section -->
		<div class="mb-8 text-center">
			<div
				class="animate-float mx-auto mb-4 inline-block rounded-full bg-gradient-to-br from-purple-200 to-pink-200 p-8 shadow-xl"
			>
				<span class="text-6xl drop-shadow-sm">🌟</span>
			</div>
			<h1
				class="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-5xl font-bold text-transparent"
			>
				We Will Shine
			</h1>
			<p class="text-lg font-semibold text-purple-500">Jelajah Karir Masa Depan</p>
		</div>

		<!-- Main Card -->
		<div
			class="mb-4 rounded-3xl border border-purple-100 bg-white/95 p-6 shadow-2xl backdrop-blur-md"
		>
			<div class="mb-4 text-center text-5xl">🎁</div>
			<h2 class="mb-3 text-center text-xl font-bold text-gray-800">Hadiah Spesial!</h2>
			<p class="mb-5 text-center text-sm leading-relaxed text-gray-600">
				Selamat datang di aplikasi Career Quest - hadiah penuh cinta dari Ustadz & Ustadzah. Yuk
				jelajahi dunia karir teknologi dan temukan passionmu! ✨
			</p>

			<!-- Features List -->
			<div class="mb-5 space-y-2 text-sm text-gray-700">
				<div class="flex items-center gap-3 rounded-xl bg-purple-50 p-3">
					<span class="text-xl">💻</span>
					<span>8 Profesi Teknologi Islam</span>
				</div>
				<div class="flex items-center gap-3 rounded-xl bg-pink-50 p-3">
					<span class="text-xl">🤖</span>
					<span>AI Mentor Interaktif</span>
				</div>
				<div class="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
					<span class="text-xl">🧠</span>
					<span>Quiz & Motivasi Personal</span>
				</div>
				<div class="flex items-center gap-3 rounded-xl bg-green-50 p-3">
					<span class="text-xl">🏆</span>
					<span>Points & Achievements</span>
				</div>
			</div>

			<!-- CTA Button -->
			<a
				href="{base}/unlock"
				class="group block w-full transform rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 py-4 text-center text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
			>
				<span class="flex items-center justify-center gap-2">
					<span class="text-xl">🚀</span>
					<span>Mulai Petualangan!</span>
					<span class="transition-transform group-hover:translate-x-1">→</span>
				</span>
			</a>

			<p class="mt-3 text-center text-xs text-gray-500">
				Scan QR atau masukkan kode dari coklat 🍫
			</p>
		</div>

		<!-- Footer -->
		<div
			class="rounded-2xl border border-purple-100 bg-white/80 p-4 text-center shadow-lg backdrop-blur-md"
		>
			<p class="text-sm font-medium text-gray-600">Dengan ❤️ dari Ustadz & Ustadzah</p>
		</div>
	</div>
</div>

<style>
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		33% {
			transform: translateY(-12px) rotate(3deg);
		}
		66% {
			transform: translateY(-6px) rotate(-3deg);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}
</style>
