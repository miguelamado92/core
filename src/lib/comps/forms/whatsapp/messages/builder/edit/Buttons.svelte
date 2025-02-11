<script lang="ts">
	import { type Read, type List } from '$lib/schema/communications/whatsapp/messages';
	let { index, messages = $bindable() }: { messages: Read[]; index: number } = $props();
	const canAddButton = $derived(() => {
		if (messages[index].message.type === 'interactive') {
			if (messages[index].message.interactive.action.buttons.length >= 3) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	});
	import Button from '$lib/comps/ui/button/button.svelte';
	import Label from '$lib/comps/ui/label/label.svelte';
	import Separator from '$lib/comps/ui/separator/separator.svelte';

	import * as buttonActions from '$lib/comps/forms/whatsapp/messages/builder/actions/buttons';
	import EditButton from '$lib/comps/forms/whatsapp/messages/builder/edit/EditButton.svelte';
</script>

<Label>Buttons</Label>
{#if messages[index].message.type === 'interactive'}
	{#each messages[index].message.interactive.action.buttons as _, i}
		<EditButton bind:messages messageIndex={index} buttonIndex={i} />
		<Separator class="my-1.5" />
	{/each}
{/if}
{#if canAddButton()}
	<Button
		size={'xs'}
		variant="outline"
		onclick={() => {
			messages[index] = {
				...messages[index],
				message: buttonActions.addButton(messages[index].message)
			};
		}}
	>
		+ Add button
	</Button>
{/if}
