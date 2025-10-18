<script lang="ts">
	import { userProgress } from '$lib/stores/user';
	import { db } from '$lib/supabase';
	import type { StudentInsight, ChatMessage } from '$lib/supabase';
	import { onMount } from 'svelte';
	import StudyTimeChart from '$lib/components/StudyTimeChart.svelte';
	import InterestRadarChart from '$lib/components/InterestRadarChart.svelte';
	import MoodTimeline from '$lib/components/MoodTimeline.svelte';

	interface StudySession {
		id: string;
		student_id: string;
		subject: string;
		duration_minutes: number;
		started_at: string;
		ended_at: string | null;
		created_at: string;
	}

	// Analytics data
	let insights = $state<StudentInsight | null>(null);
	let chatHistory = $state<ChatMessage[]>([]);
	let studySessions = $state<StudySession[]>([]);
	let loading = $state(true);

	// Computed stats
	const totalChats = $derived(chatHistory.length);
	const topicsDiscussed = $derived.by(() => {
		if (!insights?.topics) return [];
		return Object.entries(insights.topics)
			.map(([topic, score]) => ({ topic, score: Number(score) }))
			.sort((a, b) => b.score - a.score)
			.slice(0, 5);
	});

	onMount(async () => {
		if ($userProgress?.studentId) {
			try {
				// Load insights, chat history, and study sessions
				const [insightsData, chats, sessions] = await Promise.all([
					db.getInsights($userProgress.studentId),
					db.getChatHistory($userProgress.studentId, 100),
					db.getStudySessions($userProgress.studentId, 30)
				]);

				insights = insightsData;
				chatHistory = chats;
				studySessions = sessions || [];
			} catch (error) {
				console.error('Failed to load analytics:', error);
			} finally {
				loading = false;
			}
		}
	});
</script>

<div class="space-y-6 pb-6">
	<!-- Page Header -->
	<div
		class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-6"
	>
		<h1 class="text-2xl font-bold text-purple-800">📊 Analytics Dashboard</h1>
		<p class="mt-2 text-sm text-purple-600">Lihat progress belajar dan pola minatmu di sini!</p>
	</div>

	{#if loading}
		<!-- Loading State -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each Array.from({ length: 6 }, (_, i) => i) as idx (idx)}
				<div class="animate-pulse rounded-2xl border-2 border-gray-200 bg-gray-100 p-6">
					<div class="mb-2 h-4 w-3/4 rounded bg-gray-300"></div>
					<div class="h-8 w-1/2 rounded bg-gray-300"></div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Stats Cards -->
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<!-- Total Points -->
			<div
				class="group rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-6 transition-all hover:scale-105 hover:shadow-lg"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-yellow-700">Total Points</p>
						<p class="mt-2 text-3xl font-bold text-yellow-800">{$userProgress?.points || 0}</p>
					</div>
					<div class="text-4xl transition-transform group-hover:scale-110">⭐</div>
				</div>
			</div>

			<!-- Level -->
			<div
				class="group rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 p-6 transition-all hover:scale-105 hover:shadow-lg"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-purple-700">Current Level</p>
						<p class="mt-2 text-3xl font-bold text-purple-800">{$userProgress?.level || 1}</p>
					</div>
					<div class="text-4xl transition-transform group-hover:scale-110">🚀</div>
				</div>
			</div>

			<!-- Total Chats -->
			<div
				class="group rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-6 transition-all hover:scale-105 hover:shadow-lg"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-blue-700">Total Chats</p>
						<p class="mt-2 text-3xl font-bold text-blue-800">{totalChats}</p>
					</div>
					<div class="text-4xl transition-transform group-hover:scale-110">💬</div>
				</div>
			</div>

			<!-- Achievements -->
			<div
				class="group rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 transition-all hover:scale-105 hover:shadow-lg"
			>
				<div class="flex items-center justify-between">
					<div>
						<p class="text-sm font-medium text-green-700">Achievements</p>
						<p class="mt-2 text-3xl font-bold text-green-800">
							{$userProgress?.achievements.filter((a) => a.unlocked).length || 0}
						</p>
					</div>
					<div class="text-4xl transition-transform group-hover:scale-110">🏆</div>
				</div>
			</div>
		</div>

		<!-- Charts Row 1: Study Time + Mood -->
		<div class="grid gap-6 lg:grid-cols-2">
			<!-- Study Time Chart -->
			<StudyTimeChart
				sessions={studySessions.map((s) => ({
					date: s.started_at,
					minutes: s.duration_minutes,
					subject: s.subject
				}))}
			/>

			<!-- Mood Timeline -->
			<MoodTimeline
				moodTrend={(insights?.sentiment_trend as Array<{
					date: string;
					mood: string;
					confidence: number;
				}>) || []}
			/>
		</div>

		<!-- Charts Row 2: Interest Radar -->
		<div class="grid gap-6 lg:grid-cols-1">
			<!-- Interest Radar Chart -->
			<InterestRadarChart interests={topicsDiscussed} />

			<!-- Learning Style -->
			<div class="rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-lg">
				<h3 class="mb-4 text-lg font-bold text-blue-800">📚 Learning Profile</h3>

				<div class="space-y-4">
					<!-- Learning Style -->
					<div
						class="rounded-xl border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-4"
					>
						<p class="text-xs font-medium text-blue-600">Learning Style</p>
						<p class="mt-1 text-lg font-bold text-blue-800 capitalize">
							{insights?.learning_style || 'Analyzing...'}
							{#if insights?.learning_style === 'visual'}
								👁️
							{:else if insights?.learning_style === 'auditory'}
								👂
							{:else if insights?.learning_style === 'kinesthetic'}
								✋
							{:else}
								🔍
							{/if}
						</p>
					</div>

					<!-- Study Sessions -->
					<div
						class="rounded-xl border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 p-4"
					>
						<p class="text-xs font-medium text-purple-600">Study Sessions</p>
						<p class="mt-1 text-lg font-bold text-purple-800">
							{insights?.study_schedule?.length || 0} planned
						</p>
					</div>

					<!-- Completion Rate -->
					<div
						class="rounded-xl border-2 border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-4"
					>
						<p class="text-xs font-medium text-green-600">Completion Rate</p>
						<p class="mt-1 text-lg font-bold text-green-800">
							{Math.round((insights?.completion_rate || 0) * 100)}%
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Subjects Progress -->
		{#if insights?.subjects && Array.isArray(insights.subjects) && insights.subjects.length > 0}
			<div class="rounded-2xl border-2 border-pink-200 bg-white p-6 shadow-lg">
				<h3 class="mb-4 text-lg font-bold text-pink-800">📖 Subject Progress</h3>

				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each insights.subjects as subject (subject.name)}
						{@const subjectData = subject as { name: string; hours: number; progress: number }}
						<div
							class="group rounded-xl border-2 border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 p-4 transition-all hover:scale-105"
						>
							<div class="mb-2 flex items-center justify-between">
								<p class="font-bold text-pink-800">{subjectData.name}</p>
								<span class="text-xs text-pink-600">{subjectData.hours}h</span>
							</div>
							<div class="h-2 overflow-hidden rounded-full bg-pink-200">
								<div
									class="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500"
									style="width: {subjectData.progress}%"
								></div>
							</div>
							<p class="mt-1 text-xs text-pink-600">{subjectData.progress}% complete</p>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Recent Activity -->
		<div class="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg">
			<h3 class="mb-4 text-lg font-bold text-gray-800">🕐 Recent Activity</h3>

			{#if chatHistory.length > 0}
				<div class="space-y-2">
					{#each chatHistory.slice(-10).reverse() as chat (chat.id)}
						<div
							class="flex items-start gap-3 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-all hover:bg-gray-100"
						>
							<div class="flex-shrink-0">
								{#if chat.type === 'user'}
									<div
										class="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm"
									>
										👤
									</div>
								{:else}
									<div
										class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm"
									>
										🤖
									</div>
								{/if}
							</div>
							<div class="min-w-0 flex-1">
								<p class="text-xs text-gray-500">
									{new Date(chat.created_at || new Date()).toLocaleString('id-ID', {
										day: 'numeric',
										month: 'short',
										hour: '2-digit',
										minute: '2-digit'
									})}
								</p>
								<p class="mt-1 text-sm text-gray-700">{chat.message}</p>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="py-8 text-center">
					<p class="text-sm text-gray-500">Belum ada aktivitas. Mulai chat dengan AI Mentor! 💬</p>
				</div>
			{/if}
		</div>
	{/if}
</div>
