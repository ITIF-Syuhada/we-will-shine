<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { getCareerById } from '$lib/data/careers';

	const careerId = $derived(parseInt($page.params.id));
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
		<!-- Back Button -->
		<button
			onclick={goBack}
			class="flex items-center space-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-lg transition-all hover:bg-gray-50"
		>
			<span>←</span>
			<span>Kembali</span>
		</button>

		<!-- Career Header -->
		<div class="rounded-3xl bg-white p-8 text-center shadow-xl">
			<div class="mb-4 text-6xl">{career.emoji}</div>
			<h1 class="mb-2 text-3xl font-bold text-gray-800">{career.title}</h1>
			<p class="text-lg text-gray-600">{career.description}</p>
		</div>

		<!-- Career Details -->
		<div class="space-y-4">
			<!-- What is it -->
			<div class="rounded-2xl bg-purple-50 p-6 shadow-lg">
				<h2 class="mb-3 text-xl font-bold text-purple-900">
					📖 Apa itu {career.title}?
				</h2>
				<p class="leading-relaxed text-gray-700">{career.details}</p>
			</div>

			<!-- Skills Needed -->
			<div class="rounded-2xl bg-pink-50 p-6 shadow-lg">
				<h2 class="mb-3 text-xl font-bold text-pink-900">💪 Skills yang Dibutuhkan</h2>
				<div class="flex flex-wrap gap-2">
					{#each career.skills as skill (skill)}
						<span class="rounded-full bg-pink-200 px-4 py-2 text-sm font-medium text-pink-800">
							{skill}
						</span>
					{/each}
				</div>
			</div>

			<!-- Career Path -->
			<div class="rounded-2xl bg-teal-50 p-6 shadow-lg">
				<h2 class="mb-3 text-xl font-bold text-teal-900">🛤️ Jalur Karir</h2>
				<p class="leading-relaxed text-gray-700">{career.path}</p>
			</div>

			<!-- Market Info Grid -->
			<div class="grid gap-4 md:grid-cols-2">
				<!-- Demand -->
				<div class="rounded-2xl bg-blue-50 p-6 shadow-lg">
					<h2 class="mb-2 text-lg font-bold text-blue-900">📈 Demand Pasar</h2>
					<p class="text-gray-700">{career.demand}</p>
				</div>

				<!-- Salary Range -->
				<div class="rounded-2xl bg-green-50 p-6 shadow-lg">
					<h2 class="mb-2 text-lg font-bold text-green-900">💰 Range Gaji</h2>
					<p class="text-gray-700">{career.salary}</p>
				</div>
			</div>

			<!-- Islamic Value -->
			<div
				class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-lg"
			>
				<h2 class="mb-3 text-xl font-bold text-purple-900">☪️ Nilai Islam dalam Karir Ini</h2>
				<p class="leading-relaxed text-gray-700">{career.islamicValue}</p>
			</div>
		</div>

		<!-- Action Buttons -->
		<div class="grid gap-4 md:grid-cols-2">
			<button
				onclick={goBack}
				class="rounded-xl border-2 border-purple-500 bg-white py-3 font-semibold text-purple-600 transition-all hover:bg-purple-50"
			>
				← Explore Karir Lainnya
			</button>
			<a
				href="{base}/dashboard/{$page.params.code}/quiz"
				class="block rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-3 text-center font-semibold text-white transition-all hover:from-purple-600 hover:to-pink-600"
			>
				🧠 Ambil Quiz Kepribadian
			</a>
		</div>
	</div>
{:else}
	<!-- Career not found -->
	<div class="rounded-2xl bg-white p-8 text-center shadow-lg">
		<div class="mb-4 text-6xl">😕</div>
		<h2 class="mb-2 text-2xl font-bold text-gray-800">Karir tidak ditemukan</h2>
		<p class="mb-6 text-gray-600">Maaf, karir yang kamu cari tidak ada.</p>
		<button
			onclick={goBack}
			class="rounded-xl bg-purple-500 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-600"
		>
			Kembali ke Daftar Karir
		</button>
	</div>
{/if}
