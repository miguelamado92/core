<script lang="ts">
	import { slide } from 'svelte/transition';

	import { type Read } from '$lib/schema/communications/whatsapp/template';
	import { type Template as TemplateType } from '$lib/schema/communications/whatsapp/elements/template_message';
	import { list, type List } from '$lib/schema/communications/whatsapp/messages';
	import { type Read as ReadThread } from '$lib/schema/communications/whatsapp/threads';

	type Props = {
		selectedIndex: number;
		messages: List['items'];
		actions: ReadThread['actions'];
		template: Read | undefined;
		components: TemplateType['components'];
	};
	let {
		selectedIndex = $bindable(-1),
		template = $bindable(),
		messages,
		actions = $bindable(),
		components = $bindable()
	}: Props = $props();
	import Preview from '$lib/comps/forms/whatsapp/templates/Preview.svelte';
	import EditParameters from '$lib/comps/forms/whatsapp/templates/EditParameters.svelte';
	import Separator from '$lib/comps/ui/separator/separator.svelte';
</script>

<div class="grid grid-cols-1 gap-4 mx-auto max-w-[400px]">
	<div
		onkeydown={() => (selectedIndex = 0)}
		onclick={() => (selectedIndex = 0)}
		role="button"
		tabindex={0}
	>
		<Preview
			{components}
			selected={selectedIndex === 0}
			template={template?.message}
			templateId={template?.id}
		/>
	</div>
	{#if selectedIndex === 0 && template}
		<div class="bg-white shadow px-3 py-2 rounded" transition:slide={{ axis: 'y', duration: 200 }}>
			<div class="grid grid-cols-1">
				<EditParameters bind:actions {messages} bind:components />
			</div>
		</div>
		<Separator class="my-2" />
	{/if}
</div>
