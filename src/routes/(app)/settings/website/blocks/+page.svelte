<script lang="ts">
	export let data;
	import DataTable from '$lib/comps/ui/custom/table/datatable.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
</script>

<DataTable
	header={data.t.pages.config.settings.website.blocks.index()}
	filterKey={'name'}
	count={data.blocks.count}
	items={data.blocks.items}
>
	{#snippet button()}
		<Button href="/settings/website/blocks/new"
			>{data.t.pages.config.settings.website.blocks.new()}</Button
		>
	{/snippet}

	{#snippet content(block: typeof data.blocks.items[0])}
		<div class="flex items-center gap-4 justify-between">
			<div class="font-medium">{block.name}</div>
			<Button href="/settings/website/blocks/{block.id}">{data.t.forms.buttons.edit()}</Button>
		</div>
	{/snippet}
</DataTable>
