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
	<div
		class="rounded-3xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100 p-8 shadow-lg"
	>
		<div class="flex items-center gap-4">
			<span class="text-5xl">🏆</span>
			<div>
				<h1 class="mb-1 text-3xl font-bold text-gray-800">Pencapaian & Trophy</h1>
				<p class="text-gray-600">Lihat semua pencapaianmu dan terus kumpulkan trophy!</p>
			</div>
		</div>
	</div>

	<!-- Stats Grid -->
	<div class="grid gap-5 sm:grid-cols-3">
		<div
			class="rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-purple-100/50 p-7 text-center shadow-lg"
		>
			<div class="text-5xl font-bold text-purple-600">{points}</div>
			<div class="text-sm font-semibold text-purple-500">Total Points</div>
		</div>
		<div
			class="rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 p-7 text-center shadow-lg"
		>
			<div class="text-5xl font-bold text-blue-600">Level {level}</div>
			<div class="text-sm font-semibold text-blue-500">Current Level</div>
		</div>
		<div
			class="rounded-2xl border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-7 text-center shadow-lg"
		>
			<div class="text-5xl font-bold text-yellow-600">
				{unlocked.length}/{achievements.length}
			</div>
			<div class="text-sm font-semibold text-yellow-500">Achievements</div>
		</div>
	</div>

	<!-- Unlocked Achievements -->
	{#if unlocked.length > 0}
		<div>
			<h2 class="mb-5 text-2xl font-bold text-gray-800">✨ Trophy yang Sudah Didapat</h2>
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{#each unlocked as achievement (achievement.id)}
					<div
						class="animate-bounce-in rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-7 text-center shadow-lg"
					>
						<div class="mb-3 text-6xl">{achievement.icon}</div>
						<h3 class="mb-2 font-bold text-yellow-700">{achievement.name}</h3>
						<p class="text-xs text-yellow-600">{achievement.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Locked Achievements -->
	{#if achievements.filter((a) => !a.unlocked).length > 0}
		{@const locked = achievements.filter((a) => !a.unlocked)}
		<div>
			<h2 class="mb-5 text-2xl font-bold text-gray-800">🔒 Trophy yang Belum Didapat</h2>
			<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{#each locked as achievement (achievement.id)}
					<div
						class="rounded-2xl border-2 border-gray-200 bg-gray-50 p-7 text-center opacity-50 shadow-md"
					>
						<div class="mb-3 text-6xl grayscale">{achievement.icon}</div>
						<h3 class="mb-2 font-bold text-gray-600">{achievement.name}</h3>
						<p class="text-xs text-gray-500">{achievement.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Tips Section -->
	<div class="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-7">
		<h3 class="mb-5 text-center text-lg font-bold text-purple-600">💡 Cara Mendapatkan Trophy</h3>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="rounded-2xl border-2 border-purple-100 bg-white p-4 shadow-sm">
				<p class="text-sm text-gray-700">
					<strong class="text-purple-600">🥇 First Explorer:</strong> Login pertama kali
				</p>
			</div>
			<div class="rounded-2xl border-2 border-pink-100 bg-white p-4 shadow-sm">
				<p class="text-sm text-gray-700">
					<strong class="text-pink-600">📝 Quote Master:</strong> Baca 5 quote motivasi
				</p>
			</div>
			<div class="rounded-2xl border-2 border-blue-100 bg-white p-4 shadow-sm">
				<p class="text-sm text-gray-700">
					<strong class="text-blue-600">🎯 Career Explorer:</strong> Jelajahi 3 karir berbeda
				</p>
			</div>
			<div class="rounded-2xl border-2 border-green-100 bg-white p-4 shadow-sm">
				<p class="text-sm text-gray-700">
					<strong class="text-green-600">🤖 AI Chatter:</strong> Chat 10x dengan AI
				</p>
			</div>
			<div class="rounded-2xl border-2 border-yellow-100 bg-white p-4 shadow-sm">
				<p class="text-sm text-gray-700">
					<strong class="text-yellow-600">✨ Dream Builder:</strong> Tulis 5 impian
				</p>
			</div>
			<div class="rounded-2xl border-2 border-indigo-100 bg-white p-4 shadow-sm">
				<p class="text-sm text-gray-700">
					<strong class="text-indigo-600">🧠 Quiz Master:</strong> Selesaikan quiz
				</p>
			</div>
			<div class="rounded-2xl border-2 border-rose-100 bg-white p-4 shadow-sm">
				<p class="text-sm text-gray-700">
					<strong class="text-rose-600">🌟 Career Master:</strong> Jelajahi semua 8 karir
				</p>
			</div>
			<div class="rounded-2xl border-2 border-cyan-100 bg-white p-4 shadow-sm">
				<p class="text-sm text-gray-700">
					<strong class="text-cyan-600">⭐ Rising Star:</strong> Capai level 5
				</p>
			</div>
		</div>
	</div>

	<!-- Motivation -->
	<div
		class="rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-7 text-center shadow-lg"
	>
		<p class="text-lg font-semibold text-purple-600">
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
