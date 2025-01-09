<script lang="ts">
	import { page } from '$app/stores';
	import { type InteractionTypeNotes } from '$lib/schema/people/interactions';
	type Props = {
		interaction: InteractionTypeNotes;
	};
	const { interaction }: Props = $props();
	import * as Accordion from '$lib/comps/ui/accordion';
	import { addLineBreaks, sanitizeHTML } from '$lib/utils/text/string';
	import ChevronDownIcon from 'lucide-svelte/icons/chevron-down';
</script>

<Accordion.Root type="single">
	{#each interaction.edit_history.reverse() as edit_history, i}
		<Accordion.Item value="item-{i}">
			<Accordion.Trigger class="hover:no-underline">
				<div class="flex items-center gap-4">
					{edit_history.edited_by}
					<div class="text-xs text-right text-muted-foreground font-light">
						Edited: {$page.data.timeAgo.format(edit_history.edited_at)}
					</div>
				</div>
			</Accordion.Trigger>
			<Accordion.Content>
				<div class="mt-2 text-sm text-muted-foreground">
					{@html sanitizeHTML(addLineBreaks(edit_history.prior_state))}
				</div>
				<div class="flex justify-center my-2 text-muted-foreground">
					<ChevronDownIcon size={20} stroke-width={1} />
				</div>
				<div class="mt-2 text-sm text-muted-foreground">
					{#if i === 0}
						{@html sanitizeHTML(addLineBreaks(interaction.notes))}
					{:else}
						{@html sanitizeHTML(
							addLineBreaks(interaction.edit_history[i - 1]?.prior_state || 'foo')
						)}
					{/if}
				</div>
			</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
