<script lang="ts">
	import { page } from '$app/stores';
	import { type InteractionTypeNotes } from '$lib/schema/people/interactions';
	type Props = {
		interaction: InteractionTypeNotes;
	};
	const { interaction }: Props = $props();
	import * as Accordion from '$lib/comps/ui/accordion';
	import { addLineBreaks, sanitizeHTML } from '$lib/utils/text/string';
</script>

<Accordion.Root type="single">
	{#each interaction.edit_history as edit_history, i}
		<Accordion.Item value="item-{i}">
			<Accordion.Trigger>{edit_history.edited_by}</Accordion.Trigger>
			<Accordion.Content>
				<div class="mt-2 text-sm text-muted-foreground">
					{@html sanitizeHTML(addLineBreaks(edit_history.prior_state))}
				</div>
				<div class="text-xs text-right text-muted-foreground">
					Edited: {$page.data.timeAgo.format(edit_history.edited_at)}
				</div>
			</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
