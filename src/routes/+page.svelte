<script lang="ts">
	import { base } from '$app/paths';
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
			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
				<a
					href="https://github.com/koneksi-jaringan/we-will-shine"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center justify-center gap-3 rounded-2xl bg-gray-950 px-8 py-4 text-lg font-semibold text-white shadow transition hover:bg-black"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="currentColor"
						viewBox="0 0 24 24"
						class="h-7 w-7"
						><path
							d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.387.6.113.793-.258.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.342-5.467-5.976 0-1.32.47-2.399 1.236-3.244-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.47 11.47 0 0 1 3.005-.404c1.02.005 2.047.138 3.006.404C17.993 6.137 19 6.459 19 6.459c.653 1.653.242 2.873.118 3.176.77.845 1.235 1.924 1.235 3.244 0 4.645-2.807 5.668-5.479 5.968.43.372.823 1.102.823 2.222v3.293c0 .322.192.694.801.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"
						/></svg
					>
					<span>Star on GitHub</span>
				</a>
				<a
					href="https://discord.gg/we-will-shine"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center justify-center gap-3 rounded-2xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow transition hover:bg-indigo-700"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="h-7 w-7"
						><path
							d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.07.07 0 0 0-.073.035c-.211.377-.445.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.163-.385-.405-.872-.617-1.249a.07.07 0 0 0-.072-.035c-1.67.288-3.291.798-4.885 1.515a.062.062 0 0 0-.028.027C.533 7.295-.319 10.122.099 12.884c.002.013.008.025.017.035a19.978 19.978 0 0 0 5.993 3.071.07.07 0 0 0 .076-.027c.461-.63.873-1.294 1.226-1.978a.07.07 0 0 0-.038-.099 13.13 13.13 0 0 1-1.884-.892.07.07 0 0 1-.008-.116c.127-.096.254-.194.374-.291a.07.07 0 0 1 .068-.009c3.927 1.793 8.18 1.793 12.062 0a.07.07 0 0 1 .069.008c.12.098.247.196.374.292a.07.07 0 0 1-.006.116c-.593.349-1.22.666-1.883.891a.07.07 0 0 0-.04.1c.36.684.775 1.348 1.226 1.978a.07.07 0 0 0 .076.028 19.93 19.93 0 0 0 6-3.07.07.07 0 0 0 .017-.035c.5-3.201-.838-6.004-3.49-8.489a.061.061 0 0 0-.03-.029zM8.02 14.523c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.954-2.417 2.157-2.417 1.21 0 2.177 1.092 2.157 2.418 0 1.333-.954 2.418-2.157 2.418zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.954-2.417 2.157-2.417 1.21 0 2.177 1.092 2.157 2.418 0 1.333-.947 2.418-2.157 2.418z"
						/></svg
					>
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
