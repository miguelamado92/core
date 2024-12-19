<script>
	import { page } from '$app/stores';
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
</script>

<DataGrid
	title={$page.data.t.pages.config.settings.secrets.index()}
	items={data.services}
	count={data.services.length}
	options={{ showFilter: false }}
>
	{#snippet content(service)}
		<div class="flex justify-between items-center gap-4">
			<div class="flex items-center gap-2">
				<div>
					<div class="font-medium">{service.name}</div>
				</div>
			</div>
			<div>
				<Button href="/settings/secrets/{service.name.toLowerCase()}" variant="outline" size="sm">
					{$page.data.t.forms.buttons.edit()}
				</Button>
			</div>
		</div>
	{/snippet}
</DataGrid>
