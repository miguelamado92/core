<script lang="ts">
	const { data } = $props();
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Template from '$lib/comps/forms/whatsapp/templates/Template.svelte';
	let templateId = $state(data.thread.template_id);
	let template = $state(data.templates.items.find((template) => template.id === templateId));
</script>

<PageHeader title={data.t.pages.communications.whatsapp.edit()} />
<div class="grid grid-cols-1 gap-6 mt-6">
	<Template bind:template selected={false} />
</div>

<div class="mt-20">
	{JSON.stringify(data.thread)}
	{JSON.stringify(data.templates)}
</div>
