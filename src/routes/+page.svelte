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

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-teal-400 p-4"
>
	<div class="w-full max-w-lg text-center">
		<!-- Logo/Icon dengan animasi float -->
		<div class="mb-8 animate-bounce">
			<div
				class="mx-auto mb-4 inline-block rounded-full bg-gradient-to-br from-purple-600 to-pink-600 p-6 shadow-2xl"
			>
				<span class="text-6xl">🌟</span>
			</div>
			<h1
				class="mb-2 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-5xl font-bold text-transparent drop-shadow-lg"
			>
				We Will Shine
			</h1>
			<p class="text-xl font-semibold text-white drop-shadow-md">Jelajah Karir Masa Depan</p>
		</div>

		<!-- Welcome Card -->
		<div class="mb-6 rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
			<div class="mb-4 text-4xl">🎁</div>
			<h2 class="mb-2 text-2xl font-bold text-purple-900">Hadiah Spesial untuk Kamu!</h2>
			<p class="mb-6 text-gray-700">
				Selamat datang di aplikasi Career Quest - hadiah dari Bu Guru untuk kelas 7D Putri. Yuk
				jelajahi dunia karir teknologi dan temukan passionmu! ✨
			</p>

			<div class="space-y-4">
				<div class="rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 p-4">
					<p class="text-sm font-semibold text-purple-900">Yang kamu akan dapatkan:</p>
					<ul class="mt-2 space-y-1 text-left text-sm text-gray-700">
						<li>✅ 8 Profesi Teknologi dengan Nilai Islam</li>
						<li>✅ AI Mentor untuk membimbing karirmu</li>
						<li>✅ Quiz Kepribadian & Motivasi Personal</li>
						<li>✅ Dream Board untuk merencanakan impian</li>
						<li>✅ Gamifikasi dengan Points & Achievements</li>
					</ul>
				</div>

				<a
					href="{base}/unlock"
					class="block w-full transform rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:from-purple-600 hover:to-pink-600 active:scale-95"
				>
					🚀 Mulai Petualangan!
				</a>

				<p class="text-xs text-white drop-shadow">
					Punya kode dari coklat? Klik tombol di atas untuk unlock! 🍫
				</p>
			</div>
		</div>

		<!-- Footer Message -->
		<div class="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
			<p class="text-sm text-white drop-shadow">
				Dengan ❤️ dari Bu Guru untuk masa depan cerah kalian
			</p>
		</div>
	</div>
</div>

<style>
	@keyframes float {
		0%,
		100% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-10px);
		}
	}
</style>
