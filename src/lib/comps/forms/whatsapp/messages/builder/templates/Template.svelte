<script lang="ts">
	import { type Read } from '$lib/schema/communications/whatsapp/template';
	import { type Template as TemplateType } from '$lib/schema/communications/whatsapp/elements/template_message';
	import { type List } from '$lib/schema/communications/whatsapp/messages';
	import { type Read as ReadThread } from '$lib/schema/communications/whatsapp/threads';

	type Props = {
		selectedMessageId: string | null;
		messages: List['items'];
		actions: ReadThread['actions'];
		template: Read | undefined;
		components: TemplateType['components'];
		onSaveTemplate: (template: Read) => Promise<void>;
	};
	let {
		selectedMessageId = $bindable(),
		messages,
		actions = $bindable(),
		template = $bindable(),
		components = $bindable(),
		onSaveTemplate
	}: Props = $props();
	import Display from '$lib/comps/forms/whatsapp/messages/builder/templates/Display.svelte';
	import EditContainer from '$lib/comps/forms/whatsapp/messages/builder/templates/EditContainer.svelte';
	import type { on } from 'svelte/events';
</script>

{#if template}
	<EditContainer
		onSaveTemplate={async () => {
			if (template) {
				await onSaveTemplate(template);
			}
			selectedMessageId = null;
		}}
		{selectedMessageId}
		{messages}
		bind:actions
		bind:template
		bind:components
	/>
	<Display
		selected={selectedMessageId === 'template'}
		template={template.message}
		templateId={template.id}
		{components}
	/>
{/if}
