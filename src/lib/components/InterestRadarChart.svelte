<script lang="ts">
	interface Interest {
		topic: string;
		score: number;
	}

	let { interests = [] as Interest[] } = $props();

	// Normalize scores to percentage
	const normalizedInterests = $derived(
		interests.slice(0, 6).map((item) => ({
			...item,
			percentage: Math.round(item.score * 100)
		}))
	);

	// Colors for each interest
	const colors = [
		'from-purple-400 to-purple-600',
		'from-pink-400 to-pink-600',
		'from-blue-400 to-blue-600',
		'from-green-400 to-green-600',
		'from-yellow-400 to-yellow-600',
		'from-red-400 to-red-600'
	];
</script>

<div class="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
	<h3 class="mb-4 text-lg font-bold text-purple-800">🎯 Interest Radar</h3>

	{#if normalizedInterests.length > 0}
		<!-- Circular Interest Visualization -->
		<div class="mb-6">
			<div class="relative mx-auto" style="width: 250px; height: 250px;">
				<!-- Center Circle -->
				<div
					class="absolute top-1/2 left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg"
				>
					<span class="text-2xl">🎯</span>
				</div>

				<!-- Interest Segments -->
				{#each normalizedInterests as interest, i (interest.topic)}
					{@const angle = (360 / normalizedInterests.length) * i}
					{@const radius = 100}
					{@const barLength = (interest.percentage / 100) * radius}

					<!-- Radial Bar -->
					<div
						class="absolute top-1/2 left-1/2 origin-left transition-all hover:scale-110"
						style="
              transform: translate(-50%, -50%) rotate({angle}deg);
              width: {barLength}px;
              height: 8px;
            "
					>
						<div class="h-full rounded-r-full bg-gradient-to-r {colors[i]} opacity-80"></div>
					</div>

					<!-- Label -->
					<div
						class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
						style="
              transform: translate(-50%, -50%) 
                        translate({Math.cos((angle - 90) * (Math.PI / 180)) * 120}px, 
                                 {Math.sin((angle - 90) * (Math.PI / 180)) * 120}px);
            "
					>
						<div
							class="rounded-lg border-2 border-white bg-white/90 px-2 py-1 text-center whitespace-nowrap shadow-md"
						>
							<p class="text-[9px] font-bold text-gray-800 capitalize">{interest.topic}</p>
							<p class="text-[10px] font-bold text-purple-600">{interest.percentage}%</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Interest List -->
		<div class="space-y-2">
			{#each normalizedInterests as interest, i (interest.topic)}
				<div class="flex items-center gap-2">
					<div class="h-3 w-3 flex-shrink-0 rounded-full bg-gradient-to-r {colors[i]}"></div>
					<div class="flex-1">
						<div class="flex items-center justify-between">
							<span class="text-sm font-medium text-gray-700 capitalize">{interest.topic}</span>
							<span class="text-xs text-gray-500">{interest.percentage}%</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Empty State -->
		<div class="py-12 text-center">
			<div class="mb-2 text-4xl">🎯</div>
			<p class="text-sm text-gray-500">Belum ada data interest</p>
			<p class="mt-1 text-xs text-gray-400">Chat lebih banyak untuk mapping minatmu!</p>
		</div>
	{/if}
</div>
