<script lang="ts">
	import { careers } from '$lib/data/careers';
	import { userProgress } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	const exploredCareerIds = $derived($userProgress?.exploredCareers || []);

	function handleCareerClick(careerId: number) {
		// Mark as explored
		if (!exploredCareerIds.includes(careerId)) {
			userProgress.exploreCareer(careerId);
			userProgress.addPoints(25);

			// Check for achievements
			const exploredCount = ($userProgress?.exploredCareers.length || 0) + 1;
			if (exploredCount >= 3) {
				userProgress.unlockAchievement('career-explorer');
			}
			if (exploredCount >= 8) {
				userProgress.unlockAchievement('all-careers');
			}
		}

		// Navigate to detail page
		goto(`${base}/dashboard/${$page.params.code}/careers/${careerId}`);
	}
</script>

<svelte:head>
	<title>Jelajah Karir - We Will Shine</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div class="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white shadow-lg">
		<h1 class="mb-2 text-3xl font-bold">🎯 Jelajah Karir Teknologi</h1>
		<p class="mb-4 opacity-90">Explore 8 profesi teknologi masa depan dengan perspektif Islam!</p>
		<div class="flex items-center space-x-2">
			<div class="flex-1 overflow-hidden rounded-full bg-white/30">
				<div
					class="h-2 bg-yellow-400 transition-all duration-500"
					style="width: {(exploredCareerIds.length / careers.length) * 100}%"
				></div>
			</div>
			<span class="text-sm font-semibold">
				{exploredCareerIds.length}/{careers.length}
			</span>
		</div>
	</div>

	<!-- Careers Grid -->
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		{#each careers as career (career.id)}
			{@const isExplored = exploredCareerIds.includes(career.id)}
			<button
				onclick={() => handleCareerClick(career.id)}
				class="group relative rounded-2xl bg-white p-6 text-left shadow-lg transition-all hover:scale-105 hover:shadow-xl {isExplored
					? 'ring-2 ring-purple-500'
					: ''}"
			>
				<!-- Badge for explored -->
				{#if isExplored}
					<div
						class="absolute top-2 right-2 rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-800"
					>
						✓ Explored
					</div>
				{/if}

				<!-- Career Icon -->
				<div class="mb-4 text-center text-5xl transition-transform group-hover:scale-110">
					{career.emoji}
				</div>

				<!-- Career Title -->
				<h3 class="mb-2 text-center text-lg font-bold text-gray-800">{career.title}</h3>

				<!-- Career Description -->
				<p class="mb-3 line-clamp-2 text-center text-xs text-gray-600">{career.description}</p>

				<!-- View More Arrow -->
				<div class="flex justify-center">
					<span class="text-purple-500">→</span>
				</div>
			</button>
		{/each}
	</div>

	<!-- Tips Section -->
	<div class="rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 p-6">
		<h3 class="mb-2 text-center text-lg font-bold text-purple-900">💡 Tips Eksplorasi</h3>
		<ul class="space-y-2 text-sm text-gray-700">
			<li>✅ Klik setiap karir untuk melihat detail lengkap</li>
			<li>✅ Cari tahu skill yang dibutuhkan dan jalur karirnya</li>
			<li>✅ Perhatikan nilai Islam dalam setiap profesi</li>
			<li>✅ Jelajahi minimal 3 karir untuk unlock quiz kepribadian!</li>
		</ul>
	</div>
</div>
