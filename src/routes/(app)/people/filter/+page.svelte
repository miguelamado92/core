<script lang="ts">
	import { page } from '$app/stores';
	import { list as listPeople, type List as ListPeople } from '$lib/schema/people/people';
	import {
		filterGroup,
		DEFAULT_FILTER_GROUP,
		type FilterGroup
	} from '$lib/schema/people/filters/filters';
	let filter = $state<FilterGroup>(DEFAULT_FILTER_GROUP);
	//let filter = $state(DEFAULT_FILTER_GROUP);
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import FilterGroupWidget from './FilterGroupWidget.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';

	import { getFlash } from 'sveltekit-flash-message';
	import { parse } from '$lib/schema/valibot';
	import Datatable from '$lib/comps/ui/custom/table/datatable.svelte';
	import Separator from '$lib/comps/ui/separator/separator.svelte';
	const flash = getFlash(page);

	let people: ListPeople = $state({ items: [], count: 0 });
	let hasSearched = $state(false);

	async function runFilter() {
		try {
			hasSearched = false;
			const parsed = parse(filterGroup, filter);
			const result = await fetch(`/api/v1/people/filter`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(parsed)
			});
			if (!result.ok) {
				throw new Error($page.data.t.errors.generic());
			}
			const body = await result.json();
			const parsedPeople = parse(listPeople, body);
			people = parsedPeople;
			hasSearched = true;
			$flash = { type: 'success', message: $page.data.t.forms.actions.foundResults(people.count) };
			document.getElementById('results')?.scrollIntoView();
		} catch (err) {
			if (err instanceof Error) {
				$flash = { type: 'error', message: err.message };
			} else {
				$flash = { type: 'error', message: $page.data.t.errors.generic() };
			}
		}
	}

	async function createList() {
		try {
			const parsed = parse(filterGroup, filter);
			const result = await fetch(`/api/v1/people/filter/create_list`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(parsed)
			});
			if (!result.ok) {
				throw new Error($page.data.t.errors.generic());
			}
			$flash = { type: 'success', message: $page.data.t.forms.actions.success() };
		} catch (err) {
			if (err instanceof Error) {
				$flash = { type: 'error', message: err.message };
			} else {
				$flash = { type: 'error', message: $page.data.t.errors.generic() };
			}
		}
	}
</script>

<PageHeader title={$page.data.t.pages.people.filter()} separator={false} class="mb-6" />

<FilterGroupWidget bind:filter root={true} onDelete={() => {}} />

<div class="flex justify-end">
	<Button class="mt-6" onclick={runFilter}
		>{$page.data.t.forms.fields.filters.filter_action()}</Button
	>
</div>

<span id="results"></span>
{#if hasSearched}
	<Separator class="my-6" />
	<Datatable
		seperator={false}
		hasFilter={false}
		header={'Results'}
		items={people.items}
		count={people.count}
	>
		{#snippet content(person: typeof people.items[0])}
			<div>{person.full_name}</div>
		{/snippet}

		{#snippet button()}
			<Button onclick={createList}>{$page.data.t.forms.fields.filters.create_list_action()}</Button>
		{/snippet}
	</Datatable>
{/if}
