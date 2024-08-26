<script lang="ts">
	const { data } = $props();
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
	import RenderUpload from '$lib/comps/widgets/uploads/RenderUpload.svelte';
</script>

<DataGrid
	items={data.uploads.items}
	count={data.uploads.count}
	title={data.t.pages.website.uploads.index()}
	options={{
		contentGridClass:
			'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6',
		showBottomSeparator: false,
		showTopSeparator: false,
		contentHighlightHover: false,
		filterKey: 'file_name'
	}}
>
	{#snippet headerButton()}
		<Button href="/website/uploads/new">{data.t.forms.buttons.new()}</Button>
	{/snippet}
	{#snippet content(item: typeof data.uploads.items[0])}
		<RenderUpload upload={item} showCopyButton={true} />
	{/snippet}
</DataGrid>
