<script lang="ts">
	import { userProgress } from '$lib/stores/user';

	let dreamInput = $state('');

	const dreams = $derived($userProgress?.dreams || []);

	const colorClasses = [
		{ from: 'from-purple-50', to: 'to-pink-50', border: 'border-purple-100' },
		{ from: 'from-blue-50', to: 'to-cyan-50', border: 'border-blue-100' },
		{ from: 'from-green-50', to: 'to-emerald-50', border: 'border-green-100' },
		{ from: 'from-yellow-50', to: 'to-orange-50', border: 'border-yellow-100' },
		{ from: 'from-pink-50', to: 'to-rose-50', border: 'border-pink-100' },
		{ from: 'from-indigo-50', to: 'to-purple-50', border: 'border-indigo-100' }
	];

	function addDream() {
		if (dreamInput.trim().length > 0) {
			const colorSet = colorClasses[Math.floor(Math.random() * colorClasses.length)];
			const color = `${colorSet.from} ${colorSet.to}`;

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
	<div
		class="rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-8 shadow-lg"
	>
		<div class="flex items-center gap-4">
			<span class="text-5xl">✨</span>
			<div>
				<h1 class="mb-1 text-3xl font-bold text-gray-800">Dream Board</h1>
				<p class="text-gray-600">
					Tuliskan impian-impianmu untuk masa depan! Setiap impian adalah langkah pertama menuju
					kesuksesan.
				</p>
			</div>
		</div>
	</div>

	<!-- Add Dream Form -->
	<div class="rounded-2xl border-2 border-purple-200 bg-white p-7 shadow-lg">
		<h2 class="mb-5 flex items-center gap-2 text-lg font-bold text-gray-800">
			<span class="text-2xl">🎯</span>
			<span>Tambah Impian Baru</span>
		</h2>
		<div class="flex space-x-3">
			<input
				type="text"
				bind:value={dreamInput}
				onkeypress={handleKeyPress}
				placeholder="Contoh: Jadi Software Developer yang membangun aplikasi bermanfaat..."
				class="flex-1 rounded-2xl border-2 border-purple-200 px-5 py-4 transition-all placeholder:text-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 focus:outline-none"
			/>
			<button
				onclick={addDream}
				disabled={dreamInput.trim().length === 0}
				class="rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 px-7 py-4 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
			>
				➕ Tambah
			</button>
		</div>
		<p class="mt-3 text-xs text-gray-500">
			💡 Tips: Tuliskan impian yang spesifik dan realistis, misalnya karir, skill yang ingin
			dikuasai, atau prestasi yang ingin dicapai!
		</p>
	</div>

	<!-- Dreams Stats -->
	{#if dreams.length > 0}
		<div class="grid gap-4 sm:grid-cols-3">
			<div
				class="rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 text-center shadow-md"
			>
				<div class="text-4xl font-bold text-purple-600">{dreams.length}</div>
				<div class="text-sm font-medium text-purple-500">Impian Tertulis</div>
			</div>
			<div
				class="rounded-2xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 text-center shadow-md"
			>
				<div class="text-4xl">⭐</div>
				<div class="text-sm font-medium text-blue-600">Keep Dreaming!</div>
			</div>
			<div
				class="rounded-2xl border-2 border-green-100 bg-gradient-to-br from-green-50 to-green-100/50 p-6 text-center shadow-md"
			>
				<div class="text-4xl">💪</div>
				<div class="text-sm font-medium text-green-600">You Can Do It!</div>
			</div>
		</div>
	{/if}

	<!-- Dreams Grid -->
	{#if dreams.length === 0}
		<div class="rounded-2xl border-2 border-gray-200 bg-gray-50 p-16 text-center">
			<div class="mb-5 text-7xl opacity-50">✨</div>
			<h3 class="mb-3 text-2xl font-bold text-gray-800">Belum Ada Impian</h3>
			<p class="text-gray-600">
				Mulai tulis impian pertamamu! Setiap impian besar dimulai dari keberanian menuliskannya.
			</p>
		</div>
	{:else}
		<div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
			{#each dreams as dream (dream.id)}
				<div
					class="animate-fade-in group rounded-2xl border-2 bg-gradient-to-br {dream.color} p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
				>
					<!-- Header -->
					<div class="mb-4 flex items-start justify-between">
						<span class="text-3xl">⭐</span>
						<button
							onclick={() => removeDream(dream.id)}
							class="rounded-full p-1.5 text-gray-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-100 hover:text-red-500"
							title="Hapus impian"
						>
							<span class="text-sm">✕</span>
						</button>
					</div>

					<!-- Dream Text -->
					<p class="mb-4 text-sm leading-relaxed font-medium text-gray-800">
						{dream.text}
					</p>

					<!-- Date -->
					<div class="text-xs text-gray-500">📅 {dream.date}</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Motivation Quote -->
	<div class="rounded-2xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-7 text-center">
		<p class="text-sm leading-relaxed text-gray-700 italic">
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
		animation: fade-in 0.4s ease-out;
	}
</style>
