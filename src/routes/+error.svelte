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
</script>

<svelte:head>
	<title>{errorCode} - {currentMessage.title}</title>
</svelte:head>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-orange-400 p-4"
>
	<div class="w-full max-w-2xl">
		<!-- Main Error Card -->
		<div class="rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
			<!-- Error Icon -->
			<div class="mb-4 text-center">
				<div class="mb-4 inline-block animate-bounce">
					<span class="text-8xl">{currentMessage.emoji}</span>
				</div>
				<h1 class="mb-2 text-6xl font-bold text-gray-800">{errorCode}</h1>
				<h2 class="mb-4 text-2xl font-bold text-purple-600">{currentMessage.title}</h2>
				<p class="text-gray-600">{currentMessage.description}</p>
			</div>

			<!-- Error Details (for developers) -->
			{#if errorMessage && errorMessage !== 'Halaman tidak ditemukan'}
				<div class="mb-4 rounded-xl border-2 border-orange-200 bg-orange-50 p-3">
					<p class="text-sm font-semibold text-orange-800">🔍 Detail Error:</p>
					<p class="mt-1 text-xs text-orange-700">{errorMessage}</p>
				</div>
			{/if}

			<!-- Fun Quote -->
			<div class="rounded-2xl bg-gradient-to-r from-purple-100 to-pink-100 p-4 text-center">
				<p class="mb-1 text-sm font-semibold text-purple-900">💪 Ingat:</p>
				<p class="text-sm text-gray-700 italic">
					"Kesalahan adalah bukti bahwa kamu sedang mencoba. Terus maju, jangan menyerah!"
				</p>
			</div>

			<!-- Action Buttons -->
			<div class="mt-4 flex justify-center gap-3">
				<button
					onclick={() => window.history.back()}
					class="rounded-xl border-2 border-purple-200 bg-white px-5 py-2.5 text-sm font-semibold text-purple-600 transition-all hover:border-purple-300 hover:bg-purple-50 active:scale-95"
				>
					← Kembali
				</button>
				<a
					href="{base}/"
					class="rounded-xl border-2 border-purple-200 bg-purple-100 px-5 py-2.5 text-sm font-semibold text-purple-700 transition-all hover:border-purple-300 hover:bg-purple-200 active:scale-95"
				>
					🏠 Home
				</a>
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
