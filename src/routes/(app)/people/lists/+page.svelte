<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
</script>

<DataGrid
	filterKey="name"
	items={data.lists.items}
	count={data.lists.count}
	title={data.t.pages.people.lists.index()}
	newItemHref="/people/lists/new"
>
	{#snippet content(list: typeof data.lists.items[0])}
		<div class="flex items-center gap-2 justify-between">
			{list.name}
			<Button href={`/people/lists/${list.id}`} variant="outline" size="sm">
				{data.t.forms.buttons.view()}
			</Button>
		</div>
	{/snippet}
	{#snippet headerButton()}
		<Button href="/people/lists/new" variant="default" size="sm">
			{data.t.pages.people.lists.new()}
		</Button>
	{/snippet}
</DataGrid>
