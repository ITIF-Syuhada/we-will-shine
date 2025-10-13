<script lang="ts">
	interface MoodData {
		date: string;
		mood: string;
		confidence: number;
	}

	let { moodTrend = [] as MoodData[] } = $props();

	// Get last 7 days
	const recentMoods = $derived(moodTrend.slice(-7));

	// Mood emoji mapping
	const moodEmojis: Record<string, string> = {
		excited: '🤩',
		happy: '😊',
		curious: '🤔',
		neutral: '😐',
		confused: '😕',
		frustrated: '😣',
		sad: '😢'
	};

	// Mood color mapping
	const moodColors: Record<string, string> = {
		excited: 'from-yellow-400 to-orange-400',
		happy: 'from-green-400 to-emerald-400',
		curious: 'from-blue-400 to-cyan-400',
		neutral: 'from-gray-400 to-slate-400',
		confused: 'from-purple-400 to-indigo-400',
		frustrated: 'from-red-400 to-rose-400',
		sad: 'from-blue-500 to-purple-500'
	};
</script>

<div class="rounded-2xl border-2 border-pink-200 bg-white p-6 shadow-lg">
	<h3 class="mb-4 text-lg font-bold text-pink-800">😊 Mood Timeline</h3>

	{#if recentMoods.length > 0}
		<!-- Mood Timeline -->
		<div class="mb-6">
			<div class="flex items-center justify-between gap-2">
				{#each recentMoods as mood (mood.date)}
					<div class="group flex flex-1 flex-col items-center">
						<!-- Mood Emoji -->
						<div
							class="relative mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br {moodColors[
								mood.mood
							] || 'from-gray-400 to-gray-600'} text-2xl shadow-md transition-all hover:scale-110"
						>
							{moodEmojis[mood.mood] || '😐'}

							<!-- Confidence Indicator -->
							<div
								class="absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-white text-[10px]"
							>
								{Math.round(mood.confidence * 100)}
							</div>
						</div>

						<!-- Date -->
						<p class="text-[9px] text-gray-500">
							{new Date(mood.date).toLocaleDateString('id-ID', {
								day: 'numeric',
								month: 'short'
							})}
						</p>

						<!-- Mood Label -->
						<p
							class="text-[8px] font-medium text-gray-600 capitalize opacity-0 transition-opacity group-hover:opacity-100"
						>
							{mood.mood}
						</p>
					</div>
				{/each}
			</div>

			<!-- Timeline Line -->
			<div class="relative mt-4 h-1 w-full rounded-full bg-gray-200">
				<div
					class="h-full rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
					style="width: {(recentMoods.length / 7) * 100}%"
				></div>
			</div>
		</div>

		<!-- Mood Summary -->
		<div class="grid grid-cols-3 gap-2">
			<div class="rounded-lg bg-green-50 p-3 text-center">
				<p class="text-[9px] text-green-600">Positive</p>
				<p class="text-lg font-bold text-green-700">
					{recentMoods.filter((m) => ['excited', 'happy'].includes(m.mood)).length}
				</p>
			</div>
			<div class="rounded-lg bg-blue-50 p-3 text-center">
				<p class="text-[9px] text-blue-600">Neutral</p>
				<p class="text-lg font-bold text-blue-700">
					{recentMoods.filter((m) => ['curious', 'neutral'].includes(m.mood)).length}
				</p>
			</div>
			<div class="rounded-lg bg-red-50 p-3 text-center">
				<p class="text-[9px] text-red-600">Needs Support</p>
				<p class="text-lg font-bold text-red-700">
					{recentMoods.filter((m) => ['confused', 'frustrated', 'sad'].includes(m.mood)).length}
				</p>
			</div>
		</div>
	{:else}
		<!-- Empty State -->
		<div class="py-12 text-center">
			<div class="mb-2 text-4xl">😊</div>
			<p class="text-sm text-gray-500">Belum ada data mood</p>
			<p class="mt-1 text-xs text-gray-400">AI akan tracking mood dari chat!</p>
		</div>
	{/if}
</div>
