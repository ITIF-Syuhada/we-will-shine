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
	<div class="space-y-6">
		<!-- Back Button dengan design soft -->
		<button
			onclick={goBack}
			class="flex items-center space-x-2 rounded-full border-2 border-purple-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-md transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-lg"
		>
			<span>←</span>
			<span>Kembali</span>
		</button>

		<!-- Career Header dengan gradient soft -->
		<div
			class="rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-white via-purple-50 to-pink-50 p-10 text-center shadow-xl"
		>
			<div class="mb-5 text-7xl">{career.emoji}</div>
			<h1 class="mb-3 text-4xl font-bold text-gray-800">{career.title}</h1>
			<p class="text-lg text-gray-600">{career.description}</p>
		</div>

		<!-- Career Details dengan warna lembut -->
		<div class="space-y-5">
			<!-- What is it -->
			<div class="rounded-2xl border-2 border-purple-100 bg-purple-50/50 p-7 shadow-lg">
				<div class="mb-4 flex items-center gap-3">
					<span class="text-2xl">📖</span>
					<h2 class="text-xl font-bold text-purple-600">Apa itu {career.title}?</h2>
				</div>
				<p class="leading-relaxed text-gray-700">{career.details}</p>
			</div>

			<!-- Skills Needed -->
			<div class="rounded-2xl border-2 border-pink-100 bg-pink-50/50 p-7 shadow-lg">
				<div class="mb-4 flex items-center gap-3">
					<span class="text-2xl">💪</span>
					<h2 class="text-xl font-bold text-pink-600">Skills yang Dibutuhkan</h2>
				</div>
				<div class="flex flex-wrap gap-3">
					{#each career.skills as skill (skill)}
						<span
							class="rounded-full border-2 border-pink-200 bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-700 shadow-sm"
						>
							{skill}
						</span>
					{/each}
				</div>
			</div>

			<!-- Career Path -->
			<div class="rounded-2xl border-2 border-teal-100 bg-teal-50/50 p-7 shadow-lg">
				<div class="mb-4 flex items-center gap-3">
					<span class="text-2xl">🛤️</span>
					<h2 class="text-xl font-bold text-teal-600">Jalur Karir</h2>
				</div>
				<p class="leading-relaxed text-gray-700">{career.path}</p>
			</div>

			<!-- Market Info Grid -->
			<div class="grid gap-5 md:grid-cols-2">
				<!-- Demand -->
				<div class="rounded-2xl border-2 border-blue-100 bg-blue-50/50 p-7 shadow-lg">
					<div class="mb-3 flex items-center gap-2">
						<span class="text-xl">📈</span>
						<h2 class="text-lg font-bold text-blue-600">Demand Pasar</h2>
					</div>
					<p class="text-gray-700">{career.demand}</p>
				</div>

				<!-- Salary Range -->
				<div class="rounded-2xl border-2 border-green-100 bg-green-50/50 p-7 shadow-lg">
					<div class="mb-3 flex items-center gap-2">
						<span class="text-xl">💰</span>
						<h2 class="text-lg font-bold text-green-600">Range Gaji</h2>
					</div>
					<p class="text-gray-700">{career.salary}</p>
				</div>
			</div>

			<!-- Islamic Value - Special highlight -->
			<div
				class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8 shadow-xl"
			>
				<div class="mb-4 flex items-center gap-3">
					<span class="text-3xl">☪️</span>
					<h2 class="text-xl font-bold text-purple-600">Nilai Islam dalam Karir Ini</h2>
				</div>
				<p class="leading-relaxed text-gray-700">{career.islamicValue}</p>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="grid gap-4 md:grid-cols-2">
			<button
				onclick={goBack}
				class="rounded-2xl border-2 border-purple-400 bg-white py-4 font-bold text-purple-600 shadow-md transition-all hover:bg-purple-50 hover:shadow-lg"
			>
				← Explore Karir Lainnya
			</button>
			<a
				href="{base}/dashboard/{$page.params.code}/quiz"
				class="block rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 py-4 text-center font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg"
			>
				🧠 Ambil Quiz Kepribadian
			</a>
		</div>
	</div>
{:else}
	<!-- Career not found -->
	<div class="rounded-2xl border-2 border-gray-200 bg-white p-10 text-center shadow-lg">
		<div class="mb-5 text-7xl">😕</div>
		<h2 class="mb-3 text-2xl font-bold text-gray-800">Karir tidak ditemukan</h2>
		<p class="mb-7 text-gray-600">Maaf, karir yang kamu cari tidak ada.</p>
		<button
			onclick={goBack}
			class="rounded-2xl bg-purple-400 px-8 py-3.5 font-bold text-white shadow-md transition-all hover:bg-purple-500 hover:shadow-lg"
		>
			Kembali ke Daftar Karir
		</button>
	</div>
{/if}
