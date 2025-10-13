<script lang="ts">
	interface StudySession {
		date: string;
		minutes: number;
		subject: string;
	}

	let { sessions = [] as StudySession[] } = $props();

	// Group by date
	const dailyStats = $derived.by(() => {
		const grouped = sessions.reduce(
			(acc, session) => {
				const date = new Date(session.date).toLocaleDateString('id-ID', {
					day: 'numeric',
					month: 'short'
				});
				if (!acc[date]) acc[date] = 0;
				acc[date] += session.minutes;
				return acc;
			},
			{} as Record<string, number>
		);

		return Object.entries(grouped)
			.map(([date, minutes]) => ({ date, minutes }))
			.slice(-7); // Last 7 days
	});

	const maxMinutes = $derived(Math.max(...dailyStats.map((d) => d.minutes), 60));
	const totalHours = $derived(
		Math.round((sessions.reduce((sum, s) => sum + s.minutes, 0) / 60) * 10) / 10
	);
</script>

<div class="rounded-2xl border-2 border-indigo-200 bg-white p-6 shadow-lg">
	<div class="mb-4 flex items-center justify-between">
		<h3 class="text-lg font-bold text-indigo-800">⏰ Study Time</h3>
		<div class="rounded-lg bg-indigo-100 px-3 py-1">
			<span class="text-xs font-bold text-indigo-700">{totalHours}h total</span>
		</div>
	</div>

	{#if dailyStats.length > 0}
		<!-- Bar Chart -->
		<div
			class="mb-4 flex items-end justify-between gap-2 rounded-xl bg-indigo-50 p-4"
			style="height: 180px;"
		>
			{#each dailyStats as day (day.date)}
				{@const heightPercent = (day.minutes / maxMinutes) * 100}
				<div class="group flex flex-1 flex-col items-center justify-end">
					<!-- Bar -->
					<div class="relative w-full">
						<div
							class="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-purple-400 transition-all hover:from-indigo-600 hover:to-purple-500"
							style="height: {heightPercent}%"
						></div>
						<!-- Tooltip -->
						<div
							class="absolute -top-8 left-1/2 -translate-x-1/2 rounded-lg bg-gray-800 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							{Math.round(day.minutes)}m
						</div>
					</div>
					<!-- Label -->
					<p class="mt-2 text-[9px] font-medium text-indigo-700">{day.date}</p>
				</div>
			{/each}
		</div>

		<!-- Summary Stats -->
		<div class="grid grid-cols-3 gap-2">
			<div class="rounded-lg bg-indigo-50 p-2 text-center">
				<p class="text-[9px] text-indigo-600">Avg/Day</p>
				<p class="text-sm font-bold text-indigo-800">
					{Math.round(totalHours / dailyStats.length)}m
				</p>
			</div>
			<div class="rounded-lg bg-purple-50 p-2 text-center">
				<p class="text-[9px] text-purple-600">Peak Day</p>
				<p class="text-sm font-bold text-purple-800">
					{Math.max(...dailyStats.map((d) => d.minutes))}m
				</p>
			</div>
			<div class="rounded-lg bg-pink-50 p-2 text-center">
				<p class="text-[9px] text-pink-600">Sessions</p>
				<p class="text-sm font-bold text-pink-800">{sessions.length}</p>
			</div>
		</div>
	{:else}
		<!-- Empty State -->
		<div class="py-12 text-center">
			<div class="mb-2 text-4xl">⏰</div>
			<p class="text-sm text-gray-500">Belum ada data study time</p>
			<p class="mt-1 text-xs text-gray-400">Mulai belajar untuk melihat statistik!</p>
		</div>
	{/if}
</div>
