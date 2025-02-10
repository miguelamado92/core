<script lang="ts">
	import { type Read } from '$lib/schema/communications/whatsapp/messages';
	import EventDropdown from '$lib/comps/widgets/events/EventDropdown.svelte';
	import * as actionsActions from '$lib/comps/forms/whatsapp/messages/builder/actions/actions';
	let {
		messages = $bindable(),
		actionIndex,
		messageIndex,
		buttonId
	}: { messages: Read[]; actionIndex: number; messageIndex: number; buttonId: string } = $props();
	const action = messages[messageIndex].actions[buttonId][actionIndex];
	import SendMessageActionDropdown from '$lib/comps/forms/whatsapp/messages/builder/edit/SendMessageActionDropdown.svelte';
	import Trash from 'lucide-svelte/icons/trash';
	import Button from '$lib/comps/ui/button/button.svelte';
</script>

{#if action.type === 'register_for_event'}
	<div class="flex gap-2 items-center">
		<div class="text-sm text-foreground font-medium">Register user for event:</div>
		<EventDropdown
			onselect={(event) => {
				messages[messageIndex].actions[buttonId][actionIndex] =
					actionsActions.updateEventRegistrationAction(
						messages[messageIndex].actions[buttonId][actionIndex],
						event.id
					);
			}}
		/>
		<Button
			variant="outline"
			onclick={() => {
				messages[messageIndex].actions[buttonId].splice(actionIndex, 1);
			}}><Trash size={16} /></Button
		>
	</div>
{/if}

{#if action.type === 'send_whatsapp_message'}
	<div class="flex gap-2 items-center">
		<div class="text-sm text-foreground font-medium">Send message:</div>
		<SendMessageActionDropdown bind:messages {actionIndex} {messageIndex} {buttonId} />
		<Button
			variant="outline"
			onclick={() => {
				messages[messageIndex].actions[buttonId].splice(actionIndex, 1);
			}}><Trash size={16} /></Button
		>
	</div>
{/if}
