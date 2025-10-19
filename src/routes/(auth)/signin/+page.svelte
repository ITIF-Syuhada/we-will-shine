<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { db } from '$lib/supabase';
	import { adminStore } from '$lib/stores/admin';
	import { userProgress } from '$lib/stores/user';
	import { setStudentCode, getStudentCode } from '$lib/stores/session';
	import HelpChatBox from '$lib/components/HelpChatBox.svelte';
	import type { HelpSection } from '$lib/components/HelpChatBox.svelte';
	import { onMount } from 'svelte';

	// Authentication state
	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');
	let success = $state('');
	
	// Active tab: 'email' or 'code'
	let activeTab = $state<'email' | 'code'>('email');

	// Google Sign-In state
	let googleLoading = $state(false);

	// Help modal state
	let showHelpModal = $state(false);

	// Check existing sessions on mount
	onMount(() => {
		// Check if user already has active session
		const adminSession = $adminStore;
		const studentSession = getStudentCode();
		
		if (adminSession) {
			// Admin/Teacher already logged in → redirect to dashboard
			goto(`${base}/dashboard`);
		} else if (studentSession && $userProgress) {
			// Student already logged in → redirect to app
			goto(`${base}/app`);
		}
		// If no session, stay on signin page
	});

	// Help sections configuration
	const helpSections: HelpSection[] = [
		{
			title: 'Email Belajar.id (Kemendikbud)',
			icon: '📧',
			color: 'indigo',
			content: [
				{ label: '🎓 Siswa:', value: 'ahmad@belajar.id' },
				{ label: '👨‍🏫 Guru/Staff:', value: 'budi@guru.belajar.id' }
			]
		},
		{
			title: 'Login Cepat',
			icon: '🚀',
			color: 'green',
			content: 'Gunakan Google Sign-In dengan akun Belajar.id untuk login otomatis tanpa password!'
		},
		{
			title: 'Punya Kode Unlock?',
			icon: '🔑',
			color: 'orange',
			content: 'Siswa dari sekolah partner dapat login langsung dengan kode unlock. Klik tab "Kode" di atas.'
		}
	];

	// Inspirational quotes from Indonesian founding fathers & education leaders
	const inspirationalQuotes = [
		{
			quote: "Berikan aku 10 pemuda, niscaya akan kuguncangkan dunia.",
			author: "Soekarno",
			title: "Proklamator & Presiden RI Pertama"
		},
		{
			quote: "Lawan sastra ngesti mulya - Dengan ilmu pengetahuan kita mencapai kemuliaan.",
			author: "Ki Hajar Dewantara",
			title: "Bapak Pendidikan Indonesia"
		},
		{
			quote: "Pendidikan merupakan senjata paling ampuh yang bisa kamu gunakan untuk merubah dunia.",
			author: "Mohammad Hatta",
			title: "Proklamator & Wakil Presiden RI Pertama"
		},
		{
			quote: "Tut Wuri Handayani - Dari belakang seorang guru harus bisa memberikan dorongan dan arahan.",
			author: "Ki Hajar Dewantara",
			title: "Bapak Pendidikan Indonesia"
		},
		{
			quote: "Pendidikan adalah investasi paling berharga untuk masa depan bangsa.",
			author: "B.J. Habibie",
			title: "Presiden RI ke-3, Bapak Teknologi Indonesia"
		}
	];

	// Random quote selection
	let currentQuote = $state(inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)]);

	// Handle Email/Password Login
	async function handleEmailLogin() {
		if (!email || !password) {
			error = 'Email dan password harus diisi!';
			return;
		}

		loading = true;
		error = '';
		success = '';

		try {
			// Try admin login first
			const admin = await db.adminLogin(email, password);

			if (admin) {
				adminStore.login(admin);
				
				// Detect role from email domain or database field
				const role = detectUserRole(admin.email, admin);
				
				success = `Login berhasil! Mengarahkan...`;
				
				setTimeout(() => {
					// Redirect based on role - will implement 2FA/PIN later
					if (role === 'admin' || role === 'school_staff' || role === 'teacher') {
						// Admin, school staff, and teachers go to dashboard
						goto(`${base}/dashboard`);
					} else {
						// Students and public users go to app
						goto(`${base}/app`);
					}
				}, 1500);
			} else {
				error = 'Email atau password salah!';
				loading = false;
			}
		} catch (err) {
			console.error('Login error:', err);
			error = 'Terjadi kesalahan saat login. Silakan coba lagi.';
			loading = false;
		}
	}

	// Handle Google Sign-In (Belajar.id)
	async function handleGoogleSignIn() {
		googleLoading = true;
		error = '';

		try {
			// TODO: Implement Google OAuth
			// For now, show placeholder
			error = 'Google Sign-In akan segera hadir! 🚀';
			googleLoading = false;
			
			// Future implementation:
			// 1. Initiate Google OAuth flow
			// 2. Get user info from Google
			// 3. Check if belajar.id domain
			// 4. Auto-detect role (student/teacher/admin)
			// 5. Create/login user in database
			// 6. Redirect to appropriate dashboard
		} catch (err) {
			console.error('Google Sign-In error:', err);
			error = 'Gagal login dengan Google. Coba lagi.';
			googleLoading = false;
		}
	}

	// Redirect to unlock page for code-based login
	function handleCodeRedirect() {
		goto(`${base}/unlock`);
	}

	/**
	 * Detect user role from email domain pattern or database field
	 * 
	 * Email Patterns (Belajar.id - Kemendikbud Official):
	 * - Admin WWS:       admin@konxc.space, admin@wewillshine.id
	 * - Teacher/Staff:   username@guru.belajar.id (FLAT, no school subdomain)
	 * - Student:         username@belajar.id (FLAT, no subdomain)
	 * - Public:          username@gmail.com, username@yahoo.com (fallback)
	 * 
	 * IMPORTANT: 
	 * - Belajar.id emails are FLAT (no school-specific subdomains)
	 * - Guru/Staff distinguished by @guru. subdomain ONLY
	 * - Students use direct @belajar.id without @guru.
	 * - School affiliation stored in database, NOT in email
	 * 
	 * Note: Belajar.id adalah sistem email nasional dari Kemendikbud
	 */
	function detectUserRole(email: string, userData: any): 'admin' | 'school_staff' | 'teacher' | 'student' | 'public' {
		const emailLower = email.toLowerCase();
		
		// 1. Admin We Will Shine
		if (emailLower.includes('@konxc.space') || emailLower.includes('@wewillshine')) {
			return 'admin';
		}
		
		// 2. Teacher/School Staff via Belajar.id
		// Pattern: username@guru.belajar.id (FLAT, no school subdomain)
		if (emailLower.endsWith('@guru.belajar.id')) {
			return 'teacher';
		}
		
		// 3. Student via Belajar.id (FLAT, general domain)
		// Pattern: username@belajar.id (no @guru. subdomain)
		if (emailLower.endsWith('@belajar.id') && !emailLower.endsWith('@guru.belajar.id')) {
			return 'student';
		}
		
		// 4. Check database role field as fallback
		if (userData.role) {
			if (userData.role === 'admin') return 'admin';
			if (userData.role === 'teacher' || userData.role === 'counselor' || userData.role === 'school_staff') return 'teacher';
			if (userData.role === 'student') return 'student';
		}
		
		// 5. Public/individual user (default)
		return 'public';
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter' && activeTab === 'email') {
			handleEmailLogin();
		}
	}
</script>

<svelte:head>
	<title>Sign In - We Will Shine</title>
	<meta name="description" content="Login ke We Will Shine - AI Learning Assistant untuk produktivitas belajar optimal" />
</svelte:head>

<div class="flex min-h-screen">
	<!-- Left Side: Sign In Form (Dynamic) -->
	<div class="flex w-full flex-col bg-white p-6 lg:w-[min(400px,35vw)] lg:p-8">
		<div class="w-full max-w-md mx-auto">
			<!-- Tabs (Top Position) -->
			<div class="mb-4 flex gap-2 rounded-lg bg-gray-100 p-1">
				<button
					onclick={() => activeTab = 'email'}
					class="flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-all {activeTab === 'email' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
				>
					📧 Email
				</button>
				<button
					onclick={() => activeTab = 'code'}
					class="flex-1 rounded-md px-4 py-2 text-sm font-semibold transition-all {activeTab === 'code' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
				>
					🔑 Kode
				</button>
			</div>

			<!-- Sign In Form Card -->
			<div class="min-h-[320px] flex flex-col justify-center rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-xl">

			<!-- Success Message -->
			{#if success}
				<div class="mb-4 rounded-lg border-2 border-green-200 bg-green-50 p-3 text-center text-sm text-green-600">
					✅ {success}
				</div>
			{/if}

			<!-- Error Message -->
			{#if error}
				<div class="mb-4 rounded-lg border-2 border-red-200 bg-red-50 p-3 text-center text-sm text-red-600">
					⚠️ {error}
				</div>
			{/if}

			<!-- Email Login Tab -->
			{#if activeTab === 'email'}
				<div class="space-y-3">
					<!-- Google Sign-In Button -->
					<button
						onclick={handleGoogleSignIn}
						disabled={googleLoading}
						class="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if googleLoading}
							<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						{:else}
							<svg class="h-5 w-5" viewBox="0 0 24 24">
								<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
								<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
								<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
								<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
							</svg>
						{/if}
						<span>Sign in with Google</span>
					</button>

					<!-- Divider -->
					<div class="flex items-center gap-2">
						<div class="h-px flex-1 bg-gray-300"></div>
						<span class="text-xs text-gray-500">atau</span>
						<div class="h-px flex-1 bg-gray-300"></div>
					</div>

				<!-- Email Input -->
				<div>
					<div class="mb-2 flex items-center justify-between">
						<label for="email" class="text-sm font-semibold text-gray-700">
							Email atau Username
					</label>
						<button
							onclick={() => showHelpModal = true}
							class="flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-600 transition-colors hover:bg-indigo-200"
							type="button"
						>
							<span>?</span>
							<span class="font-semibold">Bantuan</span>
						</button>
					</div>
					<input
						id="email"
						type="text"
						bind:value={email}
						onkeypress={handleKeyPress}
						placeholder="nama@belajar.id"
						class="w-full rounded-lg border-2 border-purple-200 px-3 py-2 text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
						disabled={loading}
						autocomplete="username"
					/>
				</div>

					<!-- Password Input -->
					<div>
						<div class="mb-2 flex items-center justify-between">
							<label for="password" class="text-sm font-semibold text-gray-700">
							Password
						</label>
							<button class="text-xs text-purple-600 hover:underline">
								Lupa password?
							</button>
						</div>
						<input
							id="password"
							type="password"
							bind:value={password}
							onkeypress={handleKeyPress}
							placeholder="••••••••"
							class="w-full rounded-lg border-2 border-purple-200 px-3 py-2 text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
							disabled={loading}
							autocomplete="current-password"
						/>
					</div>

					<!-- Sign In Button -->
				<button
						onclick={handleEmailLogin}
						disabled={loading || !email || !password}
						class="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-2.5 font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if loading}
						<span class="flex items-center justify-center gap-2">
							<svg class="h-5 w-5 animate-spin" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
								<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
							<span>Memproses...</span>
						</span>
					{:else}
							🔐 Sign In
					{/if}
				</button>
			</div>
					{/if}

			<!-- Code Login Tab -->
			{#if activeTab === 'code'}
				<div class="space-y-3">
					<div class="rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 p-5 text-center">
						<div class="mb-3 text-4xl">🍫</div>
						<h3 class="mb-2 text-base font-bold text-gray-900">Login dengan Kode</h3>
						<p class="mb-3 text-xs text-gray-600">
							Punya kode unlock dari sekolah?
						</p>
						<button
							onclick={handleCodeRedirect}
							class="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-2.5 font-semibold text-white shadow-md transition-all hover:shadow-lg active:scale-95"
						>
							🔑 Lanjut ke Unlock
						</button>
					</div>
				</div>
			{/if}
			</div>

		</div>
	</div>

	<!-- Back to Home - Bottom Left -->
	<div class="absolute bottom-6 left-6 lg:bottom-8 lg:left-8">
		<a href="{base}/" class="text-xs text-purple-600 transition-colors hover:text-purple-800">
			← Kembali ke Home
		</a>
	</div>

	<!-- Right Side: Inspirational Quote & Background (Dynamic) -->
	<div class="relative hidden lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-center lg:overflow-hidden lg:bg-gradient-to-br lg:from-red-500 lg:via-orange-400 lg:to-yellow-400 lg:p-8 lg:text-white">
		<!-- Background Pattern -->
		<div class="absolute inset-0 opacity-10">
			<div class="h-full w-full" style="background-image: radial-gradient(circle at 30px 30px, rgba(255, 255, 255, 0.3) 2px, transparent 2px); background-size: 60px 60px;"></div>
		</div>

		<!-- Logo & Brand - Top Right Corner -->
		<div class="absolute right-8 top-8 z-20 text-right">
			<a href="{base}/" class="inline-block transition-transform hover:scale-105">
				<div class="mb-2 flex items-center justify-end gap-2">
					<div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl shadow-lg backdrop-blur-sm">
						🌟
					</div>
				</div>
               <div class="text-white">
                   <p class="text-sm font-bold">We Will Shine</p>
                   <p class="text-xs opacity-90">AI Learning Assistant</p>
               </div>
			</a>
		</div>

		<!-- Content -->
		<div class="relative z-10 max-w-xl">
			<!-- Indonesian Flag Colors Accent -->
			<div class="mb-6 flex justify-center gap-2">
				<div class="h-2 w-12 rounded-full bg-red-600 shadow-lg"></div>
				<div class="h-2 w-12 rounded-full bg-white shadow-lg"></div>
			</div>

			<!-- Quote Card -->
			<div class="rounded-3xl bg-white/10 p-6 backdrop-blur-md shadow-2xl">
				<!-- Quote Icon -->
				<div class="mb-4 text-5xl">📜</div>

				<!-- Quote Text -->
				<blockquote class="mb-4 text-xl font-bold leading-relaxed">
					"{currentQuote.quote}"
				</blockquote>

				<!-- Author -->
				<div class="border-t-2 border-white/30 pt-3">
					<p class="text-lg font-semibold">{currentQuote.author}</p>
					<p class="mt-1 text-xs opacity-90">{currentQuote.title}</p>
				</div>
			</div>

		</div>

		<!-- Indonesia Pride - Bottom Right -->
		<div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white">
			<div class="mb-2 text-3xl">🇮🇩</div>
			<p class="text-base font-semibold">
				Membangun Generasi Emas 2045
			</p>
			<p class="mt-1 text-xs opacity-90">
				AI Learning Assistant buatan anak bangsa untuk produktivitas belajar optimal
			</p>
		</div>
	</div>
</div>

<HelpChatBox
	title="Panduan Login"
	headerIcon="💡"
	sections={helpSections}
	bind:isOpen={showHelpModal}
	onClose={() => showHelpModal = false}
/>
