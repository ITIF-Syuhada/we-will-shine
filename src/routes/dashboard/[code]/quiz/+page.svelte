<script lang="ts">
	import { userProgress } from '$lib/stores/user';
	import { questionnaire } from '$lib/data/questionnaire';
	import { generatePersonalMotivation } from '$lib/data/motivations';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

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
		goto(`${base}/dashboard/${$page.params.code}/careers`);
	}

	const progress = $derived(((currentQuestion + 1) / questionnaire.length) * 100);
	const currentQuestionData = $derived(questionnaire[currentQuestion]);
</script>

<svelte:head>
	<title>Quiz Kepribadian - We Will Shine</title>
</svelte:head>

{#if showResult}
	<!-- Result Screen dengan warna soft -->
	<div class="space-y-6">
		<!-- Success Header -->
		<div
			class="rounded-3xl border-2 border-green-200 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 p-10 text-center shadow-xl"
		>
			<div class="mb-5 animate-bounce text-7xl">🎉</div>
			<h1 class="mb-2 text-4xl font-bold text-gray-800">Selamat, {firstName}!</h1>
			<p class="text-xl text-gray-600">Kamu telah menyelesaikan quiz kepribadian!</p>
		</div>

		<!-- Personal Motivation Card -->
		<div class="rounded-3xl border-2 border-purple-200 bg-white p-10 shadow-xl">
			<div class="mb-7 text-center">
				<div
					class="mb-5 inline-block rounded-full bg-gradient-to-br from-purple-200 to-pink-200 p-6 shadow-lg"
				>
					<span class="text-6xl">💝</span>
				</div>
				<h2
					class="mb-2 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-3xl font-bold text-transparent"
				>
					Pesan Khusus Untukmu!
				</h2>
			</div>

			<div
				class="mb-7 rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8"
			>
				<p class="text-lg leading-relaxed whitespace-pre-line text-gray-700">
					{personalMotivation}
				</p>
			</div>

			<!-- Next Steps -->
			<div class="mb-7 rounded-2xl border-2 border-blue-100 bg-blue-50/50 p-7 shadow-sm">
				<h3 class="mb-5 text-lg font-bold text-blue-600">🎯 Next Steps untuk Kamu:</h3>
				<ul class="space-y-3 text-gray-700">
					<li class="flex items-start gap-3">
						<span class="mt-0.5 text-green-500">✓</span>
						<span class="text-sm leading-relaxed"
							>Mulai eksplorasi lebih dalam tentang karir yang kamu minati</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-0.5 text-green-500">✓</span>
						<span class="text-sm leading-relaxed"
							>Ikuti komunitas atau klub yang sesuai dengan passion-mu</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-0.5 text-green-500">✓</span>
						<span class="text-sm leading-relaxed"
							>Mulai belajar skill dasar yang relevan dari sekarang</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-0.5 text-green-500">✓</span>
						<span class="text-sm leading-relaxed"
							>Jangan takut mencoba dan gagal - itu bagian dari belajar!</span
						>
					</li>
				</ul>
			</div>

			<!-- Teacher's Message -->
			<div
				class="rounded-2xl border-2 border-purple-100 bg-gradient-to-r from-purple-100 to-pink-100 p-7"
			>
				<p class="text-center text-sm leading-relaxed text-gray-700 italic">
					"Ustadz & Ustadzah sangat bangga dengan semangat dan potensi yang kalian punya. Ingat,
					perjalanan 1000 mil dimulai dari satu langkah. Langkah pertamamu sudah dimulai hari ini.
					Keep going, never give up! Semoga Allah SWT selalu membimbing langkahmu menuju masa depan
					yang penuh berkah. Aamiin." 🤲
				</p>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="grid gap-4 sm:grid-cols-2">
			<button
				onclick={goToCareerExplore}
				class="rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 py-4 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
			>
				🎯 Explore Karir Lainnya
			</button>
			<button
				onclick={restartQuiz}
				class="rounded-2xl border-2 border-purple-400 bg-white py-4 font-bold text-purple-600 shadow-md transition-all hover:bg-purple-50 hover:shadow-lg"
			>
				🔄 Isi Ulang Quiz
			</button>
		</div>
	</div>
{:else}
	<!-- Quiz Questions -->
	<div class="space-y-6">
		<!-- Header -->
		<div
			class="rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-7 shadow-lg"
		>
			<div class="mb-5 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="rounded-full bg-white/70 p-3">
						<span class="text-3xl">🧠</span>
					</div>
					<h1 class="text-2xl font-bold text-gray-800">Kenali Dirimu</h1>
				</div>
				<span
					class="rounded-full border-2 border-purple-200 bg-white px-4 py-2 text-sm font-bold text-purple-600"
				>
					{currentQuestion + 1}/{questionnaire.length}
				</span>
			</div>
			<div class="h-3.5 overflow-hidden rounded-full bg-white/60">
				<div
					class="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-sm transition-all duration-300"
					style="width: {progress}%"
				></div>
			</div>
		</div>

		<!-- Question Card -->
		<div class="animate-slide-in rounded-2xl border-2 border-purple-100 bg-white p-8 shadow-xl">
			<h2 class="mb-7 text-xl font-semibold text-gray-800">
				{currentQuestionData.question}
			</h2>

			<div class="space-y-3">
				{#each currentQuestionData.options as option (option.value)}
					<button
						onclick={() => handleAnswer(option.value)}
						class="group w-full transform rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-5 text-left shadow-sm transition-all hover:scale-[1.02] hover:border-purple-300 hover:from-purple-100 hover:to-pink-100 hover:shadow-lg"
					>
						<span class="font-medium text-gray-800 group-hover:text-gray-900">{option.text}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Tips -->
		<div
			class="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-5 text-center"
		>
			<p class="text-sm text-purple-600">
				💡 <strong>Tips:</strong> Jawab sejujur-jujurnya ya! Tidak ada jawaban yang salah 😊
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
