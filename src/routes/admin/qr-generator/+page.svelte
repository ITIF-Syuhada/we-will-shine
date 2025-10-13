<script lang="ts">
	import { students } from '$lib/data/students';
	import QRCode from 'qrcode';
	interface QRCodeData {
		student: { id: string; name: string; code: string };
		qrDataUrl: string;
	}

	let qrCodes = $state<QRCodeData[]>([]);
	let isGenerating = $state(false);
	let selectedStudents = $state<string[]>([]);

	const appUrl = 'https://itif-syuhada.github.io/we-will-shine/unlock';

	// No auth check needed - handled by layout

	async function generateQRCodes() {
		isGenerating = true;
		qrCodes = [];

		const studentsToGenerate =
			selectedStudents.length > 0
				? students.filter((s) => selectedStudents.includes(s.id))
				: students;

		for (const student of studentsToGenerate) {
			try {
				const qrData = `${appUrl}?code=${student.code}`;
				const qrDataUrl = await QRCode.toDataURL(qrData, {
					width: 300,
					margin: 2,
					color: {
						dark: '#7C3AED',
						light: '#FFFFFF'
					}
				});
				qrCodes = [...qrCodes, { student, qrDataUrl }];
			} catch (err) {
				console.error('Error generating QR for', student.name, err);
			}
		}

		isGenerating = false;
	}

	function toggleStudent(studentId: string) {
		if (selectedStudents.includes(studentId)) {
			selectedStudents = selectedStudents.filter((id) => id !== studentId);
		} else {
			selectedStudents = [...selectedStudents, studentId];
		}
	}

	function selectAll() {
		selectedStudents = students.map((s) => s.id);
	}

	function deselectAll() {
		selectedStudents = [];
	}

	function downloadQR(student: { id: string; name: string; code: string }, qrDataUrl: string) {
		const link = document.createElement('a');
		link.href = qrDataUrl;
		link.download = `QR-${student.code}-${student.name}.png`;
		link.click();
	}

	function printAllStickers() {
		window.print();
	}
</script>

<svelte:head>
	<title>QR Generator - Admin</title>
</svelte:head>

{#if isAuthenticated}
	<div class="min-h-screen bg-gray-50 p-4">
		<!-- Header -->
		<header class="mb-6 rounded-2xl border border-purple-200 bg-white p-6 shadow-lg">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<a
						href="{base}/admin/dashboard"
						class="rounded-full border-2 border-gray-200 bg-gray-50 p-2 transition-all hover:bg-gray-100"
					>
						<span>←</span>
					</a>
					<div>
						<h1 class="text-2xl font-bold text-gray-800">QR Code Generator</h1>
						<p class="text-sm text-gray-600">Generate QR untuk sticker coklat</p>
					</div>
				</div>
			</div>
		</header>

		<!-- Controls -->
		<div class="mb-6 rounded-2xl border border-purple-100 bg-white p-6 shadow-md">
			<div class="mb-4 flex flex-wrap items-center gap-3">
				<button
					onclick={selectAll}
					class="rounded-lg border-2 border-purple-300 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600 transition-all hover:bg-purple-100"
				>
					✓ Pilih Semua
				</button>
				<button
					onclick={deselectAll}
					class="rounded-lg border-2 border-gray-300 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-100"
				>
					✗ Batal Semua
				</button>
				<div class="flex-1"></div>
				<span class="text-sm text-gray-600">{selectedStudents.length} dipilih</span>
			</div>

			<button
				onclick={generateQRCodes}
				disabled={isGenerating}
				class="w-full rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 py-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
			>
				{#if isGenerating}
					⏳ Generating QR Codes...
				{:else}
					🎨 Generate QR Codes ({selectedStudents.length > 0
						? selectedStudents.length
						: students.length} siswa)
				{/if}
			</button>
		</div>

		<!-- Students Selection -->
		<div class="mb-6 rounded-2xl border border-purple-100 bg-white p-6 shadow-md">
			<h3 class="mb-4 text-lg font-bold text-gray-800">Pilih Siswa ({students.length} total)</h3>
			<div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
				{#each students as student (student.id)}
					<label
						class="flex cursor-pointer items-center gap-3 rounded-lg border-2 {selectedStudents.includes(
							student.id
						)
							? 'border-purple-300 bg-purple-50'
							: 'border-gray-200 bg-white'} p-3 transition-all hover:border-purple-300"
					>
						<input
							type="checkbox"
							checked={selectedStudents.includes(student.id)}
							onchange={() => toggleStudent(student.id)}
							class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-2 focus:ring-purple-200"
						/>
						<div class="min-w-0 flex-1">
							<div class="truncate text-sm font-semibold text-gray-800">{student.name}</div>
							<div class="text-xs text-gray-500">{student.code}</div>
						</div>
					</label>
				{/each}
			</div>
		</div>

		<!-- Generated QR Codes -->
		{#if qrCodes.length > 0}
			<div class="mb-6 rounded-2xl border border-green-100 bg-white p-6 shadow-md">
				<div class="mb-4 flex items-center justify-between">
					<h3 class="text-lg font-bold text-gray-800">
						QR Codes Generated ({qrCodes.length})
					</h3>
					<button
						onclick={printAllStickers}
						class="rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600"
					>
						🖨️ Print Semua
					</button>
				</div>

				<div class="print-container grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each qrCodes as { student, qrDataUrl } (student.id)}
						<div class="sticker-card rounded-xl border-2 border-purple-200 bg-white p-4 shadow-sm">
							<!-- Sticker Design -->
							<div class="mb-3 text-center">
								<div class="mb-2 text-2xl">🌟</div>
								<div class="mb-2 text-sm font-bold text-purple-600">We Will Shine</div>
							</div>

							<!-- QR Code -->
							<div class="mb-3 rounded-lg border-2 border-purple-100 bg-purple-50 p-3">
								<img src={qrDataUrl} alt="QR Code for {student.name}" class="mx-auto w-full" />
							</div>

							<!-- Student Info -->
							<div class="mb-3 text-center">
								<div class="mb-1 text-sm font-bold text-gray-800">{student.name}</div>
								<div class="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
									{student.code}
								</div>
							</div>

							<!-- Instructions -->
							<div class="mb-3 rounded-lg bg-blue-50 p-2 text-center">
								<p class="text-[10px] text-gray-600">Scan QR atau kunjungi:</p>
								<p class="text-[9px] text-blue-600">itif-syuhada.github.io/we-will-shine</p>
							</div>

							<!-- Download Button -->
							<button
								onclick={() => downloadQR(student, qrDataUrl)}
								class="w-full rounded-lg bg-purple-500 py-2 text-xs font-semibold text-white transition-all hover:bg-purple-600"
							>
								⬇️ Download
							</button>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div class="flex min-h-screen items-center justify-center">
		<div class="text-center">
			<div class="mb-4 text-6xl">⏳</div>
			<p class="text-gray-600">Loading...</p>
		</div>
	</div>
{/if}

<style>
	@media print {
		.sticker-card {
			page-break-inside: avoid;
			break-inside: avoid;
		}

		.print-container {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 1rem;
		}

		button,
		header {
			display: none;
		}
	}
</style>
