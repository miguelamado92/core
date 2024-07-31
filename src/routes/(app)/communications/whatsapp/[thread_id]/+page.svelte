<script lang="ts">
	const { data } = $props();
	import { page } from '$app/stores';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Template from '$lib/comps/forms/whatsapp/templates/Template.svelte';
	import { type Template as TemplateType } from '$lib/schema/communications/whatsapp/elements/template_message';
	import { createMessageComponentsFromTemplateComponents } from '$lib/comps/forms/whatsapp/templates/components';
	import TemplateSelectDropdown from '$lib/comps/forms/whatsapp/templates/select/Dropdown.svelte';
	let selectedIndex: number = $state(-1);
	let actions = $state(data.thread.actions);
	let templateId = $state(data.thread.template_id);
	let template = $derived(data.templates.items.find((template) => template.id === templateId));
	import { type Read as ReadThread } from '$lib/schema/communications/whatsapp/threads';
	function updateStartingComponents(
		template: (typeof data.templates.items)[0],
		actions: ReadThread['actions'] = data.thread.actions
	) {
		return createMessageComponentsFromTemplateComponents(
			template.message.components,
			actions,
			data.thread.template_message
		);
	}
	//not sure about this warning... looks like it was fixed https://github.com/sveltejs/svelte/pull/11540
	const startingCompoments = template
		? updateStartingComponents(template, data.thread.actions).components
		: [];
	let components: TemplateType['components'] = $state(startingCompoments);
	import Messages from '$lib/comps/forms/whatsapp/messages/Messages.svelte';
	let loading: boolean = $state(false);

	import { type List } from '$lib/schema/communications/whatsapp/messages';

	let messages: List['items'] = $state([]);
	import Button from '$lib/comps/ui/button/button.svelte';

	async function updateThread() {
		loading = true;
		const res = await fetch(`/api/v1/communications/whatsapp/threads/${data.thread.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				actions,
				template_id: templateId,
				template_message: {
					template_id: templateId,
					...data.thread.template_message,
					template: {
						...data.thread.template_message.template,
						components: components
					}
				}
			})
		});
		if (!res.ok) {
			console.error('Failed to update thread', res);
		}
		loading = false;
	}
</script>

<PageHeader title={'Edit thread'}>
	{#snippet button()}
		<div class="flex justify-end gap-2">
			<TemplateSelectDropdown
				value={templateId}
				onselect={async (template) => {
					loading = true;
					templateId = template.id;
					const output = updateStartingComponents(template, actions);
					components = output.components;
					actions = output.actions;
					await updateThread();
					loading = false;
				}}
			/>
			<Button onclick={updateThread}>{data.t.forms.buttons.save()}</Button>
		</div>
	{/snippet}
</PageHeader>
<div class="relative">
	<div class="w-full mt-6">
		<Template bind:selectedIndex bind:actions {messages} {template} bind:components />
	</div>

	<div>
		<Messages bind:selectedIndex threadId={data.thread.id} bind:messages />
	</div>
	{#if loading}<div
			class="absolute inset-0 z-10 opacity-50 bg-white flex justify-center items-center"
		>
			Loading...
		</div>{/if}
</div>
