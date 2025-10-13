<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getCareerById } from '$lib/data/careers';

	const careerId = $derived(parseInt($page.params.id || '0'));
	const career = $derived(getCareerById(careerId));

	function goBack() {
		goto(`${base}/dashboard/${$page.params.code}/careers`);
	}
</script>

<svelte:head>
	<title>{career ? career.title : 'Career Detail'} - We Will Shine</title>
</svelte:head>

{#if career}
	<div class="space-y-3">
		<!-- Back Button - COMPACT -->
		<button
			onclick={goBack}
			class="flex items-center space-x-1.5 rounded-full border-2 border-purple-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm transition-all active:scale-95"
		>
			<span>←</span>
			<span>Kembali</span>
		</button>

		<!-- Career Header - COMPACT -->
		<div
			class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-white via-purple-50 to-pink-50 p-4 text-center shadow-md"
		>
			<div class="mb-2 text-4xl">{career.emoji}</div>
			<h1 class="mb-1 text-base font-bold text-gray-800">{career.title}</h1>
			<p class="text-[11px] text-gray-600">{career.description}</p>
		</div>

		<!-- Career Details - COMPACT -->
		<div class="space-y-2">
			<!-- What is it -->
			<div class="rounded-xl border-2 border-purple-100 bg-purple-50/50 p-3 shadow-sm">
				<div class="mb-1.5 flex items-center gap-1.5">
					<span class="text-base">📖</span>
					<h2 class="text-xs font-bold text-purple-600">Apa itu {career.title}?</h2>
				</div>
				<p class="text-[11px] leading-relaxed text-gray-700">{career.details}</p>
			</div>

			<!-- Skills Needed -->
			<div class="rounded-xl border-2 border-pink-100 bg-pink-50/50 p-3 shadow-sm">
				<div class="mb-1.5 flex items-center gap-1.5">
					<span class="text-base">💪</span>
					<h2 class="text-xs font-bold text-pink-600">Skills Dibutuhkan</h2>
				</div>
				<div class="flex flex-wrap gap-1.5">
					{#each career.skills as skill (skill)}
						<span
							class="rounded-full border border-pink-200 bg-pink-100 px-2 py-0.5 text-[10px] font-semibold text-pink-700"
						>
							{skill}
						</span>
					{/each}
				</div>
			</div>

			<!-- Career Path -->
			<div class="rounded-xl border-2 border-teal-100 bg-teal-50/50 p-3 shadow-sm">
				<div class="mb-1.5 flex items-center gap-1.5">
					<span class="text-base">🛤️</span>
					<h2 class="text-xs font-bold text-teal-600">Jalur Karir</h2>
				</div>
				<p class="text-[11px] leading-relaxed text-gray-700">{career.path}</p>
			</div>

			<!-- Market Info Grid -->
			<div class="grid grid-cols-2 gap-2">
				<!-- Demand -->
				<div class="rounded-xl border-2 border-blue-100 bg-blue-50/50 p-2 shadow-sm">
					<div class="mb-1 flex items-center gap-1">
						<span class="text-sm">📈</span>
						<h2 class="text-[10px] font-bold text-blue-600">Demand</h2>
					</div>
					<p class="text-[10px] text-gray-700">{career.demand}</p>
				</div>

				<!-- Salary Range -->
				<div class="rounded-xl border-2 border-green-100 bg-green-50/50 p-2 shadow-sm">
					<div class="mb-1 flex items-center gap-1">
						<span class="text-sm">💰</span>
						<h2 class="text-[10px] font-bold text-green-600">Gaji</h2>
					</div>
					<p class="text-[10px] text-gray-700">{career.salary}</p>
				</div>
			</div>

			<!-- Islamic Value - Special highlight -->
			<div
				class="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-3 shadow-md"
			>
				<div class="mb-1.5 flex items-center gap-1.5">
					<span class="text-lg">☪️</span>
					<h2 class="text-xs font-bold text-purple-600">Nilai Islam</h2>
				</div>
				<p class="text-[11px] leading-relaxed text-gray-700">{career.islamicValue}</p>
			</div>
		</div>

		<!-- Action Buttons - COMPACT -->
		<div class="grid grid-cols-2 gap-2">
			<button
				onclick={goBack}
				class="rounded-xl border-2 border-purple-400 bg-white py-2.5 text-xs font-bold text-purple-600 shadow-sm transition-all active:scale-95"
			>
				← Explore Lagi
			</button>
			<a
				href="{base}/dashboard/{$page.params.code}/quiz"
				class="block rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 py-2.5 text-center text-xs font-bold text-white shadow-sm transition-all active:scale-95"
			>
				🧠 Ambil Quiz
			</a>
		</div>
	</div>
{:else}
	<!-- Career not found - COMPACT -->
	<div class="rounded-2xl border-2 border-gray-200 bg-white p-5 text-center shadow-md">
		<div class="mb-3 text-4xl">😕</div>
		<h2 class="mb-1.5 text-sm font-bold text-gray-800">Karir tidak ditemukan</h2>
		<p class="mb-3 text-[11px] text-gray-600">Maaf, karir yang kamu cari tidak ada.</p>
		<button
			onclick={goBack}
			class="rounded-xl bg-purple-400 px-5 py-2 text-xs font-bold text-white shadow-sm transition-all active:scale-95"
		>
			Kembali ke Daftar
		</button>
	</div>
{/if}
