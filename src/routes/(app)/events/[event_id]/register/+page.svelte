<script lang="ts">
	export let data;
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import RegisterPersonForm from './RegisterPersonForm.svelte';
	import PersonBadge from '$lib/comps/widgets/PersonBadge.svelte';
</script>

<DataGrid
	title={data.t.pages.events.register_attendees()}
	items={data.people.items}
	count={data.people.count}
	filterKey={'search'}
>
	{#snippet content(person: typeof data.people.items[0])}
		<div class="flex items-center justify-between gap-4">
			<PersonBadge {person} />
			<div>
				<RegisterPersonForm person_id={person.id} eventIsPast={true} />
			</div>
		</div>
	{/snippet}
</DataGrid>
