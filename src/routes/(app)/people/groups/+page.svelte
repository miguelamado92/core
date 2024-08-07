<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
</script>

<DataGrid
	title={data.t.pages.people.groups.index()}
	filterKey="name"
	items={data.groups.items}
	count={data.groups.count}
	newItemHref="/people/groups/new"
>
	{#snippet content(group: typeof data.groups.items[0])}
		<div class="flex items-center gap-2 justify-between">
			<div class="font-medium">{group.name}</div>
			<Button href={`/people/groups/${group.id}`} variant="outline" size="sm">
				{data.t.forms.buttons.view()}
			</Button>
		</div>
	{/snippet}
	{#snippet headerButton()}
		<Button href="/people/groups/new" variant="default" size="sm">
			{data.t.pages.people.groups.new()}
		</Button>
	{/snippet}
</DataGrid>
