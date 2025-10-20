<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import TabNavigation from '$lib/components/TabNavigation.svelte';
	import {
		setTabNavigation,
		hideTabNavigation,
		setHeaderVisibility
	} from '$lib/stores/tabNavigation';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// Tab sections configuration
	const sections = [
		{ id: 'metrics', label: 'Metrics', icon: '📊' },
		{ id: 'belajar-id', label: 'Belajar.id', icon: '🏛️' },
		{ id: 'vision', label: 'Vision', icon: '🎯' },
		{ id: 'contact', label: 'Contact', icon: '📞' }
	];

	let activeSection = $state($page.url.searchParams.get('tab') || 'metrics');
	let tabNavigationElement: any = $state();

	// Success metrics animation
	let targetSchools = $state(0);
	let targetStudents = $state(0);
	let targetBudgetSaved = $state(0);

	const TARGET_SCHOOLS = 1000;
	const TARGET_STUDENTS = 500000;
	const TARGET_BUDGET = 75; // billion

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

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting && entry.target.id === 'metrics') {
						animateMetrics();
					}
				});
			},
			{ threshold: 0.3 }
		);

		const section = document.getElementById('metrics');
		if (section) observer.observe(section);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			observer.disconnect();
			hideTabNavigation();
		};
	});

	// Update store when activeSection changes
	$effect(() => {
		if (activeSection) {
			setTabNavigation(sections, activeSection);
		}
	});

	function animateMetrics() {
		const duration = 2000;
		const steps = 60;
		const interval = duration / steps;
		let currentStep = 0;

		const timer = setInterval(() => {
			currentStep++;
			const progress = currentStep / steps;
			const easeOut = 1 - Math.pow(1 - progress, 3);

			targetSchools = Math.floor(TARGET_SCHOOLS * easeOut);
			targetStudents = Math.floor(TARGET_STUDENTS * easeOut);
			targetBudgetSaved = Math.floor(TARGET_BUDGET * easeOut);

			if (currentStep >= steps) {
				targetSchools = TARGET_SCHOOLS;
				targetStudents = TARGET_STUDENTS;
				targetBudgetSaved = TARGET_BUDGET;
				clearInterval(timer);
			}
		}, interval);
	}
</script>

<svelte:head>
	<title>Partnership - We Will Shine</title>
	<meta
		name="description"
		content="Kolaborasi untuk masa depan pendidikan Indonesia. Integrasi Belajar.id, data sovereignty, dan evaluasi pendidikan berbasis data."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<div
				class="mb-6 inline-block rounded-full bg-white/20 px-6 py-2 text-sm font-semibold backdrop-blur-sm"
			>
				🇮🇩 Built for Indonesia's Future
			</div>
			<h1 class="mb-6 text-5xl font-bold sm:text-6xl">
				Partnership untuk Transformasi Digital Pendidikan
			</h1>
			<p class="mx-auto mb-8 max-w-3xl text-xl text-indigo-100">
				Mengundang Kemendikbud, Kominfo, institusi pendidikan, dan stakeholder untuk berkolaborasi
				membangun ekosistem pendidikan digital yang berdaulat dan berkelanjutan
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="mailto:government@konxc.space"
					class="rounded-xl bg-white px-8 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
				>
					Hubungi Tim Partnership
				</a>
				<a
					href="#vision"
					class="rounded-xl border-2 border-white bg-transparent px-8 py-3 font-semibold transition-all hover:bg-white/10"
				>
					Lihat Visi Lengkap
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Tab Navigation -->
<TabNavigation bind:this={tabNavigationElement} bind:activeSection {sections} position="sticky" />

<!-- Success Metrics Target -->
<section id="metrics" class="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900">Target Dampak Partnership 2025-2030</h2>
			<p class="text-gray-600">Proyeksi transformasi pendidikan digital nasional</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<div
				class="rounded-3xl bg-white/70 p-8 text-center shadow-xl backdrop-blur-lg transition-transform hover:scale-105"
			>
				<div class="mb-4 text-5xl">🏫</div>
				<p class="mb-2 text-5xl font-bold text-indigo-600">
					{targetSchools.toLocaleString('id-ID')}+
				</p>
				<p class="font-semibold text-gray-900">Sekolah Partner</p>
				<p class="mt-2 text-sm text-gray-600">Dari SD hingga SMA di seluruh Indonesia</p>
			</div>

			<div
				class="rounded-3xl bg-white/70 p-8 text-center shadow-xl backdrop-blur-lg transition-transform hover:scale-105"
			>
				<div class="mb-4 text-5xl">👥</div>
				<p class="mb-2 text-5xl font-bold text-purple-600">
					{targetStudents.toLocaleString('id-ID')}+
				</p>
				<p class="font-semibold text-gray-900">Siswa Terdampak</p>
				<p class="mt-2 text-sm text-gray-600">
					Akses gratis ke AI learning & mental health support
				</p>
			</div>

			<div
				class="rounded-3xl bg-white/70 p-8 text-center shadow-xl backdrop-blur-lg transition-transform hover:scale-105"
			>
				<div class="mb-4 text-5xl">💰</div>
				<p class="mb-2 text-5xl font-bold text-green-600">
					Rp {targetBudgetSaved}M
				</p>
				<p class="font-semibold text-gray-900">Budget Hemat</p>
				<p class="mt-2 text-sm text-gray-600">vs solusi proprietary asing per tahun</p>
			</div>
		</div>

		<!-- Additional Impact -->
		<div class="mt-8 grid gap-4 md:grid-cols-4">
			<div class="rounded-2xl bg-blue-50/70 p-4 text-center backdrop-blur-sm">
				<p class="text-2xl font-bold text-blue-600">100%</p>
				<p class="text-sm text-gray-700">Data Sovereignty</p>
			</div>
			<div class="rounded-2xl bg-green-50/70 p-4 text-center backdrop-blur-sm">
				<p class="text-2xl font-bold text-green-600">24/7</p>
				<p class="text-sm text-gray-700">AI Mentor Access</p>
			</div>
			<div class="rounded-2xl bg-purple-50/70 p-4 text-center backdrop-blur-sm">
				<p class="text-2xl font-bold text-purple-600">5x</p>
				<p class="text-sm text-gray-700">ROI Improvement</p>
			</div>
			<div class="rounded-2xl bg-pink-50/70 p-4 text-center backdrop-blur-sm">
				<p class="text-2xl font-bold text-pink-600">Zero</p>
				<p class="text-sm text-gray-700">Vendor Lock-in</p>
			</div>
		</div>
	</div>
</section>

<!-- Belajar.id Integration -->
<section id="belajar-id" class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Integrasi Belajar.id</h2>
			<p class="mx-auto max-w-3xl text-lg text-gray-700">
				Mendukung penuh ekosistem <strong>Belajar.id</strong> dari Kemendikbud sebagai langkah nyata
				untuk kedaulatan digital pendidikan Indonesia
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-2">
			<!-- Current Belajar.id -->
			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<div class="mb-6 flex items-center gap-4">
					<div class="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
						<span class="text-3xl">📧</span>
					</div>
					<div>
						<h3 class="text-xl font-bold text-gray-900">Belajar.id Saat Ini</h3>
						<p class="text-sm text-gray-600">Google Workspace for Education</p>
					</div>
				</div>
				<ul class="space-y-3 text-gray-700">
					<li class="flex items-start gap-3">
						<span class="mt-1 text-blue-600">▸</span>
						<span>Email standar untuk 50+ juta siswa & guru di seluruh Indonesia</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-blue-600">▸</span>
						<span>Infrastruktur dari Google (Gmail, Drive, Meet, Classroom)</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-blue-600">▸</span>
						<span>Fokus pada komunikasi & kolaborasi dasar</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-blue-600">▸</span>
						<span>Data tersimpan di server Google (luar negeri)</span>
					</li>
				</ul>
			</div>

			<!-- We Will Shine Integration -->
			<div
				class="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white shadow-xl"
			>
				<div class="mb-6 flex items-center gap-4">
					<div
						class="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
					>
						<span class="text-3xl">🌟</span>
					</div>
					<div>
						<h3 class="text-xl font-bold">We Will Shine + Belajar.id</h3>
						<p class="text-sm text-indigo-100">The Next Evolution</p>
					</div>
				</div>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<span class="mt-1">✅</span>
						<span><strong>Single Sign-On</strong> - login sekali dengan akun Belajar.id</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1">✅</span>
						<span><strong>AI Learning Mentor</strong> - 2USE untuk setiap pelajar</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1">✅</span>
						<span><strong>Mental Health Support</strong> - AI psikolog & wellness tracking</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1">✅</span>
						<span><strong>Productivity Analytics</strong> - evaluasi pembelajaran real-time</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1">✅</span>
						<span
							><strong>Data Sovereignty</strong> - server di Indonesia, data milik Indonesia</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1">✅</span>
						<span><strong>Open Source</strong> - transparan, auditable, customizable</span>
					</li>
				</ul>
			</div>
		</div>

		<div class="mt-12 rounded-2xl border-2 border-indigo-200 bg-white p-8">
			<h3 class="mb-6 text-center text-2xl font-bold text-gray-900">Technical Integration Path</h3>
			<div class="grid gap-8 md:grid-cols-3">
				<div>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-600"
					>
						1
					</div>
					<h4 class="mb-2 font-semibold text-gray-900">OAuth Integration</h4>
					<p class="text-sm text-gray-600">
						SSO via Google OAuth untuk seamless login dengan akun @belajar.id tanpa password baru
					</p>
				</div>
				<div>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-600"
					>
						2
					</div>
					<h4 class="mb-2 font-semibold text-gray-900">Data Sync</h4>
					<p class="text-sm text-gray-600">
						Sinkronisasi profile siswa dari Dapodik untuk auto-enrollment dan class assignment
					</p>
				</div>
				<div>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-2xl font-bold text-pink-600"
					>
						3
					</div>
					<h4 class="mb-2 font-semibold text-gray-900">Analytics API</h4>
					<p class="text-sm text-gray-600">
						Real-time dashboard untuk Kemendikbud: learning progress, mental health trends,
						engagement metrics
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- National Vision -->
<section id="vision" class="bg-gradient-to-r from-red-600 via-white to-red-600 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm md:p-12">
			<div class="mb-8 text-center">
				<div class="mb-4 text-6xl">🇮🇩</div>
				<h2 class="mb-4 text-4xl font-bold text-gray-900">Visi untuk Indonesia</h2>
				<p class="mx-auto max-w-3xl text-xl font-semibold text-red-600">
					"Lebih dari sekadar aplikasi - ini adalah gerakan untuk kedaulatan digital pendidikan
					Indonesia"
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2">
				<!-- Current Challenge -->
				<div class="rounded-2xl border-2 border-red-200 bg-red-50 p-6">
					<h3 class="mb-4 text-xl font-bold text-red-900">⚠️ Tantangan Saat Ini</h3>
					<ul class="space-y-3 text-gray-700">
						<li class="flex items-start gap-3">
							<span class="mt-1 text-red-600">▸</span>
							<span>Data pendidikan 50+ juta siswa Indonesia tersimpan di server luar negeri</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 text-red-600">▸</span>
							<span>Ketergantungan 100% pada teknologi asing untuk AI & LLM</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 text-red-600">▸</span>
							<span
								>Evaluasi pendidikan hanya dari top-down, tidak dari akar rumput (grassroots)</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 text-red-600">▸</span>
							<span>Mental health crisis di kalangan pelajar terabaikan (WHO: 1 dari 7 remaja)</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 text-red-600">▸</span>
							<span>Solusi edtech berbayar tidak terjangkau untuk mayoritas pelajar Indonesia</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 text-red-600">▸</span>
							<span>Tidak ada transparency dalam algoritma AI yang digunakan untuk pendidikan</span>
						</li>
					</ul>
				</div>

				<!-- Our Solution -->
				<div class="rounded-2xl border-2 border-green-200 bg-green-50 p-6">
					<h3 class="mb-4 text-xl font-bold text-green-900">✅ Solusi We Will Shine</h3>
					<ul class="space-y-3 text-gray-700">
						<li class="flex items-start gap-3">
							<span class="mt-1 text-green-600">▸</span>
							<span
								><strong>Data Sovereignty</strong> - Server lokal di Indonesia dengan enkripsi penuh</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 text-green-600">▸</span>
							<span
								><strong>2USE AI</strong> - Riset LLM lokal untuk bahasa & konteks Indonesia</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 text-green-600">▸</span>
							<span
								><strong>Grassroots Analytics</strong> - Data pembelajaran real-time untuk evidence-based
								policy</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 text-green-600">▸</span>
							<span
								><strong>Mental Health First</strong> - AI psikolog untuk setiap pelajar, privacy-focused</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 text-green-600">▸</span>
							<span
								><strong>Gratis & Open Source</strong> - Akses setara untuk semua, no subscription barrier</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="mt-1 text-green-600">▸</span>
							<span
								><strong>Full Transparency</strong> - Open source code, auditable algorithms, community
								governance</span
							>
						</li>
					</ul>
				</div>
			</div>

			<div class="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
				<h3 class="mb-4 text-center text-2xl font-bold">Dampak Jangka Panjang (5-10 Tahun)</h3>
				<div class="grid gap-6 md:grid-cols-4">
					<div class="text-center">
						<div class="mb-2 text-4xl font-bold">50M+</div>
						<p class="text-sm text-indigo-100">Pelajar Indonesia dengan akses AI mentor gratis</p>
					</div>
					<div class="text-center">
						<div class="mb-2 text-4xl font-bold">100%</div>
						<p class="text-sm text-indigo-100">Data pendidikan milik Indonesia, bukan BigTech</p>
					</div>
					<div class="text-center">
						<div class="mb-2 text-4xl font-bold">Real-time</div>
						<p class="text-sm text-indigo-100">
							Analytics untuk kebijakan pendidikan berbasis data
						</p>
					</div>
					<div class="text-center">
						<div class="mb-2 text-4xl font-bold">Open</div>
						<p class="text-sm text-indigo-100">Source untuk transparansi & inovasi berkelanjutan</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Stakeholder Benefits -->
<section id="contact" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Manfaat untuk Setiap Stakeholder</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Kolaborasi multi-stakeholder untuk ekosistem yang sustainable dan impactful
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Kemendikbud -->
			<div class="rounded-2xl border-2 border-indigo-200 bg-white p-6 shadow-lg">
				<div class="mb-4 text-4xl">🏛️</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Kemendikbud</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>✅ Real-time dashboard learning analytics nasional</li>
					<li>✅ Evidence-based policy making</li>
					<li>✅ Mental health monitoring untuk intervensi dini</li>
					<li>✅ Evaluasi efektivitas kurikulum dari data aktual</li>
					<li>✅ Zero cost (fully sponsored model)</li>
				</ul>
			</div>

			<!-- Kominfo -->
			<div class="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
				<div class="mb-4 text-4xl">📡</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Kominfo</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>✅ Data sovereignty showcase project</li>
					<li>✅ Domestic AI/LLM development support</li>
					<li>✅ Digital literacy enhancement via AI</li>
					<li>✅ Cybersecurity & privacy compliance (GDPR-like)</li>
					<li>✅ Open source reference implementation</li>
				</ul>
			</div>

			<!-- Sekolah -->
			<div class="rounded-2xl border-2 border-pink-200 bg-white p-6 shadow-lg">
				<div class="mb-4 text-4xl">🏫</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Sekolah & Guru</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>✅ AI teaching assistant untuk setiap guru</li>
					<li>✅ Student progress monitoring dashboard</li>
					<li>✅ Early warning system untuk siswa at-risk</li>
					<li>✅ Reduced administrative burden</li>
					<li>✅ Free (jika via Sistem Akademik)</li>
				</ul>
			</div>

			<!-- Siswa -->
			<div class="rounded-2xl border-2 border-green-200 bg-white p-6 shadow-lg">
				<div class="mb-4 text-4xl">🎓</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Siswa & Mahasiswa</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>✅ Personal AI mentor 24/7</li>
					<li>✅ Mental health support & counseling</li>
					<li>✅ Personalized learning path</li>
					<li>✅ Career guidance & skill mapping</li>
					<li>✅ Free forever (with BYOK option)</li>
				</ul>
			</div>

			<!-- Orang Tua -->
			<div class="rounded-2xl border-2 border-orange-200 bg-white p-6 shadow-lg">
				<div class="mb-4 text-4xl">👨‍👩‍👧</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Orang Tua</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>✅ Visibility ke learning progress anak</li>
					<li>✅ Mental health & wellbeing insights</li>
					<li>✅ Communication channel dengan guru</li>
					<li>✅ Peace of mind (privacy & safety)</li>
					<li>✅ Zero additional cost</li>
				</ul>
			</div>

			<!-- Peneliti -->
			<div class="rounded-2xl border-2 border-yellow-200 bg-white p-6 shadow-lg">
				<div class="mb-4 text-4xl">🔬</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Peneliti & Akademisi</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>✅ Open dataset untuk education research</li>
					<li>✅ API akses untuk custom analysis</li>
					<li>✅ Collaboration opportunities</li>
					<li>✅ Publication-ready anonymized data</li>
					<li>✅ Open source contribution welcome</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Roadmap -->
<section class="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Roadmap Kolaborasi</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Timeline realistis untuk implementasi bertahap dengan milestone yang terukur
			</p>
		</div>

		<div class="space-y-8">
			<!-- Phase 1 -->
			<div class="rounded-2xl border-2 border-indigo-200 bg-white p-8">
				<div class="mb-4 flex items-center gap-4">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white"
					>
						Q1
					</div>
					<div>
						<h3 class="text-2xl font-bold text-gray-900">Pilot Program</h3>
						<p class="text-gray-600">3-6 bulan • 5-10 sekolah pilot</p>
					</div>
				</div>
				<div class="grid gap-4 md:grid-cols-3">
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Technical</h4>
						<ul class="space-y-1 text-sm text-gray-600">
							<li>• Belajar.id SSO integration</li>
							<li>• Local server setup (Jakarta DC)</li>
							<li>• Basic analytics dashboard</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Users</h4>
						<ul class="space-y-1 text-sm text-gray-600">
							<li>• 5,000-10,000 active students</li>
							<li>• 500-1,000 teachers</li>
							<li>• 5-10 diverse schools (urban/rural)</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Metrics</h4>
						<ul class="space-y-1 text-sm text-gray-600">
							<li>• User engagement & retention</li>
							<li>• Learning outcome improvement</li>
							<li>• Mental health impact</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Phase 2 -->
			<div class="rounded-2xl border-2 border-purple-200 bg-white p-8">
				<div class="mb-4 flex items-center gap-4">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white"
					>
						Q2
					</div>
					<div>
						<h3 class="text-2xl font-bold text-gray-900">Regional Expansion</h3>
						<p class="text-gray-600">6-12 bulan • 100+ sekolah</p>
					</div>
				</div>
				<div class="grid gap-4 md:grid-cols-3">
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Technical</h4>
						<ul class="space-y-1 text-sm text-gray-600">
							<li>• Multi-region server deployment</li>
							<li>• Advanced analytics & ML models</li>
							<li>• Mobile app launch</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Users</h4>
						<ul class="space-y-1 text-sm text-gray-600">
							<li>• 100,000+ students</li>
							<li>• All provinces represented</li>
							<li>• Public & private schools</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Impact</h4>
						<ul class="space-y-1 text-sm text-gray-600">
							<li>• Measurable learning gains</li>
							<li>• Mental health improvement data</li>
							<li>• Cost savings vs alternatives</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Phase 3 -->
			<div class="rounded-2xl border-2 border-pink-200 bg-white p-8">
				<div class="mb-4 flex items-center gap-4">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-xl font-bold text-white"
					>
						Q3
					</div>
					<div>
						<h3 class="text-2xl font-bold text-gray-900">National Rollout</h3>
						<p class="text-gray-600">1-2 tahun • All Belajar.id users</p>
					</div>
				</div>
				<div class="grid gap-4 md:grid-cols-3">
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Technical</h4>
						<ul class="space-y-1 text-sm text-gray-600">
							<li>• Full Belajar.id integration</li>
							<li>• Nationwide CDN & edge servers</li>
							<li>• Government dashboard API</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Scale</h4>
						<ul class="space-y-1 text-sm text-gray-600">
							<li>• 50M+ Belajar.id users</li>
							<li>• All K-12 schools eligible</li>
							<li>• Default platform status</li>
						</ul>
					</div>
					<div>
						<h4 class="mb-2 font-semibold text-gray-900">Legacy</h4>
						<ul class="space-y-1 text-sm text-gray-600">
							<li>• Indonesia's own EdTech infra</li>
							<li>• Regional expansion (ASEAN)</li>
							<li>• Open source model export</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-white">Mari Berkolaborasi</h2>
			<p class="mx-auto max-w-3xl text-xl text-indigo-100">
				Kami siap untuk diskusi, presentasi, atau pilot program. Hubungi tim kami untuk memulai
				perjalanan transformasi digital pendidikan Indonesia.
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<!-- For Government -->
			<div class="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm">
				<div class="mb-4 text-4xl">🏛️</div>
				<h3 class="mb-3 text-xl font-bold text-white">Pemerintah & Regulator</h3>
				<p class="mb-6 text-sm text-indigo-100">
					Kemendikbud, Kominfo, Bappenas, atau stakeholder pemerintah lainnya
				</p>
				<a
					href="mailto:government@konxc.space?subject=Partnership Inquiry - Government"
					class="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
				>
					government@konxc.space
				</a>
			</div>

			<!-- For Institutions -->
			<div class="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm">
				<div class="mb-4 text-4xl">🏫</div>
				<h3 class="mb-3 text-xl font-bold text-white">Institusi Pendidikan</h3>
				<p class="mb-6 text-sm text-indigo-100">
					Universitas, yayasan pendidikan, atau konsorsium sekolah
				</p>
				<a
					href="mailto:sales@konxc.space?subject=Partnership Inquiry - Institution"
					class="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
				>
					sales@konxc.space
				</a>
			</div>

			<!-- For Researchers -->
			<div class="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm">
				<div class="mb-4 text-4xl">🔬</div>
				<h3 class="mb-3 text-xl font-bold text-white">Peneliti & Akademisi</h3>
				<p class="mb-6 text-sm text-indigo-100">
					Research collaboration, data access, atau co-publication
				</p>
				<a
					href="mailto:research@konxc.space?subject=Research Collaboration Inquiry"
					class="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
				>
					research@konxc.space
				</a>
			</div>
		</div>

		<div class="mt-12 text-center">
			<p class="text-indigo-100">Atau lihat detail pricing dan technical specs:</p>
			<div class="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a href="{base}/pricing" class="btn-white-outline"> Pricing </a>
				<a
					href="https://github.com/konxc/we-will-shine"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-white-outline"
				>
					GitHub Docs
				</a>
			</div>
		</div>
	</div>
</section>

<Footer />

<style lang="postcss">
	@reference "tailwindcss";
</style>
