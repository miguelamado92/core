<script>
	import { page } from '$app/stores';
	export let data;
	import Grid from '$lib/comps/ui/custom/grid.svelte';
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import PasswordInput from '$lib/comps/ui/form/controls/password-input.svelte';
	import { Button, superForm, valibotClient, Debug } from '$lib/comps/ui/forms';
	import { update } from '$lib/schema/core/instance';

	const form = superForm(data.form, {
		validators: valibotClient(update),
		dataType: 'json'
	});

	const { form: formData, errors: formErrors, enhance } = form;
</script>

<form method="POST" use:enhance>
	<DataGrid
		title={$page.data.t.pages.config.settings.secrets.index()}
		items={data.services}
		count={data.services.length}
		options={{ showFilter: false }}
	>
		{#snippet content(service)}
			<Grid cols={2} class="items-center gap-4">
				<div class="font-medium">{service.key}</div>
				<PasswordInput
					{form}
					name="secrets.{service.key}"
					bind:value={$formData.secrets[service.key]}
					class="h-10 w-full rounded px-3 text-sm"
				/>
			</Grid>
		{/snippet}
	</DataGrid>
	<Button type="submit" class="col-span-2 mt-4">{$page.data.t.forms.buttons.submit()}</Button>
</form>
<Debug data={$formData} />
