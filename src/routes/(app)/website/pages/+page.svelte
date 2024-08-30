<script lang="ts">
	export let data;
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
</script>

<DataGrid
	title={data.t.pages.website.pages.index()}
	items={data.pages.items}
	count={data.pages.count}
	newItemHref="/website/pages/new"
	options={{ nothingFoundMessage: data.t.common.data.not_found_types.content() }}
>
	{#snippet headerButton()}
		<Button href="/website/pages/new">{data.t.pages.website.pages.new()}</Button>
	{/snippet}
	{#snippet content(content: typeof data.pages.items[0])}
		<div class="flex items-center justify-between gap-4">
			<div>{content.name}</div>
			<div class="flex items-center gap-2">
				<Button variant="outline" href={`/website/pages/${content.id}/preview`} target="_blank"
					>{data.t.forms.buttons.preview()}</Button
				>
				<Button href={`/website/pages/${content.id}`} variant="default"
					>{data.t.forms.buttons.edit()}</Button
				>
			</div>
		</div>
	{/snippet}
</DataGrid>
