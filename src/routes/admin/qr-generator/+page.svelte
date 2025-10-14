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
	<style>
		@media print {
			.no-print {
				display: none !important;
			}
			body {
				background: white;
			}
			.qr-grid {
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 1rem;
			}
		}
	</style>
</svelte:head>

<div class="space-y-6 pb-6">
	<!-- Page Header -->
	<div
		class="no-print flex items-center justify-between rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-100 to-cyan-100 p-6 shadow-lg"
	>
		<div>
			<h1 class="text-2xl font-bold text-blue-800">📱 QR Code Generator</h1>
			<p class="text-sm text-blue-600">Generate QR codes for student login</p>
		</div>
		{#if qrCodes.length > 0}
			<button
				onclick={printAllStickers}
				class="rounded-xl bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-95"
			>
				🖨️ Print All
			</button>
		{/if}
	</div>

	<!-- Student Selection -->
	<div class="no-print space-y-4 rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-bold text-gray-800">Select Students</h2>
			<div class="flex gap-2">
				<button
					onclick={selectAll}
					class="rounded-lg border-2 border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 transition-all hover:bg-purple-100 active:scale-95"
				>
					Select All
				</button>
				<button
					onclick={deselectAll}
					class="rounded-lg border-2 border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-700 transition-all hover:bg-gray-100 active:scale-95"
				>
					Deselect All
				</button>
			</div>
		</div>

		<div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
			{#each students as student (student.id)}
				<button
					onclick={() => toggleStudent(student.id)}
					class="rounded-lg border-2 p-3 text-left text-sm transition-all active:scale-95 {selectedStudents.includes(
						student.id
					)
						? 'border-purple-400 bg-purple-50'
						: 'border-gray-200 bg-white hover:border-purple-200'}"
				>
					<div class="flex items-center gap-2">
						<div
							class="flex h-5 w-5 items-center justify-center rounded border-2 {selectedStudents.includes(
								student.id
							)
								? 'border-purple-500 bg-purple-500'
								: 'border-gray-300'}"
						>
							{#if selectedStudents.includes(student.id)}
								<span class="text-xs text-white">✓</span>
							{/if}
						</div>
						<div>
							<div class="font-semibold text-gray-800">{student.name}</div>
							<div class="text-xs text-gray-500">{student.code}</div>
						</div>
					</div>
				</button>
			{/each}
		</div>

		<button
			onclick={generateQRCodes}
			disabled={isGenerating}
			class="w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:opacity-50"
		>
			{#if isGenerating}
				⏳ Generating...
			{:else}
				✨ Generate QR Codes {selectedStudents.length > 0
					? `(${selectedStudents.length} selected)`
					: '(All students)'}
			{/if}
		</button>
	</div>

	<!-- Generated QR Codes -->
	{#if qrCodes.length > 0}
		<div class="qr-grid grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each qrCodes as { student, qrDataUrl } (student.id)}
				<div class="rounded-2xl border-2 border-purple-200 bg-white p-6 text-center shadow-lg">
					<img
						src={qrDataUrl}
						alt="QR Code for {student.name}"
						class="mx-auto mb-4 rounded-xl border-2 border-purple-100"
					/>
					<div class="mb-2 text-lg font-bold text-gray-800">{student.name}</div>
					<div class="mb-4 text-sm text-gray-600">{student.code}</div>
					<button
						onclick={() => downloadQR(student, qrDataUrl)}
						class="no-print w-full rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 active:scale-95"
					>
						📥 Download
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
