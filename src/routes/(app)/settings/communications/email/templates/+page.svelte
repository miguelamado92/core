<script lang="ts">
	export let data;
	import DataTable from '$lib/comps/ui/custom/table/datatable.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
</script>

<DataTable
	header="Email Templates"
	filterKey={'name'}
	count={data.templates.count}
	items={data.templates.items}
>
	{#snippet button()}
		<Button href="/settings/communications/email/templates/new"
			>{data.t.pages.config.settings.communications.email.templates.new()}</Button
		>
	{/snippet}

	{#snippet content(template: typeof data.templates.items[0])}
		<div class="flex items-center gap-4 justify-between">
			<div class="font-medium">{template.name}</div>
			<Button href="/settings/communications/email/templates/{template.id}"
				>{data.t.forms.buttons.edit()}</Button
			>
		</div>
	{/snippet}
</DataTable>
