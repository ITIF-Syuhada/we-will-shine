<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { appSettings } from '$lib/stores/settings';
	import { supabase } from '$lib/supabase';
	import { env } from '$env/dynamic/public';

	let saved = $state(false);
	let dbTesting = $state(false);
	let dbTestResult = $state<{ success: boolean; message: string } | null>(null);

	// Local state untuk form
	let provider = $state($appSettings.ai.provider);
	let apiKey = $state($appSettings.ai.apiKey);
	let customUrl = $state($appSettings.ai.customUrl || '');
	let model = $state($appSettings.ai.model || 'gpt-4');
	let temperature = $state($appSettings.ai.temperature || 0.7);
	let maxTokens = $state($appSettings.ai.maxTokens || 500);

	// Notification settings
	let notifEnabled = $state($appSettings.notifications.enabled);
	let studyReminders = $state($appSettings.notifications.studyReminders);
	let achievementNotif = $state($appSettings.notifications.achievements);
	let dailyMotivation = $state($appSettings.notifications.dailyMotivation);

	// API Integration (PT Koneksi Sistem Akademik)
	let apiIntegrationKey = $state('');
	let apiIntegrationUrl = $state('');
	let apiTesting = $state(false);
	let apiTestResult = $state<{ success: boolean; message: string } | null>(null);

	// Load API settings from localStorage on mount
	onMount(() => {
		if (browser) {
			apiIntegrationKey = localStorage.getItem('koneksi-api-key') || '';
			apiIntegrationUrl = localStorage.getItem('koneksi-api-url') || '';
		}
	});

	function saveSettings() {
		appSettings.updateAI({
			provider,
			apiKey,
			customUrl,
			model,
			temperature,
			maxTokens
		});

		appSettings.updateNotifications({
			enabled: notifEnabled,
			studyReminders,
			achievements: achievementNotif,
			dailyMotivation
		});

		// Save API Integration (only in browser)
		if (browser) {
			localStorage.setItem('koneksi-api-key', apiIntegrationKey);
			localStorage.setItem('koneksi-api-url', apiIntegrationUrl);
		}

		saved = true;
		setTimeout(() => (saved = false), 3000);
	}

	async function testApiIntegration() {
		if (!apiIntegrationUrl || !apiIntegrationKey) {
			apiTestResult = {
				success: false,
				message: '❌ API URL dan Key harus diisi!'
			};
			return;
		}

		apiTesting = true;
		apiTestResult = null;

		try {
			const response = await fetch(`${apiIntegrationUrl}/health`, {
				headers: {
					Authorization: `Bearer ${apiIntegrationKey}`,
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				apiTestResult = {
					success: true,
					message: '✅ API Connection successful!'
				};
			} else {
				apiTestResult = {
					success: false,
					message: `❌ API returned status ${response.status}`
				};
			}
		} catch (err) {
			apiTestResult = {
				success: false,
				message: `❌ Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`
			};
		} finally {
			apiTesting = false;
		}
	}

	function resetSettings() {
		if (confirm('Reset semua pengaturan ke default?')) {
			appSettings.reset();
			// Reload values
			provider = $appSettings.ai.provider;
			apiKey = $appSettings.ai.apiKey;
			customUrl = $appSettings.ai.customUrl || '';
			model = $appSettings.ai.model || 'gpt-4';
			temperature = $appSettings.ai.temperature || 0.7;
			maxTokens = $appSettings.ai.maxTokens || 500;
			saved = true;
			setTimeout(() => (saved = false), 3000);
		}
	}

	async function testDatabaseConnection() {
		dbTesting = true;
		dbTestResult = null;

		try {
			// Test 1: Check environment variables
			const supabaseUrl = env.PUBLIC_SUPABASE_URL;
			const supabaseKey = env.PUBLIC_SUPABASE_ANON_KEY;

			if (!supabaseUrl || !supabaseKey) {
				dbTestResult = {
					success: false,
					message: '❌ Environment variables not configured! Check .env file.'
				};
				return;
			}

			// Test 2: Try to connect to Supabase and check tables
			const { error: tableError } = await supabase.from('students').select('id').limit(1);

			if (tableError) {
				dbTestResult = {
					success: false,
					message: `⚠️ Database error: ${tableError.message}. Check if migrations are run.`
				};
				return;
			}

			// Success!
			dbTestResult = {
				success: true,
				message: '✅ Database connection successful! All tables accessible.'
			};
		} catch (err) {
			dbTestResult = {
				success: false,
				message: `❌ Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`
			};
		} finally {
			dbTesting = false;
		}
	}
</script>

<svelte:head>
	<title>Settings - We Will Shine</title>
</svelte:head>

<div class="space-y-6 pb-6">
	<!-- Page Header -->
	<div
		class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-6"
	>
		<h1 class="text-2xl font-bold text-purple-800">⚙️ Settings</h1>
		<p class="mt-2 text-sm text-purple-600">Konfigurasi AI API dan preferensi aplikasi</p>
	</div>

	{#if saved}
		<!-- Success Toast -->
		<div
			class="animate-in fade-in slide-in-from-top-2 rounded-2xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 shadow-lg"
		>
			<div class="flex items-center gap-3">
				<span class="text-2xl">✅</span>
				<div>
					<p class="font-bold text-green-800">Settings Saved!</p>
					<p class="text-sm text-green-600">Pengaturan berhasil disimpan</p>
				</div>
			</div>
		</div>
	{/if}

	<!-- AI Configuration -->
	<div class="rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-lg">
		<h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-blue-800">
			<span>🤖</span>
			<span>AI Configuration</span>
		</h2>

		<div class="space-y-4">
			<!-- AI Provider -->
			<div>
				<label for="ai-provider" class="mb-2 block text-sm font-semibold text-gray-700">
					AI Provider
				</label>
				<select
					id="ai-provider"
					bind:value={provider}
					class="w-full rounded-lg border-2 border-blue-200 px-4 py-3 transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
				>
					<option value="openai">🟢 OpenAI (ChatGPT)</option>
					<option value="claude">🟣 Anthropic (Claude)</option>
					<option value="gemini">🔵 Google (Gemini)</option>
					<option value="custom">🔧 Custom LLM</option>
				</select>
			</div>

			<!-- API Key -->
			{#if provider !== 'custom'}
				<div>
					<label for="api-key" class="mb-2 block text-sm font-semibold text-gray-700">
						API Key
						<span class="text-xs text-gray-500">(Required)</span>
					</label>
					<input
						id="api-key"
						type="password"
						bind:value={apiKey}
						placeholder="sk-..."
						class="w-full rounded-lg border-2 border-blue-200 px-4 py-3 font-mono text-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
					/>
					<p class="mt-1 text-xs text-gray-500">
						{#if provider === 'openai'}
							Get from: <a
								href="https://platform.openai.com/api-keys"
								target="_blank"
								class="text-blue-600 hover:underline">OpenAI Dashboard</a
							>
						{:else if provider === 'claude'}
							Get from: <a
								href="https://console.anthropic.com/"
								target="_blank"
								class="text-purple-600 hover:underline">Anthropic Console</a
							>
						{:else if provider === 'gemini'}
							Get from: <a
								href="https://makersuite.google.com/app/apikey"
								target="_blank"
								class="text-blue-600 hover:underline">Google AI Studio</a
							>
						{/if}
					</p>
				</div>
			{/if}

			<!-- Custom LLM URL -->
			{#if provider === 'custom'}
				<div>
					<label for="custom-url" class="mb-2 block text-sm font-semibold text-gray-700">
						Custom LLM URL
					</label>
					<input
						id="custom-url"
						type="url"
						bind:value={customUrl}
						placeholder="http://localhost:11434/api/generate"
						class="w-full rounded-lg border-2 border-blue-200 px-4 py-3 font-mono text-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
					/>
					<p class="mt-1 text-xs text-gray-500">
						Example: Ollama, LM Studio, atau custom API endpoint
					</p>
				</div>

				<div>
					<label for="custom-api-key" class="mb-2 block text-sm font-semibold text-gray-700">
						API Key (Optional)
					</label>
					<input
						id="custom-api-key"
						type="password"
						bind:value={apiKey}
						placeholder="Optional for custom LLM"
						class="w-full rounded-lg border-2 border-blue-200 px-4 py-3 font-mono text-sm transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
					/>
				</div>
			{/if}

			<!-- Model Selection -->
			<div>
				<label for="model" class="mb-2 block text-sm font-semibold text-gray-700"> Model </label>
				<select
					id="model"
					bind:value={model}
					class="w-full rounded-lg border-2 border-blue-200 px-4 py-3 transition-all focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
				>
					{#if provider === 'openai'}
						<option value="gpt-4">GPT-4 (Most Capable)</option>
						<option value="gpt-4-turbo">GPT-4 Turbo (Faster)</option>
						<option value="gpt-3.5-turbo">GPT-3.5 Turbo (Budget)</option>
					{:else if provider === 'claude'}
						<option value="claude-3-opus">Claude 3 Opus (Most Capable)</option>
						<option value="claude-3-sonnet">Claude 3 Sonnet (Balanced)</option>
						<option value="claude-3-haiku">Claude 3 Haiku (Fast)</option>
					{:else if provider === 'gemini'}
						<option value="gemini-pro">Gemini Pro</option>
						<option value="gemini-ultra">Gemini Ultra</option>
					{:else}
						<option value="custom">Custom Model</option>
						<option value="llama2">LLaMA 2</option>
						<option value="mistral">Mistral</option>
					{/if}
				</select>
			</div>

			<!-- Advanced Settings -->
			<details class="rounded-lg border-2 border-blue-100 bg-blue-50 p-4">
				<summary class="cursor-pointer font-semibold text-blue-800"> 🔧 Advanced Settings </summary>

				<div class="mt-4 space-y-4">
					<!-- Temperature -->
					<div>
						<label for="temperature" class="mb-2 block text-sm font-semibold text-gray-700">
							Temperature: <span class="font-mono text-blue-600">{temperature}</span>
						</label>
						<input
							id="temperature"
							type="range"
							bind:value={temperature}
							min="0"
							max="1"
							step="0.1"
							class="w-full"
						/>
						<div class="mt-1 flex justify-between text-xs text-gray-500">
							<span>Precise (0)</span>
							<span>Creative (1)</span>
						</div>
					</div>

					<!-- Max Tokens -->
					<div>
						<label for="max-tokens" class="mb-2 block text-sm font-semibold text-gray-700">
							Max Tokens: <span class="font-mono text-blue-600">{maxTokens}</span>
						</label>
						<input
							id="max-tokens"
							type="range"
							bind:value={maxTokens}
							min="100"
							max="2000"
							step="100"
							class="w-full"
						/>
						<div class="mt-1 flex justify-between text-xs text-gray-500">
							<span>Short (100)</span>
							<span>Long (2000)</span>
						</div>
					</div>
				</div>
			</details>

			<!-- About AI Providers Accordion -->
			<details
				class="rounded-lg border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-4"
			>
				<summary class="cursor-pointer font-semibold text-blue-800">
					💡 About AI Providers
				</summary>
				<div class="border-t border-yellow-200 p-4">
					<div class="space-y-2 text-sm text-gray-700">
						<div class="rounded-lg bg-white/60 p-3">
							<p class="font-bold text-green-700">🟢 OpenAI (ChatGPT)</p>
							<p class="text-xs text-gray-600">Best for: General knowledge, Indonesian support</p>
							<p class="text-xs text-gray-500">Cost: $$$ | Quality: ⭐⭐⭐⭐⭐</p>
						</div>

						<div class="rounded-lg bg-white/60 p-3">
							<p class="font-bold text-purple-700">🟣 Claude (Anthropic)</p>
							<p class="text-xs text-gray-600">Best for: Long conversations, reasoning</p>
							<p class="text-xs text-gray-500">Cost: $$$ | Quality: ⭐⭐⭐⭐⭐</p>
						</div>

						<div class="rounded-lg bg-white/60 p-3">
							<p class="font-bold text-blue-700">🔵 Google Gemini</p>
							<p class="text-xs text-gray-600">Best for: Multimodal, fast responses</p>
							<p class="text-xs text-gray-500">Cost: $$ | Quality: ⭐⭐⭐⭐</p>
						</div>

						<div class="rounded-lg bg-white/60 p-3">
							<p class="font-bold text-gray-700">🔧 Custom LLM</p>
							<p class="text-xs text-gray-600">Best for: Privacy, local deployment, cost control</p>
							<p class="text-xs text-gray-500">Examples: Ollama, LM Studio, LocalAI</p>
						</div>
					</div>
				</div>
			</details>
		</div>
	</div>

	<!-- Database Configuration -->
	<div class="rounded-2xl border-2 border-green-200 bg-white p-6 shadow-lg">
		<h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-green-800">
			<span>🗄️</span>
			<span>Database Configuration</span>
		</h2>

		<div class="space-y-4">
			<!-- Database Info -->
			<div class="rounded-lg border-2 border-green-100 bg-green-50 p-4">
				<div class="mb-2 flex items-center gap-2">
					<span class="text-2xl">✅</span>
					<span class="font-bold text-green-800">Supabase Connected</span>
				</div>
				<div class="space-y-1 text-sm text-green-700">
					<p>
						<strong>URL:</strong>
						{env.PUBLIC_SUPABASE_URL || '❌ Not configured'}
					</p>
					<p>
						<strong>Key:</strong>
						{env.PUBLIC_SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Not configured'}
					</p>
				</div>
			</div>

			<!-- Test Connection Button -->
			<button
				onclick={testDatabaseConnection}
				disabled={dbTesting}
				class="w-full rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:opacity-50"
			>
				{#if dbTesting}
					<span class="flex items-center justify-center gap-2">
						<span class="animate-spin">⏳</span>
						<span>Testing Connection...</span>
					</span>
				{:else}
					🔌 Test Database Connection
				{/if}
			</button>

			<!-- Test Result -->
			{#if dbTestResult}
				<div
					class="rounded-lg border-2 p-4 {dbTestResult.success
						? 'border-green-200 bg-green-50'
						: 'border-red-200 bg-red-50'}"
				>
					<p
						class="text-sm font-semibold {dbTestResult.success ? 'text-green-800' : 'text-red-800'}"
					>
						{dbTestResult.message}
					</p>
				</div>
			{/if}

			<!-- GitHub Pages Instructions -->
			<details class="rounded-lg border-2 border-blue-100 bg-blue-50 p-4">
				<summary class="cursor-pointer font-semibold text-blue-800">
					📘 Setup untuk GitHub Pages
				</summary>
				<div class="mt-3 space-y-2 text-sm text-blue-700">
					<p><strong>⚠️ Important:</strong> GitHub Pages tidak support .env files!</p>
					<p>Gunakan salah satu metode berikut:</p>

					<div class="mt-3 space-y-2">
						<div class="rounded-lg bg-white p-3">
							<p class="font-bold">1️⃣ GitHub Secrets (Recommended)</p>
							<ol class="mt-1 ml-4 list-decimal space-y-1 text-xs">
								<li>Go to: Settings → Secrets and variables → Actions</li>
								<li>Add: <code class="rounded bg-gray-200 px-1">PUBLIC_SUPABASE_URL</code></li>
								<li>Add: <code class="rounded bg-gray-200 px-1">PUBLIC_SUPABASE_ANON_KEY</code></li>
								<li>Update workflow to inject secrets</li>
							</ol>
						</div>

						<div class="rounded-lg bg-white p-3">
							<p class="font-bold">2️⃣ Build-time Injection</p>
							<p class="text-xs">Set in GitHub Actions workflow:</p>
							<div class="mt-1 overflow-x-auto rounded bg-gray-800 p-2 text-xs text-green-400">
								<code>
									env:<br />
									&nbsp;&nbsp;PUBLIC_SUPABASE_URL: {'${{ secrets.PUBLIC_SUPABASE_URL }}'}<br />
									&nbsp;&nbsp;PUBLIC_SUPABASE_ANON_KEY: {'${{ secrets.PUBLIC_SUPABASE_ANON_KEY }}'}
								</code>
							</div>
						</div>

						<div class="rounded-lg bg-white p-3">
							<p class="font-bold">3️⃣ Hardcode (Not Recommended)</p>
							<p class="text-xs">
								Directly set values in <code class="rounded bg-gray-200 px-1"
									>src/lib/supabase.ts</code
								>
							</p>
							<p class="mt-1 text-xs text-red-600">⚠️ Only use this for public anon keys!</p>
						</div>
					</div>
				</div>
			</details>
		</div>
	</div>

	<!-- Notification Settings -->
	<div class="rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg">
		<h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-purple-800">
			<span>🔔</span>
			<span>Notifications</span>
		</h2>

		<div class="space-y-3">
			<!-- Enable Notifications -->
			<label
				class="flex cursor-pointer items-center justify-between rounded-lg border-2 border-purple-100 bg-purple-50 p-4 transition-all hover:bg-purple-100"
			>
				<div class="flex items-center gap-3">
					<span class="text-2xl">🔔</span>
					<div>
						<p class="font-semibold text-gray-800">Enable Notifications</p>
						<p class="text-xs text-gray-600">Master toggle untuk semua notifikasi</p>
					</div>
				</div>
				<input type="checkbox" bind:checked={notifEnabled} class="h-6 w-6 rounded" />
			</label>

			<div class="space-y-2 pl-4">
				<!-- Study Reminders -->
				<label
					class="flex cursor-pointer items-center justify-between rounded-lg border border-purple-100 bg-white p-3 transition-all hover:bg-purple-50"
				>
					<div class="flex items-center gap-2">
						<span>📚</span>
						<span class="text-sm font-medium text-gray-700">Study Reminders</span>
					</div>
					<input
						type="checkbox"
						bind:checked={studyReminders}
						disabled={!notifEnabled}
						class="h-5 w-5 rounded"
					/>
				</label>

				<!-- Achievement Notifications -->
				<label
					class="flex cursor-pointer items-center justify-between rounded-lg border border-purple-100 bg-white p-3 transition-all hover:bg-purple-50"
				>
					<div class="flex items-center gap-2">
						<span>🏆</span>
						<span class="text-sm font-medium text-gray-700">Achievement Unlocks</span>
					</div>
					<input
						type="checkbox"
						bind:checked={achievementNotif}
						disabled={!notifEnabled}
						class="h-5 w-5 rounded"
					/>
				</label>

				<!-- Daily Motivation -->
				<label
					class="flex cursor-pointer items-center justify-between rounded-lg border border-purple-100 bg-white p-3 transition-all hover:bg-purple-50"
				>
					<div class="flex items-center gap-2">
						<span>💪</span>
						<span class="text-sm font-medium text-gray-700">Daily Motivation</span>
					</div>
					<input
						type="checkbox"
						bind:checked={dailyMotivation}
						disabled={!notifEnabled}
						class="h-5 w-5 rounded"
					/>
				</label>
			</div>
		</div>
	</div>

	<!-- Maintenance & Updates -->
	<div class="rounded-2xl border-2 border-orange-200 bg-white p-6 shadow-lg">
		<h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-orange-800">
			<span>🔧</span>
			<span>Maintenance & Updates</span>
		</h2>

		<div class="space-y-4">
			<!-- Quick Links -->
			<div class="grid gap-3 sm:grid-cols-2">
				<!-- Migrate Student Codes -->
				<a
					href="/admin/migrate-codes"
					class="group flex items-center gap-3 rounded-lg border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-4 transition-all hover:scale-105 hover:shadow-md"
				>
					<div class="flex-shrink-0 rounded-full bg-orange-100 p-3">
						<span class="text-2xl">🔧</span>
					</div>
					<div class="flex-1">
						<p class="font-bold text-orange-800">Migrate Student Codes</p>
						<p class="text-xs text-orange-600">Update code formats</p>
					</div>
					<span class="text-orange-600">→</span>
				</a>

				<!-- Repository Updates -->
				<a
					href="https://github.com/ITIF-Syuhada/we-will-shine"
					target="_blank"
					class="group flex items-center gap-3 rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 transition-all hover:scale-105 hover:shadow-md"
				>
					<div class="flex-shrink-0 rounded-full bg-blue-100 p-3">
						<span class="text-2xl">📦</span>
					</div>
					<div class="flex-1">
						<p class="font-bold text-blue-800">Repository Updates</p>
						<p class="text-xs text-blue-600">Check for new features</p>
					</div>
					<span class="text-blue-600">↗</span>
				</a>
			</div>
		</div>
	</div>

	<!-- API Integration (PT Koneksi) -->
	<div class="rounded-2xl border-2 border-indigo-200 bg-white p-6 shadow-lg">
		<h2 class="mb-4 flex items-center gap-2 text-xl font-bold text-indigo-800">
			<span>🔗</span>
			<span>API Integration</span>
		</h2>

		<div class="mb-4 rounded-lg border-2 border-indigo-100 bg-indigo-50 p-4">
			<p class="mb-2 font-bold text-indigo-800">PT Koneksi Jaringan Indonesia - Sistem Akademik</p>
			<p class="text-sm text-indigo-700">
				Connect ke Sistem Akademik untuk sinkronisasi data siswa, nilai, dan absensi
			</p>
		</div>

		<div class="space-y-4">
			<!-- API URL -->
			<div>
				<label for="api-url" class="mb-2 block text-sm font-semibold text-gray-700">
					API Base URL
				</label>
				<input
					id="api-url"
					type="url"
					bind:value={apiIntegrationUrl}
					placeholder="https://api.koneksi.co.id/v1"
					class="w-full rounded-lg border-2 border-indigo-200 px-4 py-3 font-mono text-sm transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
				/>
				<p class="mt-1 text-xs text-gray-500">Base URL dari Sistem Akademik PT Koneksi</p>
			</div>

			<!-- API Key -->
			<div>
				<label for="api-integration-key" class="mb-2 block text-sm font-semibold text-gray-700">
					API Key
				</label>
				<input
					id="api-integration-key"
					type="password"
					bind:value={apiIntegrationKey}
					placeholder="koneksi_xxxxxxxxxxxxx"
					class="w-full rounded-lg border-2 border-indigo-200 px-4 py-3 font-mono text-sm transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
				/>
				<p class="mt-1 text-xs text-gray-500">
					Dapatkan API key dari administrator Sistem Akademik
				</p>
			</div>

			<!-- Test Connection Button -->
			<button
				onclick={testApiIntegration}
				disabled={apiTesting}
				class="w-full rounded-xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 disabled:opacity-50"
			>
				{#if apiTesting}
					<span class="flex items-center justify-center gap-2">
						<span class="animate-spin">⏳</span>
						<span>Testing Connection...</span>
					</span>
				{:else}
					🔌 Test API Connection
				{/if}
			</button>

			<!-- Test Result -->
			{#if apiTestResult}
				<div
					class="rounded-lg border-2 p-4 {apiTestResult.success
						? 'border-green-200 bg-green-50'
						: 'border-red-200 bg-red-50'}"
				>
					<p
						class="text-sm font-semibold {apiTestResult.success
							? 'text-green-800'
							: 'text-red-800'}"
					>
						{apiTestResult.message}
					</p>
				</div>
			{/if}

			<!-- API Features Info -->
			<details class="rounded-lg border-2 border-blue-100 bg-blue-50 p-4">
				<summary class="cursor-pointer font-semibold text-blue-800">
					📘 Fitur Integrasi API
				</summary>
				<div class="mt-3 space-y-2 text-sm text-blue-700">
					<p><strong>Fitur yang tersedia:</strong></p>
					<ul class="ml-5 list-disc space-y-1">
						<li>Sinkronisasi data siswa (nama, kelas, rombel)</li>
						<li>Import nilai dari sistem akademik</li>
						<li>Sinkronisasi absensi</li>
						<li>Export progress belajar ke sistem akademik</li>
						<li>Real-time data updates</li>
					</ul>
					<p class="mt-3 text-xs text-gray-600">
						<strong>Note:</strong> Hubungi tim IT PT Koneksi untuk mendapatkan akses API
					</p>
				</div>
			</details>
		</div>
	</div>

	<!-- Action Buttons -->
	<div class="flex gap-3">
		<button
			onclick={saveSettings}
			class="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
		>
			💾 Save Settings
		</button>

		<button
			onclick={resetSettings}
			class="rounded-xl border-2 border-gray-300 bg-white px-6 py-4 font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
		>
			🔄 Reset
		</button>
	</div>

	<!-- Security Note -->
	<div class="rounded-lg border-2 border-dashed border-orange-200 bg-orange-50 p-4">
		<p class="text-center text-xs text-orange-700">
			🔒 <strong>Security:</strong> API keys disimpan di browser (localStorage) Anda. Tidak dikirim ke
			server kami. Jaga kerahasiaan API key Anda!
		</p>
	</div>
</div>
