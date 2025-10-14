<script lang="ts">
	import type { Student, StudentSession, StudentActivityLog } from '$lib/supabase';
	import { db } from '$lib/supabase';
	import { browser } from '$app/environment';

	interface Props {
		student: Student | null;
		isOpen: boolean;
		onClose: () => void;
	}

	let { student = $bindable(null), isOpen = $bindable(false), onClose }: Props = $props();

	// Real data from database
	let sessions = $state<StudentSession[]>([]);
	let activities = $state<StudentActivityLog[]>([]);
	let loading = $state(false);
	let error = $state<string | null>(null);

	// Load data when student changes
	$effect(() => {
		if (student && isOpen) {
			loadStudentData();
		}
	});

	async function loadStudentData() {
		if (!student) return;

		loading = true;
		error = null;

		try {
			const data = await db.getStudentDetailData(student.id);
			sessions = data.sessions;
			activities = data.activities;
		} catch (err) {
			console.error('Failed to load student detail data:', err);
			error = 'Gagal memuat data. Silakan coba lagi.';
		} finally {
			loading = false;
		}
	}

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
							{#if loading}
								<div class="py-8 text-center text-gray-500">
									<p class="text-sm">Loading...</p>
								</div>
							{:else if error}
								<div class="py-8 text-center text-red-500">
									<p class="text-sm">{error}</p>
								</div>
							{:else if sessions.length === 0}
								<div class="py-8 text-center text-gray-500">
									<p class="text-sm">Belum ada log login</p>
								</div>
							{:else}
								<div class="space-y-3">
									{#each sessions as session (session.id)}
										<div
											class="flex items-start gap-4 rounded-lg border-2 border-gray-100 p-3 transition-all hover:border-indigo-200 hover:bg-indigo-50"
										>
											<div
												class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full {session.is_active
													? 'bg-green-100 text-green-600'
													: 'bg-gray-100 text-gray-600'}"
											>
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
											</div>
											<div class="flex-1">
												<div class="flex items-start justify-between">
													<div>
														<div class="text-sm font-semibold text-gray-800">Login</div>
														<div class="mt-1 text-xs text-gray-600">
															{session.browser || 'Unknown Browser'} on {session.os || 'Unknown OS'}
														</div>
														{#if session.ip_address}
															<div class="mt-1 text-xs text-gray-500">IP: {session.ip_address}</div>
														{/if}
													</div>
													<div class="text-right">
														<div
															class="text-xs font-semibold {session.is_active
																? 'text-green-600'
																: 'text-gray-600'}"
														>
															{session.is_active ? 'Active' : 'Expired'}
														</div>
														<div class="mt-1 text-xs text-gray-500">
															{formatDate(new Date(session.login_at))}
														</div>
														{#if session.logout_at}
															<div class="mt-1 text-xs text-gray-400">
																Logout: {formatDate(new Date(session.logout_at))}
															</div>
														{/if}
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
							{#if loading}
								<div class="py-8 text-center text-gray-500">
									<p class="text-sm">Loading...</p>
								</div>
							{:else if error}
								<div class="py-8 text-center text-red-500">
									<p class="text-sm">{error}</p>
								</div>
							{:else if activities.length === 0}
								<div class="py-8 text-center text-gray-500">
									<p class="text-sm">Belum ada aktivitas</p>
								</div>
							{:else}
								<div class="space-y-3">
									{#each activities as activity (activity.id)}
										<div
											class="flex items-start gap-4 rounded-lg border-2 border-gray-100 p-3 transition-all hover:border-purple-200 hover:bg-purple-50"
										>
											<div
												class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-xl"
											>
												{#if activity.activity_type === 'quiz'}
													📝
												{:else if activity.activity_type === 'chat'}
													💬
												{:else if activity.activity_type === 'achievement'}
													🏆
												{:else if activity.activity_type === 'login'}
													🔐
												{:else}
													✨
												{/if}
											</div>
											<div class="flex-1">
												<div class="flex items-start justify-between">
													<div>
														<div class="text-sm font-semibold text-gray-800">
															{activity.activity_type.charAt(0).toUpperCase() +
																activity.activity_type.slice(1)}
														</div>
														{#if activity.page_url}
															<div class="mt-1 text-xs text-gray-600">{activity.page_url}</div>
														{/if}
														{#if activity.activity_data && Object.keys(activity.activity_data).length > 0}
															<div class="mt-1 text-xs text-gray-500">
																{JSON.stringify(activity.activity_data)}
															</div>
														{/if}
													</div>
													<div class="text-right">
														{#if activity.activity_data?.points}
															<div class="text-xs font-bold text-yellow-600">
																+{activity.activity_data.points} pts
															</div>
														{/if}
														<div class="mt-1 text-xs text-gray-500">
															{formatDate(new Date(activity.created_at))}
														</div>
														{#if activity.duration_seconds}
															<div class="mt-1 text-xs text-gray-400">
																{Math.round(activity.duration_seconds / 60)}m
															</div>
														{/if}
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
