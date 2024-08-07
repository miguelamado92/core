<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import PersonBadge from '$lib/comps/widgets/PersonBadge.svelte';
</script>

<DataGrid
	title={data.t.pages.people.index()}
	items={data.people.items}
	count={data.people.count}
	filterKey="search"
	newItemHref="/people/new"
>
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
