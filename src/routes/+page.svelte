<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import Footer from '$lib/components/Footer.svelte';

	// State for newsletter form
	let email = $state('');
	let isSubmitting = $state(false);
	let showToast = $state(false);
	let toastMessage = $state('');
	let toastType = $state<'success' | 'error'>('success');

	// Animated numbers state
	let activeUsers = $state(0);
	let schools = $state(0);
	let questionsAnswered = $state(0);

	// Target numbers
	const TARGET_USERS = 1250;
	const TARGET_SCHOOLS = 15;
	const TARGET_QUESTIONS = 25000;

	// Sticky CTA visibility
	let showStickyCTA = $state(false);

	// Smooth scroll
	onMount(() => {
		// Enable smooth scrolling
		document.documentElement.style.scrollBehavior = 'smooth';

		// Intersection Observer for scroll reveal animations
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('reveal-visible');

					// Trigger stats animation when stats section is visible
					if (entry.target.id === 'stats-section') {
						animateNumbers();
					}
				}
			});
		}, observerOptions);

		// Observe all sections
		const sections = document.querySelectorAll('.reveal-on-scroll');
		sections.forEach((section) => observer.observe(section));

		// Scroll listener for sticky CTA
		const handleScroll = () => {
			showStickyCTA = window.scrollY > 800;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			observer.disconnect();
			window.removeEventListener('scroll', handleScroll);
		};
	});

	// Animate numbers
	function animateNumbers() {
		const duration = 2000; // 2 seconds
		const steps = 60;
		const interval = duration / steps;

		let currentStep = 0;

		const timer = setInterval(() => {
			currentStep++;
			const progress = currentStep / steps;
			const easeOutQuad = 1 - Math.pow(1 - progress, 3);

			activeUsers = Math.floor(TARGET_USERS * easeOutQuad);
			schools = Math.floor(TARGET_SCHOOLS * easeOutQuad);
			questionsAnswered = Math.floor(TARGET_QUESTIONS * easeOutQuad);

			if (currentStep >= steps) {
				activeUsers = TARGET_USERS;
				schools = TARGET_SCHOOLS;
				questionsAnswered = TARGET_QUESTIONS;
				clearInterval(timer);
			}
		}, interval);
	}

	// Handle newsletter submission
	async function handleNewsletterSubmit(e: Event) {
		e.preventDefault();

		if (!email || !email.includes('@')) {
			showToastMessage('Please enter a valid email address', 'error');
			return;
		}

		isSubmitting = true;

		try {
			// Simulate API call (replace with actual endpoint later)
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Success
			showToastMessage('🎉 Thanks for subscribing! Check your inbox for confirmation.', 'success');
			email = '';
		} catch (_error) {
			showToastMessage('❌ Oops! Something went wrong. Please try again.', 'error');
		} finally {
			isSubmitting = false;
		}
	}

	function showToastMessage(message: string, type: 'success' | 'error') {
		toastMessage = message;
		toastType = type;
		showToast = true;

		setTimeout(() => {
			showToast = false;
		}, 5000);
	}
</script>

<svelte:head>
	<title>We Will Shine - AI-Powered Learning Platform</title>
	<meta
		name="description"
		content="Empowering learners with AI mentorship, mental health support, and productivity analytics. Built for the 2USE ecosystem."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-20">
		<div
			class="h-full w-full"
			style="background-image: radial-gradient(circle at 30px 30px, rgba(156, 146, 172, 0.1) 2px, transparent 2px); background-size: 60px 60px;"
		></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="text-center">
			<div class="animate-float mx-auto mb-8 inline-block">
				<div class="rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-6 shadow-2xl">
					<span class="text-6xl drop-shadow-sm">🌟</span>
				</div>
			</div>

			<h1
				class="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-6xl font-bold text-transparent sm:text-7xl"
			>
				We Will Shine
			</h1>

			<p class="mx-auto mb-8 max-w-3xl text-xl text-gray-700 sm:text-2xl">
				The AI-powered learning platform that empowers every learner to achieve their full potential
			</p>

			<div class="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<a href="{base}/signin" class="start-learning-button">
					<span class="flex items-center gap-2">
						<span>Start Learning</span>
						<span class="arrow">→</span>
					</span>
				</a>
			</div>
		</div>

		<!-- Features Grid -->
		<div class="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- AI Learning Mentor -->
			<div class="group rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
				<div class="mb-4 text-4xl">🤖</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">AI Learning Mentor</h3>
				<p class="text-gray-600">
					Personalized AI tutoring that adapts to your learning style and provides instant help with
					any subject.
				</p>
			</div>

			<!-- Mental Health Support -->
			<div class="group rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
				<div class="mb-4 text-4xl">🧠</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Mental Health Support</h3>
				<p class="text-gray-600">
					AI-powered psychological assessments and wellness recommendations to support your mental
					health journey.
				</p>
			</div>

			<!-- Productivity Analytics -->
			<div class="group rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
				<div class="mb-4 text-4xl">📊</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Productivity Analytics</h3>
				<p class="text-gray-600">
					Deep insights into your learning patterns with actionable recommendations for improvement.
				</p>
			</div>

			<!-- 2USE Ecosystem -->
			<div class="group rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
				<div class="mb-4 text-4xl">🔗</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">2USE Ecosystem</h3>
				<p class="text-gray-600">
					Frontend for the 2USE ecosystem - like ChatGPT for GPT, bringing AI education to everyone.
				</p>
			</div>

			<!-- Open Source -->
			<div class="group rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
				<div class="mb-4 text-4xl">🌍</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Open Source</h3>
				<p class="text-gray-600">
					Transparent, community-driven development that's free for all schools and educational
					institutions.
				</p>
			</div>

			<!-- Dual Authentication -->
			<div class="group rounded-3xl bg-white p-8 shadow-lg transition-all hover:shadow-xl">
				<div class="mb-4 text-4xl">🔐</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Dual Authentication</h3>
				<p class="text-gray-600">
					Google OAuth for public users, school-affiliated login with 2FA for students from
					integrated schools.
				</p>
			</div>
		</div>

		<!-- Vision Section -->
		<div class="rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 p-12 text-white">
			<div class="mx-auto max-w-4xl text-center">
				<h2 class="mb-6 text-4xl font-bold">Our Vision</h2>
				<p class="mb-4 text-2xl leading-relaxed font-bold">"Tidak Ada Anak yang Bodoh"</p>
				<p class="mb-8 text-xl leading-relaxed">
					Membantu setiap tunas bangsa <strong>menemukan jati dirinya</strong> dalam kebaikan dan kebermanfaatan
					kolektif - melalui pendidikan yang holistik, teknologi yang humanis, dan nilai-nilai luhur
					yang universal.
				</p>

				<div class="grid gap-6 md:grid-cols-3">
					<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
						<div class="mb-3 text-3xl">🌱</div>
						<h3 class="mb-2 text-lg font-semibold">Pertumbuhan Holistik</h3>
						<p class="text-sm opacity-90">
							Akademik, mental, spiritual, dan karakter berkembang bersama dengan seimbang
						</p>
					</div>

					<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
						<div class="mb-3 text-3xl">🤲</div>
						<h3 class="mb-2 text-lg font-semibold">Nilai-Nilai Luhur</h3>
						<p class="text-sm opacity-90">
							Ketuhanan, humanis, dan gotong royong sebagai fondasi setiap pembelajaran
						</p>
					</div>

					<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
						<div class="mb-3 text-3xl">💚</div>
						<h3 class="mb-2 text-lg font-semibold">Kebermanfaatan Kolektif</h3>
						<p class="text-sm opacity-90">
							Mengesampingkan ego, fokus pada kontribusi untuk hajat hidup orang banyak
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Community Section -->
		<div class="mt-16 text-center">
			<h2 class="mb-8 text-3xl font-bold text-gray-900">Join Our Community</h2>
			<div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<a
					href="https://github.com/konxc/we-will-shine"
					target="_blank"
					rel="noopener noreferrer"
					class="github-button"
				>
					<span>⭐</span>
					<span>Star on GitHub</span>
				</a>

				<a
					href="https://discord.gg/we-will-shine"
					target="_blank"
					rel="noopener noreferrer"
					class="discord-button"
				>
					<span>💬</span>
					<span>Join Discord</span>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Stats Section -->
<section
	id="stats-section"
	class="reveal-on-scroll bg-gradient-to-r from-indigo-600 to-purple-600 py-16"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-8 md:grid-cols-3">
			<!-- Active Users -->
			<div class="text-center">
				<div class="mb-2 text-5xl font-bold text-white">
					{activeUsers.toLocaleString()}+
				</div>
				<p class="text-lg text-indigo-100">Active Learners</p>
			</div>

			<!-- Partner Schools -->
			<div class="text-center">
				<div class="mb-2 text-5xl font-bold text-white">
					{schools}+
				</div>
				<p class="text-lg text-indigo-100">Partner Schools</p>
			</div>

			<!-- Questions Answered -->
			<div class="text-center">
				<div class="mb-2 text-5xl font-bold text-white">
					{questionsAnswered.toLocaleString()}+
				</div>
				<p class="text-lg text-indigo-100">Questions Answered</p>
			</div>
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section class="reveal-on-scroll bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">How It Works</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Get started in just a few simple steps and unlock your learning potential
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-4">
			<!-- Step 1 -->
			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white shadow-lg"
				>
					1
				</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Sign Up</h3>
				<p class="text-gray-600">
					Use your Google account or school unlock code to create your account instantly
				</p>
			</div>

			<!-- Step 2 -->
			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-3xl font-bold text-white shadow-lg"
				>
					2
				</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Set Your Goals</h3>
				<p class="text-gray-600">
					Tell us about your learning objectives and let our AI create a personalized roadmap
				</p>
			</div>

			<!-- Step 3 -->
			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-600 text-3xl font-bold text-white shadow-lg"
				>
					3
				</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Learn & Grow</h3>
				<p class="text-gray-600">
					Chat with your AI mentor, track progress, and get mental health support along the way
				</p>
			</div>

			<!-- Step 4 -->
			<div class="text-center">
				<div
					class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-600 text-3xl font-bold text-white shadow-lg"
				>
					4
				</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Shine Bright</h3>
				<p class="text-gray-600">
					Achieve your goals, earn achievements, and inspire others in the community
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Testimonials Section -->
<section class="reveal-on-scroll bg-gradient-to-br from-purple-50 to-pink-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">What Learners Say</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Real stories from students who transformed their learning journey
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<!-- Testimonial 1 -->
			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<div class="mb-4 flex items-center gap-1 text-yellow-500">
					<span>⭐</span>
					<span>⭐</span>
					<span>⭐</span>
					<span>⭐</span>
					<span>⭐</span>
				</div>
				<p class="mb-6 text-gray-700 italic">
					"AI Mentor nya keren banget! Gak cuma kasih jawaban langsung, tapi dibimbing supaya aku
					bisa mikir sendiri. Nilai matematika aku naik drastis!"
				</p>
				<div class="flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xl text-white"
					>
						A
					</div>
					<div>
						<p class="font-semibold text-gray-900">Andi Prasetyo</p>
						<p class="text-sm text-gray-600">Siswa SMA Kelas 11</p>
					</div>
				</div>
			</div>

			<!-- Testimonial 2 -->
			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<div class="mb-4 flex items-center gap-1 text-yellow-500">
					<span>⭐</span>
					<span>⭐</span>
					<span>⭐</span>
					<span>⭐</span>
					<span>⭐</span>
				</div>
				<p class="mb-6 text-gray-700 italic">
					"Fitur mental health check-in nya sangat membantu. Aku jadi lebih aware sama kondisi
					mental aku dan bisa manage stress lebih baik."
				</p>
				<div class="flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-xl text-white"
					>
						S
					</div>
					<div>
						<p class="font-semibold text-gray-900">Siti Nurhaliza</p>
						<p class="text-sm text-gray-600">Mahasiswa Semester 5</p>
					</div>
				</div>
			</div>

			<!-- Testimonial 3 -->
			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<div class="mb-4 flex items-center gap-1 text-yellow-500">
					<span>⭐</span>
					<span>⭐</span>
					<span>⭐</span>
					<span>⭐</span>
					<span>⭐</span>
				</div>
				<p class="mb-6 text-gray-700 italic">
					"Open source dan gratis untuk sekolah? Ini yang kami butuhkan! Dashboard admin nya juga
					sangat intuitif untuk monitoring progress siswa."
				</p>
				<div class="flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-600 text-xl text-white"
					>
						B
					</div>
					<div>
						<p class="font-semibold text-gray-900">Budi Santoso, S.Pd</p>
						<p class="text-sm text-gray-600">Guru SMA Negeri 1</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- FAQ Section -->
<section class="reveal-on-scroll bg-white py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">Got questions? We've got answers!</p>
		</div>

		<div class="space-y-6">
			<!-- FAQ 1 -->
			<details
				class="group rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 transition-all hover:shadow-lg"
			>
				<summary
					class="flex cursor-pointer items-center justify-between font-semibold text-gray-900"
				>
					<span class="text-lg">Apakah We Will Shine benar-benar gratis?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Ya! We Will Shine 100% gratis untuk semua siswa dan sekolah. Kami adalah open-source
					project yang didukung oleh PT Koneksi Jaringan Indonesia dan komunitas. Model BYOK (Bring
					Your Own Key) memungkinkan Anda menggunakan API key LLM sendiri jika ingin.
				</p>
			</details>

			<!-- FAQ 2 -->
			<details
				class="group rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 transition-all hover:shadow-lg"
			>
				<summary
					class="flex cursor-pointer items-center justify-between font-semibold text-gray-900"
				>
					<span class="text-lg">Bagaimana cara login ke platform?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Ada dua cara: (1) Login dengan akun Google untuk akses publik, atau (2) Gunakan unlock
					code dari sekolah Anda jika sekolah sudah terintegrasi dengan Sistem Akademik kami. Login
					sekolah dilengkapi dengan 2FA untuk keamanan ekstra.
				</p>
			</details>

			<!-- FAQ 3 -->
			<details
				class="group rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 p-6 transition-all hover:shadow-lg"
			>
				<summary
					class="flex cursor-pointer items-center justify-between font-semibold text-gray-900"
				>
					<span class="text-lg">Apa itu 2USE AI dan Metode Socratic?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					2USE AI adalah custom AI middleware kami yang dirancang khusus untuk edukasi. Berbeda
					dengan AI chatbot biasa, 2USE menolak memberikan jawaban instan. Sebaliknya, AI akan
					membimbing Anda berpikir kritis melalui pertanyaan-pertanyaan (metode Socratic) sehingga
					Anda benar-benar memahami konsepnya.
				</p>
			</details>

			<!-- FAQ 4 -->
			<details
				class="group rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 p-6 transition-all hover:shadow-lg"
			>
				<summary
					class="flex cursor-pointer items-center justify-between font-semibold text-gray-900"
				>
					<span class="text-lg">Apakah data saya aman?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Sangat aman! Kami menggunakan enkripsi tingkat enterprise dan tidak pernah menjual data
					pengguna. Sebagai open-source project, kode kami transparan dan bisa diaudit oleh siapa
					saja. Data mental health Anda fully encrypted dan hanya Anda yang punya akses.
				</p>
			</details>

			<!-- FAQ 5 -->
			<details
				class="group rounded-2xl bg-gradient-to-br from-yellow-50 to-green-50 p-6 transition-all hover:shadow-lg"
			>
				<summary
					class="flex cursor-pointer items-center justify-between font-semibold text-gray-900"
				>
					<span class="text-lg">Bagaimana cara sekolah kami bergabung?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Hubungi tim kami di <a
						href="mailto:support@we-will-shine.org"
						class="font-semibold text-indigo-600 hover:underline">support@we-will-shine.org</a
					>
					untuk konsultasi gratis. Kami akan membantu integrasi dengan Sistem Akademik sekolah Anda dan
					memberikan training untuk guru dan admin.
				</p>
			</details>
		</div>
	</div>
</section>

<!-- Newsletter/Waitlist Section -->
<section class="reveal-on-scroll bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-4 text-4xl font-bold text-white">Stay Updated</h2>
		<p class="mb-8 text-xl text-indigo-100">
			Join our mailing list to get the latest updates, new features, and educational tips
		</p>

		<form class="mx-auto max-w-md" onsubmit={handleNewsletterSubmit}>
			<div class="flex flex-col gap-4 sm:flex-row">
				<input
					type="email"
					placeholder="your.email@example.com"
					bind:value={email}
					disabled={isSubmitting}
					class="flex-1 rounded-xl border-2 border-white/20 bg-white/10 px-6 py-3 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:border-white/40 focus:bg-white/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
					required
				/>
				<button type="submit" disabled={isSubmitting} class="newsletter-button">
					{isSubmitting ? 'Subscribing...' : 'Subscribe'}
				</button>
			</div>
			<p class="mt-4 text-sm text-indigo-200">
				🔒 We respect your privacy. No spam, unsubscribe anytime.
			</p>
		</form>
	</div>
</section>

<Footer />

<!-- Toast Notification -->
{#if showToast}
	<div class="toast {toastType === 'success' ? 'toast-success' : 'toast-error'}">
		{toastMessage}
	</div>
{/if}

<!-- Sticky CTA -->
{#if showStickyCTA}
	<div class="sticky-cta">
		<div class="flex items-center justify-between gap-4">
			<div class="hidden sm:block">
				<p class="text-sm font-semibold text-gray-900">Siap memulai perjalanan belajar?</p>
				<p class="text-xs text-gray-600">Gratis untuk semua pelajar Indonesia</p>
			</div>
			<a href="{base}/signin" class="btn-gradient-primary whitespace-nowrap"> Mulai Gratis </a>
		</div>
	</div>
{/if}

<style lang="postcss">
	@reference "tailwindcss";

	@keyframes float {
		0%,
		100% {
			transform: translateY(0px) rotate(0deg);
		}
		33% {
			transform: translateY(-12px) rotate(3deg);
		}
		66% {
			transform: translateY(-6px) rotate(-3deg);
		}
	}

	.animate-float {
		animation: float 6s ease-in-out infinite;
	}

	/* Community Buttons */
	.github-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 0.75rem;
		background-color: #111827; /* bg-gray-900 */
		padding: 0.75rem 1.5rem;
		transition: all 0.3s ease;
		text-decoration: none;
		color: var(--button-text-white) !important;
	}

	.github-button:hover {
		background-color: #1f2937; /* hover:bg-gray-800 */
	}

	.github-button span {
		color: var(--button-text-white) !important;
	}

	.discord-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 0.75rem;
		background-color: #4f46e5; /* bg-indigo-600 */
		padding: 0.75rem 1.5rem;
		transition: all 0.3s ease;
		text-decoration: none;
		color: var(--button-text-white) !important;
	}

	.discord-button:hover {
		background-color: #4338ca; /* hover:bg-indigo-700 */
	}

	.discord-button span {
		color: var(--button-text-white) !important;
	}

	/* Start Learning Button */
	.start-learning-button {
		display: inline-block;
		border-radius: 1rem;
		background: linear-gradient(to right, #6366f1, #9333ea); /* from-indigo-500 to-purple-600 */
		padding: 1rem 2rem;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--button-text-white) !important;
		text-decoration: none;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -4px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
		transform: scale(1);
	}

	.start-learning-button:hover {
		transform: scale(1.05);
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 8px 10px -6px rgba(0, 0, 0, 0.1);
	}

	.start-learning-button span {
		color: var(--button-text-white) !important;
	}

	.start-learning-button .arrow {
		transition: transform 0.3s ease;
	}

	.start-learning-button:hover .arrow {
		transform: translateX(0.25rem);
	}

	/* Newsletter Button */
	.newsletter-button {
		padding: 0.75rem 2rem;
		border-radius: 0.75rem;
		background-color: var(--button-text-white);
		color: #6366f1; /* indigo-600 */
		font-weight: 600;
		transition: all 0.3s ease;
		border: none;
		cursor: pointer;
		white-space: nowrap;
	}

	.newsletter-button:hover {
		background-color: #f3f4f6; /* gray-100 */
		transform: scale(1.05);
	}

	.newsletter-button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: scale(1);
	}

	/* Scroll Reveal Animations */
	.reveal-on-scroll {
		opacity: 0;
		transform: translateY(30px);
		transition:
			opacity 0.8s ease-out,
			transform 0.8s ease-out;
	}

	:global(.reveal-on-scroll.reveal-visible) {
		opacity: 1;
		transform: translateY(0);
	}

	/* Toast Notification */
	.toast {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		padding: 1rem 1.5rem;
		border-radius: 0.75rem;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -4px rgba(0, 0, 0, 0.1);
		font-weight: 600;
		z-index: 9999;
		animation: slideIn 0.3s ease-out;
		max-width: 400px;
	}

	.toast-success {
		background: linear-gradient(to right, #10b981, #059669);
		color: white;
	}

	.toast-error {
		background: linear-gradient(to right, #ef4444, #dc2626);
		color: white;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	/* Smooth scrolling for the whole page */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Sticky CTA */
	.sticky-cta {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9998;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(12px);
		padding: 1rem 1.5rem;
		border-radius: 1rem;
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.1),
			0 8px 10px -6px rgba(0, 0, 0, 0.1);
		animation: slideUp 0.5s ease-out;
		max-width: 500px;
		width: calc(100% - 2rem);
	}

	@keyframes slideUp {
		from {
			transform: translateX(-50%) translateY(100px);
			opacity: 0;
		}
		to {
			transform: translateX(-50%) translateY(0);
			opacity: 1;
		}
	}
</style>
