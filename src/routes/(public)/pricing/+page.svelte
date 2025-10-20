<script lang="ts">
	import TabNavigation from '$lib/components/TabNavigation.svelte';
	import { setTabNavigation, hideTabNavigation, setHeaderVisibility } from '$lib/stores/tabNavigation';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	// Pricing sections configuration
	const sections = [
		{ id: 'pricing', label: 'Paket & Harga', icon: '💰' },
		{ id: 'transparency', label: 'Transparansi', icon: '🔍' },
		{ id: 'features', label: 'Perbandingan', icon: '📊' },
		{ id: 'integration', label: 'Integrasi', icon: '🔗' },
		{ id: 'faq', label: 'FAQ', icon: '❓' }
	];

	let activeSection = $state($page.url.searchParams.get('tab') || 'pricing');
	let tabNavigationElement: any = $state();

	// Billing toggle state
	let billingPeriod = $state<'monthly' | 'annual'>('monthly');

	// Calculate prices
	const monthlyPrice = 25000;
	const annualPrice = 250000;
	const annualMonthlyEquivalent = Math.floor(annualPrice / 12);
	const savings = monthlyPrice - annualMonthlyEquivalent;
	const savingsPercentage = Math.floor((savings / monthlyPrice) * 100);

	// Feature comparison accordion state
	let expandedSections = $state<{[key: string]: boolean}>({
		'ai-learning': true, // Expanded by default
		'mental-health': false,
		'productivity': false,
		'support': false,
		'enterprise': false,
		'perks': false
	});

	function toggleSection(sectionId: string) {
		expandedSections[sectionId] = !expandedSections[sectionId];
	}

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
	<title>Pricing - We Will Shine</title>
	<meta
		name="description"
		content="Gotong royong untuk pendidikan Indonesia yang lebih baik. Transparan, fair, dan sustainable."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h1 class="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
				Gotong Royong Digital
			</h1>
			<p class="mx-auto mb-4 max-w-3xl text-xl text-gray-700">
				Bukan sekadar subscription. Ini adalah kontribusi Anda untuk pendidikan Indonesia yang lebih baik, transparan, dan berkelanjutan.
			</p>
			<p class="mx-auto max-w-2xl text-lg font-semibold text-indigo-600">
				🇮🇩 Built by Indonesia, for Indonesia • 100% Transparent • Community-Driven
			</p>
		</div>
	</div>
</section>

<!-- Tab Navigation -->
<TabNavigation 
	bind:this={tabNavigationElement}
	bind:activeSection={activeSection}
	{sections}
	position="sticky"
/>

<!-- Pricing Tiers -->
<section id="pricing" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Pilih Kontribusi Anda</h2>
			<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
				Setiap tier berkontribusi langsung untuk infrastruktur, riset 2USE AI, dan akses gratis untuk pelajar kurang mampu
			</p>

			<!-- Social Proof -->
			<div class="mb-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
				<div class="flex items-center gap-2">
					<span class="text-2xl">👥</span>
					<span><strong class="text-indigo-600">1,250+</strong> pelajar aktif</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-2xl">🏫</span>
					<span><strong class="text-purple-600">15+</strong> sekolah partner</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="text-2xl">⭐</span>
					<span><strong class="text-pink-600">4.9/5</strong> rating</span>
				</div>
			</div>

			<!-- Billing Toggle -->
			<div class="inline-flex items-center gap-4 rounded-full bg-gray-100 p-2">
				<button
					class="billing-toggle {billingPeriod === 'monthly' ? 'active' : ''}"
					onclick={() => billingPeriod = 'monthly'}
				>
					Bulanan
				</button>
				<button
					class="billing-toggle {billingPeriod === 'annual' ? 'active' : ''}"
					onclick={() => billingPeriod = 'annual'}
				>
					Tahunan
					<span class="ml-1 rounded-full bg-green-500 px-2 py-0.5 text-xs font-semibold text-white">
						Hemat {savingsPercentage}%
					</span>
				</button>
			</div>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Free Tier - Individual -->
			<div class="rounded-3xl border-2 border-gray-200 bg-white p-8 shadow-lg">
				<div class="mb-6">
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Free</h3>
					<p class="text-gray-600">Untuk pelajar & mahasiswa</p>
				</div>

				<div class="mb-6">
					<div class="flex items-baseline gap-2">
						<span class="text-5xl font-bold text-gray-900">Rp 0</span>
						<span class="text-gray-600">/bulan</span>
					</div>
					<p class="mt-2 text-sm text-gray-500">Gratis selamanya dengan BYOK</p>
				</div>

				<ul class="mb-8 space-y-4">
					<li class="flex items-start gap-3">
						<span class="text-xl">✅</span>
						<span class="text-gray-700">Akses penuh ke AI Mentor (2USE)</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">✅</span>
						<span class="text-gray-700">Mental health check-in</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">✅</span>
						<span class="text-gray-700">Productivity analytics</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">✅</span>
						<span class="text-gray-700">Unlimited conversations</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">⚠️</span>
						<span class="text-gray-700">Requires your own API key (BYOK)</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">📚</span>
						<span class="text-gray-700">Community support</span>
					</li>
				</ul>

				<a
					href="{base}/signin"
					class="block rounded-xl border-2 border-indigo-600 bg-white px-6 py-3 text-center font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
				>
					Mulai Gratis
				</a>
			</div>

			<!-- Individual Contributor -->
			<div class="relative rounded-3xl border-2 border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-xl">
				<div class="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-1 text-sm font-semibold text-white">
					Paling Populer
				</div>

				<div class="mb-6">
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Individual</h3>
					<p class="text-gray-600">Untuk kontributor perorangan</p>
				</div>

				<div class="mb-6">
					{#if billingPeriod === 'monthly'}
						<div class="flex items-baseline gap-2">
							<span class="text-5xl font-bold text-indigo-600">Rp 25K</span>
							<span class="text-gray-600">/bulan</span>
						</div>
						<p class="mt-2 text-sm text-gray-500">Atau Rp 250K/tahun (hemat {savingsPercentage}%)</p>
					{:else}
						<div class="flex items-baseline gap-2">
							<span class="text-5xl font-bold text-indigo-600">Rp 250K</span>
							<span class="text-gray-600">/tahun</span>
						</div>
						<p class="mt-2 text-sm text-green-600 font-semibold">
							💰 Hemat Rp {(savings * 12).toLocaleString()}/tahun ({savingsPercentage}%)
						</p>
					{/if}
				</div>

				<ul class="mb-8 space-y-4">
					<li class="flex items-start gap-3">
						<span class="text-xl">✅</span>
						<span class="text-gray-700">Semua fitur Free tier</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">🚀</span>
						<span class="text-gray-700"><strong>No BYOK required</strong> - API keys disediakan</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">⚡</span>
						<span class="text-gray-700">Priority processing (lebih cepat)</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">🎯</span>
						<span class="text-gray-700">Early access fitur baru</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">💾</span>
						<span class="text-gray-700">Unlimited conversation history</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">🗳️</span>
						<span class="text-gray-700">Voting rights untuk roadmap</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">🏆</span>
						<span class="text-gray-700">Contributor badge</span>
					</li>
				</ul>

				<button
					class="btn-gradient-primary block w-full text-center"
				>
					Bergabung Sekarang
				</button>

				<p class="mt-4 text-center text-xs text-gray-600">
					💡 Kontribusi Anda membantu 3 pelajar kurang mampu
				</p>
			</div>

			<!-- School / Enterprise -->
			<div class="rounded-3xl border-2 border-purple-200 bg-white p-8 shadow-lg">
				<div class="mb-6">
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Sekolah</h3>
					<p class="text-gray-600">Untuk institusi pendidikan</p>
				</div>

				<div class="mb-6">
					<div class="flex items-baseline gap-2">
						<span class="text-5xl font-bold text-purple-600">Custom</span>
					</div>
					<p class="mt-2 text-sm text-gray-500">Sesuai kebutuhan sekolah</p>
				</div>

				<ul class="mb-8 space-y-4">
					<li class="flex items-start gap-3">
						<span class="text-xl">✅</span>
						<span class="text-gray-700">Semua fitur Individual tier</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">🏫</span>
						<span class="text-gray-700"><strong>Integrasi Sistem Akademik</strong></span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">📊</span>
						<span class="text-gray-700">Admin dashboard untuk monitoring</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">👥</span>
						<span class="text-gray-700">Unlimited student accounts</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">🎓</span>
						<span class="text-gray-700">Custom learning paths</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">🔐</span>
						<span class="text-gray-700">SSO & 2FA authentication</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">💬</span>
						<span class="text-gray-700">Dedicated support</span>
					</li>
					<li class="flex items-start gap-3">
						<span class="text-xl">🆓</span>
						<span class="text-gray-700"><strong>GRATIS</strong> jika berlangganan Sistem Akademik</span>
					</li>
				</ul>

				<a
					href="mailto:sales@konxc.space"
					class="block rounded-xl border-2 border-purple-600 bg-white px-6 py-3 text-center font-semibold text-purple-600 transition-all hover:bg-purple-50"
				>
					Hubungi Sales
				</a>
			</div>
		</div>

		<!-- ROI / Cost Comparison -->
		<div class="mx-auto mt-16 max-w-5xl">
			<div class="rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 p-8">
				<h3 class="mb-6 text-center text-2xl font-bold text-gray-900">💰 Bandingkan Biaya Bulanan</h3>
				<div class="grid gap-6 md:grid-cols-4">
					<!-- Les Privat -->
					<div class="rounded-2xl bg-white p-6 text-center shadow">
						<div class="mb-2 text-3xl">📚</div>
						<p class="mb-2 text-sm font-semibold text-gray-700">Les Privat</p>
						<p class="text-2xl font-bold text-red-600">Rp 500K</p>
						<p class="mt-1 text-xs text-gray-500">per bulan</p>
					</div>

					<!-- ChatGPT Plus -->
					<div class="rounded-2xl bg-white p-6 text-center shadow">
						<div class="mb-2 text-3xl">🤖</div>
						<p class="mb-2 text-sm font-semibold text-gray-700">ChatGPT Plus</p>
						<p class="text-2xl font-bold text-orange-600">Rp 320K</p>
						<p class="mt-1 text-xs text-gray-500">~$20/month</p>
					</div>

					<!-- Notion AI -->
					<div class="rounded-2xl bg-white p-6 text-center shadow">
						<div class="mb-2 text-3xl">📝</div>
						<p class="mb-2 text-sm font-semibold text-gray-700">Notion AI</p>
						<p class="text-2xl font-bold text-yellow-600">Rp 160K</p>
						<p class="mt-1 text-xs text-gray-500">~$10/month</p>
					</div>

					<!-- We Will Shine -->
					<div class="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-center text-white shadow-lg">
						<div class="mb-2 text-3xl">🌟</div>
						<p class="mb-2 text-sm font-semibold">We Will Shine</p>
						<p class="text-2xl font-bold">Rp 25K</p>
						<p class="mt-1 text-xs text-indigo-100">atau Rp 0 (BYOK)</p>
					</div>
				</div>

				<div class="mt-6 text-center">
					<p class="text-lg font-semibold text-green-700">
						💚 Hemat hingga <span class="text-2xl text-green-600">Rp 475K/bulan (95%)</span> vs les privat
					</p>
					<p class="mt-2 text-sm text-gray-600">
						Dengan fitur lebih lengkap: AI Mentor + Mental Health + Productivity Analytics
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Transparency Section -->
<section id="transparency" class="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Transparansi Alokasi Dana</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Setiap rupiah yang Anda kontribusikan digunakan untuk tujuan yang jelas dan terukur
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<!-- Infrastructure -->
			<div class="rounded-2xl bg-white p-6 text-center shadow-lg">
				<div class="mb-4 text-5xl">🖥️</div>
				<div class="mb-2 text-4xl font-bold text-indigo-600">40%</div>
				<h3 class="mb-2 font-semibold text-gray-900">Infrastruktur</h3>
				<p class="text-sm text-gray-600">Server, database, CDN, dan API LLM untuk user berbayar</p>
			</div>

			<!-- R&D -->
			<div class="rounded-2xl bg-white p-6 text-center shadow-lg">
				<div class="mb-4 text-5xl">🔬</div>
				<div class="mb-2 text-4xl font-bold text-purple-600">30%</div>
				<h3 class="mb-2 font-semibold text-gray-900">Riset 2USE AI</h3>
				<p class="text-sm text-gray-600">Pengembangan AI middleware untuk Socratic learning & mental health</p>
			</div>

			<!-- Free Access -->
			<div class="rounded-2xl bg-white p-6 text-center shadow-lg">
				<div class="mb-4 text-5xl">🎓</div>
				<div class="mb-2 text-4xl font-bold text-pink-600">20%</div>
				<h3 class="mb-2 font-semibold text-gray-900">Akses Gratis</h3>
				<p class="text-sm text-gray-600">Subsidi API untuk pelajar kurang mampu (tanpa BYOK)</p>
			</div>

			<!-- Team -->
			<div class="rounded-2xl bg-white p-6 text-center shadow-lg">
				<div class="mb-4 text-5xl">👨‍💻</div>
				<div class="mb-2 text-4xl font-bold text-orange-600">10%</div>
				<h3 class="mb-2 font-semibold text-gray-900">Tim & Operasional</h3>
				<p class="text-sm text-gray-600">Gaji tim kecil (below market rate) & operasional minimal</p>
			</div>
		</div>

		<div class="mt-12 rounded-2xl bg-white p-8">
			<h3 class="mb-4 text-center text-2xl font-bold text-gray-900">Komitmen Transparansi</h3>
			<div class="grid gap-6 md:grid-cols-3">
				<div class="text-center">
					<div class="mb-2 text-3xl">📊</div>
					<h4 class="mb-2 font-semibold text-gray-900">Monthly Reports</h4>
					<p class="text-sm text-gray-600">Laporan keuangan dan penggunaan dana setiap bulan</p>
				</div>
				<div class="text-center">
					<div class="mb-2 text-3xl">🔓</div>
					<h4 class="mb-2 font-semibold text-gray-900">Open Source</h4>
					<p class="text-sm text-gray-600">Seluruh kode dapat diaudit oleh komunitas</p>
				</div>
				<div class="text-center">
					<div class="mb-2 text-3xl">🗳️</div>
					<h4 class="mb-2 font-semibold text-gray-900">Community Voting</h4>
					<p class="text-sm text-gray-600">Kontributor memutuskan roadmap bersama</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Why Choose Us -->
<section class="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Kenapa Memilih We Will Shine?</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Lebih dari sekadar AI chatbot - ini adalah ekosistem pembelajaran yang comprehensive
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="mb-4 text-4xl">🇮🇩</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Buatan Indonesia</h3>
				<p class="text-gray-700">
					Server lokal, data sovereignty, dan AI yang memahami konteks & budaya Indonesia. Bukan sekadar terjemahan dari produk asing.
				</p>
			</div>

			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="mb-4 text-4xl">🧠</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Mental Health First</h3>
				<p class="text-gray-700">
					Satu-satunya platform yang mengintegrasikan AI learning mentor dengan mental health support - karena kesehatan mental sama pentingnya dengan nilai akademik.
				</p>
			</div>

			<div class="rounded-2xl bg-white p-6 shadow-lg">
				<div class="mb-4 text-4xl">💚</div>
				<h3 class="mb-3 text-xl font-bold text-gray-900">Gotong Royong</h3>
				<p class="text-gray-700">
					Model pricing transparan, sustainable, dan community-driven. Kontribusi Anda langsung membantu pelajar kurang mampu.
				</p>
			</div>
		</div>

		<div class="mt-12 text-center">
			<p class="text-gray-600">
				Pemerintah atau institusi pendidikan yang ingin berkolaborasi?
			</p>
			<a
				href="{base}/partnership"
				class="partnership-link-button"
			>
				Lihat Partnership Program →
			</a>
		</div>
	</div>
</section>

<!-- Feature Comparison Table -->
<section id="features" class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Perbandingan Fitur Lengkap</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Detail fitur untuk setiap tier agar Anda dapat memilih yang paling sesuai
			</p>
			<p class="mt-4 text-sm text-indigo-600">
				💡 <strong>Tip:</strong> Klik kategori untuk expand/collapse detail fitur
			</p>
		</div>

		<!-- Table Header (Always Visible) -->
		<div class="mb-6 overflow-x-auto rounded-2xl border-2 border-gray-200 bg-white shadow-lg">
			<div class="grid grid-cols-4 gap-4 border-b-2 border-gray-200 p-6">
				<div class="text-left font-semibold text-gray-900">Fitur</div>
				<div class="text-center">
					<div class="mb-1 font-semibold text-gray-900">Free</div>
					<div class="text-xs text-gray-600">Rp 0/bulan</div>
				</div>
				<div class="rounded-xl bg-indigo-50 px-4 py-2 text-center">
					<div class="mb-1 font-semibold text-indigo-600">Individual</div>
					<div class="text-xs text-indigo-600">Rp 25K/bulan</div>
				</div>
				<div class="text-center">
					<div class="mb-1 font-semibold text-gray-900">Sekolah</div>
					<div class="text-xs text-gray-600">Custom</div>
				</div>
			</div>
		</div>

		<!-- Accordion Sections -->
		<div class="space-y-4">
			<!-- AI Learning Features -->
			<div class="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all">
				<button
					onclick={() => toggleSection('ai-learning')}
					class="flex w-full items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-6 text-left transition-colors hover:from-indigo-100 hover:to-purple-100"
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">🤖</span>
						<span class="text-lg font-bold text-gray-900">AI Learning Features</span>
						<span class="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
							5 fitur
						</span>
					</div>
					<svg 
						class="h-6 w-6 text-gray-600 transition-transform {expandedSections['ai-learning'] ? 'rotate-180' : ''}"
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				
				{#if expandedSections['ai-learning']}
					<div class="animate-fadeIn divide-y divide-gray-100 border-t-2 border-gray-200">
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-indigo-50/30">
							<div class="text-sm text-gray-700">AI Mentor Access (2USE)</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-indigo-50/30">
							<div class="text-sm text-gray-700">Unlimited Conversations</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-indigo-50/30">
							<div class="text-sm text-gray-700">BYOK Required</div>
							<div class="text-center text-orange-600">Ya</div>
							<div class="text-center text-green-600">Tidak</div>
							<div class="text-center text-green-600">Tidak</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-indigo-50/30">
							<div class="text-sm text-gray-700">Response Priority</div>
							<div class="text-center text-xs text-gray-500">Normal</div>
							<div class="text-center text-xs text-green-600">Fast ⚡</div>
							<div class="text-center text-xs text-green-600">Fastest 🚀</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-indigo-50/30">
							<div class="text-sm text-gray-700">Conversation History</div>
							<div class="text-center text-xs text-gray-500">7 hari</div>
							<div class="text-center text-xs text-green-600">Unlimited</div>
							<div class="text-center text-xs text-green-600">Unlimited</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Mental Health & Wellbeing -->
			<div class="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all">
				<button
					onclick={() => toggleSection('mental-health')}
					class="flex w-full items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 p-6 text-left transition-colors hover:from-purple-100 hover:to-pink-100"
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">🧠</span>
						<span class="text-lg font-bold text-gray-900">Mental Health & Wellbeing</span>
						<span class="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-600">
							3 fitur
						</span>
					</div>
					<svg 
						class="h-6 w-6 text-gray-600 transition-transform {expandedSections['mental-health'] ? 'rotate-180' : ''}"
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				
				{#if expandedSections['mental-health']}
					<div class="animate-fadeIn divide-y divide-gray-100 border-t-2 border-gray-200">
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-purple-50/30">
							<div class="text-sm text-gray-700">Mental Health Check-in</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-purple-50/30">
							<div class="text-sm text-gray-700">AI Psychological Assessment</div>
							<div class="text-center text-xs text-gray-500">Basic</div>
							<div class="text-center text-xs text-green-600">Advanced</div>
							<div class="text-center text-xs text-green-600">Advanced</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-purple-50/30">
							<div class="text-sm text-gray-700">Wellness Recommendations</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Productivity & Analytics -->
			<div class="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all">
				<button
					onclick={() => toggleSection('productivity')}
					class="flex w-full items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 p-6 text-left transition-colors hover:from-blue-100 hover:to-cyan-100"
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">📊</span>
						<span class="text-lg font-bold text-gray-900">Productivity & Analytics</span>
						<span class="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
							3 fitur
						</span>
					</div>
					<svg 
						class="h-6 w-6 text-gray-600 transition-transform {expandedSections['productivity'] ? 'rotate-180' : ''}"
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				
				{#if expandedSections['productivity']}
					<div class="animate-fadeIn divide-y divide-gray-100 border-t-2 border-gray-200">
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-blue-50/30">
							<div class="text-sm text-gray-700">Learning Analytics</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-blue-50/30">
							<div class="text-sm text-gray-700">Roadmap Planning</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-blue-50/30">
							<div class="text-sm text-gray-700">Google Calendar Integration</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Support & Community -->
			<div class="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all">
				<button
					onclick={() => toggleSection('support')}
					class="flex w-full items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-6 text-left transition-colors hover:from-green-100 hover:to-emerald-100"
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">💬</span>
						<span class="text-lg font-bold text-gray-900">Support & Community</span>
						<span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
							3 fitur
						</span>
					</div>
					<svg 
						class="h-6 w-6 text-gray-600 transition-transform {expandedSections['support'] ? 'rotate-180' : ''}"
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				
				{#if expandedSections['support']}
					<div class="animate-fadeIn divide-y divide-gray-100 border-t-2 border-gray-200">
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-green-50/30">
							<div class="text-sm text-gray-700">Community Support</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-green-50/30">
							<div class="text-sm text-gray-700">Email Support</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center text-xs text-gray-500">48 jam</div>
							<div class="text-center text-xs text-green-600">24 jam</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-green-50/30">
							<div class="text-sm text-gray-700">Dedicated Account Manager</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center">✅</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Enterprise Features -->
			<div class="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all">
				<button
					onclick={() => toggleSection('enterprise')}
					class="flex w-full items-center justify-between bg-gradient-to-r from-orange-50 to-amber-50 p-6 text-left transition-colors hover:from-orange-100 hover:to-amber-100"
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">🏫</span>
						<span class="text-lg font-bold text-gray-900">Enterprise Features</span>
						<span class="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
							4 fitur
						</span>
					</div>
					<svg 
						class="h-6 w-6 text-gray-600 transition-transform {expandedSections['enterprise'] ? 'rotate-180' : ''}"
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				
				{#if expandedSections['enterprise']}
					<div class="animate-fadeIn divide-y divide-gray-100 border-t-2 border-gray-200">
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-orange-50/30">
							<div class="text-sm text-gray-700">Admin Dashboard</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-orange-50/30">
							<div class="text-sm text-gray-700">SSO & 2FA</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-orange-50/30">
							<div class="text-sm text-gray-700">Unlimited Student Accounts</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-orange-50/30">
							<div class="text-sm text-gray-700">Custom Learning Paths</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center">✅</div>
						</div>
					</div>
				{/if}
			</div>

			<!-- Perks & Benefits -->
			<div class="overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-lg transition-all">
				<button
					onclick={() => toggleSection('perks')}
					class="flex w-full items-center justify-between bg-gradient-to-r from-pink-50 to-rose-50 p-6 text-left transition-colors hover:from-pink-100 hover:to-rose-100"
				>
					<div class="flex items-center gap-3">
						<span class="text-2xl">🎁</span>
						<span class="text-lg font-bold text-gray-900">Perks & Benefits</span>
						<span class="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-600">
							3 fitur
						</span>
					</div>
					<svg 
						class="h-6 w-6 text-gray-600 transition-transform {expandedSections['perks'] ? 'rotate-180' : ''}"
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				
				{#if expandedSections['perks']}
					<div class="animate-fadeIn divide-y divide-gray-100 border-t-2 border-gray-200">
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-pink-50/30">
							<div class="text-sm text-gray-700">Early Access to New Features</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-pink-50/30">
							<div class="text-sm text-gray-700">Community Voting Rights</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
						<div class="grid grid-cols-4 gap-4 p-4 transition-colors hover:bg-pink-50/30">
							<div class="text-sm text-gray-700">Contributor Badge</div>
							<div class="text-center text-gray-400">❌</div>
							<div class="text-center">✅</div>
							<div class="text-center">✅</div>
						</div>
					</div>
				{/if}
			</div>
		</div>

		<div class="mt-8 text-center">
			<p class="text-gray-600">
				Masih ada pertanyaan? Lihat <a href="#faq" class="font-semibold text-indigo-600 hover:underline">FAQ</a> atau <a href="mailto:support@konxc.space" class="font-semibold text-indigo-600 hover:underline">hubungi kami</a>
			</p>
		</div>
	</div>
</section>

<!-- Ecosystem Integration -->
<section id="integration" class="py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Ekosistem Koneksi</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				We Will Shine adalah bagian dari ekosistem yang lebih besar untuk transformasi digital pendidikan Indonesia
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- We Will Shine -->
			<div class="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8">
				<div class="mb-4 flex items-center gap-4">
					<div class="text-4xl">🌟</div>
					<h3 class="text-2xl font-bold text-gray-900">We Will Shine</h3>
				</div>
				<p class="mb-4 text-gray-700">
					Platform AI learning dengan 2USE middleware untuk pembelajaran Socratic dan dukungan mental health.
				</p>
				<ul class="space-y-2 text-sm text-gray-600">
					<li>✅ AI Mentor untuk semua pelajaran</li>
					<li>✅ Mental health support & analytics</li>
					<li>✅ Productivity tracking & recommendations</li>
					<li>✅ Community-driven development</li>
				</ul>
			</div>

			<!-- Sistem Akademik -->
			<div class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-8">
				<div class="mb-4 flex items-center gap-4">
					<div class="text-4xl">🏫</div>
					<h3 class="text-2xl font-bold text-gray-900">Sistem Akademik</h3>
				</div>
				<p class="mb-4 text-gray-700">
					Sistem manajemen sekolah lengkap dari absensi, nilai, keuangan, hingga rapor digital.
				</p>
				<ul class="space-y-2 text-sm text-gray-600">
					<li>✅ Manajemen siswa & guru</li>
					<li>✅ Absensi real-time</li>
					<li>✅ E-rapor & analytics</li>
					<li>✅ <strong>GRATIS akses We Will Shine</strong></li>
				</ul>
			</div>
		</div>

		<div class="mt-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
			<div class="text-center">
				<h3 class="mb-4 text-2xl font-bold">Bundling Ekosistem</h3>
				<p class="mx-auto mb-6 max-w-2xl text-lg">
					Sekolah yang berlangganan <strong>Sistem Akademik</strong> otomatis mendapatkan <strong>We Will Shine GRATIS</strong> untuk semua siswa dan guru.
				</p>
				<p class="mb-6 text-indigo-100">
					Investasi tunggal untuk transformasi digital menyeluruh. Satu vendor, satu invoice, satu support team.
				</p>
				<a
					href="mailto:sales@konxc.space"
					class="inline-block rounded-xl bg-white px-8 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
				>
					Konsultasi Gratis untuk Sekolah
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Payment Methods -->
<section class="bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<h3 class="mb-6 text-2xl font-bold text-gray-900">Metode Pembayaran</h3>
			<p class="mb-8 text-gray-600">Kami menerima berbagai metode pembayaran untuk kemudahan Anda</p>
			
			<div class="flex flex-wrap items-center justify-center gap-6">
				<!-- Bank Transfer -->
				<div class="flex items-center gap-3 rounded-xl bg-white px-6 py-3 shadow">
					<span class="text-2xl">🏦</span>
					<span class="font-semibold text-gray-700">Transfer Bank</span>
				</div>

				<!-- E-Wallets -->
				<div class="flex items-center gap-3 rounded-xl bg-white px-6 py-3 shadow">
					<span class="text-2xl">💳</span>
					<span class="font-semibold text-gray-700">GoPay • OVO • DANA</span>
				</div>

				<!-- QRIS -->
				<div class="flex items-center gap-3 rounded-xl bg-white px-6 py-3 shadow">
					<span class="text-2xl">📱</span>
					<span class="font-semibold text-gray-700">QRIS</span>
				</div>

				<!-- Credit Card -->
				<div class="flex items-center gap-3 rounded-xl bg-white px-6 py-3 shadow">
					<span class="text-2xl">💳</span>
					<span class="font-semibold text-gray-700">Visa • Mastercard</span>
				</div>
			</div>

			<p class="mt-6 text-sm text-gray-500">
				🔒 Semua transaksi dienkripsi dan aman dengan SSL 256-bit
			</p>
		</div>
	</div>
</section>

<!-- FAQ Pricing -->
<section id="faq" class="bg-white py-20">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Pertanyaan Seputar Pricing</h2>
		</div>

		<div class="space-y-6">
			<details class="group rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 transition-all hover:shadow-lg">
				<summary class="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
					<span class="text-lg">Kenapa tidak sepenuhnya gratis?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Kami berkomitmen untuk <strong>tetap gratis untuk semua pelajar</strong> (dengan BYOK). Namun, API LLM seperti GPT, Claude, dan Gemini tidak gratis. Infrastruktur server, database, dan bandwidth juga memerlukan biaya. Model kontribusi ini memastikan keberlanjutan platform sambil tetap memberikan akses gratis untuk yang membutuhkan.
				</p>
			</details>

			<details class="group rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 transition-all hover:shadow-lg">
				<summary class="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
					<span class="text-lg">Apa itu BYOK (Bring Your Own Key)?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					BYOK berarti Anda menggunakan API key LLM sendiri (misalnya dari OpenAI, Anthropic, atau Google). Anda tetap dapat menggunakan semua fitur We Will Shine secara gratis, tapi biaya API LLM dibayar langsung ke penyedia (biasanya jauh lebih murah daripada berlangganan ChatGPT Plus). Tier Individual menyediakan API key sehingga Anda tidak perlu BYOK.
				</p>
			</details>

			<details class="group rounded-2xl bg-gradient-to-br from-pink-50 to-orange-50 p-6 transition-all hover:shadow-lg">
				<summary class="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
					<span class="text-lg">Bagaimana sistem pembayaran untuk sekolah?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Sekolah yang sudah berlangganan <strong>Sistem Akademik</strong> PT Koneksi Jaringan Indonesia <strong>otomatis mendapat We Will Shine gratis</strong>. Ini bukan biaya tambahan - sudah termasuk dalam paket Sistem Akademik. Untuk sekolah yang hanya ingin We Will Shine, kami menyediakan pricing khusus berdasarkan jumlah siswa. Hubungi sales@konxc.space untuk penawaran.
				</p>
			</details>

			<details class="group rounded-2xl bg-gradient-to-br from-orange-50 to-yellow-50 p-6 transition-all hover:shadow-lg">
				<summary class="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
					<span class="text-lg">Apakah dana kontribusi benar-benar transparan?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Ya, 100% transparan! Kami akan publish laporan keuangan bulanan di GitHub (public repository) yang mencakup: total revenue, alokasi per kategori (infrastruktur, riset, subsidi, operasional), dan jumlah pelajar yang disubsidi. Sebagai project open source, kode kami juga dapat diaudit. Kontributor memiliki voting rights untuk memutuskan roadmap dan penggunaan dana.
				</p>
			</details>

			<details class="group rounded-2xl bg-gradient-to-br from-yellow-50 to-green-50 p-6 transition-all hover:shadow-lg">
				<summary class="flex cursor-pointer items-center justify-between font-semibold text-gray-900">
					<span class="text-lg">Bagaimana jika saya pelajar kurang mampu?</span>
					<span class="text-2xl transition-transform group-open:rotate-180">▼</span>
				</summary>
				<p class="mt-4 text-gray-700">
					Kami menyediakan program <strong>subsidi penuh</strong> untuk pelajar kurang mampu yang membutuhkan akses tanpa BYOK. Apply melalui form khusus dengan dokumen pendukung (seperti KIP, atau surat keterangan dari sekolah). 20% dari dana kontribusi dialokasikan khusus untuk ini. Kami percaya bahwa <strong>pendidikan berkualitas adalah hak semua orang</strong>, bukan privilege.
				</p>
			</details>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-4 text-4xl font-bold text-white">Siap Memulai Perjalanan Belajar?</h2>
		<p class="mb-8 text-xl text-indigo-100">
			Bergabunglah dengan ribuan pelajar Indonesia yang sudah menggunakan We Will Shine
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="{base}/signin"
				class="start-free-button"
			>
				🎓 Mulai Gratis Sekarang
			</a>
			<a
				href="mailto:sales@konxc.space"
				class="school-consult-button"
			>
				🏫 Konsultasi untuk Sekolah
			</a>
		</div>

		<div class="mt-12 grid gap-6 text-center md:grid-cols-3">
			<div>
				<div class="mb-2 text-3xl font-bold text-white">100%</div>
				<p class="text-sm text-indigo-100">Open Source & Transparan</p>
			</div>
			<div>
				<div class="mb-2 text-3xl font-bold text-white">Gratis</div>
				<p class="text-sm text-indigo-100">Untuk Semua Pelajar</p>
			</div>
			<div>
				<div class="mb-2 text-3xl font-bold text-white">🇮🇩</div>
				<p class="text-sm text-indigo-100">Bangga Buatan Indonesia</p>
			</div>
		</div>

		<p class="mt-8 text-sm text-indigo-200">
			Pemerintah atau institusi pendidikan? <a href="{base}/partnership" class="font-semibold underline hover:text-white">Lihat Partnership Program</a>
		</p>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";

	/* Billing Toggle */
	.billing-toggle {
		padding: 0.5rem 1.5rem;
		border-radius: 9999px;
		font-weight: 600;
		font-size: 0.875rem;
		transition: all 0.3s ease;
		background: transparent;
		color: #6b7280;
		border: none;
		cursor: pointer;
	}

	.billing-toggle.active {
		background: linear-gradient(to right, #6366f1, #9333ea);
		color: var(--button-text-white) !important;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
	}

	.billing-toggle:hover:not(.active) {
		background: #e5e7eb;
	}

	/* Partnership Link Button */
	.partnership-link-button {
		display: inline-block;
		margin-top: 1rem;
		border-radius: 0.75rem;
		background: linear-gradient(to right, #6366f1, #9333ea);
		padding: 0.75rem 2rem;
		font-weight: 600;
		color: var(--button-text-white) !important;
		text-decoration: none;
		transition: all 0.3s ease;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
	}

	.partnership-link-button:hover {
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
		transform: translateY(-2px);
	}

	/* Start Free Button */
	.start-free-button {
		display: inline-block;
		border-radius: 0.75rem;
		background-color: var(--button-text-white);
		padding: 0.75rem 2rem;
		font-weight: 600;
		color: #6366f1 !important;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.start-free-button:hover {
		background-color: #f3f4f6;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
	}

	/* School Consult Button */
	.school-consult-button {
		display: inline-block;
		border-radius: 0.75rem;
		border: 2px solid var(--button-text-white);
		background-color: transparent;
		padding: 0.75rem 2rem;
		font-weight: 600;
		color: var(--button-text-white) !important;
		text-decoration: none;
		transition: all 0.3s ease;
	}

	.school-consult-button:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	/* Accordion Animation */
	.animate-fadeIn {
		animation: fadeIn 0.3s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

