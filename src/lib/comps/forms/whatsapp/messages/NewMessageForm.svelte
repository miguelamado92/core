<script lang="ts">
	import {
		type Message,
		type AllowableTypes
	} from '$lib/schema/communications/whatsapp/elements/message';
	type Props = {
		threadId: number;
		oncreate: (message: Message) => void;
	};
	let { threadId, oncreate }: Props = $props();
	import Button from '$lib/comps/ui/button/button.svelte';
	import Input from '$lib/comps/ui/input/input.svelte';

	let message: Message = $state({
		type: 'text',
		text: {
			body: '',
			preview_url: true
		}
	});
</script>

<div class="flex gap-4 items-baseline">
	<div class="flex-grow">
		{#if message.type === 'text'}
			<Input type="text" bind:value={message.text.body} class="w-full" />
		{/if}
		{#if message.type === 'image' as 'text'}
			upload file
		{/if}
		{#if message.type === 'interactive' as 'text'}
			interactive
		{/if}
	</div>
	<div>
		<Button
			class="btn btn-primary"
			on:click={() => {
				oncreate(message);
			}}
		>
			Create
		</Button>
	</div>
</div>
