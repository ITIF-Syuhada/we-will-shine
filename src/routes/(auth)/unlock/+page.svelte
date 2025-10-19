<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { userProgress } from '$lib/stores/user';
	import { setStudentCode } from '$lib/stores/session';
	import { getStudentByCode } from '$lib/data/students';
	import { db } from '$lib/supabase';
	import { motivationalQuotes } from '$lib/data/motivations';
	import { getDeviceInfo } from '$lib/utils/deviceDetect';
	import { browser } from '$app/environment';

	let code = $state('');
	let error = $state('');
	let isLoading = $state(false);
	let showWelcome = $state(false);
	let welcomeMessage = $state('');

	async function handleSubmit() {
		if (code.trim().length === 0) {
			error = 'Masukkan kode dari coklat kamu ya! 🍫';
			return;
		}

		isLoading = true;
		error = '';

		// Simulate loading for better UX
		setTimeout(async () => {
			try {
				// Try to get student from Supabase first
				const dbStudent = await db.getStudent(code);

				if (dbStudent) {
					// Convert to local student format
					const student = {
						id: dbStudent.id,
						code: dbStudent.student_code,
						name: dbStudent.student_name
					};

					// Login successful
					await userProgress.login(student);
					userProgress.addPoints(50); // Welcome points
					userProgress.unlockAchievement('first-login');

					// Save student code to session
					setStudentCode(student.code);

					// Create session in database for tracking
					if (browser) {
						try {
							const deviceInfo = getDeviceInfo();
							const session = await db.createStudentSession(dbStudent.id, deviceInfo);

							// Store session ID in localStorage for activity tracking
							localStorage.setItem('student_session_id', session.id);

							// Log login activity
							await db.logStudentActivity(
								dbStudent.id,
								session.id,
								'login',
								{ welcome_points: 50 },
								window.location.href
							);
						} catch (err) {
							console.error('Failed to create session:', err);
						}
					}

					// Show welcome message
					welcomeMessage =
						motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
					showWelcome = true;

					// Redirect to app after 3 seconds
					setTimeout(() => {
						goto(`${base}/app`);
					}, 3000);
				} else {
					// Fallback to local data (for backwards compatibility)
					const localStudent = getStudentByCode(code);

					if (localStudent) {
						await userProgress.login(localStudent);
						userProgress.addPoints(50);
						userProgress.unlockAchievement('first-login');

						// Save student code to session
						setStudentCode(localStudent.code);

						welcomeMessage =
							motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
						showWelcome = true;
						setTimeout(() => {
							goto(`${base}/app`);
						}, 3000);
					} else {
						error = 'Kode tidak valid. Cek kembali kode di coklat hadiah kamu ya! 🍫';
						isLoading = false;
					}
				}
			} catch (err) {
				console.error('Unlock error:', err);
				error = 'Terjadi kesalahan. Silakan coba lagi.';
				isLoading = false;
			}
		}, 800);
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}
</script>

<svelte:head>
	<title>Unlock - We Will Shine</title>
</svelte:head>

{#if showWelcome}
	<!-- Welcome Screen -->
	<div
		class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-teal-400 p-4"
	>
		<div class="animate-fade-in w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-2xl">
			<div class="mb-4 animate-bounce text-6xl">✨</div>
			<h2 class="mb-4 text-3xl font-bold text-gray-800">Assalamualaikum! 🌟</h2>
			<p class="mb-6 text-xl text-gray-600">{welcomeMessage}</p>
			<div class="mb-4 rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 p-6">
				<p class="text-gray-700 italic">
					Kamu adalah bagian dari generasi yang akan membawa perubahan. Masa depan teknologi ada di
					tanganmu. Mulai dari sekarang, setiap langkah kecil yang kamu ambil akan membawamu lebih
					dekat ke mimpi besarmu!
				</p>
			</div>
			<div class="flex items-center justify-center space-x-2 text-sm text-purple-500">
				<div class="h-2 w-2 animate-pulse rounded-full bg-purple-400"></div>
				<div
					class="h-2 w-2 animate-pulse rounded-full bg-pink-400"
					style="animation-delay: 0.2s"
				></div>
				<div
					class="h-2 w-2 animate-pulse rounded-full bg-blue-400"
					style="animation-delay: 0.4s"
				></div>
				<span class="ml-2 font-medium">Loading aplikasi...</span>
			</div>
		</div>
	</div>
{:else}
	<!-- Unlock Form -->
	<div
		class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-teal-400 p-4"
	>
		<div class="w-full max-w-md">
			<!-- Back Button -->
			<a
				href="{base}/"
				class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm transition-all hover:bg-white/30"
			>
				← Kembali ke Home
			</a>

			<!-- Main Card -->
			<div class="rounded-3xl bg-white p-8 shadow-2xl">
				<div class="mb-6 text-center">
					<div
						class="mb-4 inline-block rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-4"
					>
						<span class="text-5xl">🎁</span>
					</div>
					<h1
						class="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent"
					>
						Unlock Hadiah
					</h1>
					<p class="text-gray-600">Masukkan kode dari coklat spesial kamu</p>
				</div>

				<form
					onsubmit={(e) => {
						e.preventDefault();
						handleSubmit();
					}}
					class="space-y-4"
				>
					<div>
						<label for="code" class="mb-2 block text-sm font-medium text-gray-700">
							Kode Rahasia 🔑
						</label>
						<input
							id="code"
							type="text"
							bind:value={code}
							onkeypress={handleKeyPress}
							placeholder="INSPIRE2025XXX"
							disabled={isLoading}
							class="w-full rounded-xl border-2 border-purple-200 bg-white px-4 py-3 text-center text-lg font-semibold tracking-wider uppercase transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none disabled:bg-gray-100"
							maxlength="20"
						/>
					</div>

					{#if error}
						<div
							class="animate-shake rounded-xl border-2 border-red-200 bg-red-50 p-3 text-sm text-red-600"
						>
							{error}
						</div>
					{/if}

					<button
						type="submit"
						disabled={isLoading}
						class="w-full transform rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-purple-600 hover:to-pink-600 active:scale-95 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{#if isLoading}
							<span class="flex items-center justify-center gap-2">
								<span
									class="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
								></span>
								Memverifikasi...
							</span>
						{:else}
							✨ Buka Hadiah!
						{/if}
					</button>
				</form>

				<div class="mt-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 p-4">
					<p class="text-center text-xs font-semibold text-purple-900">💡 Tips:</p>
					<p class="text-center text-xs text-gray-600">
						Kode terdapat pada sticker di coklat hadiah. Format: INSPIRE2025XXX
					</p>
				</div>
			</div>

			<!-- Footer -->
			<div class="mt-4 text-center">
				<p class="text-sm text-white drop-shadow">Dengan ❤️ dari Ustadz & Ustadzah</p>
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		75% {
			transform: translateX(5px);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.5s ease-out;
	}

	.animate-shake {
		animation: shake 0.5s ease-in-out;
	}
</style>
