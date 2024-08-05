<script lang="ts" generics="T">
	import Filter from '$lib/comps/ui/custom/filter/filter.svelte';
	import Separator from '$lib/comps/ui/separator/separator.svelte';
	import type { Snippet } from 'svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	let loading = $state(false);
	import Pagination from '$lib/comps/ui/custom/pagination/pagination.svelte';
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';

	type Props = {
		items: T[];
		class?: string;
		count: number;
		children?: Snippet;
		content: Snippet<[T, number?]>;
		header?: Snippet<[Snippet<[string?]>, string]>;
		separator?: boolean;
		filterKey?: string;
		pagination?: boolean;
	};

	const {
		items,
		count,
		children,
		content,
		separator = true,
		class: className,
		header,
		pagination = true,
		filterKey = 'name'
	}: Props = $props();
</script>

{#snippet filter()}
	<Filter {filterKey} bind:loading />
{/snippet}

{#if header}<div
		class={cn(
			'flex w-full flex-wrap lg:flex-nowrap gap-4 items-center justify-between ',
			className
		)}
	>
		{@render header(filter, filterKey)}
	</div>
{/if}
{#if separator}
	<Separator class="mt-6" />
{/if}
{#if children}{@render children()}{/if}
<div class="grid grid-cols-1 relative divide-y">
	{#each items as item, i}
		<div class="hover:bg-slate-100">
			{@render content(item, i)}
		</div>
	{:else}
		<div class="flex items-center justify-center h-48">
			<p class="text-muted-foreground">{$page.data.t.common.data.no_items()}</p>
		</div>
	{/each}
	{#if loading}
		<div class="bg-slate-50 bg-opacity-70 absolute inset-0 flex items-center justify-center z-50">
			<div class="animate-spin rounded-full text-muted-foreground">
				<LoaderCircle />
			</div>
		</div>
	{/if}
</div>
{#if separator}
	<Separator class="mb-6" />
{/if}
{#if pagination}
	<Pagination {count} bind:loading />
{/if}
