<script lang="ts">
	export let data;
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
</script>

<DataGrid
	title={data.t.pages.website.posts.index()}
	items={data.posts.items}
	count={data.posts.count}
	newItemHref="/website/posts/new"
>
	{#snippet headerButton()}
		<Button href="/website/posts/new">{data.t.pages.website.posts.new()}</Button>
	{/snippet}
	{#snippet content(content: typeof data.posts.items[0])}
		<div class="flex items-center justify-between gap-4">
			<div>{content.name}</div>
			<div class="flex items-center gap-2">
				<Button variant="outline" href={`/website/posts/${content.id}/preview`} target="_blank"
					>{data.t.forms.buttons.preview()}</Button
				>
				<Button href={`/website/posts/${content.id}`}>{data.t.forms.buttons.edit()}</Button>
			</div>
		</div>
	{/snippet}
</DataGrid>
