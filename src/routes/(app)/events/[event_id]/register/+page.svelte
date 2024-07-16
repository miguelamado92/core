<script lang="ts">
	export let data;
	import Datatable from '$lib/comps/ui/custom/table/datatable.svelte';
	import RegisterPersonForm from './RegisterPersonForm.svelte';
	import PersonBadge from '$lib/comps/widgets/PersonBadge.svelte';
</script>

<Datatable header="Attendees" items={data.people.items} count={2}>
	{#snippet content(person: typeof data.people.items[0])}
		<div class="flex items-center justify-between gap-4">
			<PersonBadge {person} />
			<div>
				<RegisterPersonForm person_id={person.id} eventIsPast={true} />
			</div>
		</div>
	{/snippet}
</Datatable>
