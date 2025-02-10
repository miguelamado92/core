<script lang="ts">
	import { type Read as ReadMessages } from '$lib/schema/communications/whatsapp/messages';
	import EventDropdown from '$lib/comps/widgets/events/EventDropdown.svelte';
	import * as actionsActions from '$lib/comps/forms/whatsapp/messages/builder/actions/actions';
	import { type Read as ReadThread } from '$lib/schema/communications/whatsapp/threads';

	let {
		actions = $bindable(),
		messages,
		actionIndex,
		buttonId
	}: {
		messages: ReadMessages[];
		actions: ReadThread['actions'];
		actionIndex: number;
		buttonId: string;
	} = $props();
	const action = actions[buttonId][actionIndex];
	import * as Select from '$lib/comps/ui/select/index';
	import Trash from 'lucide-svelte/icons/trash';
	import Button from '$lib/comps/ui/button/button.svelte';
	import { extractText } from '$lib/comps/forms/whatsapp/messages/builder/actions/text';
	import { clampStringWithEllipsis } from '$lib/utils/text/string';
	const messagesItems = $derived(() => {
		return messages.map((message) => {
			return {
				value: message.id,
				label: clampStringWithEllipsis(extractText(message.message), 20)
			};
		});
	});
</script>

{#if action}
	{#if action.type === 'register_for_event'}
		<div class="flex gap-2 items-center">
			<div class="text-sm text-foreground font-medium">Register user for event:</div>
			<EventDropdown
				bind:value={action.event_id}
				onselect={(event) => {
					actions[buttonId][actionIndex] = actionsActions.updateEventRegistrationAction(
						action,
						event.id
					);
				}}
			/>
			<Button
				variant="outline"
				onclick={() => {
					actions[buttonId].splice(actionIndex, 1);
				}}><Trash size={16} /></Button
			>
		</div>
	{/if}

	{#if action.type === 'send_whatsapp_message'}
		<div class="flex gap-2 items-center">
			<div class="text-sm text-foreground font-medium">Send message:</div>
			<Select.Root type="single" bind:value={action.message_id} items={messagesItems()}>
				<Select.Trigger class="w-[180px]">
					{#if action.message_id}
						{messagesItems().find((item) => item.value === action.message_id)?.label}
					{:else}
						[Select a message]
					{/if}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each messagesItems() as message}
							<Select.Item value={message.value} label={message.label}>{message.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
			<Button
				variant="outline"
				onclick={() => {
					actions[buttonId].splice(actionIndex, 1);
				}}><Trash size={16} /></Button
			>
		</div>
	{/if}
{/if}
