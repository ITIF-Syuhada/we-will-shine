<script lang="ts">
	import { userProgress } from '$lib/stores/user';
	import { questionnaire } from '$lib/data/questionnaire';
	import { generatePersonalMotivation } from '$lib/data/motivations';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let currentQuestion = $state(0);
	let answers = $state<string[]>([]);
	let showResult = $state(false);
	let personalMotivation = $state('');

	const isQuizCompleted = $derived($userProgress?.quizCompleted || false);
	const savedMotivation = $derived($userProgress?.personalMotivation || '');
	const firstName = $derived($userProgress?.studentName.split(' ')[0] || '');

	// Check if should show saved result or start new quiz
	$effect(() => {
		if (isQuizCompleted && savedMotivation && !showResult) {
			personalMotivation = savedMotivation;
			showResult = true;
		}
	});

	function handleAnswer(value: string) {
		answers = [...answers, value];

		if (currentQuestion < questionnaire.length - 1) {
			currentQuestion++;
		} else {
			// Quiz completed - generate motivation
			const motivation = generatePersonalMotivation(firstName, answers);
			personalMotivation = motivation;

			// Save to store
			userProgress.completeQuiz(answers, motivation);
			userProgress.addPoints(100); // Bonus for completing quiz!
			userProgress.unlockAchievement('quiz-master');

			showResult = true;
		}
	}

	function restartQuiz() {
		currentQuestion = 0;
		answers = [];
		showResult = false;
	}

	function goToCareerExplore() {
		goto(`${base}/app/careers`);
	}

	const progress = $derived(((currentQuestion + 1) / questionnaire.length) * 100);
	const currentQuestionData = $derived(questionnaire[currentQuestion]);
</script>

<svelte:head>
	<title>Quiz Kepribadian - We Will Shine</title>
</svelte:head>

{#if showResult}
	<!-- Result Screen - COMPACT -->
	<div class="space-y-3">
		<!-- Success Header - COMPACT -->
		<div
			class="rounded-2xl border-2 border-green-200 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 p-3 text-center shadow-md"
		>
			<div class="mb-1 animate-bounce text-3xl">🎉</div>
			<h1 class="mb-0.5 text-sm font-bold text-gray-800">Selamat, {firstName}!</h1>
			<p class="text-[10px] text-gray-600">Quiz selesai!</p>
		</div>

		<!-- Personal Motivation Card - COMPACT -->
		<div class="rounded-2xl border-2 border-purple-200 bg-white p-3 shadow-md">
			<div class="mb-2 text-center">
				<div
					class="mb-2 inline-block rounded-full bg-gradient-to-br from-purple-200 to-pink-200 p-2 shadow-sm"
				>
					<span class="text-2xl">💝</span>
				</div>
				<h2
					class="mb-1 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-sm font-bold text-transparent"
				>
					Pesan Khusus Untukmu!
				</h2>
			</div>

			<div
				class="mb-2 max-h-60 overflow-y-auto rounded-xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-3"
			>
				<p class="text-[11px] leading-relaxed whitespace-pre-line text-gray-700">
					{personalMotivation}
				</p>
			</div>

			<!-- Next Steps - COMPACT -->
			<div class="mb-2 rounded-xl border-2 border-blue-100 bg-blue-50/50 p-2">
				<h3 class="mb-1.5 text-[11px] font-bold text-blue-600">🎯 Next Steps:</h3>
				<ul class="space-y-1 text-gray-700">
					<li class="flex items-start gap-1.5">
						<span class="mt-0.5 text-[10px] text-green-500">✓</span>
						<span class="text-[10px] leading-relaxed">Eksplorasi karir yang kamu minati</span>
					</li>
					<li class="flex items-start gap-1.5">
						<span class="mt-0.5 text-[10px] text-green-500">✓</span>
						<span class="text-[10px] leading-relaxed">Ikuti komunitas sesuai passion-mu</span>
					</li>
					<li class="flex items-start gap-1.5">
						<span class="mt-0.5 text-[10px] text-green-500">✓</span>
						<span class="text-[10px] leading-relaxed">Mulai belajar skill yang relevan</span>
					</li>
					<li class="flex items-start gap-1.5">
						<span class="mt-0.5 text-[10px] text-green-500">✓</span>
						<span class="text-[10px] leading-relaxed">Jangan takut mencoba dan gagal!</span>
					</li>
				</ul>
			</div>

			<!-- Teacher's Message - COMPACT -->
			<div
				class="rounded-xl border-2 border-purple-100 bg-gradient-to-r from-purple-100 to-pink-100 p-2"
			>
				<p class="text-center text-[10px] leading-relaxed text-gray-700 italic">
					"Ustadz & Ustadzah bangga dengan semangat kalian. Perjalanan 1000 mil dimulai dari satu
					langkah. Langkah pertamamu sudah dimulai hari ini. Keep going! Semoga Allah SWT selalu
					membimbing langkahmu. Aamiin." 🤲
				</p>
			</div>
		</div>

		<!-- Action Buttons - COMPACT -->
		<div class="grid grid-cols-2 gap-2">
			<button
				onclick={goToCareerExplore}
				class="rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 py-2.5 text-xs font-bold text-white shadow-sm transition-all active:scale-95"
			>
				🎯 Explore Karir
			</button>
			<button
				onclick={restartQuiz}
				class="rounded-xl border-2 border-purple-400 bg-white py-2.5 text-xs font-bold text-purple-600 shadow-sm transition-all active:scale-95"
			>
				🔄 Isi Ulang
			</button>
		</div>
	</div>
{:else}
	<!-- Quiz Questions - COMPACT -->
	<div class="space-y-3">
		<!-- Progress Bar - Minimal -->
		<div class="rounded-lg border-2 border-purple-100 bg-white p-2 shadow-sm">
			<div class="mb-1.5 flex items-center justify-between">
				<span class="text-[10px] font-semibold text-purple-600">Pertanyaan</span>
				<span
					class="rounded-full border-2 border-purple-200 bg-purple-50 px-2 py-0.5 text-[10px] font-bold text-purple-600"
				>
					{currentQuestion + 1}/{questionnaire.length}
				</span>
			</div>
			<div class="h-2 overflow-hidden rounded-full bg-purple-100">
				<div
					class="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
					style="width: {progress}%"
				></div>
			</div>
		</div>

		<!-- Question Card - COMPACT -->
		<div class="animate-slide-in rounded-xl border-2 border-purple-100 bg-white p-3 shadow-md">
			<h2 class="mb-3 text-xs font-semibold text-gray-800">
				{currentQuestionData.question}
			</h2>

			<div class="space-y-2">
				{#each currentQuestionData.options as option (option.value)}
					<button
						onclick={() => handleAnswer(option.value)}
						class="group w-full transform rounded-xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-2.5 text-left transition-all active:scale-95 active:border-purple-300 active:from-purple-100 active:to-pink-100"
					>
						<span class="text-[11px] font-medium text-gray-800">{option.text}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Tips - COMPACT -->
		<div
			class="rounded-lg border-2 border-dashed border-purple-200 bg-purple-50/50 p-2 text-center"
		>
			<p class="text-[10px] text-purple-600">
				💡 Jawab sejujur-jujurnya ya! Tidak ada jawaban salah 😊
			</p>
		</div>
	</div>
{/if}

<style>
	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateX(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.animate-slide-in {
		animation: slide-in 0.4s ease-out;
	}
</style>
