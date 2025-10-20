<script lang="ts">
	/**
	 * Reusable Help Chat Box Component
	 *
	 * A compact, non-intrusive help widget that appears in the bottom-right corner.
	 * Can be used anywhere in the app to provide contextual help, tips, or hints.
	 *
	 * Future: Can be integrated with AI chat for real-time assistance.
	 *
	 * @component
	 */

	export interface HelpSection {
		title: string;
		icon: string;
		content: string | { label: string; value: string }[];
		color: 'indigo' | 'purple' | 'green' | 'orange' | 'blue' | 'pink';
	}

	interface Props {
		/** Title of the help chat box */
		title?: string;
		/** Icon for the header */
		headerIcon?: string;
		/** Array of help sections to display */
		sections: HelpSection[];
		/** Whether the chat box is visible */
		isOpen: boolean;
		/** Callback when close is requested */
		onClose: () => void;
	}

	let {
		title = 'Bantuan',
		headerIcon = '💡',
		sections,
		isOpen = $bindable(),
		onClose
	}: Props = $props();

	// Color mappings for sections
	const colorClasses = {
		indigo: 'bg-indigo-50',
		purple: 'bg-purple-50',
		green: 'bg-green-50',
		orange: 'bg-orange-50',
		blue: 'bg-blue-50',
		pink: 'bg-pink-50'
	};

	function handleClose() {
		isOpen = false;
		onClose();
	}
</script>

{#if isOpen}
	<div class="help-chat-box">
		<!-- Header -->
		<div
			class="flex items-center justify-between border-b-2 border-purple-200 bg-gradient-to-r from-purple-500 to-pink-500 p-3 text-white"
		>
			<div class="flex items-center gap-2">
				<span class="text-lg">{headerIcon}</span>
				<h3 class="text-sm font-bold">{title}</h3>
			</div>
			<button
				onclick={handleClose}
				class="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
				aria-label="Close help"
			>
				✕
			</button>
		</div>

		<!-- Content (Scrollable) -->
		<div class="max-h-96 space-y-3 overflow-y-auto p-4">
			{#each sections as section (section.title)}
				<div class="rounded-lg {colorClasses[section.color]} p-3">
					<!-- Section Title -->
					<p class="mb-2 flex items-center gap-1 text-xs font-semibold text-gray-900">
						<span>{section.icon}</span>
						<span>{section.title}</span>
					</p>

					<!-- Section Content -->
					{#if typeof section.content === 'string'}
						<!-- Simple text content -->
						<p class="text-xs text-gray-700">{section.content}</p>
					{:else}
						<!-- Key-value pairs (e.g., email examples) -->
						<div class="space-y-1.5">
							{#each section.content as item (item.label)}
								<div class="rounded bg-white p-2">
									<p
										class="mb-0.5 text-xs font-semibold {section.color === 'indigo'
											? 'text-indigo-600'
											: section.color === 'purple'
												? 'text-purple-600'
												: section.color === 'green'
													? 'text-green-600'
													: section.color === 'orange'
														? 'text-orange-600'
														: section.color === 'blue'
															? 'text-blue-600'
															: 'text-pink-600'}"
									>
										{item.label}
									</p>
									<code class="text-xs text-gray-900">{item.value}</code>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style lang="postcss">
	@reference "tailwindcss";

	/* Help Chat Box - Bottom Right Corner */
	.help-chat-box {
		position: fixed;
		bottom: 1.5rem;
		right: 1.5rem;
		z-index: 9999;
		width: 320px;
		max-width: calc(100vw - 3rem);
		background: white;
		border-radius: 1rem;
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 8px 10px -6px rgba(0, 0, 0, 0.1);
		animation: slideInRight 0.3s ease-out;
		overflow: hidden;
	}

	@keyframes slideInRight {
		from {
			opacity: 0;
			transform: translateX(100px) translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateX(0) translateY(0);
		}
	}

	/* Mobile responsiveness */
	@media (max-width: 640px) {
		.help-chat-box {
			bottom: 1rem;
			right: 1rem;
			width: calc(100vw - 2rem);
		}
	}
</style>
