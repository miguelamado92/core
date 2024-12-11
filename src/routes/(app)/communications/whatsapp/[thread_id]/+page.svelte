<script lang="ts">
	const { data } = $props();
	let actions = $state({ ...data.templateMessage.actions });
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Template from '$lib/comps/forms/whatsapp/templates/Template.svelte';
	import { type Template as TemplateType } from '$lib/schema/communications/whatsapp/elements/template_message';
	import { createMessageComponentsFromTemplateComponents } from '$lib/comps/forms/whatsapp/templates/components';
	import TemplateSelectDropdown from '$lib/comps/forms/whatsapp/templates/select/Dropdown.svelte';
	let selectedIndex: number = $state(-1);
	let templateId = $state(data.thread.template_id);
	const template = $derived(data.templates.items.find((template) => template.id === templateId));
	import { type Read as ReadThread } from '$lib/schema/communications/whatsapp/threads';
	function updateComponents(
		template: (typeof data.templates.items)[0],
		actions: ReadThread['actions'] = data.templateMessage.actions
	) {
		return createMessageComponentsFromTemplateComponents(
			template.message.components,
			actions,
			data.templateMessage.message
		);
	}
	//not sure about this warning... looks like it was fixed https://github.com/sveltejs/svelte/pull/11540
	const startingCompoments = () => {
		return template ? updateComponents(template, actions).components : [];
	};
	let components: TemplateType['components'] = $state(startingCompoments());
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
				template_id: templateId
			})
		});
		if (!res.ok) {
			console.error('Failed to update thread', res);
		}
		if (data.templateMessage.message.type === 'template') {
			const messageRes = await fetch(
				`/api/v1/communications/whatsapp/messages/${data.templateMessage.id}`,
				{
					method: 'PUT',
					body: JSON.stringify({
						actions: actions,
						message: {
							template_id: templateId,
							...data.templateMessage.message,
							template: {
								...data.templateMessage.message.template,
								name: template?.message.name,
								components: components
							}
						}
					})
				}
			);
		}
		loading = false;
	}
</script>

<PageHeader title={'Edit thread'}>
	{#snippet button()}
		<div class="flex justify-end gap-2">
			<Button variant="secondary" href="/communications/whatsapp/{data.thread.id}/sends">
				Send
			</Button>
			<Button onclick={updateThread}>{data.t.forms.buttons.save()}</Button>
		</div>
	{/snippet}
</PageHeader>
<div class="relative">
	<div class="w-full mt-6">
		<div class="flex justify-center mb-4">
			<TemplateSelectDropdown
				value={templateId}
				onselect={async (template) => {
					loading = true;
					templateId = template.id;
					const output = updateComponents(template, actions);
					components = output.components;
					actions = output.actions;
					await updateThread();
					loading = false;
				}}
			/>
		</div>
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
