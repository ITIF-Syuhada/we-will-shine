<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';

	let adminPassword = $state('');
	let error = $state('');

	// Simple admin password (untuk development, nanti bisa pakai Supabase Auth)
	const ADMIN_PASSWORD = 'WeWillShine2025!';

	// Check if already authenticated
	if (browser) {
		const authStatus = localStorage.getItem('admin-auth');
		if (authStatus === 'true') {
			goto(`${base}/admin/dashboard`);
		}
	}

	function handleLogin() {
		if (adminPassword === ADMIN_PASSWORD) {
			if (browser) {
				localStorage.setItem('admin-auth', 'true');
			}
			error = '';
			goto(`${base}/admin/dashboard`);
		} else {
			error = 'Password salah! Coba lagi.';
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

<div class="flex min-h-screen items-center justify-center p-4">
	<div class="w-full max-w-md">
		<div class="mb-6 text-center">
			<div
				class="mx-auto mb-4 inline-block rounded-full bg-gradient-to-br from-purple-200 to-pink-200 p-6 shadow-lg"
			>
				<span class="text-5xl">🔐</span>
			</div>
			<h1
				class="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent"
			>
				Admin Panel
			</h1>
			<p class="text-gray-600">We Will Shine - Career Quest</p>
		</div>

		<div class="rounded-3xl border border-purple-100 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
			<h2 class="mb-6 text-xl font-bold text-gray-800">Login Admin</h2>

			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
				class="space-y-4"
			>
				<div>
					<label for="password" class="mb-2 block text-sm font-medium text-gray-700">
						Password Admin
					</label>
					<input
						id="password"
						type="password"
						bind:value={adminPassword}
						onkeypress={handleKeyPress}
						placeholder="Masukkan password..."
						class="w-full rounded-xl border-2 border-purple-200 px-4 py-3 transition-all focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
					/>
				</div>

				{#if error}
					<div class="rounded-xl border-2 border-red-200 bg-red-50 p-3 text-sm text-red-600">
						{error}
					</div>
				{/if}

				<button
					type="submit"
					class="w-full rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
				>
					🔓 Login
				</button>
			</form>

			<div class="mt-6 rounded-xl bg-purple-50 p-4">
				<p class="text-center text-xs text-gray-600">⚠️ Area khusus untuk Ustadz & Ustadzah</p>
			</div>
		</div>

		<div class="mt-4 text-center">
			<a href="{base}/" class="text-sm text-purple-500 hover:underline">
				← Kembali ke Aplikasi Utama
			</a>
		</div>
	</div>
</div>
