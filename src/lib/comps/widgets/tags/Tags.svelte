<script lang="ts">
	import { page } from '$app/stores';
	import { type ListOfTags } from '$lib/schema/core/tags';
	type Props = {
		type: 'people' | 'events';
		taggings?: ListOfTags;
		tags?: ListOfTags;
		personOrEventId: number;
		addTagButtonFirst?: boolean;
	};
	let {
		type,
		taggings = $bindable([]),
		tags = $bindable([]),
		personOrEventId,
		addTagButtonFirst = false
	}: Props = $props();
	let loading = $state(false);
	let open = $state(false);
	let selectableTags = $derived.by(() => {
		const taggingIds = new Set(taggings.map((t) => t.id));
		return tags.filter((tag) => !taggingIds.has(tag.id));
	});

	import * as peopleTags from '$lib/comps/widgets/tags/peopleTags';
	import * as eventTags from '$lib/comps/widgets/tags/eventTags';
	import { load as loadTags } from '$lib/comps/widgets/tags/tags';

	import * as Command from '$lib/comps/ui/command';
	import * as Popover from '$lib/comps/ui/popover';
	import Button from '$lib/comps/ui/button/button.svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import X from 'lucide-svelte/icons/x';
	import Badge from '$lib/comps/ui/badge/badge.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import { onMount } from 'svelte';
	onMount(async () => {
		loading = true;
		tags = await loadTags();
		if (type === 'people') taggings = await peopleTags.load(personOrEventId);
		if (type === 'events') taggings = await eventTags.load(personOrEventId);
		loading = false;
	});

	async function handleAddTag(tagId: number) {
		loading = true;
		if (type === 'people') {
			await peopleTags.add(personOrEventId, tagId);
			taggings = await peopleTags.load(personOrEventId);
		}
		if (type === 'events') {
			await eventTags.add(personOrEventId, tagId);
			taggings = await eventTags.load(personOrEventId);
		}
		loading = false;
	}

	async function handleRemoveTag(tagId: number) {
		loading = true;
		if (type === 'people') {
			await peopleTags.remove(personOrEventId, tagId);
			taggings = await peopleTags.load(personOrEventId);
		}
		if (type === 'events') {
			await eventTags.remove(personOrEventId, tagId);
			taggings = await eventTags.load(personOrEventId);
		}
		loading = false;
	}
</script>

<div class="flex items-center justify-start gap-2 flex-wrap">
	{#if addTagButtonFirst}{@render popover()}{/if}
	{#each taggings as tag}
		<Badge class="justify-start gap-x-1 py-0 rounded-md"
			>{tag.name}
			<Button
				variant="ghost"
				size="xs"
				class="px-0 hover:bg-transparant hover:text-white"
				onclick={() => handleRemoveTag(tag.id)}><X size={12} /></Button
			></Badge
		>
	{/each}
	{#if loading}
		<Badge
			class="justify-start gap-x-1 py-0 rounded-md animated animate-pulse text-muted-foreground"
			variant="secondary"
		>
			{$page.data.t.common.status.loading()}
			<LoaderCircle class="animated animate-spin" size={12} />
		</Badge>
	{/if}
	{#if !addTagButtonFirst}{@render popover()}{/if}
</div>
{#snippet popover()}
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				size="xs"
				builders={[builder]}
				variant="outline"
				class="justify-start gap-x-1 rounded-lg px-2 py-3"
			>
				<Plus size={14} />
				<div class="text-sm">{$page.data.t.forms.fields.tags.add_a_tag.label()}</div>
			</Button>
		</Popover.Trigger>
		<Popover.Content class="p-0" align="start" side="right">
			<Command.Root>
				<Command.Input placeholder={$page.data.t.forms.fields.tags.filter_tags.label()} />
				<Command.List>
					<Command.Empty>{$page.data.t.common.data.no_items()}</Command.Empty>
					<Command.Group>
						{#each selectableTags as tag}
							<Command.Item
								value={tag.id.toString()}
								onSelect={(v) => {
									open = false;
									handleAddTag(Number(v));
								}}
							>
								{tag.name}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
{/snippet}
