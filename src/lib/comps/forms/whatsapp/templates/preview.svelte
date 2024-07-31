<script lang="ts">
	import { type Read } from '$lib/schema/communications/whatsapp/template';
	import { type Template as TemplateType } from '$lib/schema/communications/whatsapp/elements/template_message';

	import {
		extractComponents,
		extractTemplateMessageParams,
		templateMessageParamsIndexes,
		interpolateTextParams
	} from '$lib/comps/forms/whatsapp/templates/components';
	const {
		template,
		selected,
		components
	}: {
		template: Read | undefined;
		selected: boolean;
		components: TemplateType['components'];
	} = $props();
	import Reply from 'lucide-svelte/icons/reply';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import Phone from 'lucide-svelte/icons/phone';
	import Frame from '$lib/comps/forms/whatsapp/Frame.svelte';
	const templateMessageParams = $derived(extractTemplateMessageParams(components));
	const templateParamIndexes = $derived(templateMessageParamsIndexes(components));
</script>

{#if template}
	{@const templateComps = extractComponents(template.message.components)}
	<Frame {selected} removePadding={true} messageId={`TEMPLATE:${template.id}`}>
		{#if templateComps.header && templateMessageParams.header}
			{#if templateComps.header.format === 'TEXT'}
				<div class="font-bold padding">
					{interpolateTextParams(
						templateComps.header.text,
						templateMessageParams.header?.parameters
					)}
				</div>
			{/if}
			{#if templateComps.header.format === 'IMAGE' && templateMessageParams.header.parameters[0].type === 'image'}
				<div class="rounded-t-lg cover w-full">
					<img
						src={templateMessageParams.header.parameters[0].image.link}
						class="rounded-t-lg object-cover max-h-screen"
						alt={templateMessageParams.header.parameters[0].image.caption}
					/>
				</div>
			{/if}
			{#if templateComps.header.format === 'VIDEO' && templateMessageParams.header.parameters[0].type === 'video'}
				<div class="rounded-t-lg cover w-full">
					<img
						src={templateMessageParams.header.parameters[0].video.link}
						class="rounded-t-lg object-cover max-h-screen"
						alt={templateMessageParams.header.parameters[0].video.caption}
					/>
				</div>
			{/if}
		{/if}
		{#if templateComps.body && templateMessageParams.body}
			{#if templateComps.body.format === 'TEXT'}
				<div class="padding text-sm">
					{interpolateTextParams(templateComps.body.text, templateMessageParams.body?.parameters)}
				</div>
			{/if}
		{/if}
		{#if templateComps.footer}
			<div class="padding text-xs text-muted-foreground">{templateComps.footer.text}</div>
		{/if}
		{#if templateComps.buttons && templateMessageParams.buttons.length > 0}
			{#each templateComps.buttons.buttons as button, i}
				<div
					class="border-t flex justify-center items-center gap-2 text-blue-600 padding cursor-pointer"
					class:text-white={selected}
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
	</Frame>
{/if}

<style lang="postcss">
	.padding {
		@apply py-1.5 px-3;
	}
</style>
