<script lang="ts">
	import { adminStore } from '$lib/stores/admin';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Admin Dashboard</title>
</svelte:head>

<div class="space-y-6 pb-6">
	<!-- Page Header -->
	<div
		class="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-pink-100 p-6 shadow-lg"
	>
		<h1 class="text-2xl font-bold text-purple-800">🏠 Admin Dashboard</h1>
		<p class="text-sm text-purple-600">
			Welcome, <span class="font-bold">{$adminStore?.name || 'Admin'}</span> •
			<span class="capitalize">{$adminStore?.role || 'admin'}</span>
		</p>
	</div>

	<!-- Quick Actions Grid -->
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		<!-- Overview -->
		<a
			href="{base}/admin/overview"
			class="group rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
		>
			<div class="mb-4 flex items-center justify-between">
				<div class="rounded-full bg-blue-100 p-4 transition-transform group-hover:scale-110">
					<span class="text-3xl">📊</span>
				</div>
				<span class="text-sm text-blue-600">→</span>
			</div>
			<h3 class="mb-2 text-xl font-bold text-blue-800">Overview</h3>
			<p class="text-sm text-gray-600">Student list & statistics</p>
		</a>

		<!-- Analytics -->
		<a
			href="{base}/admin/analytics"
			class="group rounded-2xl border-2 border-purple-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
		>
			<div class="mb-4 flex items-center justify-between">
				<div class="rounded-full bg-purple-100 p-4 transition-transform group-hover:scale-110">
					<span class="text-3xl">📈</span>
				</div>
				<span class="text-sm text-purple-600">→</span>
			</div>
			<h3 class="mb-2 text-xl font-bold text-purple-800">Analytics</h3>
			<p class="text-sm text-gray-600">Platform insights & metrics</p>
		</a>

		<!-- Students -->
		<a
			href="{base}/admin/students"
			class="group rounded-2xl border-2 border-green-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
		>
			<div class="mb-4 flex items-center justify-between">
				<div class="rounded-full bg-green-100 p-4 transition-transform group-hover:scale-110">
					<span class="text-3xl">👥</span>
				</div>
				<span class="text-sm text-green-600">→</span>
			</div>
			<h3 class="mb-2 text-xl font-bold text-green-800">Students</h3>
			<p class="text-sm text-gray-600">Manage student accounts</p>
		</a>

		<!-- Settings -->
		<a
			href="{base}/admin/settings"
			class="group rounded-2xl border-2 border-yellow-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
		>
			<div class="mb-4 flex items-center justify-between">
				<div class="rounded-full bg-yellow-100 p-4 transition-transform group-hover:scale-110">
					<span class="text-3xl">⚙️</span>
				</div>
				<span class="text-sm text-yellow-600">→</span>
			</div>
			<h3 class="mb-2 text-xl font-bold text-yellow-800">Settings</h3>
			<p class="text-sm text-gray-600">AI API & app configuration</p>
		</a>

		<!-- QR Generator -->
		<a
			href="{base}/admin/qr-generator"
			class="group rounded-2xl border-2 border-pink-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
		>
			<div class="mb-4 flex items-center justify-between">
				<div class="rounded-full bg-pink-100 p-4 transition-transform group-hover:scale-110">
					<span class="text-3xl">📱</span>
				</div>
				<span class="text-sm text-pink-600">→</span>
			</div>
			<h3 class="mb-2 text-xl font-bold text-pink-800">QR Generator</h3>
			<p class="text-sm text-gray-600">Generate student access codes</p>
		</a>

		<!-- Auth Management -->
		<a
			href="{base}/admin/auth"
			class="group rounded-2xl border-2 border-red-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
		>
			<div class="mb-4 flex items-center justify-between">
				<div class="rounded-full bg-red-100 p-4 transition-transform group-hover:scale-110">
					<span class="text-3xl">🔐</span>
				</div>
				<span class="text-sm text-red-600">→</span>
			</div>
			<h3 class="mb-2 text-xl font-bold text-red-800">Auth Management</h3>
			<p class="text-sm text-gray-600">Manage admin accounts</p>
		</a>

		<!-- Migrate Codes -->
		<a
			href="{base}/admin/migrate-codes"
			class="group rounded-2xl border-2 border-orange-200 bg-white p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
		>
			<div class="mb-4 flex items-center justify-between">
				<div class="rounded-full bg-orange-100 p-4 transition-transform group-hover:scale-110">
					<span class="text-3xl">🔧</span>
				</div>
				<span class="text-sm text-orange-600">→</span>
			</div>
			<h3 class="mb-2 text-xl font-bold text-orange-800">Migrate Codes</h3>
			<p class="text-sm text-gray-600">Update student code formats</p>
		</a>
	</div>

	<!-- Quick Stats -->
	<div class="mt-6 rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg">
		<h3 class="mb-4 text-lg font-bold text-gray-800">📌 System Status</h3>
		<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg bg-green-50 p-3 text-center">
				<p class="text-xs text-green-600">Database</p>
				<p class="text-sm font-bold text-green-700">✅ Connected</p>
			</div>
			<div class="rounded-lg bg-blue-50 p-3 text-center">
				<p class="text-xs text-blue-600">Migrations</p>
				<p class="text-sm font-bold text-blue-700">✅ Applied</p>
			</div>
			<div class="rounded-lg bg-purple-50 p-3 text-center">
				<p class="text-xs text-purple-600">AI Mentor</p>
				<p class="text-sm font-bold text-purple-700">✅ Active</p>
			</div>
			<div class="rounded-lg bg-yellow-50 p-3 text-center">
				<p class="text-xs text-yellow-600">Student Portal</p>
				<p class="text-sm font-bold text-yellow-700">✅ Online</p>
			</div>
		</div>
	</div>
</div>
