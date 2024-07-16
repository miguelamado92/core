<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import Datatable from '$lib/comps/ui/custom/table/datatable.svelte';
	import PersonBadge from '$lib/comps/widgets/PersonBadge.svelte';
</script>

<Datatable
	filterKey="search"
	items={data.groups.items}
	count={data.groups.count}
	header={data.t.pages.people.groups.index()}
>
	{#snippet content(group: typeof data.groups.items[0])}
		<div class="flex items-center gap-2 justify-between">
			{group.name}
			<Button href={`/people/groups/${group.id}`} variant="default" size="sm">
				{data.t.forms.buttons.view()}
			</Button>
		</div>
	{/snippet}
	{#snippet button()}
		<Button href="/people/groups/new" variant="default" size="sm">
			{data.t.pages.people.groups.new()}
		</Button>
	{/snippet}
</Datatable>
