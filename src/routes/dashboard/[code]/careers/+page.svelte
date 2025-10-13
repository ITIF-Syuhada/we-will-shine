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

<div class="space-y-3">
	<!-- Header - COMPACT -->
	<div
		class="rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-3 shadow-md"
	>
		<div class="mb-2 flex items-center gap-2">
			<span class="text-2xl">🎯</span>
			<div>
				<h1 class="text-sm font-bold text-gray-800">Jelajah Karir Teknologi</h1>
				<p class="text-[10px] text-gray-600">8 profesi tech dengan perspektif Islam!</p>
			</div>
		</div>
		<div class="flex items-center space-x-2">
			<div class="flex-1 overflow-hidden rounded-full bg-white/60">
				<div
					class="h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500"
					style="width: {(exploredCareerIds.length / careers.length) * 100}%"
				></div>
			</div>
			<span class="text-[10px] font-bold text-purple-600">
				{exploredCareerIds.length}/{careers.length}
			</span>
		</div>
	</div>

	<!-- Careers Grid - COMPACT (4 columns on mobile) -->
	<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
		{#each careers as career (career.id)}
			{@const isExplored = exploredCareerIds.includes(career.id)}
			{@const borderColors = [
				'border-purple-200 active:border-purple-300',
				'border-pink-200 active:border-pink-300',
				'border-blue-200 active:border-blue-300',
				'border-green-200 active:border-green-300',
				'border-yellow-200 active:border-yellow-300',
				'border-indigo-200 active:border-indigo-300',
				'border-rose-200 active:border-rose-300',
				'border-cyan-200 active:border-cyan-300'
			]}
			{@const bgColors = [
				'from-purple-50 to-purple-100/50',
				'from-pink-50 to-pink-100/50',
				'from-blue-50 to-blue-100/50',
				'from-green-50 to-green-100/50',
				'from-yellow-50 to-yellow-100/50',
				'from-indigo-50 to-indigo-100/50',
				'from-rose-50 to-rose-100/50',
				'from-cyan-50 to-cyan-100/50'
			]}
			<button
				onclick={() => handleCareerClick(career.id)}
				class="group relative rounded-xl border-2 {borderColors[
					(career.id - 1) % 8
				]} bg-gradient-to-br {bgColors[
					(career.id - 1) % 8
				]} p-3 text-left shadow-sm transition-all active:scale-95 {isExplored
					? 'ring-2 ring-purple-400 ring-offset-1'
					: ''}"
			>
				<!-- Badge for explored -->
				{#if isExplored}
					<div
						class="absolute top-1 right-1 rounded-full border border-purple-200 bg-purple-100 px-1.5 py-0.5 text-[8px] font-bold text-purple-600"
					>
						✓
					</div>
				{/if}

				<!-- Career Icon -->
				<div class="mb-1.5 text-center text-3xl transition-transform group-active:scale-110">
					{career.emoji}
				</div>

				<!-- Career Title -->
				<h3 class="mb-1 line-clamp-2 text-center text-[10px] font-bold text-gray-800">
					{career.title}
				</h3>

				<!-- Career Description -->
				<p class="mb-1.5 line-clamp-2 text-center text-[9px] leading-relaxed text-gray-600">
					{career.description}
				</p>

				<!-- View More Arrow -->
				<div class="flex justify-center">
					<span
						class="text-xs font-bold text-purple-500 transition-transform group-active:translate-x-1"
					>
						→
					</span>
				</div>
			</button>
		{/each}
	</div>

	<!-- Tips Section - COMPACT -->
	<div class="rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-2">
		<h3 class="mb-1.5 text-center text-[11px] font-bold text-purple-600">💡 Tips Eksplorasi</h3>
		<ul class="space-y-1 text-[10px] text-gray-700">
			<li class="flex items-start gap-1.5">
				<span class="text-purple-400">✨</span>
				<span>Klik karir untuk detail lengkap</span>
			</li>
			<li class="flex items-start gap-1.5">
				<span class="text-pink-400">✨</span>
				<span>Lihat skill & jalur karir</span>
			</li>
			<li class="flex items-start gap-1.5">
				<span class="text-blue-400">✨</span>
				<span>Perhatikan nilai Islam</span>
			</li>
			<li class="flex items-start gap-1.5">
				<span class="text-green-400">✨</span>
				<span>Jelajahi 3 karir untuk unlock quiz!</span>
			</li>
		</ul>
	</div>
</div>
