<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
</script>

<DataGrid
	filterKey="search"
	items={data.sends.items}
	count={data.sends.count}
	title={data.t.pages.communications.email.index()}
	newItemHref="/communications/email/new"
>
	{#snippet content(send: typeof data.sends.items[0])}
		<div class="flex items-center gap-2 justify-between">
			<div>{send.name}</div>
			<Button href={`/communications/email/${send.id}`} variant="outline" size="sm">
				{data.t.forms.buttons.view()}
			</Button>
		</div>
	{/snippet}
	{#snippet headerButton()}
		<Button href="/communications/email/new" variant="default" size="sm">
			{data.t.pages.communications.email.new()}
		</Button>
	{/snippet}
</DataGrid>
