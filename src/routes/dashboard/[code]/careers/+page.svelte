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
	<!-- Header dengan warna lebih soft -->
	<div
		class="rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-8 shadow-lg"
	>
		<div class="mb-4 flex items-center gap-4">
			<span class="text-5xl">🎯</span>
			<div>
				<h1 class="mb-1 text-3xl font-bold text-gray-800">Jelajah Karir Teknologi</h1>
				<p class="text-gray-600">Explore 8 profesi teknologi masa depan dengan perspektif Islam!</p>
			</div>
		</div>
		<div class="flex items-center space-x-3">
			<div class="flex-1 overflow-hidden rounded-full bg-white/60">
				<div
					class="h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500"
					style="width: {(exploredCareerIds.length / careers.length) * 100}%"
				></div>
			</div>
			<span class="text-sm font-bold text-purple-600">
				{exploredCareerIds.length}/{careers.length}
			</span>
		</div>
	</div>

	<!-- Careers Grid dengan warna playful -->
	<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
		{#each careers as career (career.id)}
			{@const isExplored = exploredCareerIds.includes(career.id)}
			{@const borderColors = [
				'border-purple-200 hover:border-purple-300',
				'border-pink-200 hover:border-pink-300',
				'border-blue-200 hover:border-blue-300',
				'border-green-200 hover:border-green-300',
				'border-yellow-200 hover:border-yellow-300',
				'border-indigo-200 hover:border-indigo-300',
				'border-rose-200 hover:border-rose-300',
				'border-cyan-200 hover:border-cyan-300'
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
				class="group relative rounded-2xl border-2 {borderColors[
					(career.id - 1) % 8
				]} bg-gradient-to-br {bgColors[
					(career.id - 1) % 8
				]} p-6 text-left shadow-md transition-all hover:scale-105 hover:shadow-xl {isExplored
					? 'ring-2 ring-purple-400 ring-offset-2'
					: ''}"
			>
				<!-- Badge for explored -->
				{#if isExplored}
					<div
						class="absolute top-3 right-3 rounded-full border-2 border-purple-200 bg-purple-100 px-3 py-1 text-xs font-bold text-purple-600 shadow-sm"
					>
						✓ Terjelajah
					</div>
				{/if}

				<!-- Career Icon -->
				<div class="mb-4 text-center text-5xl transition-transform group-hover:scale-110">
					{career.emoji}
				</div>

				<!-- Career Title -->
				<h3 class="mb-2 text-center text-lg font-bold text-gray-800">{career.title}</h3>

				<!-- Career Description -->
				<p class="mb-3 line-clamp-2 text-center text-xs leading-relaxed text-gray-600">
					{career.description}
				</p>

				<!-- View More Arrow -->
				<div class="flex justify-center">
					<span class="font-bold text-purple-500 transition-transform group-hover:translate-x-1">
						→
					</span>
				</div>
			</button>
		{/each}
	</div>

	<!-- Tips Section dengan warna lembut -->
	<div class="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-7">
		<h3 class="mb-4 text-center text-lg font-bold text-purple-600">💡 Tips Eksplorasi</h3>
		<ul class="space-y-3 text-sm text-gray-700">
			<li class="flex items-start gap-3">
				<span class="mt-0.5 text-purple-400">✨</span>
				<span>Klik setiap karir untuk melihat detail lengkap</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 text-pink-400">✨</span>
				<span>Cari tahu skill yang dibutuhkan dan jalur karirnya</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 text-blue-400">✨</span>
				<span>Perhatikan nilai Islam dalam setiap profesi</span>
			</li>
			<li class="flex items-start gap-3">
				<span class="mt-0.5 text-green-400">✨</span>
				<span>Jelajahi minimal 3 karir untuk unlock quiz kepribadian!</span>
			</li>
		</ul>
	</div>
</div>
