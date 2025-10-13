<script lang="ts">
	import { userProgress } from '$lib/stores/user';
	import { motivationalQuotes } from '$lib/data/motivations';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	let currentQuote = $state(
		motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
	);
	let currentMood = $state('😊');

	function getNewQuote() {
		currentQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
		userProgress.addPoints(10);
		userProgress.incrementQuoteCount();

		if ($userProgress && $userProgress.quoteCount >= 5) {
			userProgress.unlockAchievement('quote-master');
		}
	}

	function setMood(mood: string) {
		currentMood = mood;
		userProgress.addPoints(5);
	}

	const exploredCount = $derived($userProgress?.exploredCareers.length || 0);
	const totalCareers = 8;
	const dreamsCount = $derived($userProgress?.dreams.length || 0);
	const quizCompleted = $derived($userProgress?.quizCompleted || false);
</script>

<svelte:head>
	<title>Dashboard - We Will Shine</title>
</svelte:head>

<div class="space-y-6">
	<!-- Welcome Banner -->
	<div class="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white shadow-xl">
		<h2 class="mb-2 text-3xl font-bold">Selamat Datang! 🎉</h2>
		<p class="text-lg opacity-90">Yuk jelajahi dunia karir teknologi dan temukan passion-mu!</p>
	</div>

	<!-- Quick Stats Grid -->
	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		<!-- Daily Quote Card -->
		<button
			onclick={getNewQuote}
			class="rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 p-6 text-left shadow-lg transition-all hover:scale-105 hover:shadow-xl"
		>
			<div class="mb-3 text-4xl">🌅</div>
			<h3 class="mb-2 text-sm font-bold text-purple-800">Quote Hari Ini</h3>
			<p class="mb-3 text-xs text-gray-700 italic">"{currentQuote}"</p>
			<span class="text-xs font-semibold text-purple-600">Klik untuk quote baru!</span>
		</button>

		<!-- Mood Tracker -->
		<div class="rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 p-6 shadow-lg">
			<div class="mb-3 text-center text-4xl">{currentMood}</div>
			<h3 class="mb-2 text-center text-sm font-bold text-blue-800">Mood Hari Ini</h3>
			<div class="flex justify-center space-x-2">
				<button onclick={() => setMood('😢')} class="text-2xl transition-transform hover:scale-125"
					>😢</button
				>
				<button onclick={() => setMood('😐')} class="text-2xl transition-transform hover:scale-125"
					>😐</button
				>
				<button onclick={() => setMood('😊')} class="text-2xl transition-transform hover:scale-125"
					>😊</button
				>
				<button onclick={() => setMood('😄')} class="text-2xl transition-transform hover:scale-125"
					>😄</button
				>
				<button onclick={() => setMood('🤩')} class="text-2xl transition-transform hover:scale-125"
					>🤩</button
				>
			</div>
		</div>

		<!-- Career Progress -->
		<button
			onclick={() => goto(`${base}/dashboard/${$page.params.code}/careers`)}
			class="rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 p-6 text-left shadow-lg transition-all hover:scale-105 hover:shadow-xl"
		>
			<div class="mb-3 text-4xl">🎯</div>
			<h3 class="mb-2 text-sm font-bold text-green-800">Karir Terjelajah</h3>
			<div class="mb-2 text-3xl font-bold text-green-900">{exploredCount}/{totalCareers}</div>
			<div class="h-2 overflow-hidden rounded-full bg-green-200">
				<div
					class="h-full bg-green-600 transition-all"
					style="width: {(exploredCount / totalCareers) * 100}%"
				></div>
			</div>
		</button>

		<!-- Dreams Count -->
		<button
			onclick={() => goto(`${base}/dashboard/${$page.params.code}/dreams`)}
			class="rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 p-6 text-left shadow-lg transition-all hover:scale-105 hover:shadow-xl"
		>
			<div class="mb-3 text-4xl">✨</div>
			<h3 class="mb-2 text-sm font-bold text-yellow-800">Impian Kamu</h3>
			<div class="text-3xl font-bold text-yellow-900">{dreamsCount}</div>
			<p class="text-xs text-yellow-700">Impian telah dituliskan</p>
		</button>
	</div>

	<!-- Featured Actions -->
	<div class="grid gap-4 md:grid-cols-2">
		<!-- Start Quiz Card -->
		<div class="rounded-2xl bg-white p-6 shadow-lg">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-xl font-bold text-gray-800">🧠 Quiz Kepribadian</h3>
				{#if quizCompleted}
					<span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
						✓ Selesai
					</span>
				{/if}
			</div>
			<p class="mb-4 text-sm text-gray-600">
				{#if quizCompleted}
					Kamu sudah menyelesaikan quiz! Lihat hasil motivasi personalmu.
				{:else}
					Temukan karir yang cocok dengan kepribadianmu dan dapatkan motivasi personal khusus!
				{/if}
			</p>
			<a
				href="{base}/dashboard/{$page.params.code}/quiz"
				class="block w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-center font-semibold text-white transition-all hover:from-purple-600 hover:to-pink-600"
			>
				{quizCompleted ? '📝 Lihat Hasil' : '🚀 Mulai Quiz'}
			</a>
		</div>

		<!-- AI Mentor Card -->
		<div class="rounded-2xl bg-white p-6 shadow-lg">
			<div class="mb-4 flex items-center space-x-2">
				<span class="text-2xl">🤖</span>
				<h3 class="text-xl font-bold text-gray-800">AI Mentor</h3>
			</div>
			<p class="mb-4 text-sm text-gray-600">
				Punya pertanyaan tentang karir? Chat dengan AI Mentor yang siap membantu menjawab semua
				pertanyaanmu!
			</p>
			<a
				href="{base}/dashboard/{$page.params.code}/ai-mentor"
				class="block w-full rounded-xl border-2 border-purple-500 bg-white py-3 text-center font-semibold text-purple-600 transition-all hover:bg-purple-50"
			>
				💬 Mulai Chat
			</a>
		</div>
	</div>

	<!-- Motivation Section -->
	<div class="rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 p-6 shadow-lg">
		<div class="mb-4 text-center">
			<span class="text-4xl">💝</span>
		</div>
		<h3 class="mb-2 text-center text-lg font-bold text-purple-900">Pesan dari Bu Guru</h3>
		<p class="text-center text-sm text-gray-700 italic">
			"Hadiah ini dibuat dengan penuh cinta dan harapan agar kalian semua menemukan passion dan
			meraih mimpi setinggi langit. Bu Guru percaya pada potensi luar biasa yang kalian miliki!
			Ingat, masa depan cerah dimulai dari langkah kecil hari ini. Keep learning, keep growing! 🌟"
		</p>
	</div>

	<!-- Progress Tip -->
	{#if exploredCount < 3}
		<div class="rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 p-4">
			<p class="text-center text-sm text-purple-800">
				💡 <strong>Tips:</strong> Jelajahi minimal 3 karir untuk unlock quiz kepribadian!
			</p>
		</div>
	{/if}
</div>
