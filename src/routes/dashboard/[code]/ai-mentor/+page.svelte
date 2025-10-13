<script lang="ts">
	import { userProgress } from '$lib/stores/user';
	import { onMount } from 'svelte';

	interface Message {
		type: 'user' | 'bot';
		text: string;
	}

	let messages = $state<Message[]>([]);
	let inputText = $state('');
	let isTyping = $state(false);
	let chatContainer: HTMLDivElement;

	const firstName = $derived($userProgress?.studentName.split(' ')[0] || '');

	onMount(() => {
		// Welcome message
		messages = [
			{
				type: 'bot',
				text: `Assalamualaikum ${firstName}! 🌟 Aku adalah AI Mentor yang siap membantu menjawab pertanyaanmu tentang karir dan masa depan. Tanya apa saja ya! ✨`
			}
		];
	});

	const responses: Record<string, string> = {
		greeting: 'Halo! 👋 Senang bisa membantumu explore karir. Ada yang ingin kamu tanyakan?',
		software:
			'Software Developer itu keren! Kamu bisa mulai dari belajar coding dasar seperti Python atau JavaScript. Coba buat project kecil seperti kalkulator atau to-do list app. Yang penting: jangan takut error, setiap bug adalah kesempatan belajar! 💻',
		'ui/ux':
			"UI/UX Designer perfect untuk yang suka seni dan teknologi! Mulai dengan belajar Figma (gratis!), lalu coba redesign app favoritmu. Perhatikan kenapa beberapa app enak dipakai dan yang lain nggak. That's UX thinking! 🎨",
		data: 'Data Analyst itu seperti detective! Mulai dari Excel dulu, lalu belajar visualisasi data. Coba analisis data sederhana seperti nilai kelas atau statistik hobi teman-teman. Numbers tell stories! 📊',
		marketing:
			'Digital Marketing cocok buat yang kreatif dan suka media sosial! Mulai dengan bikin konten untuk personal brand-mu. Pelajari apa yang bikin konten viral dan engaging. Content is king! 📱',
		security:
			'Cybersecurity itu penting banget di era digital! Mulai dengan belajar dasar networking dan keamanan internet. Ikuti CTF (Capture The Flag) competition untuk practice. Be the guardian! 🔒',
		ai: 'AI/ML adalah masa depan! Mulai dengan matematika yang kuat dan Python. Coba project ML sederhana seperti prediksi sederhana atau image classification. The possibilities are endless! 🤖',
		creator:
			'Content Creator & Educator bisa dimulai sekarang! Pick satu platform, buat konten yang kamu passionate about, dan konsisten. Share ilmu yang kamu punya, meski masih belajar. Teaching is learning! 🎥',
		entrepreneur:
			'Entrepreneur mindset bisa dimulai dari sekarang! Identifikasi masalah di sekitarmu dan pikirkan solusinya. Start small, learn fast, iterate quickly. Every big business started small! 🚀',
		motivation:
			"Remember: Setiap expert dulunya adalah beginner. Kamu sudah berani explore, that's a great start! Keep going! 💪",
		study:
			'Tips belajar: Pakai teknik Pomodoro (25 menit fokus, 5 menit break). Jangan lupa catat yang penting! Practice every day, meski cuma 15 menit. Consistency beats intensity! 📝',
		islam:
			'Dalam Islam, menuntut ilmu itu ibadah. Setiap skill yang kamu pelajari bisa jadi amal jariyah kalau digunakan untuk kebaikan! Prophet Muhammad SAW bilang: "Tuntutlah ilmu sampai ke negeri China." Itu artinya: never stop learning! 🤲',
		default:
			'Pertanyaan menarik! Coba tanya lebih spesifik tentang karir yang kamu minati, atau minta tips belajar dan motivasi! 💡'
	};

	function getResponse(input: string): string {
		const lowerInput = input.toLowerCase();

		if (lowerInput.includes('halo') || lowerInput.includes('hai') || lowerInput.includes('hi')) {
			return responses.greeting;
		} else if (
			lowerInput.includes('software') ||
			lowerInput.includes('coding') ||
			lowerInput.includes('programmer')
		) {
			return responses.software;
		} else if (
			lowerInput.includes('design') ||
			lowerInput.includes('ui') ||
			lowerInput.includes('ux')
		) {
			return responses['ui/ux'];
		} else if (lowerInput.includes('data') || lowerInput.includes('analyst')) {
			return responses.data;
		} else if (
			lowerInput.includes('marketing') ||
			lowerInput.includes('sosmed') ||
			lowerInput.includes('konten')
		) {
			return responses.marketing;
		} else if (
			lowerInput.includes('security') ||
			lowerInput.includes('cyber') ||
			lowerInput.includes('hacker')
		) {
			return responses.security;
		} else if (
			lowerInput.includes('ai') ||
			lowerInput.includes('machine learning') ||
			lowerInput.includes('kecerdasan')
		) {
			return responses.ai;
		} else if (
			lowerInput.includes('creator') ||
			lowerInput.includes('youtube') ||
			lowerInput.includes('video')
		) {
			return responses.creator;
		} else if (
			lowerInput.includes('entrepreneur') ||
			lowerInput.includes('bisnis') ||
			lowerInput.includes('usaha')
		) {
			return responses.entrepreneur;
		} else if (lowerInput.includes('motivasi') || lowerInput.includes('semangat')) {
			return responses.motivation;
		} else if (
			lowerInput.includes('belajar') ||
			lowerInput.includes('study') ||
			lowerInput.includes('tips')
		) {
			return responses.study;
		} else if (
			lowerInput.includes('islam') ||
			lowerInput.includes('agama') ||
			lowerInput.includes('allah')
		) {
			return responses.islam;
		} else {
			return responses.default;
		}
	}

	function sendMessage() {
		const text = inputText.trim();
		if (text.length === 0) return;

		// Add user message
		messages = [...messages, { type: 'user', text }];
		inputText = '';

		// Add points
		userProgress.addPoints(10);
		userProgress.incrementChatCount();

		// Check achievement
		if ($userProgress && $userProgress.chatCount >= 10) {
			userProgress.unlockAchievement('ai-chatter');
		}

		// Scroll to bottom
		setTimeout(() => scrollToBottom(), 100);

		// Show typing indicator
		isTyping = true;

		// Bot response after delay
		setTimeout(
			() => {
				const response = getResponse(text);
				messages = [...messages, { type: 'bot', text: response }];
				isTyping = false;
				setTimeout(() => scrollToBottom(), 100);
			},
			1000 + Math.random() * 1000
		);
	}

	function quickQuestion(question: string) {
		inputText = question;
		sendMessage();
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	function scrollToBottom() {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}
</script>

<svelte:head>
	<title>AI Mentor - We Will Shine</title>
</svelte:head>

<div class="space-y-3">
	<!-- Chat Container - COMPACT -->
	<div class="overflow-hidden rounded-2xl border-2 border-purple-200 bg-white shadow-lg">
		<!-- Chat Messages -->
		<div
			bind:this={chatContainer}
			class="h-[400px] space-y-2 overflow-y-auto bg-gradient-to-b from-purple-50/30 to-pink-50/30 p-3"
		>
			{#each messages as message, idx (idx)}
				<div
					class="flex items-start space-x-2 {message.type === 'user'
						? 'flex-row-reverse space-x-reverse'
						: ''}"
				>
					{#if message.type === 'bot'}
						<div
							class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-300 to-pink-300 text-[9px] font-bold text-white shadow-sm"
						>
							AI
						</div>
					{/if}
					<div
						class="max-w-[75%] rounded-xl border-2 px-3 py-2 shadow-sm {message.type === 'user'
							? 'border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800'
							: 'border-gray-200 bg-white text-gray-800'}"
					>
						<p class="text-[11px] leading-relaxed whitespace-pre-line">{message.text}</p>
					</div>
					{#if message.type === 'user'}
						<div
							class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-300 to-purple-300 text-[9px] font-bold text-white shadow-sm"
						>
							You
						</div>
					{/if}
				</div>
			{/each}

			<!-- Typing Indicator -->
			{#if isTyping}
				<div class="flex items-start space-x-2">
					<div
						class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-300 to-pink-300 text-[9px] font-bold text-white shadow-sm"
					>
						AI
					</div>
					<div class="rounded-xl border-2 border-gray-200 bg-white px-3 py-2 shadow-sm">
						<div class="flex space-x-1">
							<div
								class="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400"
								style="animation-delay: 0ms"
							></div>
							<div
								class="h-1.5 w-1.5 animate-bounce rounded-full bg-pink-400"
								style="animation-delay: 150ms"
							></div>
							<div
								class="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400"
								style="animation-delay: 300ms"
							></div>
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Input Area - COMPACT -->
		<div class="border-t-2 border-purple-100 bg-white p-2">
			<div class="flex space-x-2">
				<input
					type="text"
					bind:value={inputText}
					onkeypress={handleKeyPress}
					placeholder="Ketik pertanyaanmu..."
					class="flex-1 rounded-xl border-2 border-purple-200 px-3 py-2 text-xs transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
				/>
				<button
					onclick={sendMessage}
					disabled={inputText.trim().length === 0}
					class="rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
				>
					Kirim
				</button>
			</div>

			<!-- Quick Questions - COMPACT -->
			<div class="mt-2 flex flex-wrap gap-1.5">
				<button
					onclick={() => quickQuestion('Apa itu programmer?')}
					class="rounded-full border-2 border-purple-200 bg-purple-50 px-2.5 py-1 text-[10px] font-medium text-purple-600 transition-all active:scale-95"
				>
					Programmer?
				</button>
				<button
					onclick={() => quickQuestion('Bagaimana cara mulai belajar coding?')}
					class="rounded-full border-2 border-pink-200 bg-pink-50 px-2.5 py-1 text-[10px] font-medium text-pink-600 transition-all active:scale-95"
				>
					Cara coding?
				</button>
				<button
					onclick={() => quickQuestion('Butuh motivasi')}
					class="rounded-full border-2 border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-medium text-blue-600 transition-all active:scale-95"
				>
					Motivasi
				</button>
				<button
					onclick={() => quickQuestion('Tips belajar efektif')}
					class="rounded-full border-2 border-green-200 bg-green-50 px-2.5 py-1 text-[10px] font-medium text-green-600 transition-all active:scale-95"
				>
					Tips belajar
				</button>
				<button
					onclick={() => quickQuestion('Teknologi dalam Islam')}
					class="rounded-full border-2 border-purple-200 bg-purple-50 px-2.5 py-1 text-[10px] font-medium text-purple-600 transition-all active:scale-95"
				>
					Tech & Islam
				</button>
			</div>
		</div>
	</div>

	<!-- Tips - COMPACT -->
	<div class="rounded-lg border-2 border-dashed border-purple-200 bg-purple-50/50 p-2 text-center">
		<p class="text-[10px] text-purple-600">
			💡 AI Mentor bisa jawab tentang karir, tips, motivasi & Islam!
		</p>
	</div>
</div>
