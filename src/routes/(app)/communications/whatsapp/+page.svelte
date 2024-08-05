<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import Datatable from '$lib/comps/ui/custom/table/datatable.svelte';
</script>

<Datatable
	filterKey="name"
	items={data.threads.items}
	count={data.threads.count}
	header={data.t.pages.communications.whatsapp.index()}
	seperator={true}
>
	{#snippet content(send: typeof data.threads.items[0])}
		<div class="flex items-center gap-2 justify-between">
			<div class="font-medium">{send.name}</div>
			<Button href={`/communications/whatsapp/${send.id}`} variant="default" size="sm">
				{data.t.forms.buttons.view()}
			</Button>
		</div>
	{/snippet}
	{#snippet button()}
		<Button href="/communications/whatsapp/new" variant="default" size="sm">
			{data.t.pages.communications.whatsapp.new()}
		</Button>
	{/snippet}
</Datatable>
