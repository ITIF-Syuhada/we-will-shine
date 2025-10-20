<script lang="ts">
	import TabNavigation from '$lib/components/TabNavigation.svelte';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import {
		setTabNavigation,
		hideTabNavigation,
		setHeaderVisibility
	} from '$lib/stores/tabNavigation';

	// Section navigation configuration
	const sections = [
		{ id: 'cerita', label: 'Cerita Kami', icon: '📖' },
		{ id: 'filosofi', label: 'Filosofi & Misi', icon: '💎' },
		{ id: 'siapa', label: 'Siapa Kami', icon: '🏢' },
		{ id: 'tim', label: 'Tim', icon: '👥' },
		{ id: 'progress', label: 'Progress', icon: '⏳' },
		{ id: 'opensource', label: 'Open Source', icon: '🔓' }
	];

	let activeSection = $state('cerita');
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
	<title>About Us - We Will Shine</title>
	<meta
		name="description"
		content="Learn about We Will Shine, our mission to democratize AI-powered education in Indonesia, and the team behind it."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="bg-gradient-to-br from-indigo-100 via-white to-purple-100 py-20">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<div class="mb-6 text-6xl">🌟</div>
			<h1
				class="mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl"
			>
				Tentang We Will Shine
			</h1>
			<p class="mx-auto mb-4 max-w-3xl text-xl text-gray-700">
				Perjalanan kami membangun platform AI learning yang demokratis, transparan, dan berdaulat
				untuk Indonesia
			</p>
		</div>
	</div>
</section>

<!-- Tab Navigation - Below Hero -->
<TabNavigation bind:this={tabNavigationElement} bind:activeSection {sections} position="sticky" />

<!-- Our Story - More Personal & Engaging -->
<section id="cerita" class="py-20">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Cerita Kami</h2>
			<p class="text-lg text-gray-600 italic">"Dari kegelisahan sederhana, menjadi mimpi besar"</p>
		</div>

		<div class="space-y-12">
			<!-- The Frustration -->
			<div class="rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 md:p-12">
				<div class="mb-6 text-5xl">💭</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Berawal dari Kegelisahan</h3>
				<p class="mb-4 text-lg leading-relaxed text-gray-700">
					ChatGPT, Claude, Gemini — AI tools ini sangat powerful untuk pembelajaran. Kami sendiri
					menggunakannya setiap hari untuk coding, riset, bahkan diskusi filosofis.
				</p>
				<p class="mb-6 text-lg leading-relaxed text-gray-700">
					Namun ada yang mengganjal: <strong>subscription $20/bulan</strong> terlalu mahal untuk mayoritas
					pelajar Indonesia. Belum lagi data pembelajaran tersimpan di server luar negeri, dan AI seringkali
					langsung memberikan jawaban tanpa mendorong pemikiran kritis.
				</p>
				<div class="relative mt-6 pl-6">
					<div
						class="absolute top-0 bottom-0 left-0 w-1 rounded-full bg-gradient-to-b from-indigo-400 to-purple-400"
					></div>
					<p class="text-lg leading-relaxed text-gray-800 italic">
						Jika seperti ini terus, yang mampu akan semakin maju, sementara yang kurang mampu
						semakin tertinggal. <span class="font-bold text-indigo-700"
							>Ini bukan Indonesia yang kami inginkan.</span
						>
					</p>
				</div>
			</div>

			<!-- The Idea -->
			<div class="grid gap-8 md:grid-cols-2">
				<div class="rounded-2xl border-2 border-purple-200 bg-white p-8 shadow-lg">
					<div class="mb-4 text-4xl">💡</div>
					<h3 class="mb-3 text-xl font-bold text-gray-900">Kemudian Muncul Sebuah Ide</h3>
					<p class="leading-relaxed text-gray-700">
						Bagaimana jika kami membuat platform AI learning yang <strong>gratis</strong>,
						<strong>open source</strong>, dan menggunakan <strong>API key pribadi</strong>?
					</p>
					<p class="mt-3 leading-relaxed text-gray-700">
						User membawa API key mereka sendiri (Gemini, OpenAI, atau provider lain), kami
						menyediakan interface dan AI yang tidak sekadar memberikan jawaban, melainkan <em
							>membimbing proses berpikir</em
						>.
					</p>
				</div>

				<div
					class="rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 p-8 text-white shadow-lg"
				>
					<div class="mb-4 text-4xl">🎯</div>
					<h3 class="mb-3 text-xl font-bold">Mengapa Ini Feasible?</h3>
					<ul class="space-y-3 text-sm">
						<li class="flex gap-2">
							<span>✓</span>
							<span><strong>Gemini free tier</strong> menyediakan 1,500 requests/hari</span>
						</li>
						<li class="flex gap-2">
							<span>✓</span>
							<span><strong>User punya kontrol penuh</strong> atas data & biaya</span>
						</li>
						<li class="flex gap-2">
							<span>✓</span>
							<span><strong>Open source</strong> = transparan & dapat dikustomisasi</span>
						</li>
						<li class="flex gap-2">
							<span>✓</span>
							<span><strong>Server lokal</strong> = kedaulatan data Indonesia</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- The Launch -->
			<div
				class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 md:p-12"
			>
				<!-- Playful dots accent in corner -->
				<div class="absolute -top-4 -right-4 h-24 w-24 opacity-20">
					<div
						class="absolute top-0 right-0 h-16 w-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-400"
					></div>
					<div
						class="absolute top-8 right-8 h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400"
					></div>
					<div class="absolute top-12 right-4 h-4 w-4 rounded-full bg-teal-300"></div>
				</div>

				<div class="mb-6 text-5xl">🚀</div>
				<h3 class="mb-4 text-2xl font-bold text-gray-900">Oktober 2025: We Will Shine Lahir</h3>
				<p class="mb-4 text-lg leading-relaxed text-gray-700">
					Alhamdulillah, kami memiliki modal awal: <strong>15+ sekolah</strong> yang sudah menggunakan
					Sistem Akademik kami. Mereka mempercayai visi ini, dan siap menjadi early adopters.
				</p>
				<p class="mb-6 text-lg leading-relaxed text-gray-700">
					Ini bukan sekadar peluncuran produk. Ini adalah <strong>awal dari sebuah gerakan</strong> —
					gerakan untuk mendemokratisasi akses AI education di Indonesia, dengan pendekatan yang sustainable,
					transparan, dan berpihak pada seluruh rakyat Indonesia.
				</p>
				<div class="grid gap-4 text-center md:grid-cols-3">
					<div class="rounded-2xl border border-green-200 bg-white/60 p-4 backdrop-blur-sm">
						<div class="text-3xl font-bold text-green-600">15+</div>
						<div class="text-sm text-gray-600">Sekolah Partner</div>
					</div>
					<div class="rounded-2xl border border-blue-200 bg-white/60 p-4 backdrop-blur-sm">
						<div class="text-3xl font-bold text-blue-600">100%</div>
						<div class="text-sm text-gray-600">Open Source</div>
					</div>
					<div class="rounded-2xl border border-purple-200 bg-white/60 p-4 backdrop-blur-sm">
						<div class="text-3xl font-bold text-purple-600">Rp 0</div>
						<div class="text-sm text-gray-600">Biaya Platform</div>
					</div>
				</div>
			</div>

			<!-- The Vision -->
			<div
				class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 p-1"
			>
				<div class="rounded-3xl bg-white p-8 md:p-12">
					<div class="mb-6 text-center text-6xl">🇮🇩</div>
					<h3 class="mb-4 text-center text-2xl font-bold text-gray-900">Mimpi Kami Sederhana</h3>
					<p class="mx-auto max-w-3xl text-center text-lg leading-relaxed text-gray-700">
						Suatu hari nanti, <strong>setiap anak Indonesia</strong> — dari Sabang sampai Merauke,
						dari yang mampu sampai yang kurang mampu — punya <strong>akses setara</strong> ke AI
						learning assistant yang bisa
						<em>menemani mereka belajar, berpikir kritis, dan berkembang</em>.
					</p>
					<p class="mx-auto mt-4 max-w-2xl text-center text-base text-gray-600 italic">
						Bukan sekadar mimpi. Ini komitmen kami untuk Generasi Emas 2045.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Philosophy & Mission -->
<section id="filosofi" class="bg-gradient-to-br from-indigo-50 to-purple-50 py-20">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Filosofi & Misi Kami</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Nilai-nilai luhur yang menjadi fondasi setiap keputusan dan inovasi kami
			</p>
		</div>

		<!-- Core Philosophy -->
		<div
			class="mb-12 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 p-8 shadow-lg md:p-12"
		>
			<div class="mb-6 text-center text-5xl">🌱</div>
			<h3 class="mb-6 text-center text-3xl font-bold text-gray-900">Filosofi Dasar</h3>

			<div class="space-y-6 text-center">
				<p class="text-2xl font-bold text-orange-900">"Tidak Ada Anak yang Bodoh"</p>
				<p class="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
					Setiap anak adalah <strong>tunas bangsa</strong> dengan potensi luar biasa yang menunggu
					untuk dipupuk. Yang mereka butuhkan bukan label atau judgement, tapi
					<strong>dukungan moral dan tuntunan yang tepat dari orang dewasa yang bijaksana</strong>.
				</p>
				<p class="mx-auto max-w-3xl text-lg leading-relaxed text-gray-700">
					<strong>Kedewasaan sejati</strong> adalah wawasan dan kebijaksanaan kolektif yang
					mengedepankan <strong>nilai-nilai ketuhanan dan humanis</strong>, serta mengesampingkan
					ego demi hajat hidup orang banyak.
				</p>
			</div>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			<!-- Mission -->
			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<h3 class="mb-6 text-2xl font-bold text-gray-900">🎯 Misi Kami</h3>
				<div class="space-y-4 text-gray-700">
					<p class="leading-relaxed">
						Membantu setiap anak <strong>menemukan jati dirinya</strong> dalam kebaikan dan kebermanfaatan
						kolektif - bukan sekadar meningkatkan nilai akademik.
					</p>
					<p class="leading-relaxed">
						Memberikan akses setara ke AI-powered education yang <strong
							>menghormati keunikan setiap individu</strong
						>, sambil menjaga kedaulatan data dan transparansi penuh.
					</p>
					<p class="leading-relaxed">
						Membangun generasi yang tidak hanya <strong>cerdas secara intelektual</strong>, tapi
						juga <strong>sehat mental</strong>, <strong>berkarakter mulia</strong>, dan
						<strong>bermanfaat untuk sesama</strong>.
					</p>
				</div>
			</div>

			<!-- Values -->
			<div
				class="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white shadow-lg"
			>
				<h3 class="mb-6 text-2xl font-bold">💎 Nilai-Nilai Luhur</h3>
				<ul class="space-y-4">
					<li class="flex items-start gap-3">
						<span class="mt-1 text-xl">☪️</span>
						<div>
							<strong>Ketuhanan</strong> - Setiap fitur dirancang dengan nilai-nilai spiritual dan moral
							yang luhur
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-xl">❤️</span>
						<div>
							<strong>Humanis</strong> - Teknologi untuk manusia, bukan manusia untuk teknologi
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-xl">🤲</span>
						<div>
							<strong>Gotong Royong</strong> - Kebermanfaatan kolektif di atas kepentingan ego pribadi
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-xl">⚖️</span>
						<div>
							<strong>Keadilan</strong> - Akses setara tanpa diskriminasi ekonomi, sosial, atau geografis
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-xl">🌱</span>
						<div>
							<strong>Pertumbuhan Holistik</strong> - Akademik, mental, spiritual, dan sosial berkembang
							bersama
						</div>
					</li>
					<li class="flex items-start gap-3">
						<span class="mt-1 text-xl">🇮🇩</span>
						<div>
							<strong>Kedaulatan</strong> - Indonesia mandiri dalam teknologi pendidikan, data milik
							rakyat
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Behind We Will Shine - More Storytelling -->
<section id="siapa" class="py-20">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Siapa Kami?</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Tim kecil dengan pengalaman transformasi digital sekolah & mimpi besar untuk pendidikan
				Indonesia
			</p>
		</div>

		<!-- PT Koneksi - Story Format -->
		<div
			class="mb-12 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-8 md:p-12"
		>
			<div class="mb-6 flex items-center gap-4">
				<div class="text-6xl">🏫</div>
				<div>
					<h3 class="text-3xl font-bold text-gray-900">PT Koneksi Jaringan Indonesia</h3>
					<p class="text-gray-600">
						Digital Transformation Partner untuk Sekolah-sekolah di Indonesia
					</p>
				</div>
			</div>

			<p class="mb-6 text-lg leading-relaxed text-gray-700">
				Sejak 2020, kami membantu 15+ sekolah (SMP & SMA) bertransformasi digital melalui <strong
					>Sistem Akademik</strong
				>
				dan <strong>Sistem Administrasi Sekolah</strong>. Dari kelola nilai, absensi, jadwal, sampai
				komunikasi orang tua-sekolah — semua terintegrasi dalam satu platform.
			</p>

			<p class="mb-8 text-lg leading-relaxed text-gray-700">
				Namun kami menyadari: <em>digitalisasi administrasi saja tidak cukup</em>. Siswa membutuhkan
				tools yang dapat <strong>benar-benar membantu mereka dalam proses pembelajaran</strong>.
				Dari situ lahirlah We Will Shine.
			</p>

			<div class="grid gap-6 md:grid-cols-3">
				<div class="rounded-xl bg-white p-6 shadow-sm">
					<div class="mb-2 text-3xl">📊</div>
					<h4 class="mb-2 font-bold text-gray-900">Sistem Akademik</h4>
					<p class="text-sm text-gray-600">
						Platform manajemen sekolah lengkap yang sudah dipercaya 15+ institusi
					</p>
				</div>
				<div class="rounded-xl bg-white p-6 shadow-sm">
					<div class="mb-2 text-3xl">🌟</div>
					<h4 class="mb-2 font-bold text-gray-900">We Will Shine</h4>
					<p class="text-sm text-gray-600">
						AI learning assistant yang demokratis & open source (you're here!)
					</p>
				</div>
				<div class="rounded-xl bg-white p-6 shadow-sm">
					<div class="mb-2 text-3xl">🤖</div>
					<h4 class="mb-2 font-bold text-gray-900">2USE AI</h4>
					<p class="text-sm text-gray-600">
						Custom middleware untuk Socratic learning & mental health support
					</p>
				</div>
			</div>

			<div class="mt-8 flex flex-wrap items-center justify-center gap-4">
				<a
					href="https://konxc.space"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-xl border-2 border-indigo-600 px-6 py-2 font-semibold text-indigo-600 transition-all hover:bg-white"
				>
					🌐 konxc.space
				</a>
				<a
					href="https://github.com/konxc"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-xl bg-gray-900 px-6 py-2 font-semibold text-white transition-all hover:bg-gray-800"
				>
					💻 github.com/konxc
				</a>
			</div>
		</div>

		<!-- 2USE AI - Technical Deep Dive -->
		<div class="rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white md:p-12">
			<div class="mb-6 flex items-center gap-4">
				<div class="text-6xl">🧠</div>
				<div>
					<h3 class="text-3xl font-bold">2USE AI: The Brain</h3>
					<p class="text-purple-100">Middleware AI yang tidak memberikan jawaban instan</p>
				</div>
			</div>

			<p class="mb-6 text-lg leading-relaxed text-purple-50">
				Pernah bertanya soal PR ke ChatGPT dan langsung mendapat jawaban lengkap? Praktis memang,
				namun <em>tidak ada proses pembelajaran sejati</em>. <strong>2USE AI</strong> dirancang untuk
				mengubah kebiasaan tersebut.
			</p>

			<div class="mb-8 grid gap-6 md:grid-cols-2">
				<div class="rounded-xl bg-white/10 p-6 backdrop-blur-sm">
					<h4 class="mb-3 flex items-center gap-2 font-bold text-white">
						<span>❌</span> AI Biasa (ChatGPT, etc)
					</h4>
					<ul class="space-y-2 text-sm text-purple-100">
						<li>• "Ini jawabannya: 42"</li>
						<li>• Kepuasan instan</li>
						<li>• Siswa menjadi tergantung</li>
						<li>• Tidak melatih berpikir kritis</li>
					</ul>
				</div>
				<div class="rounded-xl border-2 border-white/30 bg-white/20 p-6 backdrop-blur-sm">
					<h4 class="mb-3 flex items-center gap-2 font-bold text-white">
						<span>✅</span> 2USE AI (We Will Shine)
					</h4>
					<ul class="space-y-2 text-sm text-white">
						<li>• "Coba pikir: kenapa bisa 42?"</li>
						<li>• Socratic method (tanya balik)</li>
						<li>• Membangun critical thinking</li>
						<li>• Siswa paham <em>prosesnya</em></li>
					</ul>
				</div>
			</div>

			<p class="mb-6 text-center text-purple-50 italic">
				"Kasih pancing, bukan ikan. Ajarin berpikir, bukan kasih hafalan."
			</p>

			<div class="text-center">
				<a
					href="https://github.com/ITIF-Syuhada/2USE"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block rounded-xl bg-white px-6 py-3 font-semibold text-purple-600 transition-all hover:bg-purple-50"
				>
					Lihat Source Code 2USE AI →
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Team - More Human -->
<section id="tim" class="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Tim di Balik Layar</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600 italic">
				"Small team, big dreams, open hearts"
			</p>
		</div>

		<div class="mb-12 grid gap-8 md:grid-cols-2">
			<!-- Core Team -->
			<div class="rounded-2xl bg-white p-8 shadow-lg">
				<div class="mb-4 text-5xl">👨‍💻</div>
				<h3 class="mb-3 text-2xl font-bold text-gray-900">Core Team</h3>
				<p class="mb-4 leading-relaxed text-gray-700">
					Tim kecil di PT Koneksi Jaringan Indonesia yang tidak bisa tinggal diam melihat pendidikan
					Indonesia tertinggal di era AI. Developer, designer, educator — semua berkontribusi
					langsung.
				</p>
				<p class="text-sm text-gray-600 italic">
					"Bekerja dengan penuh dedikasi, coding dengan fokus, deploy dengan hati-hati. Yang pasti: <strong
						>komitmen penuh untuk misi ini</strong
					>."
				</p>
			</div>

			<!-- Open Source Contributors -->
			<div
				class="rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-white shadow-lg"
			>
				<div class="mb-4 text-5xl">🌍</div>
				<h3 class="mb-3 text-2xl font-bold">Open Source Community</h3>
				<p class="mb-4 leading-relaxed text-purple-50">
					We Will Shine <strong>100% open source</strong>. Artinya, siapa pun bisa kontribusi: fix
					bugs, add features, improve docs, atau sekadar kasih feedback.
				</p>
				<p class="text-sm text-purple-100 italic">
					Produk terbaik dibangun bersama, bukan sendirian. Every PR matters!
				</p>
			</div>
		</div>

		<!-- Call to Contribute -->
		<div class="rounded-3xl bg-white p-8 text-center shadow-xl md:p-12">
			<div class="mb-6 text-6xl">🤝</div>
			<h3 class="mb-4 text-3xl font-bold text-gray-900">Ingin Bergabung?</h3>
			<p class="mx-auto mb-8 max-w-2xl text-lg text-gray-700">
				Anda tidak perlu menjadi developer expert. Bisa design? Menulis? Testing? Memberikan ide? <strong
					>Semua kontribusi sangat berharga!</strong
				>
			</p>

			<div class="flex flex-wrap items-center justify-center gap-4">
				<a
					href="https://github.com/konxc/we-will-shine/blob/main/CONTRIBUTING.md"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-xl border-2 border-gray-900 px-6 py-3 font-semibold text-gray-900 transition-all hover:bg-gray-50"
				>
					📖 Panduan Kontribusi
				</a>
				<a
					href="https://github.com/konxc/we-will-shine/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition-all hover:bg-green-700"
				>
					🌱 Good First Issues
				</a>
				<a
					href="https://github.com/konxc/we-will-shine"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
				>
					⭐ Star di GitHub
				</a>
			</div>

			<p class="mt-8 text-sm text-gray-500">
				Kontributor akan masuk hall of fame dan berkesempatan mendapat apresiasi khusus
			</p>
		</div>
	</div>
</section>

<!-- Current Status & Next Steps - More Transparent -->
<section id="progress" class="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-4xl font-bold text-gray-900">Kami Lagi di Mana Sekarang?</h2>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Real talk — no BS, no overpromise. Ini progress kami saat ini.
			</p>
		</div>

		<!-- Timeline with honesty -->
		<div class="mb-12 space-y-8">
			<!-- Now -->
			<div
				class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-50 to-amber-50 p-8 md:p-12"
			>
				<!-- Playful dots accent in corner -->
				<div class="absolute -top-4 -right-4 h-24 w-24 opacity-20">
					<div
						class="absolute top-0 right-0 h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-400"
					></div>
					<div
						class="absolute top-8 right-8 h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-400"
					></div>
					<div class="absolute top-12 right-4 h-4 w-4 rounded-full bg-orange-300"></div>
				</div>
				<div class="flex items-start gap-6">
					<div class="text-6xl">⏳</div>
					<div class="flex-1">
						<div class="mb-2 text-sm font-bold text-yellow-600">OKTOBER 2025 — SEKARANG</div>
						<h3 class="mb-3 text-2xl font-bold text-gray-900">
							Kami Sedang Membangun Platform Ini
						</h3>
						<p class="mb-4 text-lg leading-relaxed text-gray-700">
							Saat ini kami tengah mengembangkan platform ini. 2USE AI sudah berjalan, interface
							sedang dipoles, database setup, dan testing berlangsung terus-menerus. Sederhana,
							namun <strong>progress konsisten setiap hari</strong>.
						</p>
						<div class="grid gap-4 md:grid-cols-2">
							<div class="rounded-xl bg-green-50 p-4">
								<div class="mb-2 flex items-center gap-2">
									<span class="text-green-600">✓</span>
									<span class="font-bold text-gray-900">Done</span>
								</div>
								<ul class="space-y-1 text-sm text-gray-600">
									<li>• 2USE AI middleware</li>
									<li>• Core platform architecture</li>
									<li>• Landing & about pages</li>
									<li>• Open source repo setup</li>
								</ul>
							</div>
							<div class="rounded-xl bg-yellow-50 p-4">
								<div class="mb-2 flex items-center gap-2">
									<span class="text-yellow-600">⚡</span>
									<span class="font-bold text-gray-900">In Progress</span>
								</div>
								<ul class="space-y-1 text-sm text-gray-600">
									<li>• Student dashboard & AI chat</li>
									<li>• School admin panel</li>
									<li>• Authentication system</li>
									<li>• Testing with partner schools</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Soon -->
			<div
				class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 md:p-12"
			>
				<!-- Playful dots accent in corner -->
				<div class="absolute -top-4 -right-4 h-24 w-24 opacity-20">
					<div
						class="absolute top-0 right-0 h-16 w-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400"
					></div>
					<div
						class="absolute top-8 right-8 h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"
					></div>
					<div class="absolute top-12 right-4 h-4 w-4 rounded-full bg-pink-300"></div>
				</div>
				<div class="flex items-start gap-6">
					<div class="text-6xl">🚀</div>
					<div class="flex-1">
						<div class="mb-2 text-sm font-bold text-indigo-600">Q4 2025 — SOFT LAUNCH</div>
						<h3 class="mb-3 text-2xl font-bold text-gray-900">Beta Bersama 15+ Sekolah Partner</h3>
						<p class="mb-4 text-lg leading-relaxed text-gray-700">
							Peluncuran pertama kami <strong>tidak langsung skala nasional</strong>. Kami memulai
							dengan sekolah-sekolah yang telah mempercayai Sistem Akademik kami. Target
							<strong>1,000-5,000 siswa</strong> untuk beta testing intensif.
						</p>
						<p class="text-gray-600 italic">
							Mengapa soft launch? Karena kami ingin mendengarkan feedback pengguna sesungguhnya
							sebelum scale up. Lebih baik iterasi cepat dengan pengguna terbatas daripada
							peluncuran besar yang berisiko gagal.
						</p>
					</div>
				</div>
			</div>

			<!-- Next -->
			<div
				class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-12"
			>
				<!-- Playful dots accent in corner -->
				<div class="absolute -top-4 -right-4 h-24 w-24 opacity-20">
					<div
						class="absolute top-0 right-0 h-16 w-16 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"
					></div>
					<div
						class="absolute top-8 right-8 h-8 w-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-400"
					></div>
					<div class="absolute top-12 right-4 h-4 w-4 rounded-full bg-rose-300"></div>
				</div>
				<div class="flex items-start gap-6">
					<div class="text-6xl">🎯</div>
					<div class="flex-1">
						<div class="mb-2 text-sm font-bold text-purple-600">Q1-Q2 2026 — SCALE UP</div>
						<h3 class="mb-3 text-2xl font-bold text-gray-900">Public Launch & Ekspansi</h3>
						<p class="mb-4 text-lg leading-relaxed text-gray-700">
							Jika beta berhasil, kami akan membuka akses <strong>public BYOK</strong> untuk seluruh
							masyarakat Indonesia. Target <strong>10,000+ pengguna</strong>, pengembangan mobile
							app, dan pengajuan proposal ke Kemendikbud untuk integrasi dengan Belajar.id.
						</p>
						<div class="mt-4 rounded-xl bg-purple-100 p-4">
							<p class="text-sm text-purple-900">
								<strong>Visi besar kami:</strong> Menjadi platform AI learning assistant resmi untuk
								seluruh pelajar Indonesia yang memiliki akun Belajar.id 🇮🇩
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Long-term vision CTA -->
		<div
			class="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center text-white shadow-xl md:p-12"
		>
			<div class="mb-4 text-5xl">🌅</div>
			<h3 class="mb-4 text-3xl font-bold">Visi 2045: Generasi Emas</h3>
			<p class="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-indigo-100">
				Ini baru tahap awal. Kami memiliki <strong>roadmap 20 tahun</strong> untuk membangun ekosistem
				AI education yang demokratis, berkelanjutan, dan benar-benar berpihak pada seluruh rakyat Indonesia.
			</p>
			<a
				href="{base}/roadmap"
				class="inline-block rounded-xl bg-white px-8 py-4 text-lg font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
			>
				Lihat Roadmap Lengkap 2025-2045 →
			</a>
		</div>
	</div>
</section>

<!-- Open Source Commitment -->
<section
	id="opensource"
	class="bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 py-20 text-white"
>
	<div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<div class="mb-4 text-6xl">🔓</div>
			<h2 class="mb-4 text-4xl font-bold">Open Source Commitment</h2>
			<p class="mx-auto max-w-2xl text-xl text-indigo-200">
				Transparansi bukan hanya janji - ini adalah kenyataan yang bisa Anda verifikasi
			</p>
		</div>

		<div class="grid gap-8 md:grid-cols-3">
			<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
				<div class="mb-3 text-4xl">📂</div>
				<h3 class="mb-2 text-xl font-bold">Open Source Code</h3>
				<p class="mb-4 text-indigo-100">
					Seluruh kode aplikasi public di GitHub. Audit kapan saja, contribute jika mau.
				</p>
				<a
					href="https://github.com/konxc/we-will-shine"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block font-semibold text-white hover:underline"
				>
					github.com/konxc/we-will-shine →
				</a>
			</div>

			<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
				<div class="mb-3 text-4xl">📊</div>
				<h3 class="mb-2 text-xl font-bold">Public Financial Reports</h3>
				<p class="mb-4 text-indigo-100">
					Laporan keuangan bulanan dipublish di GitHub untuk akuntabilitas penuh.
				</p>
				<a
					href="https://github.com/konxc/we-will-shine/tree/main/reports"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block font-semibold text-white hover:underline"
				>
					View Reports →
				</a>
			</div>

			<div class="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
				<div class="mb-3 text-4xl">🗳️</div>
				<h3 class="mb-2 text-xl font-bold">Community Governance</h3>
				<p class="mb-4 text-indigo-100">
					Kontributor voting untuk roadmap, fitur prioritas, dan alokasi dana.
				</p>
				<a
					href="https://github.com/konxc/we-will-shine/discussions"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-block font-semibold text-white hover:underline"
				>
					Join Discussions →
				</a>
			</div>
		</div>

		<div class="mt-12 text-center">
			<p class="mb-6 text-lg text-indigo-100">
				Found a bug? Have a feature request? Want to contribute?
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<a
					href="https://github.com/konxc/we-will-shine/issues"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-white-outline"
				>
					Report Issue
				</a>
				<a
					href="https://github.com/konxc/we-will-shine/pulls"
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-xl bg-white px-6 py-2 font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
				>
					Submit Pull Request
				</a>
			</div>
		</div>
	</div>
</section>

<!-- CTA -->
<section class="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-4 text-4xl font-bold text-white">Bergabunglah dengan Gerakan Ini</h2>
		<p class="mb-8 text-xl text-indigo-100">
			Baik sebagai user, kontributor, atau partner - setiap peran berharga untuk misi kami
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<a
				href="{base}/signin"
				class="rounded-xl bg-white px-8 py-3 font-semibold text-indigo-600 transition-all hover:bg-indigo-50"
			>
				Start Learning
			</a>
			<a href="{base}/pricing" class="btn-white-outline"> View Pricing </a>
			<a href="{base}/partnership" class="btn-white-outline"> Partnership </a>
		</div>
	</div>
</section>

<style lang="postcss">
	@reference "tailwindcss";
</style>
