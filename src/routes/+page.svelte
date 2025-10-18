<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { userProgress, isLoggedIn } from '$lib/stores/user';
	import { onMount } from 'svelte';

	onMount(() => {
		// If already logged in, redirect to app
		if ($isLoggedIn && $userProgress) {
			goto(`${base}/app`);
		}
	});
</script>

<svelte:head>
	<title>We Will Shine - AI-Powered Learning Platform</title>
	<meta
		name="description"
		content="Empowering learners with AI mentorship, mental health support, and productivity analytics. Built for the 2USE ecosystem."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
	<!-- Background Pattern -->
	<div class="absolute inset-0 opacity-40">
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

			<p class="mx-auto mb-8 max-w-3xl text-xl text-gray-600 sm:text-2xl">
				The AI-powered learning platform that empowers every learner to achieve their full potential
			</p>

			<div class="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
				<a
					href="{base}/unlock"
					class="group transform rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
				>
					<span class="flex items-center gap-2">
						<span>Start Learning</span>
						<span class="transition-transform group-hover:translate-x-1">→</span>
					</span>
				</a>

				<a
					href="{base}/login"
					class="transform rounded-2xl border-2 border-indigo-200 bg-white px-8 py-4 text-lg font-semibold text-indigo-600 transition-all hover:border-indigo-300 hover:bg-indigo-50"
				>
					Admin Dashboard
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
				<p class="mb-8 text-xl leading-relaxed">
					We Will Shine is more than just a learning platform - it's a comprehensive ecosystem that
					combines AI-powered education with mental health support, productivity analytics, and
					community-driven innovation.
				</p>

				<div class="grid gap-6 md:grid-cols-3">
					<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
						<div class="mb-3 text-3xl">🎯</div>
						<h3 class="mb-2 text-lg font-semibold">Personalized Learning</h3>
						<p class="text-sm opacity-90">
							AI that understands your unique learning style and adapts accordingly
						</p>
					</div>

					<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
						<div class="mb-3 text-3xl">💝</div>
						<h3 class="mb-2 text-lg font-semibold">Mental Health First</h3>
						<p class="text-sm opacity-90">
							Comprehensive support for your mental wellbeing and academic success
						</p>
					</div>

					<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
						<div class="mb-3 text-3xl">🚀</div>
						<h3 class="mb-2 text-lg font-semibold">Future Ready</h3>
						<p class="text-sm opacity-90">
							Preparing learners for the challenges and opportunities of tomorrow
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
					href="https://github.com/koneksi-jaringan/we-will-shine"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-white transition-all hover:bg-gray-800"
				>
					<span>⭐</span>
					<span>Star on GitHub</span>
				</a>

				<a
					href="https://discord.gg/we-will-shine"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white transition-all hover:bg-indigo-700"
				>
					<span>💬</span>
					<span>Join Discord</span>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="bg-gray-900 text-white">
	<div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-8 md:grid-cols-4">
			<div>
				<h3 class="mb-4 text-lg font-semibold">We Will Shine</h3>
				<p class="text-sm text-gray-400">
					Empowering learners with AI-powered education and mental health support.
				</p>
			</div>

			<div>
				<h4 class="mb-4 font-semibold">Product</h4>
				<ul class="space-y-2 text-sm text-gray-400">
					<li><a href="{base}/unlock" class="hover:text-white">Student Portal</a></li>
					<li><a href="{base}/login" class="hover:text-white">Admin Dashboard</a></li>
					<li><span class="text-gray-500">Features (Coming Soon)</span></li>
					<li><span class="text-gray-500">Pricing (Free)</span></li>
				</ul>
			</div>

			<div>
				<h4 class="mb-4 font-semibold">Community</h4>
				<ul class="space-y-2 text-sm text-gray-400">
					<li>
						<a href="https://github.com/koneksi-jaringan/we-will-shine" class="hover:text-white"
							>GitHub</a
						>
					</li>
					<li><a href="https://discord.gg/we-will-shine" class="hover:text-white">Discord</a></li>
					<li><span class="text-gray-500">Documentation (Coming Soon)</span></li>
					<li><span class="text-gray-500">Contributing (Coming Soon)</span></li>
				</ul>
			</div>

			<div>
				<h4 class="mb-4 font-semibold">Support</h4>
				<ul class="space-y-2 text-sm text-gray-400">
					<li>
						<a href="mailto:support@we-will-shine.org" class="hover:text-white">Contact Us</a>
					</li>
					<li><span class="text-gray-500">Help Center (Coming Soon)</span></li>
					<li><span class="text-gray-500">Privacy Policy (Coming Soon)</span></li>
					<li><span class="text-gray-500">Terms of Service (Coming Soon)</span></li>
				</ul>
			</div>
		</div>

		<div class="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
			<p>&copy; 2024 We Will Shine. Built with ❤️ by PT Koneksi Jaringan Indonesia.</p>
		</div>
	</div>
</footer>

<style>
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
</style>
