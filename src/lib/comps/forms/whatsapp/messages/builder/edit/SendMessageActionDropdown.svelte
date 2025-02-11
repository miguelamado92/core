<script lang="ts">
	import { type Read } from '$lib/schema/communications/whatsapp/messages';
	let {
		messages = $bindable(),
		actionIndex,
		messageIndex,
		buttonId
	}: { messages: Read[]; actionIndex: number; messageIndex: number; buttonId: string } = $props();
	const action = messages[messageIndex].actions[buttonId][actionIndex];
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
	function getValue(id: string) {
		return messagesItems().find((item) => item.value === id);
	}
	import * as Select from '$lib/comps/ui/select/index';
</script>

{#if messages[messageIndex].actions[buttonId][actionIndex].type === 'send_whatsapp_message'}
	<Select.Root
		type="single"
		bind:value={messages[messageIndex].actions[buttonId][actionIndex].message_id}
		items={messagesItems()}
	>
		<Select.Trigger class="w-[180px]">
			{getValue(messages[messageIndex].actions[buttonId][actionIndex].message_id)?.label ??
				'Select message'}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each messages as message, i}
					<Select.Item
						value={message.id}
						label={clampStringWithEllipsis(extractText(message.message), 20)}
						>{clampStringWithEllipsis(extractText(message.message), 20)}</Select.Item
					>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
{/if}
