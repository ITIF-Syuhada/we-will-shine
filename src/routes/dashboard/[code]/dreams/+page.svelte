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

<div class="space-y-3">
	<!-- Header - COMPACT -->
	<div
		class="rounded-2xl border-2 border-purple-200 bg-gradient-to-r from-purple-100 via-pink-100 to-blue-100 p-3 shadow-md"
	>
		<div class="flex items-center gap-2">
			<span class="text-2xl">✨</span>
			<div>
				<h1 class="text-sm font-bold text-gray-800">Dream Board</h1>
				<p class="text-[10px] text-gray-600">Tuliskan impian masa depanmu!</p>
			</div>
		</div>
	</div>

	<!-- Add Dream Form - COMPACT -->
	<div class="rounded-xl border-2 border-purple-200 bg-white p-3 shadow-sm">
		<h2 class="mb-2 flex items-center gap-1.5 text-xs font-bold text-gray-800">
			<span class="text-base">🎯</span>
			<span>Tambah Impian Baru</span>
		</h2>
		<div class="flex space-x-2">
			<input
				type="text"
				bind:value={dreamInput}
				onkeypress={handleKeyPress}
				placeholder="Contoh: Jadi Software Developer..."
				class="flex-1 rounded-xl border-2 border-purple-200 px-3 py-2 text-xs transition-all placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none"
			/>
			<button
				onclick={addDream}
				disabled={dreamInput.trim().length === 0}
				class="rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
			>
				➕
			</button>
		</div>
		<p class="mt-1.5 text-[9px] text-gray-500">
			💡 Tuliskan impian yang spesifik, misalnya karir atau skill!
		</p>
	</div>

	<!-- Dreams Stats - COMPACT -->
	{#if dreams.length > 0}
		<div class="grid grid-cols-3 gap-2">
			<div
				class="rounded-xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-purple-100/50 p-2 text-center shadow-sm"
			>
				<div class="text-lg font-bold text-purple-600">{dreams.length}</div>
				<div class="text-[9px] font-medium text-purple-500">Impian</div>
			</div>
			<div
				class="rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-blue-100/50 p-2 text-center shadow-sm"
			>
				<div class="text-lg">⭐</div>
				<div class="text-[9px] font-medium text-blue-600">Keep Dream!</div>
			</div>
			<div
				class="rounded-xl border-2 border-green-100 bg-gradient-to-br from-green-50 to-green-100/50 p-2 text-center shadow-sm"
			>
				<div class="text-lg">💪</div>
				<div class="text-[9px] font-medium text-green-600">You Can!</div>
			</div>
		</div>
	{/if}

	<!-- Dreams Grid - COMPACT -->
	{#if dreams.length === 0}
		<div class="rounded-xl border-2 border-gray-200 bg-gray-50 p-8 text-center">
			<div class="mb-2 text-4xl opacity-50">✨</div>
			<h3 class="mb-1.5 text-sm font-bold text-gray-800">Belum Ada Impian</h3>
			<p class="text-[11px] text-gray-600">
				Mulai tulis impian pertamamu! Setiap impian dimulai dari keberanian menuliskannya.
			</p>
		</div>
	{:else}
		<div class="grid grid-cols-2 gap-2">
			{#each dreams as dream (dream.id)}
				<div
					class="animate-fade-in group rounded-xl border-2 bg-gradient-to-br {dream.color} p-3 shadow-sm transition-all active:scale-95"
				>
					<!-- Header -->
					<div class="mb-2 flex items-start justify-between">
						<span class="text-lg">⭐</span>
						<button
							onclick={() => removeDream(dream.id)}
							class="rounded-full p-1 text-gray-400 opacity-0 transition-all group-hover:opacity-100 active:bg-red-100 active:text-red-500"
							title="Hapus"
						>
							<span class="text-[10px]">✕</span>
						</button>
					</div>

					<!-- Dream Text -->
					<p class="mb-2 line-clamp-3 text-[11px] leading-relaxed font-medium text-gray-800">
						{dream.text}
					</p>

					<!-- Date -->
					<div class="text-[9px] text-gray-500">📅 {dream.date}</div>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Motivation Quote - COMPACT -->
	<div class="rounded-xl border-2 border-dashed border-purple-200 bg-purple-50/50 p-3 text-center">
		<p class="text-[10px] leading-relaxed text-gray-700 italic">
			"Mimpi yang ditulis adalah rencana. Mimpi yang ditulis dan diusahakan adalah kenyataan." 💫
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
