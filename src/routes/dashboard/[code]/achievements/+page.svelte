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

<div class="space-y-3">
	<!-- Header - COMPACT -->
	<div
		class="rounded-2xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100 p-3 shadow-md"
	>
		<div class="flex items-center gap-2">
			<span class="text-2xl">🏆</span>
			<div>
				<h1 class="text-sm font-bold text-gray-800">Pencapaian & Trophy</h1>
				<p class="text-[10px] text-gray-600">Kumpulkan semua trophy!</p>
			</div>
		</div>
	</div>

	<!-- Stats Grid - COMPACT -->
	<div class="grid grid-cols-3 gap-2">
		<div
			class="rounded-xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-purple-100/50 p-2 text-center shadow-sm"
		>
			<div class="text-lg font-bold text-purple-600">{points}</div>
			<div class="text-[9px] font-semibold text-purple-500">Points</div>
		</div>
		<div
			class="rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 p-2 text-center shadow-sm"
		>
			<div class="text-lg font-bold text-blue-600">Lv.{level}</div>
			<div class="text-[9px] font-semibold text-blue-500">Level</div>
		</div>
		<div
			class="rounded-xl border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-2 text-center shadow-sm"
		>
			<div class="text-lg font-bold text-yellow-600">
				{unlocked.length}/{achievements.length}
			</div>
			<div class="text-[9px] font-semibold text-yellow-500">Trophy</div>
		</div>
	</div>

	<!-- Unlocked Achievements - COMPACT -->
	{#if unlocked.length > 0}
		<div>
			<h2 class="mb-2 text-xs font-bold text-gray-800">✨ Trophy Didapat</h2>
			<div class="grid grid-cols-4 gap-2">
				{#each unlocked as achievement (achievement.id)}
					<div
						class="animate-bounce-in rounded-xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-2 text-center shadow-sm"
					>
						<div class="mb-1 text-2xl">{achievement.icon}</div>
						<h3 class="mb-0.5 line-clamp-1 text-[10px] font-bold text-yellow-700">
							{achievement.name}
						</h3>
						<p class="line-clamp-2 text-[8px] text-yellow-600">{achievement.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Locked Achievements - COMPACT -->
	{#if achievements.filter((a) => !a.unlocked).length > 0}
		{@const locked = achievements.filter((a) => !a.unlocked)}
		<div>
			<h2 class="mb-2 text-xs font-bold text-gray-800">🔒 Trophy Belum Didapat</h2>
			<div class="grid grid-cols-4 gap-2">
				{#each locked as achievement (achievement.id)}
					<div
						class="rounded-xl border-2 border-gray-200 bg-gray-50 p-2 text-center opacity-50 shadow-sm"
					>
						<div class="mb-1 text-2xl grayscale">{achievement.icon}</div>
						<h3 class="mb-0.5 line-clamp-1 text-[10px] font-bold text-gray-600">
							{achievement.name}
						</h3>
						<p class="line-clamp-2 text-[8px] text-gray-500">{achievement.description}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Tips Section - COMPACT -->
	<div class="rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-2">
		<h3 class="mb-2 text-center text-[11px] font-bold text-purple-600">💡 Cara Dapat Trophy</h3>
		<div class="grid grid-cols-2 gap-1.5">
			<div class="rounded-lg border-2 border-purple-100 bg-white p-1.5">
				<p class="text-[9px] text-gray-700">
					<strong class="text-purple-600">🥇</strong> Login pertama
				</p>
			</div>
			<div class="rounded-lg border-2 border-pink-100 bg-white p-1.5">
				<p class="text-[9px] text-gray-700">
					<strong class="text-pink-600">📝</strong> 5 quote
				</p>
			</div>
			<div class="rounded-lg border-2 border-blue-100 bg-white p-1.5">
				<p class="text-[9px] text-gray-700">
					<strong class="text-blue-600">🎯</strong> 3 karir
				</p>
			</div>
			<div class="rounded-lg border-2 border-green-100 bg-white p-1.5">
				<p class="text-[9px] text-gray-700">
					<strong class="text-green-600">🤖</strong> Chat 10x
				</p>
			</div>
			<div class="rounded-lg border-2 border-yellow-100 bg-white p-1.5">
				<p class="text-[9px] text-gray-700">
					<strong class="text-yellow-600">✨</strong> 5 impian
				</p>
			</div>
			<div class="rounded-lg border-2 border-indigo-100 bg-white p-1.5">
				<p class="text-[9px] text-gray-700">
					<strong class="text-indigo-600">🧠</strong> Quiz
				</p>
			</div>
			<div class="rounded-lg border-2 border-rose-100 bg-white p-1.5">
				<p class="text-[9px] text-gray-700">
					<strong class="text-rose-600">🌟</strong> 8 karir
				</p>
			</div>
			<div class="rounded-lg border-2 border-cyan-100 bg-white p-1.5">
				<p class="text-[9px] text-gray-700">
					<strong class="text-cyan-600">⭐</strong> Level 5
				</p>
			</div>
		</div>
	</div>

	<!-- Motivation - COMPACT -->
	<div
		class="rounded-xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-3 text-center shadow-sm"
	>
		<p class="text-[11px] font-semibold text-purple-600">
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
