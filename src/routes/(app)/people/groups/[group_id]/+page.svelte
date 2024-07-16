<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import Datatable from '$lib/comps/ui/custom/table/datatable.svelte';
	import PersonBadge from '$lib/comps/widgets/PersonBadge.svelte';
	import PersonDropdown from '$lib/comps/widgets/person/PersonDropdown.svelte';
	import * as Select from '$lib/comps/ui/select';
	import { invalidateAll } from '$app/navigation';
	import { writable, type Writable } from 'svelte/store';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/stores';
	const flash = getFlash(page);
	const loadingIds: Writable<number[]> = writable([]);

	const statuses = [
		{ value: 'member', label: 'Member' },
		{ value: 'admin', label: 'Admin' },
		{ value: 'banned', label: 'Banned' }
	];
</script>

<Datatable
	hasFilter={false}
	items={data.group.members}
	count={data.group.count}
	header={`${data.group.name} (${data.group.count})`}
>
	{#snippet content(person: typeof data.group.members[0], i)}
		<div class="flex items-center justify-between gap-4">
			{#if $loadingIds.includes(person.id)}
				<div class="saturate-0 animated animate-pulse text-muted-foreground">
					<PersonBadge {person} />
				</div>
			{:else}
				<PersonBadge {person} />
			{/if}

			<div class="flex items-center gap-2">
				{@render changeStatus(person)}
				{@render removePersonButton(person, i)}
			</div>
		</div>
	{/snippet}

	{#snippet button()}
		<div class="flex items-center justify-end w-full lg:w-auto gap-4">
			{@render addPersonButton()}
			<Button href="/people/groups/{data.group.id}/edit">{data.t.forms.buttons.edit()}</Button>
		</div>
	{/snippet}
</Datatable>

{#snippet addPersonButton()}
	<PersonDropdown
		selectedPersonIds={data.group.members.map((p) => p.id)}
		onAddPerson={async (person) => {
			$loadingIds = [...$loadingIds, person.id];
			//data.group.members = [...data.group.members, person]; //cannot include because there is no status for new person...
			const result = await fetch(`/api/v1/people/groups/${data.group.id}/members`, {
				method: 'POST',
				body: JSON.stringify({ person_id: person.id, status: 'member' })
			});
			if (!result.ok) {
				$flash = { type: 'error', message: data.t.errors.updating_data() };
			}
			$flash = { type: 'success', message: data.t.forms.actions.created() };
			await invalidateAll();
			const loadingIdIndex = $loadingIds.findIndex((id) => id === person.id);
			$loadingIds = $loadingIds.toSpliced(loadingIdIndex, 1);
		}}
	/>
{/snippet}

{#snippet removePersonButton(person: typeof data.group.members[0], i)}
	<Button
		variant="destructive"
		onclick={async () => {
			$loadingIds = [...$loadingIds, person.id];
			const result = await fetch(`/api/v1/people/groups/${data.group.id}/members/${person.id}`, {
				method: 'DELETE'
			});
			if (!result.ok) {
				$flash = { type: 'error', message: data.t.errors.updating_data() };
			}
			$flash = { type: 'success', message: data.t.forms.actions.removed() };
			const personIndex = data.group.members.findIndex((p) => p.id === person.id);
			data.group.members = data.group.members.toSpliced(personIndex, 1);
			await invalidateAll();
			const loadingIdIndex = $loadingIds.findIndex((id) => id === person.id);
			$loadingIds = $loadingIds.toSpliced(loadingIdIndex, 1);
		}}>{data.t.forms.buttons.remove()}</Button
	>
{/snippet}

{#snippet changeStatus(person: typeof data.group.members[0])}
	<Select.Root
		items={statuses}
		selected={statuses.find((val) => val.value === person.status)}
		onSelectedChange={async (val) => {
			if (!val) return;
			const status = val.value;
			$loadingIds = [...$loadingIds, person.id];
			const result = await fetch(`/api/v1/people/groups/${data.group.id}/members/${person.id}`, {
				method: 'PUT',
				body: JSON.stringify({ status })
			});
			if (!result.ok) {
				$flash = { type: 'error', message: data.t.errors.updating_data() };
			}
			$flash = { type: 'success', message: data.t.forms.actions.updated() };
			await invalidateAll();
			const loadingIdIndex = $loadingIds.findIndex((id) => id === person.id);
			$loadingIds = $loadingIds.toSpliced(loadingIdIndex, 1);
		}}
	>
		<Select.Trigger class="w-[180px]">
			<Select.Value placeholder="Member status" />
		</Select.Trigger>
		<Select.Content>
			{#each statuses as status}
				<Select.Item value={status.value} label={status.label}>{status.label}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
{/snippet}
