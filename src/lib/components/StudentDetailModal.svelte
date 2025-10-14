<script lang="ts">
	import type { Student } from '$lib/supabase';
	import { browser } from '$app/environment';

	interface Props {
		student: Student | null;
		isOpen: boolean;
		onClose: () => void;
	}

	let { student = $bindable(null), isOpen = $bindable(false), onClose }: Props = $props();

	// Mock data for login logs (akan diganti dengan data real dari database)
	const loginLogs = $state([
		{
			id: '1',
			timestamp: new Date('2025-10-14T10:30:00'),
			device: 'Chrome on Windows',
			ip: '192.168.1.100',
			action: 'Login',
			status: 'Success'
		},
		{
			id: '2',
			timestamp: new Date('2025-10-13T15:20:00'),
			device: 'Safari on iPhone',
			ip: '192.168.1.101',
			action: 'Login',
			status: 'Success'
		},
		{
			id: '3',
			timestamp: new Date('2025-10-12T09:15:00'),
			device: 'Firefox on macOS',
			ip: '192.168.1.102',
			action: 'Login',
			status: 'Failed'
		}
	]);

	// Mock activity data
	const recentActivities = $state([
		{
			id: '1',
			timestamp: new Date('2025-10-14T11:00:00'),
			activity: 'Completed Quiz',
			details: 'Career Exploration Quiz - Score: 85%',
			points: 10
		},
		{
			id: '2',
			timestamp: new Date('2025-10-14T10:45:00'),
			activity: 'Chat with AI Mentor',
			details: 'Discussion about Software Engineering career',
			points: 5
		},
		{
			id: '3',
			timestamp: new Date('2025-10-13T16:30:00'),
			activity: 'Achievement Unlocked',
			details: 'First Quiz Master - Complete 5 quizzes',
			points: 20
		}
	]);

	// Close modal on Escape key
	$effect(() => {
		if (!browser || !isOpen) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	});

	// Prevent body scroll when modal is open
	$effect(() => {
		if (!browser) return;

		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === e.currentTarget) {
			onClose();
		}
	}

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	function formatDateShort(date: string) {
		return new Intl.DateTimeFormat('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		}).format(new Date(date));
	}
</script>

{#if isOpen && student}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		onclick={handleBackdropClick}
		role="presentation"
	>
		<!-- Modal Container -->
		<div
			class="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border-2 border-purple-200 bg-white shadow-2xl"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<!-- Header -->
			<div
				class="sticky top-0 z-10 border-b-2 border-purple-100 bg-gradient-to-r from-purple-100 to-pink-100 p-6"
			>
				<div class="flex items-start justify-between">
					<div>
						<h2 id="modal-title" class="text-2xl font-bold text-purple-800">
							{student.student_name}
						</h2>
						<p class="mt-1 text-sm text-purple-600">{student.student_code}</p>
					</div>
					<button
						onclick={onClose}
						class="rounded-lg p-2 text-gray-600 transition-all hover:bg-white/50 active:scale-95"
						aria-label="Close modal"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Content -->
			<div class="max-h-[calc(90vh-120px)] overflow-y-auto p-6">
				<!-- Student Info Grid -->
				<div class="mb-6 grid gap-4 md:grid-cols-3">
					<!-- Kelas & Rombel -->
					<div class="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
						<div class="text-xs text-blue-600">Kelas & Rombel</div>
						<div class="mt-1 text-lg font-bold text-blue-800">
							{student.kelas || '-'}
							{student.rombel || ''}
						</div>
					</div>

					<!-- Angkatan -->
					<div class="rounded-xl border-2 border-green-200 bg-green-50 p-4">
						<div class="text-xs text-green-600">Angkatan</div>
						<div class="mt-1 text-lg font-bold text-green-800">
							{student.angkatan || '-'}
						</div>
					</div>

					<!-- Joined Date -->
					<div class="rounded-xl border-2 border-purple-200 bg-purple-50 p-4">
						<div class="text-xs text-purple-600">Bergabung</div>
						<div class="mt-1 text-lg font-bold text-purple-800">
							{formatDateShort(student.created_at)}
						</div>
					</div>
				</div>

				<!-- Stats Grid -->
				<div class="mb-6 grid gap-4 md:grid-cols-3">
					<!-- Points -->
					<div
						class="rounded-xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-4"
					>
						<div class="mb-2 text-3xl">⭐</div>
						<div class="text-xs text-yellow-600">Total Points</div>
						<div class="text-2xl font-bold text-yellow-800">{student.points}</div>
					</div>

					<!-- Level -->
					<div
						class="rounded-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-4"
					>
						<div class="mb-2 text-3xl">🏆</div>
						<div class="text-xs text-purple-600">Current Level</div>
						<div class="text-2xl font-bold text-purple-800">Level {student.level}</div>
					</div>

					<!-- Activity Score -->
					<div
						class="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4"
					>
						<div class="mb-2 text-3xl">📊</div>
						<div class="text-xs text-green-600">Activity Score</div>
						<div class="text-2xl font-bold text-green-800">
							{student.points > 0 ? Math.min(100, Math.round((student.points / 500) * 100)) : 0}%
						</div>
					</div>
				</div>

				<!-- Tabs Container -->
				<div class="space-y-4">
					<!-- Login Logs Section -->
					<div class="rounded-2xl border-2 border-indigo-200 bg-white shadow-md">
						<div class="border-b-2 border-indigo-100 p-4">
							<h3 class="text-lg font-bold text-indigo-800">🔐 Login History</h3>
						</div>
						<div class="p-4">
							{#if loginLogs.length === 0}
								<div class="py-8 text-center text-gray-500">
									<p class="text-sm">Belum ada log login</p>
								</div>
							{:else}
								<div class="space-y-3">
									{#each loginLogs as log (log.id)}
										<div
											class="flex items-start gap-4 rounded-lg border-2 border-gray-100 p-3 transition-all hover:border-indigo-200 hover:bg-indigo-50"
										>
											<div
												class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full {log.status ===
												'Success'
													? 'bg-green-100 text-green-600'
													: 'bg-red-100 text-red-600'}"
											>
												{#if log.status === 'Success'}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-5 w-5"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fill-rule="evenodd"
															d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
															clip-rule="evenodd"
														/>
													</svg>
												{:else}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-5 w-5"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fill-rule="evenodd"
															d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
															clip-rule="evenodd"
														/>
													</svg>
												{/if}
											</div>
											<div class="flex-1">
												<div class="flex items-start justify-between">
													<div>
														<div class="text-sm font-semibold text-gray-800">
															{log.action}
														</div>
														<div class="mt-1 text-xs text-gray-600">{log.device}</div>
														<div class="mt-1 text-xs text-gray-500">IP: {log.ip}</div>
													</div>
													<div class="text-right">
														<div
															class="text-xs font-semibold {log.status === 'Success'
																? 'text-green-600'
																: 'text-red-600'}"
														>
															{log.status}
														</div>
														<div class="mt-1 text-xs text-gray-500">
															{formatDate(log.timestamp)}
														</div>
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>

					<!-- Recent Activities Section -->
					<div class="rounded-2xl border-2 border-purple-200 bg-white shadow-md">
						<div class="border-b-2 border-purple-100 p-4">
							<h3 class="text-lg font-bold text-purple-800">📝 Recent Activities</h3>
						</div>
						<div class="p-4">
							{#if recentActivities.length === 0}
								<div class="py-8 text-center text-gray-500">
									<p class="text-sm">Belum ada aktivitas</p>
								</div>
							{:else}
								<div class="space-y-3">
									{#each recentActivities as activity (activity.id)}
										<div
											class="flex items-start gap-4 rounded-lg border-2 border-gray-100 p-3 transition-all hover:border-purple-200 hover:bg-purple-50"
										>
											<div
												class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-xl"
											>
												{#if activity.activity.includes('Quiz')}
													📝
												{:else if activity.activity.includes('Chat')}
													💬
												{:else if activity.activity.includes('Achievement')}
													🏆
												{:else}
													✨
												{/if}
											</div>
											<div class="flex-1">
												<div class="flex items-start justify-between">
													<div>
														<div class="text-sm font-semibold text-gray-800">
															{activity.activity}
														</div>
														<div class="mt-1 text-xs text-gray-600">{activity.details}</div>
													</div>
													<div class="text-right">
														<div class="text-xs font-bold text-yellow-600">
															+{activity.points} pts
														</div>
														<div class="mt-1 text-xs text-gray-500">
															{formatDate(activity.timestamp)}
														</div>
													</div>
												</div>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				</div>
			</div>

			<!-- Footer -->
			<div class="sticky bottom-0 border-t-2 border-purple-100 bg-gray-50 p-4">
				<div class="flex justify-end gap-3">
					<button
						onclick={onClose}
						class="rounded-lg border-2 border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-100 active:scale-95"
					>
						Close
					</button>
					<button
						class="rounded-lg border-2 border-purple-500 bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-purple-600 active:scale-95"
					>
						Edit Student
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}
