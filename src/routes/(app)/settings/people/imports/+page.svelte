<script>
	import { page } from '$app/stores';
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import Avatar from '$lib/comps/ui/custom/avatar/avatar.svelte';
	import { Badge } from '$lib/comps/ui/badge';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import Date from '$lib/comps/ui/form/datetime/date.svelte';
</script>

<DataGrid
	title={$page.data.t.pages.config.settings.people.imports.index()}
	items={data.imports.items}
	count={data.imports.count}
	newItemHref="/settings/people/imports/new"
>
	{#snippet headerButton()}
		<Button href="/settings/people/imports/new"
			>{$page.data.t.pages.config.settings.people.imports.new()}</Button
		>
	{/snippet}

	{#snippet content(importItem)}
		<div class="flex justify-between items-center gap-4">
			<div>
				<div>
					{importItem.created_at.toLocaleString(data.t.locale, {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric',
						timeZoneName: 'short'
					})}
				</div>
				<div class="text-muted-foreground text-sm">
					{data.timeAgo.format(importItem.created_at)}
				</div>
			</div>
			<div class="hidden lg:block">
				{#if importItem.status === 'complete'}
					<div class="flex items-center gap-2">
						<Badge class="ml-3" variant="success"
							>{data.t.people.imports.status.imported(importItem.processed_rows)}</Badge
						>
						<Badge class="ml-3" variant="danger"
							>{data.t.people.imports.status.failed(importItem.failed_rows)}</Badge
						>
					</div>
				{:else if importItem.status === 'pending'}
					<Badge class="ml-3">{data.t.common.status.pending()}</Badge>
				{:else if importItem.status === 'processing'}
					<Badge class="ml-3" variant="warning">{data.t.common.status.processing()}</Badge>
				{:else}
					<Badge class="ml-3" variant="danger">{data.t.common.status.failed()}</Badge>
				{/if}
			</div>
		</div>
	{/snippet}
</DataGrid>
