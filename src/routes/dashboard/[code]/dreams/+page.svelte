<script lang="ts">
	import { userProgress } from '$lib/stores/user';

	let dreamInput = $state('');

	const dreams = $derived($userProgress?.dreams || []);

	const colorClasses = [
		'from-pink-100 to-purple-100',
		'from-blue-100 to-cyan-100',
		'from-green-100 to-emerald-100',
		'from-yellow-100 to-orange-100',
		'from-indigo-100 to-purple-100',
		'from-rose-100 to-pink-100'
	];

	function addDream() {
		if (dreamInput.trim().length > 0) {
			const color = colorClasses[Math.floor(Math.random() * colorClasses.length)];
			userProgress.addDream({
				text: dreamInput.trim(),
				date: new Date().toLocaleDateString('id-ID', {
					day: 'numeric',
					month: 'long',
					year: 'numeric'
				}),
				color
			});
			userProgress.addPoints(20);

			const count = ($userProgress?.dreams.length || 0) + 1;
			if (count >= 5) {
				userProgress.unlockAchievement('dream-builder');
			}

			dreamInput = '';
		}
	}

	function removeDream(dreamId: number) {
		if (confirm('Yakin ingin menghapus impian ini?')) {
			userProgress.removeDream(dreamId);
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			addDream();
		}
	}
</script>

<svelte:head>
	<title>Dream Board - We Will Shine</title>
</svelte:head>

<div class="space-y-6">
	<!-- Header -->
	<div class="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white shadow-lg">
		<h1 class="mb-2 text-3xl font-bold">✨ Dream Board</h1>
		<p class="opacity-90">
			Tuliskan impian-impianmu untuk masa depan! Setiap impian adalah langkah pertama menuju
			kesuksesan.
		</p>
	</div>

	<!-- Add Dream Form -->
	<div class="rounded-2xl bg-white p-6 shadow-lg">
		<h2 class="mb-4 text-lg font-bold text-gray-800">🎯 Tambah Impian Baru</h2>
		<div class="flex space-x-2">
			<input
				type="text"
				bind:value={dreamInput}
				onkeypress={handleKeyPress}
				placeholder="Contoh: Jadi Software Developer yang membangun aplikasi bermanfaat..."
				class="flex-1 rounded-xl border-2 border-purple-200 px-4 py-3 transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none"
			/>
			<button
				onclick={addDream}
				disabled={dreamInput.trim().length === 0}
				class="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-semibold text-white transition-all hover:from-purple-600 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
			>
				➕ Tambah
			</button>
		</div>
		<p class="mt-2 text-xs text-gray-500">
			💡 Tips: Tuliskan impian yang spesifik dan realistis, misalnya karir, skill yang ingin
			dikuasai, atau prestasi yang ingin dicapai!
		</p>
	</div>

	<!-- Dreams Stats -->
	{#if dreams.length > 0}
		<div class="grid gap-4 sm:grid-cols-3">
			<div class="rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 p-4 text-center">
				<div class="text-3xl font-bold text-purple-900">{dreams.length}</div>
				<div class="text-sm text-purple-700">Impian Terwujud</div>
			</div>
			<div class="rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 p-4 text-center">
				<div class="text-3xl font-bold text-blue-900">⭐</div>
				<div class="text-sm text-blue-700">Keep Dreaming!</div>
			</div>
			<div class="rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 p-4 text-center">
				<div class="text-3xl font-bold text-green-900">💪</div>
				<div class="text-sm text-green-700">You Can Do It!</div>
			</div>
		</div>
	{/if}

	<!-- Dreams Grid -->
	{#if dreams.length === 0}
		<div class="rounded-2xl bg-gray-50 p-12 text-center">
			<div class="mb-4 text-6xl">✨</div>
			<h3 class="mb-2 text-xl font-bold text-gray-800">Belum Ada Impian</h3>
			<p class="text-gray-600">
				Mulai tulis impian pertamamu! Setiap impian besar dimulai dari keberanian menuliskannya.
			</p>
		</div>
	{:else}
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each dreams as dream (dream.id)}
				<div
					class="group animate-fade-in rounded-2xl bg-gradient-to-br {dream.color} p-6 shadow-lg transition-all hover:scale-105"
				>
					<!-- Header -->
					<div class="mb-3 flex items-start justify-between">
						<span class="text-2xl">⭐</span>
						<button
							onclick={() => removeDream(dream.id)}
							class="text-gray-400 opacity-0 transition-all group-hover:opacity-100 hover:text-red-500"
							title="Hapus impian"
						>
							✕
						</button>
					</div>

					<!-- Dream Text -->
					<p class="mb-3 text-sm leading-relaxed font-medium text-gray-800">
						{dream.text}
					</p>

					<!-- Date -->
					<div class="text-xs text-gray-500">
						📅 {dream.date}
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Motivation Quote -->
	<div class="rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 p-6">
		<p class="text-center text-sm text-gray-700 italic">
			"Mimpi yang tidak ditulis hanya khayalan. Mimpi yang ditulis adalah rencana. Mimpi yang
			ditulis dan diusahakan adalah kenyataan." 💫
		</p>
	</div>
</div>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.3s ease-out;
	}
</style>
