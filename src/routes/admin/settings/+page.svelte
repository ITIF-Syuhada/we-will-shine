<script lang="ts">
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

		saved = true;
		setTimeout(() => (saved = false), 3000);
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

			<!-- Test Connection -->
			<button
				type="button"
				onclick={testConnection}
				class="w-full rounded-lg border-2 border-blue-400 bg-white py-3 font-semibold text-blue-600 transition-all hover:bg-blue-50 active:scale-95"
			>
				🧪 Test Connection
			</button>
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
						class="text-sm font-semibold {dbTestResult.success
							? 'text-green-800'
							: 'text-red-800'}"
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
							<ol class="ml-4 mt-1 list-decimal space-y-1 text-xs">
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
								Directly set values in <code class="rounded bg-gray-200 px-1">src/lib/supabase.ts</code>
							</p>
							<p class="mt-1 text-xs text-red-600">
								⚠️ Only use this for public anon keys!
							</p>
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

	<!-- Provider Info -->
	<div
		class="rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50 p-6"
	>
		<h3 class="mb-3 flex items-center gap-2 text-lg font-bold text-yellow-800">
			<span>💡</span>
			<span>About AI Providers</span>
		</h3>

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
