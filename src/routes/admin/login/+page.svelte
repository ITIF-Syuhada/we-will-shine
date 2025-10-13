<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { db } from '$lib/supabase';
	import { adminStore } from '$lib/stores/admin';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	async function handleLogin() {
		if (!email || !password) {
			error = 'Email dan password harus diisi!';
			return;
		}

		loading = true;
		error = '';

		try {
			// Login via Supabase
			const admin = await db.adminLogin(email, password);

			if (admin) {
				// Save to admin store
				adminStore.login(admin);

				// Redirect to admin dashboard
				goto(`${base}/admin`);
			} else {
				error = 'Email atau password salah!';
			}
		} catch (err) {
			console.error('Login error:', err);
			error = 'Terjadi kesalahan saat login. Silakan coba lagi.';
		} finally {
			loading = false;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleLogin();
		}
	}
</script>

<svelte:head>
	<title>Admin Login - We Will Shine</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 p-4"
>
	<!-- Login Card -->
	<div class="w-full max-w-md">
		<!-- Logo & Title -->
		<div class="mb-8 text-center">
			<div class="mb-4 flex justify-center">
				<div
					class="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-4xl shadow-lg"
				>
					🌟
				</div>
			</div>
			<h1 class="text-3xl font-bold text-purple-800">Admin Portal</h1>
			<p class="mt-2 text-sm text-gray-600">We Will Shine - Management System</p>
		</div>

		<!-- Login Form -->
		<div class="rounded-2xl border-2 border-purple-200 bg-white p-8 shadow-xl">
			<h2 class="mb-6 text-xl font-bold text-gray-800">Login Admin</h2>

			{#if error}
				<div
					class="mb-4 rounded-lg border-2 border-red-200 bg-red-50 p-3 text-center text-sm text-red-600"
				>
					⚠️ {error}
				</div>
			{/if}

			<div class="space-y-4">
				<!-- Email Input -->
				<div>
					<label for="email" class="mb-2 block text-sm font-semibold text-gray-700"> Email </label>
					<input
						id="email"
						type="email"
						bind:value={email}
						onkeypress={handleKeyPress}
						placeholder="admin@wewillshine.id"
						class="w-full rounded-lg border-2 border-purple-200 px-4 py-3 text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
						disabled={loading}
					/>
				</div>

				<!-- Password Input -->
				<div>
					<label for="password" class="mb-2 block text-sm font-semibold text-gray-700">
						Password
					</label>
					<input
						id="password"
						type="password"
						bind:value={password}
						onkeypress={handleKeyPress}
						placeholder="••••••••"
						class="w-full rounded-lg border-2 border-purple-200 px-4 py-3 text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
						disabled={loading}
					/>
				</div>

				<!-- Login Button -->
				<button
					onclick={handleLogin}
					disabled={loading || !email || !password}
					class="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{loading ? '🔄 Loading...' : '🔐 Login'}
				</button>
			</div>

			<!-- Footer -->
			<div class="mt-6 text-center">
				<a href="{base}/" class="text-sm text-purple-600 transition-colors hover:text-purple-800">
					← Kembali ke Home
				</a>
			</div>
		</div>

		<!-- Security Note -->
		<div class="mt-4 text-center">
			<p class="text-xs text-gray-500">🔒 Secure admin portal - Only authorized personnel</p>
		</div>
	</div>
</div>
