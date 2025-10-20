<script lang="ts">
	import TabNavigation from '$lib/components/TabNavigation.svelte';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { setTabNavigation, hideTabNavigation } from '$lib/stores/tabNavigation';

	// Roadmap sections configuration
	const sections = [
		{ id: 'overview', label: 'Overview', icon: '🎯' },
		{ id: 'timeline', label: 'Timeline', icon: '📅' },
		{ id: 'vision-2045', label: 'Visi 2045', icon: '🌟' },
		{ id: 'detailed', label: 'Detail', icon: '📋' },
		{ id: 'success', label: 'Faktor Sukses', icon: '✅' },
		{ id: 'investment', label: 'Investasi', icon: '💰' }
	];

	let activeSection = $state('overview');
	let tabNavigationElement: any = $state();

	// Collapsible timeline state
	let showDetailedTimeline = $state(false);

	onMount(() => {
		// Set tab navigation in header
		setTabNavigation(sections, activeSection);

		// Cleanup when component is destroyed
		return () => {
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
	<title>Roadmap - We Will Shine</title>
	<meta
		name="description"
		content="Visi jangka panjang We Will Shine untuk Generasi Emas Indonesia 2045. Transformasi digital pendidikan yang fundamental dan berkelanjutan."
	/>
</svelte:head>

<!-- Hero Section -->
<section
	class="relative overflow-hidden bg-gradient-to-br from-red-100 via-pink-50 to-orange-100 py-20"
>
	<!-- Soft Pattern -->
	<div class="absolute inset-0 opacity-20">
		<div
			class="h-full w-full"
			style="background-image: radial-gradient(circle at 30px 30px, rgba(220, 38, 38, 0.1) 2px, transparent 2px); background-size: 60px 60px;"
		></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="rounded-3xl bg-white/80 p-12 text-center shadow-2xl backdrop-blur-md">
			<div class="mb-6 text-7xl">🇮🇩</div>
			<h1 class="mb-6 text-5xl font-bold text-gray-900 sm:text-6xl">
				Roadmap Menuju Generasi Emas 2045
			</h1>
			<p class="mx-auto mb-4 max-w-3xl text-2xl font-semibold text-red-600">
				"Investasi Megah untuk Kedaulatan Digital Pendidikan Indonesia"
			</p>
			<p class="mx-auto mb-8 max-w-4xl text-lg text-gray-700">
				Ini bukan sekadar roadmap produk teknologi. Ini adalah <strong
					>manifesto transformasi fundamental</strong
				> pendidikan Indonesia - dari ketergantungan teknologi asing menuju kedaulatan digital yang berdampak
				untuk 100 tahun ke depan.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a href="?tab=vision-2045" class="btn-gradient-red"> Lihat Visi 2045 </a>
				<a
					href="{base}/partnership"
					class="rounded-xl border-2 border-red-600 bg-transparent px-8 py-3 font-semibold text-red-600 transition-all hover:bg-red-50"
				>
					Bergabung sebagai Partner
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Tab Navigation - Below Hero -->
<TabNavigation bind:this={tabNavigationElement} bind:activeSection {sections} position="sticky" />

<!-- The Big Picture -->
<section id="overview" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">The Big Picture: 2025-2045</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-700">
				Transformasi pendidikan Indonesia dalam <strong>3 fase strategis</strong> menuju Generasi Emas
				2045
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Phase 1: Foundation -->
			<div
				class="rounded-3xl border-2 border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-xl"
			>
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white"
					>
						1
					</div>
					<h3 class="text-2xl font-bold text-gray-900">Foundation</h3>
				</div>
				<div class="mb-4 text-sm font-semibold text-indigo-600">2025-2027 • Membangun Fondasi</div>

				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<span class="mt-1 text-indigo-600">▸</span>
						<span><strong>100,000+ users</strong> aktif di seluruh Indonesia</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-indigo-600">▸</span>
						<span><strong>500+ sekolah</strong> terintegrasi (public & private)</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-indigo-600">▸</span>
						<span
							><strong>Belajar.id integration</strong> official partnership dengan Kemendikbud</span
						>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-indigo-600">▸</span>
						<span><strong>2USE AI v1.0</strong> dengan Indonesian context optimization</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-indigo-600">▸</span>
						<span><strong>Data centers</strong> di 3 kota (Jakarta, Surabaya, Medan)</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-indigo-600">▸</span>
						<span><strong>Open source community</strong> dengan 1,000+ contributors</span>
					</li>
				</ul>

				<div class="mt-6 rounded-xl bg-indigo-100 p-4">
					<p class="text-sm font-semibold text-indigo-900">🎯 Key Milestone:</p>
					<p class="text-sm text-indigo-800">
						Prove concept & establish trust dengan data sovereignty
					</p>
				</div>
			</div>

			<!-- Phase 2: Scale -->
			<div
				class="rounded-3xl border-2 border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 p-8 shadow-xl"
			>
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white"
					>
						2
					</div>
					<h3 class="text-2xl font-bold text-gray-900">Scale</h3>
				</div>
				<div class="mb-4 text-sm font-semibold text-purple-600">2028-2035 • Ekspansi Masif</div>

				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<span class="mt-1 text-purple-600">▸</span>
						<span><strong>10+ juta users</strong> - 20% dari seluruh pelajar Indonesia</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-purple-600">▸</span>
						<span><strong>All public schools</strong> mendapat akses gratis via Belajar.id</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-purple-600">▸</span>
						<span><strong>2USE AI v2.0</strong> - fully autonomous Indonesian LLM</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-purple-600">▸</span>
						<span><strong>National learning database</strong> untuk evidence-based policy</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-purple-600">▸</span>
						<span><strong>Regional expansion</strong> - ASEAN countries adoption</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-purple-600">▸</span>
						<span><strong>API ecosystem</strong> untuk third-party integrations</span>
					</li>
				</ul>

				<div class="mt-6 rounded-xl bg-purple-100 p-4">
					<p class="text-sm font-semibold text-purple-900">🎯 Key Milestone:</p>
					<p class="text-sm text-purple-800">Become default AI learning platform untuk Indonesia</p>
				</div>
			</div>

			<!-- Phase 3: Leadership -->
			<div
				class="rounded-3xl border-2 border-pink-500 bg-gradient-to-br from-pink-50 to-orange-50 p-8 shadow-xl"
			>
				<div class="mb-4 flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-full bg-pink-600 text-xl font-bold text-white"
					>
						3
					</div>
					<h3 class="text-2xl font-bold text-gray-900">Leadership</h3>
				</div>
				<div class="mb-4 text-sm font-semibold text-pink-600">2036-2045 • Global Impact</div>

				<ul class="space-y-3 text-sm text-gray-700">
					<li class="flex items-start gap-2">
						<span class="mt-1 text-pink-600">▸</span>
						<span><strong>50+ juta users</strong> - seluruh Belajar.id ecosystem</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-pink-600">▸</span>
						<span><strong>Export model</strong> ke negara berkembang lainnya</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-pink-600">▸</span>
						<span><strong>Research powerhouse</strong> - 10,000+ papers dari data kami</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-pink-600">▸</span>
						<span><strong>Indonesian AI sovereignty</strong> - no dependency on BigTech</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-pink-600">▸</span>
						<span><strong>UNESCO recognition</strong> sebagai best practice global</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="mt-1 text-pink-600">▸</span>
						<span
							><strong>Generasi Emas</strong> yang literate dalam AI, mentally healthy, globally competitive</span
						>
					</li>
				</ul>

				<div class="mt-6 rounded-xl bg-pink-100 p-4">
					<p class="text-sm font-semibold text-pink-900">🎯 Ultimate Goal:</p>
					<p class="text-sm text-pink-800">Indonesia = global leader in AI-powered education</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Visual Timeline -->
<section id="timeline" class="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-8 text-center">
			<h2 class="mb-4 text-3xl font-bold text-gray-900">Timeline Visual 2025-2045</h2>
			<p class="text-gray-600">20 tahun transformasi dalam satu pandangan</p>
		</div>

		<!-- Timeline Bar -->
		<div class="relative">
			<!-- Background Bar -->
			<div class="h-4 overflow-hidden rounded-full bg-gray-200">
				<!-- Progress Gradient -->
				<div
					class="h-full w-1/4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
				></div>
			</div>

			<!-- Milestone Markers -->
			<div class="relative mt-8">
				<div class="grid grid-cols-5 gap-2">
					<!-- 2025 -->
					<div class="text-center">
						<div class="mb-2 flex justify-center">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-lg"
							>
								'25
							</div>
						</div>
						<p class="text-xs font-semibold text-gray-900">Launch</p>
						<p class="text-xs text-gray-600">1K users</p>
					</div>

					<!-- 2027 -->
					<div class="text-center">
						<div class="mb-2 flex justify-center">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white shadow-lg"
							>
								'27
							</div>
						</div>
						<p class="text-xs font-semibold text-gray-900">Foundation</p>
						<p class="text-xs text-gray-600">500K users</p>
					</div>

					<!-- 2032 -->
					<div class="text-center">
						<div class="mb-2 flex justify-center">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-pink-600 text-sm font-bold text-white shadow-lg"
							>
								'32
							</div>
						</div>
						<p class="text-xs font-semibold text-gray-900">National</p>
						<p class="text-xs text-gray-600">25M users</p>
					</div>

					<!-- 2040 -->
					<div class="text-center">
						<div class="mb-2 flex justify-center">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white shadow-lg"
							>
								'40
							</div>
						</div>
						<p class="text-xs font-semibold text-gray-900">ASEAN</p>
						<p class="text-xs text-gray-600">Regional</p>
					</div>

					<!-- 2045 -->
					<div class="text-center">
						<div class="mb-2 flex justify-center">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-sm font-bold text-white shadow-lg"
							>
								'45
							</div>
						</div>
						<p class="text-xs font-semibold text-gray-900">Generasi Emas</p>
						<p class="text-xs text-gray-600">50M users</p>
					</div>
				</div>
			</div>

			<!-- Current Position Indicator -->
			<div class="mt-6 text-center">
				<div
					class="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-800"
				>
					<span class="relative flex h-3 w-3">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
						></span>
						<span class="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
					</span>
					You are here: Q4 2025 - Development Phase
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Vision 2045 -->
<section
	id="vision-2045"
	class="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 py-20 text-white"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<div class="mb-4 text-7xl">🌟</div>
			<h2 class="mb-4 text-5xl font-bold">Visi 2045: Generasi Emas Indonesia</h2>
			<p class="mx-auto max-w-3xl text-2xl text-indigo-200">
				Ketika Indonesia merayakan 100 tahun kemerdekaan, We Will Shine akan menjadi fondasi digital
				pendidikan yang menghasilkan generasi terbaik bangsa
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Education -->
			<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
				<div class="mb-3 text-4xl">🎓</div>
				<h3 class="mb-3 text-xl font-bold">Pendidikan Berkualitas</h3>
				<p class="text-sm text-indigo-100">
					50 juta pelajar Indonesia dengan akses AI mentor personal yang setara dengan tutor terbaik
					dunia - gratis untuk semua
				</p>
			</div>

			<!-- Mental Health -->
			<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
				<div class="mb-3 text-4xl">🧠</div>
				<h3 class="mb-3 text-xl font-bold">Mental Wellbeing</h3>
				<p class="text-sm text-indigo-100">
					Generasi yang mentally healthy dengan early intervention system yang mengurangi mental
					health crisis hingga 70%
				</p>
			</div>

			<!-- Data Sovereignty -->
			<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
				<div class="mb-3 text-4xl">🔐</div>
				<h3 class="mb-3 text-xl font-bold">Kedaulatan Data</h3>
				<p class="text-sm text-indigo-100">
					100% data pendidikan Indonesia di server lokal, owned by the people, digunakan untuk
					kebijakan yang evidence-based
				</p>
			</div>

			<!-- AI Leadership -->
			<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
				<div class="mb-3 text-4xl">🚀</div>
				<h3 class="mb-3 text-xl font-bold">AI Leadership</h3>
				<p class="text-sm text-indigo-100">
					Indonesia sebagai leader regional dalam AI for education, mengexport model ke ASEAN dan
					negara berkembang lainnya
				</p>
			</div>
		</div>

		<div class="mt-12 space-y-6">
			<div class="rounded-2xl border-2 border-white/30 bg-white/5 p-8 backdrop-blur-sm">
				<p class="text-center text-2xl font-bold text-white">
					"Generasi Emas 2045: Cerdas, Sehat Mental, Berkarakter Mulia, dan Bermanfaat untuk Sesama"
				</p>
			</div>

			<div
				class="rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-8"
			>
				<div class="mb-4 text-center text-5xl">🌱</div>
				<p class="mb-4 text-center text-xl font-bold text-gray-900">"Tidak Ada Anak yang Bodoh"</p>
				<p class="text-center text-lg leading-relaxed text-gray-700">
					Setiap tunas bangsa memiliki potensi luar biasa. Yang mereka butuhkan adalah <strong
						>dukungan moral, tuntunan yang tepat, dan kesempatan untuk menemukan jati diri mereka
						dalam kebaikan dan kebermanfaatan kolektif</strong
					>.
				</p>
			</div>

			<div class="rounded-2xl bg-gradient-to-r from-indigo-100 to-purple-100 p-8">
				<p class="text-center text-lg font-semibold text-indigo-900">
					We Will Shine dibangun dengan <strong>nilai-nilai ketuhanan dan humanis</strong> - teknologi
					untuk memberdayakan, bukan menggantikan. Kebijaksanaan kolektif yang mengesampingkan ego demi
					hajat hidup orang banyak.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Detailed Timeline -->
<section id="detailed" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Timeline Strategis 2025-2045</h2>
			<p class="mx-auto mb-6 max-w-2xl text-lg text-gray-600">
				20 tahun transformasi dengan milestone yang terukur dan achievable
			</p>

			<!-- Toggle Button -->
			<button
				onclick={() => (showDetailedTimeline = !showDetailedTimeline)}
				class="inline-flex items-center gap-2 rounded-xl border-2 border-indigo-600 bg-white px-6 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
			>
				<span>{showDetailedTimeline ? 'Sembunyikan' : 'Lihat'} Detail Timeline</span>
				<span class="text-xl transition-transform {showDetailedTimeline ? 'rotate-180' : ''}"
					>▼</span
				>
			</button>
		</div>

		{#if showDetailedTimeline}
			<div class="space-y-12" style="animation: fadeIn 0.5s ease-in;">
				<!-- 2025: Launch -->
				<div class="rounded-3xl border-2 border-indigo-200 bg-white p-8 shadow-lg">
					<div class="mb-6 flex items-center gap-4">
						<div
							class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white"
						>
							2025
						</div>
						<div>
							<h3 class="text-2xl font-bold text-gray-900">First Launch & Validation</h3>
							<p class="text-gray-600">Oktober 2025 - Start with school partners</p>
						</div>
					</div>

					<div class="grid gap-6 md:grid-cols-3">
						<div>
							<h4 class="mb-2 font-semibold text-indigo-600">Q4 2025 (Okt-Des)</h4>
							<ul class="space-y-1 text-sm text-gray-700">
								<li>• <strong>Launch dengan sekolah partner</strong> Sistem Akademik</li>
								<li>• Target 15+ sekolah existing customers</li>
								<li>• 1,000-5,000 users initial</li>
								<li>• Core features stabilization</li>
								<li>• Community building & feedback loop</li>
							</ul>
						</div>
						<div>
							<h4 class="mb-2 font-semibold text-purple-600">Q1 2026</h4>
							<ul class="space-y-1 text-sm text-gray-700">
								<li>• Expansion ke sekolah non-partner</li>
								<li>• BYOK option untuk public users</li>
								<li>• Mobile app development start</li>
								<li>• 10,000+ users milestone</li>
								<li>• First iteration improvements</li>
							</ul>
						</div>
						<div>
							<h4 class="mb-2 font-semibold text-pink-600">Q2-Q3 2026</h4>
							<ul class="space-y-1 text-sm text-gray-700">
								<li>• Belajar.id integration proposal</li>
								<li>• Mobile app beta launch</li>
								<li>• 50,000 users target</li>
								<li>• Kemendikbud partnership talks</li>
								<li>• Series A funding preparation</li>
							</ul>
						</div>
					</div>

					<div class="mt-6 rounded-xl bg-indigo-50 p-4">
						<p class="text-sm text-indigo-900">
							<strong>🎯 Strategic Advantage:</strong> Mulai dari existing customer base Sistem Akademik
							= faster adoption, validated market, immediate feedback loop
						</p>
					</div>
				</div>

				<!-- 2026-2027: Early Growth -->
				<div class="rounded-3xl border-2 border-purple-200 bg-white p-8 shadow-lg">
					<div class="mb-6 flex items-center gap-4">
						<div
							class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-purple-600 text-xl font-bold text-white"
						>
							2027
						</div>
						<div>
							<h3 class="text-2xl font-bold text-gray-900">Early Growth & Traction</h3>
							<p class="text-gray-600">Rapid adoption, government partnership formalized</p>
						</div>
					</div>

					<div class="space-y-3 text-gray-700">
						<li class="flex items-start gap-2">
							<span class="mt-1 text-purple-600">✓</span>
							<span><strong>500,000 users</strong> - 1% dari seluruh pelajar Indonesia</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-purple-600">✓</span>
							<span
								><strong>Official partnership</strong> dengan Kemendikbud untuk integrasi nasional</span
							>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-purple-600">✓</span>
							<span
								><strong>2,000+ sekolah</strong> terintegrasi (10% dari total sekolah Indonesia)</span
							>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-purple-600">✓</span>
							<span
								><strong>Mental health impact</strong> - measurable reduction dalam student stress &
								anxiety</span
							>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-purple-600">✓</span>
							<span
								><strong>Learning outcomes</strong> - rata-rata 25% improvement dalam nilai nasional</span
							>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-purple-600">✓</span>
							<span><strong>First profitability</strong> dengan sustainable revenue model</span>
						</li>
					</div>
				</div>

				<!-- 2028-2032: National Adoption -->
				<div class="rounded-3xl border-2 border-pink-200 bg-white p-8 shadow-lg">
					<div class="mb-6 flex items-center gap-4">
						<div
							class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-pink-600 text-xl font-bold text-white"
						>
							2032
						</div>
						<div>
							<h3 class="text-2xl font-bold text-gray-900">National Standard</h3>
							<p class="text-gray-600">Default platform for Indonesian education</p>
						</div>
					</div>

					<div class="space-y-3 text-gray-700">
						<li class="flex items-start gap-2">
							<span class="mt-1 text-pink-600">✓</span>
							<span><strong>25+ juta users</strong> - 50% market penetration</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-pink-600">✓</span>
							<span
								><strong>Mandatory integration</strong> untuk semua public schools (government policy)</span
							>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-pink-600">✓</span>
							<span
								><strong>National curriculum</strong> dirancang dengan AI-assisted learning sebagai core</span
							>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-pink-600">✓</span>
							<span
								><strong>Research hub</strong> - 100+ universities menggunakan data untuk research</span
							>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-pink-600">✓</span>
							<span><strong>Indonesia AI Index</strong> - #1 in ASEAN untuk AI in education</span>
						</li>
					</div>
				</div>

				<!-- 2033-2040: Regional Leadership -->
				<div class="rounded-3xl border-2 border-orange-200 bg-white p-8 shadow-lg">
					<div class="mb-6 flex items-center gap-4">
						<div
							class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-orange-600 text-xl font-bold text-white"
						>
							2040
						</div>
						<div>
							<h3 class="text-2xl font-bold text-gray-900">ASEAN & Global Expansion</h3>
							<p class="text-gray-600">Export Indonesian innovation to the world</p>
						</div>
					</div>

					<div class="space-y-3 text-gray-700">
						<li class="flex items-start gap-2">
							<span class="mt-1 text-orange-600">✓</span>
							<span
								><strong>ASEAN adoption</strong> - 10 negara menggunakan We Will Shine model</span
							>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-orange-600">✓</span>
							<span><strong>Multilingual 2USE</strong> - support 20+ bahasa ASEAN & global</span>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-orange-600">✓</span>
							<span><strong>Open source ecosystem</strong> dengan 100,000+ global contributors</span
							>
						</li>
						<li class="flex items-start gap-2">
							<span class="mt-1 text-orange-600">✓</span>
							<span><strong>Indonesia EdTech hub</strong> - attract global talent & investment</span
							>
						</li>
					</div>
				</div>

				<!-- 2041-2045: Generasi Emas -->
				<div
					class="rounded-3xl bg-gradient-to-r from-red-600 to-pink-600 p-8 text-white shadow-2xl"
				>
					<div class="mb-6 flex items-center gap-4">
						<div
							class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-white text-2xl font-bold text-red-600"
						>
							2045
						</div>
						<div>
							<h3 class="text-3xl font-bold">100 Tahun Indonesia Merdeka</h3>
							<p class="text-indigo-100">The Generasi Emas Reality</p>
						</div>
					</div>

					<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
						<h4 class="mb-4 text-2xl font-bold">Impact Measurements:</h4>
						<div class="grid gap-4 md:grid-cols-2">
							<div>
								<div class="mb-2 text-3xl font-bold">Top 10</div>
								<p class="text-sm text-indigo-100">Indonesia ranking in global education index</p>
							</div>
							<div>
								<div class="mb-2 text-3xl font-bold">90%+</div>
								<p class="text-sm text-indigo-100">Digital literacy rate untuk generasi muda</p>
							</div>
							<div>
								<div class="mb-2 text-3xl font-bold">-80%</div>
								<p class="text-sm text-indigo-100">Mental health crisis vs 2025 baseline</p>
							</div>
							<div>
								<div class="mb-2 text-3xl font-bold">100%</div>
								<p class="text-sm text-indigo-100">
									Data sovereignty - no dependency on foreign tech
								</p>
							</div>
						</div>
					</div>

					<div class="mt-6 rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
						<p class="text-lg font-semibold">
							🇮🇩 "Generasi yang cerdas, sehat mental, berkarakter, dan mampu bersaing di panggung
							global dengan tetap menjunjung tinggi nilai-nilai Indonesia"
						</p>
					</div>
				</div>
			</div>
		{/if}
	</div>
</section>

<!-- Critical Success Factors -->
<section id="success" class="bg-gradient-to-br from-blue-50 to-indigo-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Faktor Kunci Kesuksesan</h2>
			<p class="mx-auto max-w-3xl text-lg text-gray-700">
				Visi megah ini membutuhkan <strong
					>kolaborasi dari semua pihak yang menjunjung tinggi meritokrasi, integritas, dan cita-cita
					luhur bangsa</strong
				>
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- Leadership -->
			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<div class="mb-4 text-5xl">👔</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Leadership yang Visioner</h3>
				<ul class="space-y-3 text-gray-700">
					<li class="flex items-start gap-3">
						<span class="mt-1 text-indigo-600">▸</span>
						<span
							><strong>Pejabat pemerintah</strong> yang berani mengambil keputusan strategis untuk kedaulatan
							digital</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-indigo-600">▸</span>
						<span
							><strong>Pembisnis</strong> yang melihat value jangka panjang, bukan quick profit</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-indigo-600">▸</span>
						<span
							><strong>Akademisi</strong> yang kontribusi expertise untuk riset & development</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-indigo-600">▸</span>
						<span><strong>Tech leaders</strong> yang commit untuk open source & transparency</span>
					</li>
				</ul>
			</div>

			<!-- Meritocracy -->
			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<div class="mb-4 text-5xl">⚖️</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Meritokrasi & Integritas</h3>
				<ul class="space-y-3 text-gray-700">
					<li class="flex items-start gap-3">
						<span class="mt-1 text-purple-600">▸</span>
						<span
							><strong>Decision based on data & merit</strong>, bukan nepotisme atau korupsi</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-purple-600">▸</span>
						<span><strong>Transparent fund allocation</strong> - every rupiah accountable</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-purple-600">▸</span>
						<span><strong>Open source governance</strong> - community checks and balances</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-purple-600">▸</span>
						<span
							><strong>Zero tolerance</strong> untuk conflict of interest atau hidden agenda</span
						>
					</li>
				</ul>
			</div>

			<!-- Collaboration -->
			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<div class="mb-4 text-5xl">🤝</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Kolaborasi Multi-Stakeholder</h3>
				<ul class="space-y-3 text-gray-700">
					<li class="flex items-start gap-3">
						<span class="mt-1 text-pink-600">▸</span>
						<span
							><strong>Pemerintah</strong> - policy support, funding, integration dengan Belajar.id</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-pink-600">▸</span>
						<span
							><strong>Sekolah</strong> - adoption, feedback, validation dalam real-world setting</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-pink-600">▸</span>
						<span
							><strong>Community</strong> - open source contribution, innovation, grassroots adoption</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-pink-600">▸</span>
						<span
							><strong>Private sector</strong> - sustainable funding melalui corporate social responsibility</span
						>
					</li>
				</ul>
			</div>

			<!-- Innovation -->
			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<div class="mb-4 text-5xl">💡</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Continuous Innovation</h3>
				<ul class="space-y-3 text-gray-700">
					<li class="flex items-start gap-3">
						<span class="mt-1 text-orange-600">▸</span>
						<span><strong>R&D investment</strong> - minimal 30% revenue untuk riset 2USE AI</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-orange-600">▸</span>
						<span
							><strong>University partnerships</strong> - collaboration dengan top CS programs</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-orange-600">▸</span>
						<span
							><strong>Global best practices</strong> - learn from world leaders, adapt to Indonesia</span
						>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-orange-600">▸</span>
						<span
							><strong>Fail fast, iterate faster</strong> - startup mentality dengan government backing</span
						>
					</li>
				</ul>
			</div>
		</div>

		<div
			class="mt-12 rounded-2xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50 p-8"
		>
			<h3 class="mb-4 text-center text-2xl font-bold text-red-900">
				⚠️ Tantangan yang Harus Diatasi
			</h3>
			<div class="grid gap-6 md:grid-cols-3">
				<div class="text-center">
					<div class="mb-2 text-3xl">🐌</div>
					<p class="text-sm font-semibold text-gray-900">Bureaucracy</p>
					<p class="text-xs text-gray-600">
						Proses pemerintah yang lambat - need champions di dalam
					</p>
				</div>
				<div class="text-center">
					<div class="mb-2 text-3xl">💰</div>
					<p class="text-sm font-semibold text-gray-900">Sustainable Funding</p>
					<p class="text-xs text-gray-600">Balance antara gratis untuk rakyat vs sustainability</p>
				</div>
				<div class="text-center">
					<div class="mb-2 text-3xl">🔧</div>
					<p class="text-sm font-semibold text-gray-900">Talent Retention</p>
					<p class="text-xs text-gray-600">
						Keep top talent dengan below-market salary (mission-driven)
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Investment Opportunity -->
<section id="investment" class="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Peluang Investasi Megah</h2>
			<p class="mx-auto max-w-3xl text-xl text-gray-700">
				Ini bukan hanya investasi finansial - ini adalah investasi untuk <strong
					>masa depan 100 juta anak Indonesia</strong
				>
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Government Investment -->
			<div class="rounded-2xl border-2 border-blue-300 bg-white p-8 shadow-lg">
				<div class="mb-4 text-5xl">🏛️</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Investasi Pemerintah</h3>
				<p class="mb-4 text-gray-700">APBN allocation untuk digital education infrastructure</p>
				<div class="space-y-2 text-sm text-gray-700">
					<p><strong>ROI:</strong></p>
					<li>• Improved PISA ranking</li>
					<li>• Reduced education inequality</li>
					<li>• Data for evidence-based policy</li>
					<li>• Job creation (tech sector)</li>
					<li>• National pride & sovereignty</li>
				</div>
			</div>

			<!-- Private Investment -->
			<div class="rounded-2xl border-2 border-purple-300 bg-white p-8 shadow-lg">
				<div class="mb-4 text-5xl">💼</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Investasi Swasta</h3>
				<p class="mb-4 text-gray-700">VC/PE investment untuk scale-up dengan impact measurement</p>
				<div class="space-y-2 text-sm text-gray-700">
					<p><strong>ROI:</strong></p>
					<li>• Sustainable revenue growth</li>
					<li>• Market leadership position</li>
					<li>• Export potential (ASEAN)</li>
					<li>• Social impact + financial return</li>
					<li>• Exit via IPO or strategic acquisition</li>
				</div>
			</div>

			<!-- Community Investment -->
			<div class="rounded-2xl border-2 border-green-300 bg-white p-8 shadow-lg">
				<div class="mb-4 text-5xl">💚</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Kontribusi Komunitas</h3>
				<p class="mb-4 text-gray-700">
					Individual contributions (Rp 25K/bulan) yang collectively powerful
				</p>
				<div class="space-y-2 text-sm text-gray-700">
					<p><strong>Impact:</strong></p>
					<li>• Direct impact - help 3 students per contributor</li>
					<li>• Collective power - 100K contributors = Rp 2.5M/month</li>
					<li>• Voting rights - shape the future</li>
					<li>• Legacy - be part of history</li>
				</div>
			</div>
		</div>

		<div class="mt-12 text-center">
			<p class="mb-6 text-lg text-gray-700">
				<strong>Total estimated investment needed (2025-2045):</strong> Rp 500 Miliar
			</p>
			<p class="mb-8 text-gray-600">
				Untuk 50 juta users selama 20 tahun = <strong>Rp 500/user/tahun</strong> - jauh lebih murah dari
				biaya les privat atau subscription platform asing
			</p>
			<a
				href="mailto:investment@konxc.space?subject=Investment Inquiry - We Will Shine"
				class="btn-gradient-green"
			>
				Investment Inquiry
			</a>
		</div>
	</div>
</section>

<!-- Call to Action -->
<section
	class="relative overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 py-16"
>
	<!-- Soft Background Pattern -->
	<div class="absolute inset-0 opacity-30">
		<div
			class="h-full w-full"
			style="background-image: radial-gradient(circle at 25px 25px, rgba(156, 146, 172, 0.15) 2px, transparent 2px); background-size: 50px 50px;"
		></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Compact Header -->
		<div class="mb-8 text-center">
			<div class="mb-3 inline-block text-5xl">🇮🇩</div>
			<h2 class="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
				Bergabunglah dalam Perjalanan Megah Ini
			</h2>
			<p class="mx-auto max-w-2xl text-base text-gray-700">
				Setiap peran berharga untuk mewujudkan Generasi Emas 2045
			</p>
		</div>

		<!-- Compact Grid -->
		<div class="grid gap-4 md:grid-cols-4">
			<!-- Pelajar -->
			<a
				href="{base}/signin"
				class="group block rounded-2xl bg-white/60 p-5 shadow-lg backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-xl"
			>
				<div class="mb-2 text-3xl">🎓</div>
				<h4 class="mb-1 text-base font-bold text-gray-900">Pelajar</h4>
				<p class="text-xs font-semibold text-indigo-600 group-hover:underline">Mulai Belajar →</p>
			</a>

			<!-- Sekolah -->
			<a
				href="{base}/for-schools"
				class="group block rounded-2xl bg-white/60 p-5 shadow-lg backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-xl"
			>
				<div class="mb-2 text-3xl">🏫</div>
				<h4 class="mb-1 text-base font-bold text-gray-900">Sekolah</h4>
				<p class="text-xs font-semibold text-purple-600 group-hover:underline">Implementasi →</p>
			</a>

			<!-- Pemerintah -->
			<a
				href="{base}/partnership"
				class="group block rounded-2xl bg-white/60 p-5 shadow-lg backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-xl"
			>
				<div class="mb-2 text-3xl">🏛️</div>
				<h4 class="mb-1 text-base font-bold text-gray-900">Pemerintah</h4>
				<p class="text-xs font-semibold text-blue-600 group-hover:underline">Partnership →</p>
			</a>

			<!-- Investor -->
			<a
				href="mailto:investment@konxc.space"
				class="group block rounded-2xl bg-white/60 p-5 shadow-lg backdrop-blur-md transition-all hover:bg-white/80 hover:shadow-xl"
			>
				<div class="mb-2 text-3xl">💼</div>
				<h4 class="mb-1 text-base font-bold text-gray-900">Investor</h4>
				<p class="text-xs font-semibold text-green-600 group-hover:underline">Inquiry →</p>
			</a>
		</div>

		<!-- Compact Quote Card -->
		<div class="mt-8 rounded-2xl bg-white/70 p-6 shadow-xl backdrop-blur-lg">
			<div class="grid gap-6 md:grid-cols-2 md:items-center">
				<div class="text-center md:text-left">
					<div class="mb-2 inline-block text-4xl">🌟</div>
					<p class="mb-2 text-xl font-bold text-gray-900">
						"Kita tidak mewarisi bumi dari nenek moyang, tapi meminjamnya dari anak cucu kita"
					</p>
					<p class="text-sm font-semibold text-indigo-600">
						— We Will Shine adalah legacy kita untuk Generasi Emas 2045
					</p>
				</div>
				<div class="grid grid-cols-4 gap-3">
					<div class="rounded-xl bg-indigo-50/80 p-2 text-center">
						<div class="mb-1 text-xl">🇮🇩</div>
						<p class="text-xs font-semibold text-indigo-900">Indonesia</p>
					</div>
					<div class="rounded-xl bg-purple-50/80 p-2 text-center">
						<div class="mb-1 text-xl">🔓</div>
						<p class="text-xs font-semibold text-purple-900">Open</p>
					</div>
					<div class="rounded-xl bg-pink-50/80 p-2 text-center">
						<div class="mb-1 text-xl">💚</div>
						<p class="text-xs font-semibold text-pink-900">Gotong Royong</p>
					</div>
					<div class="rounded-xl bg-orange-50/80 p-2 text-center">
						<div class="mb-1 text-xl">🌱</div>
						<p class="text-xs font-semibold text-orange-900">Luhur</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
