<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import Datatable from '$lib/comps/ui/custom/table/datatable.svelte';
	import PersonBadge from '$lib/comps/widgets/PersonBadge.svelte';
</script>

<Datatable
	filterKey="search"
	items={data.people.items}
	count={data.people.count}
	header={data.t.pages.people.index()}
>
	{#snippet content(person: typeof data.people.items[0])}
		<div class="flex items-center gap-2 justify-between">
			<PersonBadge {person} />
			<Button href={`/people/${person.id}`} variant="default" size="sm">
				{data.t.forms.buttons.view()}
			</Button>
		</div>
	{/snippet}
	{#snippet button()}
		<Button href="/people/new" variant="default" size="sm">
			{data.t.pages.people.new_person()}
		</Button>
	{/snippet}
</Datatable>
