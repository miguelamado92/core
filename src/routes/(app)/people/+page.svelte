<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import PersonBadge from '$lib/comps/widgets/PersonBadge.svelte';
	import TagFilter from '$lib/comps/widgets/tags/TagFilter.svelte';
	import { goto } from '$app/navigation';

	async function onAddTag(tagId: number) {
		const params = new URLSearchParams(window.location.search);
		params.append('tag', tagId.toString());
		await goto(`${window.location.pathname}?${params.toString()}`, { keepFocus: true });
	}

	async function onRemoveTag(tagId: number) {
		const params = new URLSearchParams(window.location.search);
		params.delete('tag', tagId.toString());
		if (params.keys.length > 0) {
			await goto(`${window.location.pathname}?${params.toString()}`, { keepFocus: true });
		} else {
			await goto(`${window.location.pathname}`, { keepFocus: true });
		}
	}
</script>

<DataGrid
	title={data.t.pages.people.index()}
	items={data.people.items}
	count={data.people.count}
	filterKey="search"
	newItemHref="/people/new"
>
	{#snippet filterSnippet(filter)}
		<div class="flex items-center gap-2">
			<TagFilter {onAddTag} {onRemoveTag} />
			{@render filter()}
		</div>
	{/snippet}
	{#snippet content(person: typeof data.people.items[0])}
		<div class="flex items-center gap-2 justify-between">
			<PersonBadge {person} />
			<Button href={`/people/${person.id}`} variant="outline" size="sm">
				{data.t.forms.buttons.view()}
			</Button>
		</div>
	{/snippet}
	{#snippet headerButton()}
		<Button href="/people/new" variant="default" size="sm">
			{data.t.pages.people.new_person()}
		</Button>
	{/snippet}
</DataGrid>
