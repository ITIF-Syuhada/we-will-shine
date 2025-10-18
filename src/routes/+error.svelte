<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	const errorCode = $derived($page.status);
	const errorMessage = $derived($page.error?.message || 'Halaman tidak ditemukan');

	// Fun error messages based on code
	const messages: Record<number, { emoji: string; title: string; description: string }> = {
		404: {
			emoji: '🗺️',
			title: 'Oops! Halaman Tersesat',
			description:
				'Sepertinya kamu nyasar ke tempat yang belum ada peta nya. Yuk, kita kembali ke jalan yang benar!'
		},
		500: {
			emoji: '🔧',
			title: 'Ada yang Error Nih!',
			description:
				'Server sedang mengalami masalah. Tim kami sudah berusaha memperbaikinya. Coba lagi sebentar ya!'
		},
		403: {
			emoji: '🚫',
			title: 'Akses Ditolak',
			description: 'Hmm, sepertinya kamu tidak punya akses ke halaman ini. Login dulu yuk!'
		}
	};

	const currentMessage = $derived(
		messages[errorCode] || {
			emoji: '⚠️',
			title: 'Terjadi Kesalahan',
			description: 'Ada yang tidak beres nih. Coba refresh atau kembali ke home.'
		}
	);

	// Navigation suggestions based on URL
	const suggestions = $derived(() => {
		const path = $page.url.pathname;

		if (path.includes('/dashboard') || path.includes('/admin')) {
			return [
				{ label: '🏠 Dashboard Admin', href: `${base}/dashboard` },
				{ label: '🔐 Login Admin', href: `${base}/login` },
				{ label: '🏠 Home', href: `${base}/` }
			];
		} else if (path.includes('/app')) {
			return [
				{ label: '🏠 Portal Siswa', href: `${base}/app` },
				{ label: '🔓 Unlock', href: `${base}/unlock` },
				{ label: '🏠 Home', href: `${base}/` }
			];
		}

		return [
			{ label: '🏠 Home', href: `${base}/` },
			{ label: '🔓 Unlock (Siswa)', href: `${base}/unlock` },
			{ label: '🔐 Login (Admin)', href: `${base}/login` }
		];
	});
</script>

<svelte:head>
	<title>{errorCode} - {currentMessage.title}</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 p-4"
>
	<div class="w-full max-w-2xl">
		<!-- Main Error Card -->
		<div class="rounded-3xl bg-white p-8 shadow-2xl sm:p-12">
			<!-- Error Icon -->
			<div class="mb-6 text-center">
				<div class="mb-4 inline-block animate-bounce">
					<span class="text-8xl">{currentMessage.emoji}</span>
				</div>
				<h1 class="mb-2 text-6xl font-bold text-gray-800">{errorCode}</h1>
				<h2 class="mb-4 text-2xl font-bold text-purple-600">{currentMessage.title}</h2>
				<p class="text-gray-600">{currentMessage.description}</p>
			</div>

			<!-- Error Details (for developers) -->
			{#if errorMessage && errorMessage !== 'Halaman tidak ditemukan'}
				<div class="mb-6 rounded-xl border-2 border-orange-200 bg-orange-50 p-4">
					<p class="text-sm font-semibold text-orange-800">🔍 Detail Error:</p>
					<p class="mt-1 text-xs text-orange-700">{errorMessage}</p>
				</div>
			{/if}

			<!-- Navigation Suggestions -->
			<div class="mb-6">
				<div class="grid gap-3 sm:grid-cols-3">
					{#each suggestions() as suggestion (suggestion.href)}
						<a
							href={suggestion.href}
							class="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-3 text-center font-semibold text-purple-700 transition-all hover:scale-105 hover:border-purple-300 hover:shadow-lg active:scale-95"
						>
							{suggestion.label}
						</a>
					{/each}
				</div>
			</div>

			<!-- Fun Quote -->
			<div class="rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 p-6 text-center">
				<p class="mb-2 text-sm font-semibold text-purple-900">💪 Ingat:</p>
				<p class="text-sm text-gray-700 italic">
					"Kesalahan adalah bukti bahwa kamu sedang mencoba. Terus maju, jangan menyerah!"
				</p>
			</div>

			<!-- Back Button -->
			<div class="mt-6 text-center">
				<button
					onclick={() => window.history.back()}
					class="rounded-xl border-2 border-purple-300 bg-white px-6 py-3 font-semibold text-purple-700 transition-all hover:bg-purple-50 active:scale-95"
				>
					← Kembali ke Halaman Sebelumnya
				</button>
			</div>
		</div>

		<!-- Footer -->
		<div class="mt-6 text-center">
			<p class="text-sm text-white drop-shadow">We Will Shine - Inspiring Tomorrow's Leaders 🌟</p>
		</div>
	</div>
</div>

<style>
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-20px);
		}
	}

	.animate-bounce {
		animation: bounce 2s ease-in-out infinite;
	}
</style>
