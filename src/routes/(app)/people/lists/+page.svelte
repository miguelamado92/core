<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import Datatable from '$lib/comps/ui/custom/table/datatable.svelte';
</script>

<Datatable
	filterKey="name"
	items={data.lists.items}
	count={data.lists.count}
	header={data.t.pages.people.lists.index()}
>
	{#snippet content(list: typeof data.lists.items[0])}
		<div class="flex items-center gap-2 justify-between">
			{list.name}
			<Button href={`/people/lists/${list.id}`} variant="default" size="sm">
				{data.t.forms.buttons.view()}
			</Button>
		</div>
	{/snippet}
	{#snippet button()}
		<Button href="/people/lists/new" variant="default" size="sm">
			{data.t.pages.people.lists.new()}
		</Button>
	{/snippet}
</Datatable>
