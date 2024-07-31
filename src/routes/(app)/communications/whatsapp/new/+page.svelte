<script lang="ts">
	export let data;
	import { Grid, Input, Debug, Error, Button, superForm, valibotClient } from '$lib/comps/ui/forms';
	import { create } from '$lib/schema/communications/whatsapp/threads';
	const form = superForm(data.form, {
		validators: valibotClient(create),
		dataType: 'json'
	});
	const { form: formData, enhance, message } = form;
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
</script>

<PageHeader title={data.t.pages.communications.whatsapp.new()} />

<form method="post" use:enhance>
	<Grid cols={1} class="mt-6">
		<Error error={$message} />
		<Input
			label={data.t.forms.fields.generic.name.label()}
			{form}
			name="name"
			bind:value={$formData.name}
		/>
		<Button type="submit">{data.t.forms.buttons.save()}</Button>
		<Debug data={$formData} />
	</Grid>
</form>
