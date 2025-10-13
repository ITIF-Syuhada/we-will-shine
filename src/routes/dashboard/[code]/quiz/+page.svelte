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
	<!-- Result Screen -->
	<div class="space-y-6">
		<!-- Success Header -->
		<div
			class="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center text-white shadow-lg"
		>
			<div class="mb-4 animate-bounce text-6xl">🎉</div>
			<h1 class="mb-2 text-3xl font-bold">Selamat, {firstName}!</h1>
			<p class="text-lg opacity-90">Kamu telah menyelesaikan quiz kepribadian!</p>
		</div>

		<!-- Personal Motivation Card -->
		<div class="rounded-3xl bg-white p-8 shadow-xl">
			<div class="mb-6 text-center">
				<div
					class="mb-4 inline-block rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-4"
				>
					<span class="text-5xl">💝</span>
				</div>
				<h2
					class="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent"
				>
					Pesan Khusus Untukmu!
				</h2>
			</div>

			<div
				class="mb-6 rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6"
			>
				<p class="text-lg leading-relaxed whitespace-pre-line text-gray-800">
					{personalMotivation}
				</p>
			</div>

			<!-- Next Steps -->
			<div class="mb-6 rounded-xl bg-white p-6 shadow-sm">
				<h3 class="mb-3 text-lg font-bold text-purple-900">🎯 Next Steps untuk Kamu:</h3>
				<ul class="space-y-2 text-gray-700">
					<li class="flex items-start gap-2">
						<span class="text-green-500">✓</span>
						<span class="text-sm">Mulai eksplorasi lebih dalam tentang karir yang kamu minati</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-green-500">✓</span>
						<span class="text-sm">Ikuti komunitas atau klub yang sesuai dengan passion-mu</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-green-500">✓</span>
						<span class="text-sm">Mulai belajar skill dasar yang relevan dari sekarang</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-green-500">✓</span>
						<span class="text-sm">Jangan takut mencoba dan gagal - itu bagian dari belajar!</span>
					</li>
				</ul>
			</div>

			<!-- Teacher's Message -->
			<div class="rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 p-6">
				<p class="text-center text-sm leading-relaxed text-gray-700 italic">
					"Bu Guru sangat bangga dengan semangat dan potensi yang kalian punya. Ingat, perjalanan
					1000 mil dimulai dari satu langkah. Langkah pertamamu sudah dimulai hari ini. Keep going,
					never give up! Semoga Allah SWT selalu membimbing langkahmu menuju masa depan yang penuh
					berkah. Aamiin." 🤲
				</p>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="grid gap-4 sm:grid-cols-2">
			<button
				onclick={goToCareerExplore}
				class="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 font-semibold text-white transition-all hover:from-purple-600 hover:to-pink-600"
			>
				🎯 Explore Karir Lainnya
			</button>
			<button
				onclick={restartQuiz}
				class="rounded-xl border-2 border-purple-500 bg-white py-4 font-semibold text-purple-600 transition-all hover:bg-purple-50"
			>
				🔄 Isi Ulang Quiz
			</button>
		</div>
	</div>
{:else}
	<!-- Quiz Questions -->
	<div class="space-y-6">
		<!-- Header -->
		<div class="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white shadow-lg">
			<div class="mb-4 flex items-center justify-between">
				<div class="flex items-center gap-3">
					<span class="text-3xl">🧠</span>
					<h1 class="text-2xl font-bold">Kenali Dirimu</h1>
				</div>
				<span class="text-sm font-semibold">
					{currentQuestion + 1}/{questionnaire.length}
				</span>
			</div>
			<div class="h-3 overflow-hidden rounded-full bg-white/30">
				<div
					class="h-full bg-yellow-400 transition-all duration-300"
					style="width: {progress}%"
				></div>
			</div>
		</div>

		<!-- Question Card -->
		<div class="animate-slide-in rounded-2xl bg-white p-8 shadow-xl">
			<h2 class="mb-6 text-xl font-semibold text-gray-800">
				{currentQuestionData.question}
			</h2>

			<div class="space-y-3">
				{#each currentQuestionData.options as option (option.value)}
					<button
						onclick={() => handleAnswer(option.value)}
						class="w-full transform rounded-xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 p-4 text-left transition-all hover:scale-105 hover:border-purple-400 hover:from-purple-100 hover:to-pink-100 hover:shadow-lg"
					>
						<span class="font-medium text-gray-800">{option.text}</span>
					</button>
				{/each}
			</div>
		</div>

		<!-- Tips -->
		<div class="rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 p-4 text-center">
			<p class="text-sm text-purple-800">
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
		animation: slide-in 0.3s ease-out;
	}
</style>
