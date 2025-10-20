<script lang="ts">
	import TabNavigation from '$lib/components/TabNavigation.svelte';
	import {
		setTabNavigation,
		hideTabNavigation,
		setHeaderVisibility
	} from '$lib/stores/tabNavigation';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	// Tab sections configuration
	const sections = [
		{ id: 'calculator', label: 'Kalkulator', icon: '🧮' },
		{ id: 'benefits', label: 'Manfaat', icon: '⚡' },
		{ id: 'dashboard', label: 'Dashboard', icon: '📊' },
		{ id: 'case-study', label: 'Case Study', icon: '📈' },
		{ id: 'implementation', label: 'Implementasi', icon: '🔧' },
		{ id: 'pricing', label: 'Pricing', icon: '💰' },
		{ id: 'faq', label: 'FAQ', icon: '❓' }
	];

	let activeSection = $state($page.url.searchParams.get('tab') || 'calculator');
	let tabNavigationElement: any = $state();

	// Calculator state
	let studentCount = $state(500);
	let monthlyPricePerStudent = $state(5000);

	// Calculated values
	const totalMonthly = $derived(studentCount * monthlyPricePerStudent);
	const totalYearly = $derived(totalMonthly * 12);
	const savingsVsCompetitor = $derived(studentCount * 15000 * 12 - totalYearly); // Competitor: 15k/student/month

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
	<title>For Schools - We Will Shine</title>
	<meta
		name="description"
		content="Transform your school with AI-powered learning platform. Free for schools using Sistem Akademik. Admin dashboard, analytics, and more."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-20 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<div
				class="mb-6 inline-block rounded-full bg-white/20 px-6 py-2 text-sm font-semibold backdrop-blur-sm"
			>
				🏫 For Educational Institutions
			</div>
			<h1 class="mb-6 text-5xl font-bold sm:text-6xl">Transformasi Digital untuk Sekolah Anda</h1>
			<p class="mx-auto mb-8 max-w-3xl text-xl text-indigo-100">
				Berikan akses AI learning mentor untuk setiap siswa. Monitor progress real-time. Improve
				outcomes dengan data-driven insights.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="mailto:sales@konxc.space?subject=Konsultasi We Will Shine untuk Sekolah"
					class="rounded-xl bg-white px-8 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50 hover:shadow-lg"
				>
					📞 Konsultasi Gratis
				</a>
				<a href="#case-study" class="btn-white-outline"> Lihat Case Study </a>
			</div>
		</div>
	</div>
</section>

<!-- Tab Navigation -->
<TabNavigation bind:this={tabNavigationElement} bind:activeSection {sections} position="sticky" />

<!-- Interactive Cost Calculator -->
<section id="calculator" class="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-8 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900">Hitung Investasi Sekolah Anda</h2>
			<p class="text-gray-600">Lihat estimasi biaya dan ROI untuk implementasi We Will Shine</p>
		</div>

		<div class="rounded-3xl bg-white/80 p-8 shadow-2xl backdrop-blur-lg">
			<!-- Input Controls -->
			<div class="mb-8 space-y-6">
				<div>
					<label
						for="student-count"
						class="mb-2 flex items-center justify-between text-sm font-semibold text-gray-700"
					>
						<span>Jumlah Siswa</span>
						<span class="text-2xl font-bold text-indigo-600"
							>{studentCount.toLocaleString('id-ID')}</span
						>
					</label>
					<input
						id="student-count"
						type="range"
						min="100"
						max="3000"
						step="50"
						bind:value={studentCount}
						class="h-3 w-full cursor-pointer appearance-none rounded-full bg-indigo-200 accent-indigo-600"
					/>
					<div class="mt-1 flex justify-between text-xs text-gray-500">
						<span>100</span>
						<span>3000 siswa</span>
					</div>
				</div>
			</div>

			<!-- Results -->
			<div class="grid gap-4 md:grid-cols-3">
				<div class="rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 text-center">
					<div class="mb-2 text-3xl">💰</div>
					<p class="mb-1 text-sm font-semibold text-gray-700">Biaya Per Bulan</p>
					<p class="text-2xl font-bold text-indigo-600">
						Rp {totalMonthly.toLocaleString('id-ID')}
					</p>
					<p class="mt-1 text-xs text-gray-600">
						atau Rp {monthlyPricePerStudent.toLocaleString('id-ID')}/siswa
					</p>
				</div>

				<div class="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center">
					<div class="mb-2 text-3xl">📅</div>
					<p class="mb-1 text-sm font-semibold text-gray-700">Biaya Per Tahun</p>
					<p class="text-2xl font-bold text-purple-600">
						Rp {totalYearly.toLocaleString('id-ID')}
					</p>
					<p class="mt-1 text-xs text-gray-600">Total investasi tahunan</p>
				</div>

				<div class="rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-center">
					<div class="mb-2 text-3xl">✅</div>
					<p class="mb-1 text-sm font-semibold text-gray-700">Hemat vs Kompetitor</p>
					<p class="text-2xl font-bold text-green-600">
						Rp {savingsVsCompetitor.toLocaleString('id-ID')}
					</p>
					<p class="mt-1 text-xs text-gray-600">Penghematan per tahun</p>
				</div>
			</div>

			<!-- Special Note -->
			<div class="mt-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-4">
				<div class="flex items-start gap-3">
					<div class="text-2xl">🎁</div>
					<div>
						<p class="mb-1 font-semibold text-indigo-900">
							Penawaran Khusus Partner Sistem Akademik
						</p>
						<p class="text-sm text-gray-700">
							Sekolah yang berlangganan <strong>Sistem Akademik PT Koneksi</strong> mendapatkan
							akses <strong>GRATIS</strong>
							ke We Will Shine untuk semua siswa. Hemat hingga <strong>100%</strong> biaya!
						</p>
					</div>
				</div>
			</div>

			<!-- CTA -->
			<div class="mt-6 text-center">
				<a
					href="mailto:sales@konxc.space?subject=Konsultasi We Will Shine untuk {studentCount} Siswa"
					class="btn-gradient-primary"
				>
					Konsultasi untuk {studentCount} Siswa
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Value Proposition for Schools -->
<section id="benefits" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Kenapa Sekolah Memilih We Will Shine?</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Investasi yang berdampak langsung pada learning outcomes dan wellbeing siswa
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			<!-- Improve Learning Outcomes -->
			<div class="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-lg">
				<div class="mb-4 text-5xl">📈</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Improve Learning Outcomes</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>• 24/7 AI tutor untuk setiap siswa</li>
					<li>• Personalized learning paths</li>
					<li>• Data-driven intervention untuk siswa yang tertinggal</li>
					<li>• Measurable improvement dalam ujian</li>
				</ul>
			</div>

			<!-- Mental Health Monitoring -->
			<div class="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-lg">
				<div class="mb-4 text-5xl">🧠</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Mental Health Monitoring</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>• Early warning system untuk anxiety/depression</li>
					<li>• Dashboard mental health untuk BK</li>
					<li>• Proactive intervention</li>
					<li>• Reduce dropout rate</li>
				</ul>
			</div>

			<!-- Admin Efficiency -->
			<div class="rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 p-8 shadow-lg">
				<div class="mb-4 text-5xl">⚡</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Admin Efficiency</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>• Single dashboard untuk monitoring semua siswa</li>
					<li>• Automated reporting untuk orang tua</li>
					<li>• Reduce administrative burden</li>
					<li>• Integration dengan Sistem Akademik</li>
				</ul>
			</div>

			<!-- Cost Effective -->
			<div class="rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 p-8 shadow-lg">
				<div class="mb-4 text-5xl">💰</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Cost Effective</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>• <strong>GRATIS</strong> jika berlangganan Sistem Akademik</li>
					<li>• Jauh lebih murah vs hire additional tutors</li>
					<li>• No per-student licensing fee</li>
					<li>• Predictable monthly cost</li>
				</ul>
			</div>

			<!-- Parent Engagement -->
			<div class="rounded-2xl bg-gradient-to-br from-yellow-50 to-green-50 p-8 shadow-lg">
				<div class="mb-4 text-5xl">👨‍👩‍👧</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Parent Engagement</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>• Weekly progress reports untuk orang tua</li>
					<li>• Transparency dalam pembelajaran anak</li>
					<li>• Parent portal untuk monitoring</li>
					<li>• Better school-parent communication</li>
				</ul>
			</div>

			<!-- Data Sovereignty -->
			<div class="rounded-2xl bg-gradient-to-br from-green-50 to-cyan-50 p-8 shadow-lg">
				<div class="mb-4 text-5xl">🔐</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Data Sovereignty</h3>
				<ul class="space-y-2 text-sm text-gray-700">
					<li>• Student data tersimpan di server Indonesia</li>
					<li>• Full compliance dengan regulasi lokal</li>
					<li>• School owns the data, bukan vendor</li>
					<li>• Export data anytime</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Admin Dashboard Preview -->
<section id="dashboard" class="bg-gradient-to-br from-indigo-50 to-purple-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Admin Dashboard</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Everything you need untuk monitor dan support student success
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<span class="text-3xl">📊</span>
					<span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600"
						>Real-time</span
					>
				</div>
				<div class="mb-2 text-3xl font-bold text-indigo-600">1,247</div>
				<p class="text-sm text-gray-600">Active Students</p>
			</div>

			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<span class="text-3xl">💬</span>
					<span class="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600"
						>Today</span
					>
				</div>
				<div class="mb-2 text-3xl font-bold text-purple-600">3,842</div>
				<p class="text-sm text-gray-600">AI Conversations</p>
			</div>

			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<span class="text-3xl">🧠</span>
					<span class="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600"
						>Alerts</span
					>
				</div>
				<div class="mb-2 text-3xl font-bold text-pink-600">3</div>
				<p class="text-sm text-gray-600">Mental Health Alerts</p>
			</div>

			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="mb-4 flex items-center justify-between">
					<span class="text-3xl">📈</span>
					<span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600"
						>Trend</span
					>
				</div>
				<div class="mb-2 text-3xl font-bold text-green-600">+23%</div>
				<p class="text-sm text-gray-600">Avg Score Improvement</p>
			</div>
		</div>

		<div class="mt-12 rounded-2xl bg-white p-8 shadow-lg">
			<h3 class="mb-6 text-2xl font-bold text-gray-900">Admin Features:</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<ul class="space-y-3 text-gray-700">
					<li class="flex items-start gap-3">
						<span class="text-green-600">✅</span>
						<span>Student progress monitoring per kelas/individu</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-green-600">✅</span>
						<span>Mental health dashboard dengan early warning</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-green-600">✅</span>
						<span>Bulk student account management</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-green-600">✅</span>
						<span>Custom learning paths per jurusan/tingkat</span>
					</li>
				</ul>
				<ul class="space-y-3 text-gray-700">
					<li class="flex items-start gap-3">
						<span class="text-green-600">✅</span>
						<span>Export data untuk reporting ke yayasan</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-green-600">✅</span>
						<span>Integration dengan DAPODIK (via Sistem Akademik)</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-green-600">✅</span>
						<span>QR code generation untuk easy onboarding</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-green-600">✅</span>
						<span>Role-based access (Admin, Guru, BK, Kepala Sekolah)</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Case Study -->
<section id="case-study" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Success Story</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Bagaimana We Will Shine mentransformasi pembelajaran di sekolah partner kami
			</p>
		</div>

		<div class="rounded-3xl bg-gradient-to-br from-white to-indigo-50 p-8 shadow-2xl md:p-12">
			<div class="mb-8 flex items-start gap-6">
				<div
					class="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl text-white"
				>
					🏫
				</div>
				<div>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">SMA Negeri 1 Jakarta</h3>
					<p class="text-gray-600">1,200 siswa • 80 guru • Pilot Program 6 bulan</p>
				</div>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<!-- Metric 1 -->
				<div class="text-center">
					<div class="mb-2 text-5xl font-bold text-indigo-600">+31%</div>
					<p class="mb-2 font-semibold text-gray-900">Peningkatan Rata-rata Nilai</p>
					<p class="text-sm text-gray-600">Terutama di Matematika & Sains</p>
				</div>

				<!-- Metric 2 -->
				<div class="text-center">
					<div class="mb-2 text-5xl font-bold text-purple-600">-45%</div>
					<p class="mb-2 font-semibold text-gray-900">Penurunan Stress Level</p>
					<p class="text-sm text-gray-600">Berdasarkan mental health survey</p>
				</div>

				<!-- Metric 3 -->
				<div class="text-center">
					<div class="mb-2 text-5xl font-bold text-pink-600">92%</div>
					<p class="mb-2 font-semibold text-gray-900">Kepuasan Siswa</p>
					<p class="text-sm text-gray-600">Would recommend to friends</p>
				</div>
			</div>

			<div class="mt-8 rounded-2xl border-2 border-indigo-200 bg-white p-6">
				<p class="mb-4 text-gray-700 italic">
					"We Will Shine mengubah cara siswa kami belajar. Mereka lebih engaged, proactive, dan yang
					paling penting - lebih bahagia. Dashboard admin membantu kami identify dan support siswa
					yang butuh extra help sebelum terlambat."
				</p>
				<div class="flex items-center gap-4">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-xl text-indigo-600"
					>
						BP
					</div>
					<div>
						<p class="font-semibold text-gray-900">Budi Prasetyo, S.Pd, M.Pd</p>
						<p class="text-sm text-gray-600">Kepala Sekolah SMA Negeri 1 Jakarta</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Implementation Process -->
<section id="implementation" class="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Proses Implementasi</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Dari konsultasi hingga full deployment dalam 2-4 minggu
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-4">
			<!-- Step 1 -->
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl font-bold text-white shadow-lg"
				>
					1
				</div>
				<h3 class="mb-2 text-lg font-bold text-gray-900">Konsultasi</h3>
				<p class="text-sm text-gray-600">
					Free consultation untuk understand needs & objectives sekolah
				</p>
				<p class="mt-2 text-xs font-semibold text-indigo-600">1-2 hari</p>
			</div>

			<!-- Step 2 -->
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-2xl font-bold text-white shadow-lg"
				>
					2
				</div>
				<h3 class="mb-2 text-lg font-bold text-gray-900">Setup & Integration</h3>
				<p class="text-sm text-gray-600">
					Konfigurasi sistem, import student data, integration dengan Sistem Akademik
				</p>
				<p class="mt-2 text-xs font-semibold text-purple-600">3-5 hari</p>
			</div>

			<!-- Step 3 -->
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-orange-600 text-2xl font-bold text-white shadow-lg"
				>
					3
				</div>
				<h3 class="mb-2 text-lg font-bold text-gray-900">Training</h3>
				<p class="text-sm text-gray-600">
					Training untuk admin, guru, dan BK. Materials & video tutorials disediakan
				</p>
				<p class="mt-2 text-xs font-semibold text-pink-600">1-2 hari</p>
			</div>

			<!-- Step 4 -->
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-600 text-2xl font-bold text-white shadow-lg"
				>
					4
				</div>
				<h3 class="mb-2 text-lg font-bold text-gray-900">Launch & Support</h3>
				<p class="text-sm text-gray-600">
					Soft launch untuk siswa, monitoring intensif minggu pertama, ongoing support
				</p>
				<p class="mt-2 text-xs font-semibold text-orange-600">1 minggu</p>
			</div>
		</div>

		<div class="mt-12 text-center">
			<p class="mb-6 text-gray-700">
				<strong>Total timeline: 2-4 minggu</strong> dari konsultasi hingga full operational
			</p>
			<a
				href="mailto:sales@konxc.space?subject=Implementasi We Will Shine - Request Timeline"
				class="btn-gradient-primary"
			>
				Request Implementation Plan
			</a>
		</div>
	</div>
</section>

<!-- Pricing for Schools -->
<section id="pricing" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Pricing untuk Sekolah</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Flexible pricing sesuai size dan needs sekolah Anda
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-2">
			<!-- Bundling Option -->
			<div
				class="rounded-3xl border-2 border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-xl"
			>
				<div
					class="mb-6 inline-block rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1 text-sm font-semibold text-white"
				>
					💡 Best Value
				</div>
				<h3 class="mb-4 text-3xl font-bold text-gray-900">Sistem Akademik + We Will Shine</h3>
				<div class="mb-6">
					<div class="flex items-baseline gap-2">
						<span class="text-5xl font-bold text-indigo-600">GRATIS</span>
					</div>
					<p class="mt-2 text-sm text-gray-600">
						We Will Shine included dalam paket Sistem Akademik
					</p>
				</div>

				<p class="mb-6 text-gray-700">
					Investasi tunggal untuk transformasi digital menyeluruh: manajemen akademik + AI learning
					platform.
				</p>

				<ul class="mb-8 space-y-2 text-sm text-gray-700">
					<li>✅ Sistem Akademik lengkap (absensi, nilai, keuangan, e-rapor)</li>
					<li>✅ We Will Shine untuk unlimited students</li>
					<li>✅ Single sign-on integration</li>
					<li>✅ Unified analytics dashboard</li>
					<li>✅ Priority support</li>
				</ul>

				<a
					href="mailto:sales@konxc.space?subject=Bundling Sistem Akademik + We Will Shine"
					class="btn-gradient-primary block text-center"
				>
					Konsultasi Bundling
				</a>
			</div>

			<!-- Standalone Option -->
			<div class="rounded-3xl border-2 border-purple-200 bg-white p-8 shadow-lg">
				<h3 class="mb-4 text-3xl font-bold text-gray-900">We Will Shine Only</h3>
				<div class="mb-6">
					<div class="flex items-baseline gap-2">
						<span class="text-5xl font-bold text-purple-600">Custom</span>
					</div>
					<p class="mt-2 text-sm text-gray-600">Pricing berdasarkan jumlah siswa</p>
				</div>

				<p class="mb-6 text-gray-700">
					Untuk sekolah yang sudah punya sistem manajemen sendiri dan hanya ingin AI learning
					platform.
				</p>

				<div class="mb-8 space-y-4">
					<div class="rounded-xl bg-purple-50 p-4">
						<div class="mb-1 font-semibold text-gray-900">Small School (100-500 siswa)</div>
						<p class="text-sm text-gray-600">
							Starting from <strong class="text-purple-600">Rp 2.5 juta/bulan</strong>
						</p>
					</div>
					<div class="rounded-xl bg-purple-50 p-4">
						<div class="mb-1 font-semibold text-gray-900">Medium School (500-1,500 siswa)</div>
						<p class="text-sm text-gray-600">
							Starting from <strong class="text-purple-600">Rp 5 juta/bulan</strong>
						</p>
					</div>
					<div class="rounded-xl bg-purple-50 p-4">
						<div class="mb-1 font-semibold text-gray-900">Large School (1,500+ siswa)</div>
						<p class="text-sm text-gray-600">
							Custom pricing - <a
								href="mailto:sales@konxc.space"
								class="font-semibold text-purple-600 hover:underline">hubungi sales</a
							>
						</p>
					</div>
				</div>

				<a
					href="mailto:sales@konxc.space?subject=We Will Shine Standalone - Request Quote"
					class="block rounded-xl border-2 border-purple-600 bg-white px-6 py-3 text-center font-semibold text-purple-600 transition-all hover:bg-purple-50"
				>
					Request Quote
				</a>
			</div>
		</div>

		<div class="mt-12 rounded-2xl border-2 border-green-200 bg-green-50 p-8 text-center">
			<p class="text-lg text-gray-700">
				<strong>🎁 Special Offer:</strong> Sekolah yang mendaftar sebelum
				<strong>31 Desember 2025</strong>
				mendapatkan <strong>3 bulan pertama gratis</strong> untuk trial & evaluation.
			</p>
		</div>
	</div>
</section>

<!-- FAQ for Schools -->
<section id="faq" class="bg-gradient-to-br from-indigo-50 to-purple-50 py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">FAQ untuk Sekolah</h2>
		</div>

		<div class="space-y-6">
			<details class="group rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
				<summary
					class="flex cursor-pointer items-center justify-between font-semibold text-gray-900"
				>
					<span class="text-lg">Berapa minimum jumlah siswa untuk implementasi?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Tidak ada minimum! Kami melayani dari sekolah kecil (50 siswa) hingga school networks
					dengan 10,000+ siswa. Pricing disesuaikan dengan scale untuk fairness.
				</p>
			</details>

			<details class="group rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
				<summary
					class="flex cursor-pointer items-center justify-between font-semibold text-gray-900"
				>
					<span class="text-lg">Apakah data siswa aman?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Sangat aman. Data tersimpan di server Indonesia dengan enkripsi end-to-end. Kami comply
					dengan regulasi perlindungan data. Sebagai open source, security audit bisa dilakukan
					kapan saja. <strong>Sekolah owns the data</strong> - bukan kami. Export data kapan saja jika
					ingin migrate.
				</p>
			</details>

			<details class="group rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
				<summary
					class="flex cursor-pointer items-center justify-between font-semibold text-gray-900"
				>
					<span class="text-lg">Bagaimana dengan training untuk guru?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Termasuk dalam paket! Kami provide: (1) On-site training session untuk admin & guru, (2)
					Video tutorial library, (3) User manual bahasa Indonesia, (4) Ongoing webinar untuk
					advanced features. Training dirancang agar guru yang tidak tech-savvy pun bisa dengan
					mudah menggunakan platform.
				</p>
			</details>

			<details class="group rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
				<summary
					class="flex cursor-pointer items-center justify-between font-semibold text-gray-900"
				>
					<span class="text-lg">Apakah bisa integrasi dengan sistem yang sudah ada?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Ya! We Will Shine memiliki API untuk integrasi dengan sistem existing. Jika sekolah
					menggunakan <strong>Sistem Akademik</strong> kami, integrasi otomatis (SSO, auto-enrollment,
					data sync). Untuk sistem lain, kami provide API documentation dan technical support untuk integration.
				</p>
			</details>

			<details class="group rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl">
				<summary
					class="flex cursor-pointer items-center justify-between font-semibold text-gray-900"
				>
					<span class="text-lg">Apa yang terjadi jika kami ingin berhenti berlangganan?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					No lock-in contract! Sekolah bisa cancel kapan saja dengan notice 30 hari. Kami akan
					provide full data export dalam format standar (CSV, JSON). No hidden fees atau penalty.
					Kami percaya pada value kami - kalau platform tidak memberikan value, sekolah should be
					free to go.
				</p>
			</details>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-4 text-4xl font-bold text-white">Siap Transformasi Digital Sekolah Anda?</h2>
		<p class="mb-8 text-xl text-indigo-100">
			Jadwalkan konsultasi gratis dengan tim kami untuk diskusi needs dan goals sekolah
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="mailto:sales@konxc.space?subject=Konsultasi Gratis - We Will Shine untuk Sekolah"
				class="rounded-xl bg-white px-8 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50 hover:shadow-lg"
			>
				📞 Jadwalkan Konsultasi
			</a>
			<a href="{base}/pricing" class="btn-white-outline"> Lihat Pricing Detail </a>
		</div>

		<p class="mt-8 text-sm text-indigo-200">
			📧 Atau email langsung ke <strong>sales@konxc.space</strong> dengan detail sekolah Anda
		</p>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";
</style>
