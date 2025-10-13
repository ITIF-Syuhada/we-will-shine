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

<div class="space-y-3">
	<!-- Quote Hari Ini - FULL WIDTH -->
	<button
		onclick={getNewQuote}
		class="group w-full rounded-xl border-2 border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 p-3 text-left shadow-sm transition-all active:scale-[0.99]"
	>
		<div class="flex items-start gap-2">
			<div class="flex-shrink-0 text-2xl transition-transform group-active:scale-110">🌅</div>
			<div class="min-w-0 flex-1">
				<h3 class="mb-1 text-xs font-bold text-purple-600">Quote Hari Ini</h3>
				<p class="text-[10px] leading-relaxed text-gray-700 italic">"{currentQuote}"</p>
			</div>
		</div>
	</button>

	<!-- Selamat Datang + Mood - 1 Baris (2 kolom) -->
	<div class="grid grid-cols-2 gap-2">
		<!-- Selamat Datang - Compact -->
		<div
			class="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-3 shadow-sm"
		>
			<div class="text-center">
				<span class="mb-1 block text-2xl">👋</span>
				<h2 class="text-xs font-bold text-gray-800">Selamat Datang!</h2>
				<p class="text-[9px] text-gray-600">Explore karir!</p>
			</div>
		</div>

		<!-- Mood Tracker - Compact -->
		<div
			class="rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-3 text-center shadow-sm"
		>
			<div class="mb-1 text-2xl">{currentMood}</div>
			<h3 class="mb-2 text-[10px] font-bold text-blue-600">Mood</h3>
			<div class="flex justify-center space-x-0.5">
				<button onclick={() => setMood('😢')} class="text-sm transition-transform active:scale-125">
					😢
				</button>
				<button onclick={() => setMood('😊')} class="text-sm transition-transform active:scale-125">
					😊
				</button>
				<button onclick={() => setMood('🤩')} class="text-sm transition-transform active:scale-125">
					🤩
				</button>
			</div>
		</div>
	</div>

	<!-- Karir + Impian - 1 Baris (2 kolom) -->
	<div class="grid grid-cols-2 gap-2">
		<!-- Career Progress - Compact -->
		<button
			onclick={() => goto(`${base}/dashboard/${$page.params.code}/careers`)}
			class="group rounded-xl border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-3 text-center shadow-sm transition-all active:scale-95"
		>
			<div class="mb-1 text-2xl transition-transform group-active:scale-110">🎯</div>
			<h3 class="mb-1 text-[10px] font-bold text-green-600">Karir</h3>
			<div class="mb-1 text-lg font-bold text-green-700">
				{exploredCount}/{totalCareers}
			</div>
			<div class="mx-auto h-1 w-full max-w-[60px] overflow-hidden rounded-full bg-green-200">
				<div
					class="h-full rounded-full bg-green-400 transition-all"
					style="width: {(exploredCount / totalCareers) * 100}%"
				></div>
			</div>
		</button>

		<!-- Dreams Count - Compact -->
		<button
			onclick={() => goto(`${base}/dashboard/${$page.params.code}/dreams`)}
			class="group rounded-xl border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50 p-3 text-center shadow-sm transition-all active:scale-95"
		>
			<div class="mb-1 text-2xl transition-transform group-active:scale-110">✨</div>
			<h3 class="mb-1 text-[10px] font-bold text-yellow-600">Impian</h3>
			<div class="text-lg font-bold text-yellow-700">{dreamsCount}</div>
			<p class="text-[9px] text-yellow-600">tertulis</p>
		</button>
	</div>

	<!-- Compact Featured Actions -->
	<div class="space-y-2">
		<!-- Quiz Card - Compact -->
		<div class="rounded-xl border-2 border-purple-100 bg-white p-3 shadow-sm">
			<div class="mb-2 flex items-center justify-between">
				<div class="flex items-center gap-2">
					<div class="rounded-lg bg-purple-100 p-1">
						<span class="text-lg">🧠</span>
					</div>
					<h3 class="text-xs font-bold text-gray-800">Quiz Kepribadian</h3>
				</div>
				{#if quizCompleted}
					<span
						class="rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[9px] font-bold text-green-600"
					>
						✓
					</span>
				{/if}
			</div>
			<p class="mb-2 text-[11px] leading-relaxed text-gray-600">
				{#if quizCompleted}
					Lihat hasil motivasi personalmu yang penuh inspirasi.
				{:else}
					Dapatkan motivasi personal khusus untukmu!
				{/if}
			</p>
			<a
				href="{base}/dashboard/{$page.params.code}/quiz"
				class="block w-full rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 py-2 text-center text-xs font-bold text-white shadow-sm transition-all active:scale-95"
			>
				{quizCompleted ? '📝 Lihat Hasil' : '🚀 Mulai Quiz'}
			</a>
		</div>

		<!-- AI Mentor Card - Compact -->
		<div class="rounded-xl border-2 border-blue-100 bg-white p-3 shadow-sm">
			<div class="mb-2 flex items-center gap-2">
				<div class="rounded-lg bg-blue-100 p-1">
					<span class="text-lg">🤖</span>
				</div>
				<h3 class="text-xs font-bold text-gray-800">AI Mentor</h3>
			</div>
			<p class="mb-2 text-[11px] leading-relaxed text-gray-600">
				Chat untuk tanya jawab tentang karir kapan saja!
			</p>
			<a
				href="{base}/dashboard/{$page.params.code}/ai-mentor"
				class="block w-full rounded-lg border-2 border-blue-400 bg-white py-2 text-center text-xs font-bold text-blue-600 shadow-sm transition-all active:scale-95"
			>
				💬 Mulai Chat
			</a>
		</div>

		<!-- Analytics Card - NEW -->
		<div class="rounded-xl border-2 border-purple-100 bg-white p-3 shadow-sm">
			<div class="mb-2 flex items-center gap-2">
				<div class="rounded-lg bg-purple-100 p-1">
					<span class="text-lg">📊</span>
				</div>
				<h3 class="text-xs font-bold text-gray-800">Analytics</h3>
			</div>
			<p class="mb-2 text-[11px] leading-relaxed text-gray-600">
				Lihat progress belajar dan pola minatmu!
			</p>
			<a
				href="{base}/dashboard/{$page.params.code}/analytics"
				class="block w-full rounded-lg border-2 border-purple-400 bg-white py-2 text-center text-xs font-bold text-purple-600 shadow-sm transition-all active:scale-95"
			>
				📈 Lihat Progress
			</a>
		</div>
	</div>

	<!-- Compact Message from Teachers -->
	<div
		class="rounded-xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 shadow-sm"
	>
		<div class="mb-2 text-center">
			<span class="text-2xl">💝</span>
		</div>
		<h3 class="mb-2 text-center text-xs font-bold text-purple-600">Pesan dari Ustadz & Ustadzah</h3>
		<p class="text-center text-[11px] leading-relaxed text-gray-700 italic">
			"Hadiah ini dibuat dengan penuh cinta dan harapan agar kalian semua menemukan passion dan
			meraih mimpi setinggi langit. Kami percaya pada potensi luar biasa yang kalian miliki! 🌟"
		</p>
	</div>

	<!-- Compact Progress Tip -->
	{#if exploredCount < 3}
		<div
			class="rounded-lg border-2 border-dashed border-purple-200 bg-purple-50/50 p-2 text-center"
		>
			<p class="text-[10px] text-purple-700">💡 Jelajahi 3 karir untuk unlock quiz!</p>
		</div>
	{/if}
</div>
