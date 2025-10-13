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
	<!-- Welcome Banner yang lebih soft -->
	<div
		class="rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-8 shadow-xl"
	>
		<div class="flex items-center gap-4">
			<span class="text-5xl">👋</span>
			<div>
				<h2 class="mb-1 text-3xl font-bold text-gray-800">Selamat Datang!</h2>
				<p class="text-lg text-gray-600">
					Yuk jelajahi dunia karir teknologi dan temukan passion-mu!
				</p>
			</div>
		</div>
	</div>

	<!-- Quick Stats Grid dengan warna lembut -->
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<!-- Daily Quote Card -->
		<button
			onclick={getNewQuote}
			class="group rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-6 text-left shadow-md transition-all hover:scale-105 hover:border-purple-200 hover:shadow-xl"
		>
			<div class="mb-3 text-4xl transition-transform group-hover:scale-110">🌅</div>
			<h3 class="mb-2 text-sm font-bold text-purple-600">Quote Hari Ini</h3>
			<p class="mb-3 text-xs leading-relaxed text-gray-700 italic">"{currentQuote}"</p>
			<span class="text-xs font-semibold text-purple-500">Klik untuk quote baru! ✨</span>
		</button>

		<!-- Mood Tracker -->
		<div
			class="rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 shadow-md"
		>
			<div class="mb-3 text-center text-4xl">{currentMood}</div>
			<h3 class="mb-3 text-center text-sm font-bold text-blue-600">Mood Hari Ini</h3>
			<div class="flex justify-center space-x-2">
				<button
					onclick={() => setMood('😢')}
					class="text-2xl transition-transform hover:scale-125 active:scale-110"
				>
					😢
				</button>
				<button
					onclick={() => setMood('😐')}
					class="text-2xl transition-transform hover:scale-125 active:scale-110"
				>
					😐
				</button>
				<button
					onclick={() => setMood('😊')}
					class="text-2xl transition-transform hover:scale-125 active:scale-110"
				>
					😊
				</button>
				<button
					onclick={() => setMood('😄')}
					class="text-2xl transition-transform hover:scale-125 active:scale-110"
				>
					😄
				</button>
				<button
					onclick={() => setMood('🤩')}
					class="text-2xl transition-transform hover:scale-125 active:scale-110"
				>
					🤩
				</button>
			</div>
		</div>

		<!-- Career Progress -->
		<button
			onclick={() => goto(`${base}/dashboard/${$page.params.code}/careers`)}
			class="group rounded-2xl border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6 text-left shadow-md transition-all hover:scale-105 hover:border-green-200 hover:shadow-xl"
		>
			<div class="mb-3 text-4xl transition-transform group-hover:scale-110">🎯</div>
			<h3 class="mb-2 text-sm font-bold text-green-600">Karir Terjelajah</h3>
			<div class="mb-2 text-3xl font-bold text-green-700">
				{exploredCount}/{totalCareers}
			</div>
			<div class="h-2.5 overflow-hidden rounded-full bg-green-200">
				<div
					class="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-400 transition-all duration-500"
					style="width: {(exploredCount / totalCareers) * 100}%"
				></div>
			</div>
		</button>

		<!-- Dreams Count -->
		<button
			onclick={() => goto(`${base}/dashboard/${$page.params.code}/dreams`)}
			class="group rounded-2xl border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 text-left shadow-md transition-all hover:scale-105 hover:border-yellow-200 hover:shadow-xl"
		>
			<div class="mb-3 text-4xl transition-transform group-hover:scale-110">✨</div>
			<h3 class="mb-2 text-sm font-bold text-yellow-600">Impian Kamu</h3>
			<div class="text-3xl font-bold text-yellow-700">{dreamsCount}</div>
			<p class="text-xs text-yellow-600">Impian telah dituliskan</p>
		</button>
	</div>

	<!-- Featured Actions dengan design card yang lebih soft -->
	<div class="grid gap-5 md:grid-cols-2">
		<!-- Start Quiz Card -->
		<div class="rounded-2xl border-2 border-purple-100 bg-white p-7 shadow-lg">
			<div class="mb-5 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="rounded-full bg-purple-100 p-2.5">
						<span class="text-2xl">🧠</span>
					</div>
					<h3 class="text-xl font-bold text-gray-800">Quiz Kepribadian</h3>
				</div>
				{#if quizCompleted}
					<span
						class="rounded-full border-2 border-green-200 bg-green-50 px-3 py-1 text-xs font-bold text-green-600"
					>
						✓ Selesai
					</span>
				{/if}
			</div>
			<p class="mb-5 text-sm leading-relaxed text-gray-600">
				{#if quizCompleted}
					Kamu sudah menyelesaikan quiz! Lihat hasil motivasi personalmu yang penuh inspirasi.
				{:else}
					Temukan karir yang cocok dengan kepribadianmu dan dapatkan motivasi personal khusus
					untukmu!
				{/if}
			</p>
			<a
				href="{base}/dashboard/{$page.params.code}/quiz"
				class="block w-full rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 py-3.5 text-center font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
			>
				{quizCompleted ? '📝 Lihat Hasil Quiz' : '🚀 Mulai Quiz Sekarang'}
			</a>
		</div>

		<!-- AI Mentor Card -->
		<div class="rounded-2xl border-2 border-blue-100 bg-white p-7 shadow-lg">
			<div class="mb-5 flex items-center gap-3">
				<div class="rounded-full bg-blue-100 p-2.5">
					<span class="text-2xl">🤖</span>
				</div>
				<h3 class="text-xl font-bold text-gray-800">AI Mentor</h3>
			</div>
			<p class="mb-5 text-sm leading-relaxed text-gray-600">
				Punya pertanyaan tentang karir? Chat dengan AI Mentor yang siap membantu menjawab semua
				pertanyaanmu kapan saja!
			</p>
			<a
				href="{base}/dashboard/{$page.params.code}/ai-mentor"
				class="block w-full rounded-2xl border-2 border-blue-400 bg-white py-3.5 text-center font-bold text-blue-600 shadow-md transition-all hover:bg-blue-50 hover:shadow-lg"
			>
				💬 Mulai Chat Sekarang
			</a>
		</div>
	</div>

	<!-- Pesan dari Ustadz/Ustadzah -->
	<div
		class="rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8 shadow-lg"
	>
		<div class="mb-4 text-center">
			<span class="text-5xl">💝</span>
		</div>
		<h3 class="mb-3 text-center text-xl font-bold text-purple-600">Pesan dari Ustadz & Ustadzah</h3>
		<p class="text-center text-sm leading-relaxed text-gray-700 italic">
			"Hadiah ini dibuat dengan penuh cinta dan harapan agar kalian semua menemukan passion dan
			meraih mimpi setinggi langit. Kami percaya pada potensi luar biasa yang kalian miliki! Ingat,
			masa depan cerah dimulai dari langkah kecil hari ini. Keep learning, keep growing! 🌟"
		</p>
	</div>

	<!-- Progress Tip -->
	{#if exploredCount < 3}
		<div
			class="animate-pulse-slow rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/50 p-5 text-center"
		>
			<p class="text-sm text-purple-700">
				💡 <strong>Tips:</strong> Jelajahi minimal 3 karir untuk unlock quiz kepribadian!
			</p>
		</div>
	{/if}
</div>

<style>
	.animate-pulse-slow {
		animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}
</style>
