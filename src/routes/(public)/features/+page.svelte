<script lang="ts">
	import TabNavigation from '$lib/components/TabNavigation.svelte';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import {
		setTabNavigation,
		hideTabNavigation,
		setHeaderVisibility
	} from '$lib/stores/tabNavigation';

	// Feature sections configuration
	const sections = [
		{ id: 'ai-mentor', label: 'AI Mentor', icon: '🤖' },
		{ id: 'mental-health', label: 'Mental Health', icon: '🧠' },
		{ id: 'productivity', label: 'Productivity', icon: '⚡' },
		{ id: 'analytics', label: 'Analytics', icon: '📊' },
		{ id: 'integration', label: 'Integration', icon: '🔗' }
	];

	let activeSection = $state('ai-mentor');
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let tabNavigationElement: any = $state();

	onMount(() => {
		// Set tab navigation in store
		setTabNavigation(sections, activeSection);

		// Scroll detection for header visibility
		const handleScroll = () => {
			if (tabNavigationElement) {
				const rect = tabNavigationElement.getBoundingClientRect();
				// Show in header when tab navigation is scrolled past
				setHeaderVisibility(rect.bottom < 0);
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial check

		// Cleanup when component is destroyed
		return () => {
			window.removeEventListener('scroll', handleScroll);
			hideTabNavigation();
		};
	});

	// Update store when activeSection changes
	$effect(() => {
		if (activeSection) {
			setTabNavigation(sections, activeSection);
		}
	});
</script>

<svelte:head>
	<title>Features - We Will Shine</title>
	<meta
		name="description"
		content="Explore all features of We Will Shine: AI Learning Mentor, Mental Health Support, Productivity Analytics, and more."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1
				class="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl"
			>
				Fitur Lengkap We Will Shine
			</h1>
			<p class="mx-auto mb-8 max-w-3xl text-xl text-gray-700">
				Ekosistem pembelajaran AI yang comprehensive untuk mengoptimalkan potensi setiap pelajar
			</p>
			<a href="{base}/signin" class="btn-gradient-primary"> Coba Gratis Sekarang → </a>
		</div>
	</div>
</section>

<!-- Tab Navigation - Below Hero -->
<TabNavigation bind:this={tabNavigationElement} bind:activeSection {sections} position="sticky" />

<!-- AI Learning Mentor -->
<section id="ai-mentor" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div>
				<div
					class="mb-4 inline-block rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-600"
				>
					🤖 Core Feature
				</div>
				<h2 class="mb-6 text-4xl font-bold text-gray-900">AI Learning Mentor</h2>
				<p class="mb-6 text-lg text-gray-700">
					Berbasis <strong>2USE AI</strong>, AI mentor kami dirancang khusus untuk pembelajaran
					dengan metode Socratic - bukan sekadar memberikan jawaban, tapi membimbing Anda untuk
					berpikir kritis.
				</p>

				<div class="space-y-4">
					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100"
						>
							<span class="text-xl">🧠</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Socratic Method</h3>
							<p class="text-gray-600">
								AI tidak langsung memberikan jawaban. Sebaliknya, Anda dipandu dengan
								pertanyaan-pertanyaan untuk menemukan jawaban sendiri.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100"
						>
							<span class="text-xl">🎯</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Personalized Learning</h3>
							<p class="text-gray-600">
								AI memahami gaya belajar Anda, pace Anda, dan menyesuaikan penjelasan sesuai level
								pemahaman.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-100"
						>
							<span class="text-xl">📚</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">All Subjects Covered</h3>
							<p class="text-gray-600">
								Matematika, Fisika, Kimia, Biologi, Bahasa, Sejarah, dan semua mata pelajaran
								lainnya.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-100"
						>
							<span class="text-xl">🌍</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Multilingual</h3>
							<p class="text-gray-600">
								Dukungan Bahasa Indonesia dan Inggris dengan pemahaman konteks lokal.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				class="rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 p-12 text-white shadow-2xl"
			>
				<div class="mb-6 text-6xl">💬</div>
				<h3 class="mb-4 text-2xl font-bold">Contoh Percakapan:</h3>
				<div class="space-y-4 text-sm">
					<div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
						<p class="mb-1 font-semibold text-indigo-200">Siswa:</p>
						<p>"Gimana cara ngerjain soal integral ini?"</p>
					</div>
					<div class="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
						<p class="mb-1 font-semibold text-purple-200">AI Mentor:</p>
						<p>
							"Oke, sebelum kita mulai - kamu sudah paham konsep turunan kan? Coba jelaskan dengan
							kata-kata kamu sendiri, apa hubungan integral dan turunan?"
						</p>
					</div>
					<div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
						<p class="mb-1 font-semibold text-indigo-200">Siswa:</p>
						<p>"Integral itu kayak kebalikan dari turunan..."</p>
					</div>
					<div class="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
						<p class="mb-1 font-semibold text-purple-200">AI Mentor:</p>
						<p>
							"Bagus sekali! 👏 Sekarang dengan pemahaman itu, coba lihat soalnya lagi. Bentuk
							fungsi apa yang kamu lihat?"
						</p>
					</div>
				</div>
				<p class="mt-6 text-sm text-indigo-100 italic">
					💡 Bukan jawaban instan - tapi pembelajaran yang mendalam
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Mental Health Support -->
<section id="mental-health" class="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div class="order-2 lg:order-1">
				<div
					class="rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 p-12 text-white shadow-2xl"
				>
					<div class="mb-6 text-6xl">🧠</div>
					<h3 class="mb-4 text-2xl font-bold">Dukungan Mental Health</h3>
					<div class="space-y-4 text-sm">
						<div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
							<p class="mb-1 font-semibold text-purple-200">Mood Check-in:</p>
							<p>"Bagaimana perasaanmu hari ini? Ada yang mengganggu pikiran?"</p>
						</div>
						<div class="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
							<p class="mb-1 font-semibold text-pink-200">Stress Management:</p>
							<p>"Mari kita coba teknik pernapasan untuk mengurangi kecemasan..."</p>
						</div>
						<div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
							<p class="mb-1 font-semibold text-purple-200">Motivational Support:</p>
							<p>"Kamu sudah melakukan yang terbaik hari ini. Istirahatlah sejenak."</p>
						</div>
					</div>
					<p class="mt-6 text-sm text-purple-100 italic">💚 Dukungan emosional yang selalu ada</p>
				</div>
			</div>

			<div class="order-1 lg:order-2">
				<div
					class="mb-4 inline-block rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-600"
				>
					🧠 Mental Health
				</div>
				<h2 class="mb-6 text-4xl font-bold text-gray-900">Dukungan Psikologis Terintegrasi</h2>
				<p class="mb-6 text-lg text-gray-700">
					Pembelajaran yang efektif tidak hanya tentang akademik. Kami memahami bahwa kesehatan
					mental adalah fondasi dari kesuksesan belajar.
				</p>

				<div class="space-y-4">
					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100"
						>
							<span class="text-xl">😊</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Mood Tracking</h3>
							<p class="text-gray-600">
								Pantau kondisi emosional Anda dan dapatkan insight tentang pola belajar yang
								optimal.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-pink-100"
						>
							<span class="text-xl">🧘</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">AI Psychological Assessment</h3>
							<p class="text-gray-600">
								Teknik relaksasi dan mindfulness yang dapat dilakukan kapan saja, di mana saja.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-100"
						>
							<span class="text-xl">💪</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Motivational Support</h3>
							<p class="text-gray-600">
								Kata-kata penyemangat dan reminder positif untuk menjaga motivasi belajar.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100"
						>
							<span class="text-xl">🎯</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Goal Setting</h3>
							<p class="text-gray-600">
								Bantuan dalam menetapkan tujuan belajar yang realistis dan achievable.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Productivity Analytics -->
<section id="productivity" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div>
				<div
					class="mb-4 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600"
				>
					⚡ Productivity
				</div>
				<h2 class="mb-6 text-4xl font-bold text-gray-900">Analytics Produktivitas</h2>
				<p class="mb-6 text-lg text-gray-700">
					Pantau dan optimalkan pola belajar Anda dengan insight mendalam tentang produktivitas dan
					efisiensi belajar.
				</p>

				<div class="space-y-4">
					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100"
						>
							<span class="text-xl">📊</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Learning Analytics</h3>
							<p class="text-gray-600">
								Analisis mendalam tentang waktu belajar, topik yang dikuasai, dan area yang perlu
								perhatian.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
						>
							<span class="text-xl">⏰</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Time Management</h3>
							<p class="text-gray-600">
								Rekomendasi jadwal belajar optimal berdasarkan ritme biologis dan pola produktivitas
								Anda.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100"
						>
							<span class="text-xl">🎯</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Focus Tracking</h3>
							<p class="text-gray-600">
								Pantau tingkat konsentrasi dan identifikasi waktu-waktu terbaik untuk belajar.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-100"
						>
							<span class="text-xl">📈</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Progress Tracking</h3>
							<p class="text-gray-600">
								Visualisasi kemajuan belajar dengan grafik dan statistik yang mudah dipahami.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				class="rounded-3xl bg-gradient-to-br from-green-500 to-blue-600 p-12 text-white shadow-2xl"
			>
				<div class="mb-6 text-6xl">📊</div>
				<h3 class="mb-4 text-2xl font-bold">Dashboard Analytics</h3>
				<div class="space-y-4 text-sm">
					<div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
						<p class="mb-1 font-semibold text-green-200">Hari Ini:</p>
						<p>"2 jam 30 menit belajar, 85% fokus, 3 topik dikuasai"</p>
					</div>
					<div class="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
						<p class="mb-1 font-semibold text-blue-200">Minggu Ini:</p>
						<p>"12 jam total, peningkatan 15% dari minggu lalu"</p>
					</div>
					<div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
						<p class="mb-1 font-semibold text-green-200">Rekomendasi:</p>
						<p>"Waktu terbaik belajar: 08:00-10:00 dan 19:00-21:00"</p>
					</div>
				</div>
				<p class="mt-6 text-sm text-green-100 italic">📈 Data-driven learning optimization</p>
			</div>
		</div>
	</div>
</section>

<!-- Learning Analytics -->
<section id="analytics" class="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div class="order-2 lg:order-1">
				<div
					class="rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 p-12 text-white shadow-2xl"
				>
					<div class="mb-6 text-6xl">📈</div>
					<h3 class="mb-4 text-2xl font-bold">Learning Insights</h3>
					<div class="space-y-4 text-sm">
						<div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
							<p class="mb-1 font-semibold text-blue-200">Strengths:</p>
							<p>"Matematika: 92% mastery, Fisika: 88% mastery"</p>
						</div>
						<div class="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
							<p class="mb-1 font-semibold text-indigo-200">Areas to Improve:</p>
							<p>"Kimia: 65% mastery, perlu lebih banyak latihan"</p>
						</div>
						<div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
							<p class="mb-1 font-semibold text-blue-200">Learning Pattern:</p>
							<p>"Visual learner, responds well to diagrams"</p>
						</div>
					</div>
					<p class="mt-6 text-sm text-blue-100 italic">🎯 Personalized learning insights</p>
				</div>
			</div>

			<div class="order-1 lg:order-2">
				<div
					class="mb-4 inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600"
				>
					📊 Analytics
				</div>
				<h2 class="mb-6 text-4xl font-bold text-gray-900">Learning Analytics</h2>
				<p class="mb-6 text-lg text-gray-700">
					Data-driven insights untuk memahami pola belajar Anda dan mengoptimalkan proses
					pembelajaran.
				</p>

				<div class="space-y-4">
					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
						>
							<span class="text-xl">📊</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Performance Metrics</h3>
							<p class="text-gray-600">
								Tracking skor, waktu penyelesaian, dan tingkat kesulitan untuk setiap topik.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100"
						>
							<span class="text-xl">🧠</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Learning Style Analysis</h3>
							<p class="text-gray-600">
								Identifikasi gaya belajar yang paling efektif untuk Anda (visual, auditory,
								kinesthetic).
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100"
						>
							<span class="text-xl">🎯</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Goal Achievement</h3>
							<p class="text-gray-600">
								Monitoring progress menuju tujuan belajar dengan milestone yang jelas.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100"
						>
							<span class="text-xl">📈</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Trend Analysis</h3>
							<p class="text-gray-600">
								Analisis tren belajar jangka panjang untuk mengidentifikasi pola dan peluang
								perbaikan.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Integration Features -->
<section id="integration" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center">
			<div>
				<div
					class="mb-4 inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600"
				>
					🔗 Integration
				</div>
				<h2 class="mb-6 text-4xl font-bold text-gray-900">Integrasi & Konektivitas</h2>
				<p class="mb-6 text-lg text-gray-700">
					We Will Shine terintegrasi dengan ekosistem pembelajaran yang lebih luas untuk memberikan
					pengalaman yang seamless.
				</p>

				<div class="space-y-4">
					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-orange-100"
						>
							<span class="text-xl">🏫</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Sistem Akademik</h3>
							<p class="text-gray-600">
								Integrasi dengan sistem akademik sekolah untuk sinkronisasi jadwal dan materi
								pembelajaran.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100"
						>
							<span class="text-xl">📱</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Mobile App</h3>
							<p class="text-gray-600">
								Aplikasi mobile yang sync dengan web platform untuk akses belajar di mana saja.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100"
						>
							<span class="text-xl">☁️</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">Cloud Sync</h3>
							<p class="text-gray-600">
								Data dan progress tersimpan di cloud untuk akses dari berbagai perangkat.
							</p>
						</div>
					</div>

					<div class="flex items-start gap-4">
						<div
							class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100"
						>
							<span class="text-xl">🔌</span>
						</div>
						<div>
							<h3 class="mb-1 font-semibold text-gray-900">API Integration</h3>
							<p class="text-gray-600">
								API yang memungkinkan integrasi dengan tools pembelajaran lainnya.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div
				class="rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-12 text-white shadow-2xl"
			>
				<div class="mb-6 text-6xl">🔗</div>
				<h3 class="mb-4 text-2xl font-bold">Ecosystem Integration</h3>
				<div class="space-y-4 text-sm">
					<div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
						<p class="mb-1 font-semibold text-orange-200">School System:</p>
						<p>"Sync dengan jadwal dan materi sekolah"</p>
					</div>
					<div class="rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
						<p class="mb-1 font-semibold text-red-200">Mobile Access:</p>
						<p>"Belajar di mana saja dengan mobile app"</p>
					</div>
					<div class="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
						<p class="mb-1 font-semibold text-orange-200">Cloud Backup:</p>
						<p>"Progress tersimpan aman di cloud"</p>
					</div>
				</div>
				<p class="mt-6 text-sm text-orange-100 italic">🌐 Seamless learning ecosystem</p>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-4 text-4xl font-bold text-white">Siap Memulai Perjalanan Belajar?</h2>
		<p class="mb-8 text-xl text-indigo-100">
			Bergabunglah dengan ribuan pelajar yang sudah merasakan manfaat We Will Shine
		</p>
		<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
			<a href="{base}/signin" class="btn-white-primary"> Mulai Gratis Sekarang </a>
			<a href="{base}/pricing" class="btn-white-outline"> Lihat Paket Lengkap </a>
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";
</style>
