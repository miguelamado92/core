<script lang="ts">
	import { type Read, type List } from '$lib/schema/communications/whatsapp/messages';

	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/state';
	const flash = getFlash(page);

	type Props = {
		messages: Read[];
		index: number;
		selectedMessageId: string | null;
		loading: boolean;
	};
	let {
		messages = $bindable(),
		loading = $bindable(),
		index,
		selectedMessageId = $bindable(null)
	}: Props = $props();

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
		try {
			loading = true;
			await updateMessage(message);
			$flash = { type: 'success', message: 'Message saved' };
		} catch (err) {
			$flash = { type: 'error', message: 'Failed to save message' };
		} finally {
			loading = false;
		}
	}}
/>
<div>
	<div class="flex">
		<div
			class={'rounded-lg border text-sm text-left'}
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
			<div><DisplayInteractive {selected} {messages} {index} /></div>
		</div>
	</div>
</div>
