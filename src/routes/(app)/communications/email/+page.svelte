<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import Datatable from '$lib/comps/ui/custom/table/datatable.svelte';
</script>

<Datatable
	filterKey="search"
	items={data.sends.items}
	count={data.sends.count}
	header={data.t.pages.communications.email.index()}
>
	{#snippet content(send: typeof data.sends.items[0])}
		<div class="flex items-center gap-2 justify-between">
			<div>{send.name}</div>
			<Button href={`/communications/email/${send.id}`} variant="default" size="sm">
				{data.t.forms.buttons.view()}
			</Button>
		</div>
	{/snippet}
	{#snippet button()}
		<Button href="/communications/email/new" variant="default" size="sm">
			{data.t.pages.communications.email.new()}
		</Button>
	{/snippet}
</Datatable>
