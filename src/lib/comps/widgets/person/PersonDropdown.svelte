<script lang="ts">
	import { page } from '$app/stores';
	import { type _ListWithSearch } from '$lib/schema/people/people';
	import { debounce } from '$lib/utils';
	type Props = {
		people?: _ListWithSearch['items'];
		person?: _ListWithSearch['items'][number];
		selectedPersonIds: number[];
		onAddPerson: (person: _ListWithSearch['items'][number]) => void;
	};
	let {
		people = $bindable([]),
		person = $bindable(),
		selectedPersonIds,
		onAddPerson
	}: Props = $props();
	let loading = $state(false);
	let open = $state(false);
	let selectablePeople = $derived(people.filter((p) => selectedPersonIds.indexOf(p.id) === -1));

	import { load } from '$lib/comps/widgets/person/actions';
	import PersonBadge from '$lib/comps/widgets/PersonBadge.svelte';

	import * as Command from '$lib/comps/ui/command';
	import * as Popover from '$lib/comps/ui/popover';
	import Button from '$lib/comps/ui/button/button.svelte';
	import Plus from 'lucide-svelte/icons/plus';

	import { onMount } from 'svelte';
	onMount(async () => {
		loading = true;
		people = await load(null);
		loading = false;
	});

	async function handleAddPerson(personId: number) {
		const selectedPerson = people.findIndex((p) => p.id === personId);
		onAddPerson(people[selectedPerson]);
		person = people[selectedPerson];
		selectedPersonIds = [...selectedPersonIds, personId];
	}

	let value: string | undefined = $state();

	async function search() {
		loading = true;
		await load(value).then((returnedPeople) => {
			people = returnedPeople;
			console.log(people.length);
			loading = false;
		});
	}
</script>

<div class="flex items-center justify-start gap-2 flex-wrap">
	{@render popover()}
</div>
{#snippet popover()}
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				size="sm"
				builders={[builder]}
				variant="outline"
				class="justify-start gap-x-1 rounded-lg px-2 py-3"
			>
				<Plus size={14} />
				<div class="text-sm">{$page.data.t.forms.buttons.search_people()}</div>
			</Button>
		</Popover.Trigger>
		<Popover.Content class="p-0" align="start" side="right">
			<Command.Root>
				<Command.Input
					placeholder={$page.data.t.forms.fields.tags.filter_tags.label()}
					bind:value
					oninput={debounce(search, 500)}
				/>
				<Command.List>
					{#if loading}
						<Command.Loading class="p-2 text-foreground-muted"
							>{$page.data.t.common.status.loading()}</Command.Loading
						>
					{:else}
						<Command.Empty>{$page.data.t.common.data.no_items()}</Command.Empty>
						{#each selectablePeople as person, i}
							<Command.Item
								value={`${person.id}:::${person.search}`}
								onSelect={(v) => {
									const id = v.split(':::')[0];
									handleAddPerson(Number(id));
									if (selectablePeople.length === 0) open = false;
								}}
							>
								<PersonBadge {person} linkToProfile={false} />
							</Command.Item>
						{/each}
					{/if}
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
{/snippet}
