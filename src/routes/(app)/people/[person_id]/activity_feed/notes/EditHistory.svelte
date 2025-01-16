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
	import AsyncAdminBadge from '$lib/comps/widgets/AsyncAdminBadge.svelte';
</script>

<Accordion.Root type="single">
	{#each interaction.edit_history.reverse() as edit_history, i}
		<Accordion.Item value="item-{i}">
			<Accordion.Trigger class="hover:no-underline hover:bg-muted px-4 py-2">
				<div class="text-left">
					<AsyncAdminBadge adminId={edit_history.edited_by} />
					<div class="text-xs text-muted-foreground font-light mt-1">
						{$page.data.timeAgo.format(edit_history.edited_at)}
					</div>
				</div>
			</Accordion.Trigger>
			<Accordion.Content class="px-4 py-2">
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
