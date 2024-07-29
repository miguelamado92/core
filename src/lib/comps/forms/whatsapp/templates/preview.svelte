<script lang="ts">
	import { type Read } from '$lib/schema/communications/whatsapp/template';
	const { template, selected }: { template: Read | undefined; selected: boolean } = $props();
	import Reply from 'lucide-svelte/icons/reply';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Phone from 'lucide-svelte/icons/phone';
	import MessageFrame from '$lib/comps/forms/whatsapp/MessageFrame.svelte';
</script>

{#if template}
	<div class="flex justify-center">
		<MessageFrame selected>
			{#each template.message.components as component}
				{#if component.type === 'HEADER'}
					{#if component.format === 'TEXT'}
						<div class="font-bold padding">{component.text}</div>
					{/if}
					{#if component.format === 'IMAGE'}
						<div class="rounded-t-lg cover w-full">
							<img
								src="https://placehold.it/400x300"
								class="rounded-t-lg object-cover max-h-screen"
								alt="Placeholder"
							/>
						</div>
					{/if}
					{#if component.format === 'VIDEO'}
						<div class="rounded-t-lg cover w-full">
							<img
								src="https://placehold.it/400x300"
								class="rounded-t-lg object-cover max-h-screen"
								alt="Video thumbnail placeholder"
							/>
						</div>
					{/if}
				{/if}

				{#if component.type === 'BODY'}
					<div class="padding text-sm">{component.text}</div>
				{/if}
				{#if component.type === 'FOOTER'}
					<div class="padding text-xs text-muted-foreground">{component.text}</div>
				{/if}
				{#if component.type === 'BUTTONS'}
					{#each component.buttons as button}
						<div
							class="border-t flex justify-center items-center gap-2 text-blue-600 padding cursor-pointer hover:bg-slate-100"
						>
							{#if button.type === 'QUICK_REPLY'}
								<Reply size={20} />
							{:else if button.type === 'URL'}
								<ExternalLink size={18} />
							{:else}
								<Phone size={20} />
							{/if}
							<div>{button.text}</div>
						</div>
					{/each}
				{/if}
			{/each}
		</MessageFrame>
	</div>
{/if}

<style lang="postcss">
	.padding {
		@apply py-1.5 px-3;
	}
</style>
