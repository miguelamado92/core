<script lang="ts">
	import { list, type List } from '$lib/schema/communications/whatsapp/messages';
	import { type Message } from '$lib/schema/communications/whatsapp/elements/message';
	type Props = {
		threadId: number;
		messages: List['items'];
	};
	let { threadId, messages = $bindable([]) }: Props = $props();
	let selectedMessageId: string | null = $state(null);
	import { parse } from '$lib/schema/valibot';
	async function fetchMessages() {
		const res = await fetch(`/api/v1/communications/whatsapp/threads/${threadId}/messages`);
		const data = await res.json();
		const parsed = parse(list, data);
		messages = parsed.items;
	}
	import { onMount } from 'svelte';
	onMount(fetchMessages);
	import NewMessageForm from '../NewMessageForm.svelte';
	import TextMessage from '$lib/comps/forms/whatsapp/messages/builder/Message.svelte';
	import Separator from '$lib/comps/ui/separator/separator.svelte';
	//on chreate new message...
	async function createNewMessage(message: Message) {
		const res = await fetch(`/api/v1/communications/whatsapp/messages`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				thread_id: threadId,
				message: message
			})
		});
		if (!res.ok) alert('Error!');
		await fetchMessages();
	}
</script>

<div class="my-4 grid grid-cols-1 gap-4 mx-auto max-w-[400px]">
	{#each messages as message, i}
		<div
			onclick={() => (selectedMessageId = message.id)}
			role="button"
			tabindex={i + 1}
			onkeydown={() => (selectedMessageId = message.id)}
		>
			<TextMessage bind:selectedMessageId bind:message={messages[i]} index={i + 1} />
		</div>
	{/each}
	<Separator class="my-2" />
	<NewMessageForm {threadId} oncreate={createNewMessage} />
</div>
