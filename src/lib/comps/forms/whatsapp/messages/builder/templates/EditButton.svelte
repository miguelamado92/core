<script lang="ts">
	import { type Read } from '$lib/schema/communications/whatsapp/template';
	import { type Read as ReadThread } from '$lib/schema/communications/whatsapp/threads';
	import { type Read as ReadMessages } from '$lib/schema/communications/whatsapp/messages';

	type Props = {
		buttonId: string;
		componentIndex: number;
		messages: ReadMessages[];
		buttonIndex: number;
		actions: ReadThread['actions'];
		template: Read;
		onSave: (actions: ReadThread['actions']) => Promise<void>;
	};
	let {
		buttonId,
		messages,
		componentIndex,
		buttonIndex,
		actions = $bindable(),
		onSave,
		template
	}: Props = $props();
	import SelectActionDropdown from '$lib/comps/forms/whatsapp/messages/builder/SelectActionDropdown.svelte';
	import * as actionsActions from '$lib/comps/forms/whatsapp/messages/builder/actions/actions';
	import EditAction from '$lib/comps/forms/whatsapp/messages/builder/templates/EditAction.svelte';

	import CornerUpLeft from 'lucide-svelte/icons/corner-up-left';
	import ChevronsRight from 'lucide-svelte/icons/chevrons-right';
</script>

{#if template.message.components[componentIndex].type === 'BUTTONS'}
	{#if 'buttons' in template.message.components[componentIndex]}
		{#if buttonIndex in template.message.components[componentIndex].buttons}
			<div class="flex items-start gap-2">
				<div class="flex items-center gap-2">
					<div
						class="py-0.5 px-2 text-blue-500 border rounded border-blue-500 flex items-center gap-1"
					>
						<CornerUpLeft size={16} />
						{template.message.components[componentIndex].buttons[buttonIndex].text}
					</div>
					<div><ChevronsRight size={14} class="text-foreground-muted" /></div>
				</div>
				<div>
					<div class="grid grid-cols-1 gap-2">
						{#each actions[buttonId] as _, actionIndex}
							<EditAction {messages} bind:actions {actionIndex} {buttonId} />
						{/each}
					</div>
					<div class:mt-2={actions[buttonId]?.length > 0}>
						<SelectActionDropdown
							{buttonId}
							createEventRegistrationAction={async (buttonIdNew) => {
								actions = actionsActions.createEventRegistrationAction(buttonIdNew, actions);
							}}
							createSendWhatsAppMessageAction={async (buttonIdNew) => {
								actions = actionsActions.createWhatsAppMessageAction(buttonIdNew, actions);
							}}
						/>
					</div>
				</div>
			</div>
		{/if}
	{/if}
{/if}
