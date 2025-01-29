<script lang="ts">
	import { type Read, type List } from '$lib/schema/communications/whatsapp/messages';

	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/state';
	const flash = getFlash(page);

	type Props = {
		messages: Read[];
		index: number;
		selectedMessageId: string | null;
	};
	let { messages = $bindable(), index, selectedMessageId = $bindable(null) }: Props = $props();

	// This is the main component that will display the message
	import DisplayMessage from './display/DisplayMessage.svelte';
	import DisplayInteractive from './display/Interactive.svelte';
	// Image related compnents to upload, display and

	let selected: boolean = $derived(selectedMessageId === messages[index].id);
	import * as imageActions from '$lib/comps/forms/whatsapp/messages/builder/actions/images';
	import EditContainer from '$lib/comps/forms/whatsapp/messages/builder/edit/Container.svelte';

	import { updateMessage } from '$lib/comps/forms/whatsapp/messages/builder/actions/messages';
</script>

<EditContainer
	bind:selectedMessageId
	bind:messages
	{index}
	onSaveMessage={async (message) => {
		// TODO:
		await updateMessage(message);
		$flash = { type: 'success', message: 'Message saved' };
	}}
/>
<div>
	<div class="mt-1 text-xs text-muted-foreground">MSGID:{messages[index].id}</div>
	<div class="flex">
		<div
			class={'rounded-lg border text-sm text-left px-2 py-1.5'}
			class:bg-white={!selected}
			class:bg-blue-500={selected}
			class:border-blue-500={selected}
			class:text-white={selected}
		>
			<!-- Message content -->
			<DisplayMessage
				{messages}
				{index}
				{selected}
				removeImage={() =>
					(messages[index].message = imageActions.removeImage(messages[index].message))}
			/>
			<!-- Display buttons-->
			<div class="mt-1"><DisplayInteractive {messages} {index} /></div>
		</div>
	</div>
</div>
