<script lang="ts" generics="T">
	import * as Table from '$lib/comps/ui/table';
	import Filter from '$lib/comps/ui/custom/filter/filter.svelte';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import type { Snippet } from 'svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	let loading = $state(false);
	import Pagination from '$lib/comps/ui/custom/pagination/pagination.svelte';
	import { page } from '$app/stores';

	type Props = {
		items: T[];
		content: Snippet<[T, number]>;
		count: number;
		header: string | null;
		hasFilter?: boolean;
		filterKey?: string;
		seperator?: boolean;
		subheader?: string;
		button?: Snippet;
	};

	const {
		items,
		content,
		button,
		hasFilter = true,
		count,
		seperator = true,
		header,
		filterKey = 'name',
		subheader
	}: Props = $props();
</script>

{#snippet headerSnippet()}
	<div class="flex items-center justify-between lg:justify-end w-full lg:w-auto gap-4">
		{#if hasFilter}<Filter {filterKey} bind:loading />{/if}
		{#if button}{@render button()}{/if}
	</div>
{/snippet}

{#if header}
	<PageHeader separator={false} title={header} subtitle={subheader} button={headerSnippet}
	></PageHeader>
{:else if hasFilter}
	<div class="flex justify-end items-center gap-4">
		<Filter {filterKey} bind:loading />
	</div>
{/if}

{#if items.length > 0}
	<Table.Root class="relative overflow-y-visible">
		<Table.Body>
			{#each items as item, i}
				<Table.Row>
					<Table.Cell>
						{@render content(item, i)}
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
		{#if loading}
			<div class="bg-slate-50 bg-opacity-70 absolute inset-0 flex items-center justify-center z-50">
				<div class="animate-spin rounded-full text-muted-foreground">
					<LoaderCircle />
				</div>
			</div>
		{/if}
	</Table.Root>

	<Pagination {count} bind:loading />
{:else}
	<div class="flex items-center justify-center h-48">
		<p class="text-muted-foreground">{$page.data.t.common.data.no_items()}</p>
	</div>
{/if}
