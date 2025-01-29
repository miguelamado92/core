<script lang="ts">
	const { data } = $props();
	let actions = $state({ ...data.templateMessage.actions });
	let selectedMessageId: string | null = $state(null);

	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Template from '$lib/comps/forms/whatsapp/templates/Template.svelte';
	import { type Template as TemplateType } from '$lib/schema/communications/whatsapp/elements/template_message';
	import { createMessageComponentsFromTemplateComponents } from '$lib/comps/forms/whatsapp/templates/components';
	import TemplateSelectDropdown from '$lib/comps/forms/whatsapp/templates/select/Dropdown.svelte';
	import Message from '$lib/comps/forms/whatsapp/messages/builder/Message.svelte';

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
	import { parse } from '$lib/schema/valibot';
	import { list as messageListSchema } from '$lib/schema/communications/whatsapp/messages';

	async function fetchMessages() {
		const res = await fetch(`/api/v1/communications/whatsapp/threads/${data.thread.id}/messages`);
		const body = await res.json();
		const parsed = parse(messageListSchema, body);
		messages = parsed.items;
	}
	import { onMount } from 'svelte';
	onMount(fetchMessages);

	let components: TemplateType['components'] = $state(startingCompoments());
	import MessagesList from '$lib/comps/forms/whatsapp/messages/builder/MessageList.svelte';
	let loading: boolean = $state(false);

	import { type List } from '$lib/schema/communications/whatsapp/messages';

	let messages: List['items'] = $state([]);
	import Button from '$lib/comps/ui/button/button.svelte';

	import NewMessageForm from '$lib/comps/forms/whatsapp/messages/NewMessageForm.svelte';
	import {
		createNewMessage,
		fetchMessages as updateMessageThread
	} from '$lib/comps/forms/whatsapp/messages/builder/actions/messages';
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

	<div class="grid grid-cols-1 gap-2">
		{#each messages as message, i}
			<div
				onclick={() => (selectedMessageId = message.id)}
				role="button"
				tabindex={i + 1}
				onkeydown={() => (selectedMessageId = message.id)}
			>
				<Message bind:selectedMessageId index={i} bind:messages />
			</div>
		{/each}
		<div class="mt-4">
			<NewMessageForm
				threadId={data.thread.id}
				oncreate={async (message) => {
					await createNewMessage(message, data.thread.id);
					messages = await updateMessageThread(data.thread.id);
				}}
			/>
		</div>
	</div>
	{#if loading}<div
			class="absolute inset-0 z-10 opacity-50 bg-white flex justify-center items-center"
		>
			Loading...
		</div>{/if}
</div>
