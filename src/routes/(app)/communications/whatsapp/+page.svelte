<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
</script>

<DataGrid
	title={data.t.pages.communications.whatsapp.index()}
	filterKey="name"
	items={data.threads.items}
	count={data.threads.count}
	newItemHref="/communications/whatsapp/new"
	options={{ nothingFoundMessage: data.t.common.data.not_found_types.threads() }}
>
	{#snippet headerButton()}
		<Button href="/communications/whatsapp/new" variant="default" size="sm">
			{data.t.pages.communications.whatsapp.new()}
		</Button>
	{/snippet}
	{#snippet content(send: typeof data.threads.items[0])}
		<div class="flex items-center gap-2 justify-between">
			<div class="font-medium">{send.name}</div>
			<Button href={`/communications/whatsapp/${send.id}`} variant="default" size="sm">
				{data.t.forms.buttons.view()}
			</Button>
		</div>
	{/snippet}
</DataGrid>
