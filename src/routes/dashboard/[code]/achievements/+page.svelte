<script lang="ts">
	import { userProgress, unlockedAchievements } from '$lib/stores/user';

	const achievements = $derived($userProgress?.achievements || []);
	const unlocked = $derived($unlockedAchievements);
	const points = $derived($userProgress?.points || 0);
	const level = $derived($userProgress?.level || 1);
</script>

<svelte:head>
	<title>Achievements - We Will Shine</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div class="rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 p-6 text-white shadow-lg">
		<h1 class="mb-2 text-3xl font-bold">🏆 Pencapaian & Trophy</h1>
		<p class="opacity-90">Lihat semua pencapaianmu dan terus kumpulkan trophy!</p>
	</div>

	<!-- Stats Grid -->
	<div class="grid gap-4 sm:grid-cols-3">
		<div class="rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 p-6 text-center shadow-lg">
			<div class="text-4xl font-bold text-purple-900">{points}</div>
			<div class="text-sm text-purple-700">Total Points</div>
		</div>
		<div class="rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 p-6 text-center shadow-lg">
			<div class="text-4xl font-bold text-blue-900">Level {level}</div>
			<div class="text-sm text-blue-700">Current Level</div>
		</div>
		<div
			class="rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 p-6 text-center shadow-lg"
		>
			<div class="text-4xl font-bold text-yellow-900">{unlocked.length}/{achievements.length}</div>
			<div class="text-sm text-yellow-700">Achievements</div>
		</div>
	</div>

	<!-- Unlocked Achievements -->
	{#if unlocked.length > 0}
		<div>
			<h2 class="mb-4 text-xl font-bold text-gray-800">✨ Trophy yang Sudah Didapat</h2>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each unlocked as achievement (achievement.id)}
					<div
						class="animate-bounce-in rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 p-6 text-center shadow-lg"
					>
						<div class="mb-2 text-5xl">{achievement.icon}</div>
						<h3 class="mb-1 font-bold text-yellow-900">{achievement.name}</h3>
						<p class="text-xs text-yellow-700">{achievement.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Locked Achievements -->
	{#if achievements.filter((a) => !a.unlocked).length > 0}
		{@const locked = achievements.filter((a) => !a.unlocked)}
		<div>
			<h2 class="mb-4 text-xl font-bold text-gray-800">🔒 Trophy yang Belum Didapat</h2>
			<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{#each locked as achievement (achievement.id)}
					<div class="rounded-xl bg-gray-100 p-6 text-center opacity-60 shadow-lg">
						<div class="mb-2 text-5xl grayscale">{achievement.icon}</div>
						<h3 class="mb-1 font-bold text-gray-700">{achievement.name}</h3>
						<p class="text-xs text-gray-600">{achievement.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Tips Section -->
	<div class="rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 p-6">
		<h3 class="mb-3 text-center text-lg font-bold text-purple-900">💡 Cara Mendapatkan Trophy</h3>
		<div class="grid gap-3 sm:grid-cols-2">
			<div class="rounded-xl bg-white p-3">
				<p class="text-sm"><strong>🥇 First Explorer:</strong> Login pertama kali</p>
			</div>
			<div class="rounded-xl bg-white p-3">
				<p class="text-sm"><strong>📝 Quote Master:</strong> Baca 5 quote motivasi</p>
			</div>
			<div class="rounded-xl bg-white p-3">
				<p class="text-sm"><strong>🎯 Career Explorer:</strong> Jelajahi 3 karir berbeda</p>
			</div>
			<div class="rounded-xl bg-white p-3">
				<p class="text-sm"><strong>🤖 AI Chatter:</strong> Chat 10x dengan AI</p>
			</div>
			<div class="rounded-xl bg-white p-3">
				<p class="text-sm"><strong>✨ Dream Builder:</strong> Tulis 5 impian</p>
			</div>
			<div class="rounded-xl bg-white p-3">
				<p class="text-sm"><strong>🧠 Quiz Master:</strong> Selesaikan quiz</p>
			</div>
			<div class="rounded-xl bg-white p-3">
				<p class="text-sm"><strong>🌟 Career Master:</strong> Jelajahi semua 8 karir</p>
			</div>
			<div class="rounded-xl bg-white p-3">
				<p class="text-sm"><strong>⭐ Rising Star:</strong> Capai level 5</p>
			</div>
		</div>
	</div>

	<!-- Motivation -->
	<div
		class="rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 p-6 text-center shadow-lg"
	>
		<p class="text-lg font-semibold text-purple-900">
			"Setiap achievement adalah bukti usahamu. Keep going! 💪✨"
		</p>
	</div>
</div>

<style>
	@keyframes bounce-in {
		0% {
			transform: scale(0.3);
			opacity: 0;
		}
		50% {
			transform: scale(1.05);
		}
		70% {
			transform: scale(0.9);
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}

	.animate-bounce-in {
		animation: bounce-in 0.6s ease-out;
	}
</style>
