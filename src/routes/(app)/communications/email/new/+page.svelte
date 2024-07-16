<script lang="ts">
	export let data;
	import { create } from '$lib/schema/communications/email/sends';
	import { Debug, Input, Button, superForm, Grid, valibotClient, Error } from '$lib/comps/ui/forms';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	const form = superForm(data.form, {
		validators: valibotClient(create)
	});
	const { form: formData, enhance, message } = form;
</script>

<PageHeader title={data.t.pages.communications.email.new()} />

<form use:enhance method="post">
	<Grid cols={1} class="mt-6">
		<Error error={$message} />
		<Input
			label={data.t.forms.fields.generic.name.label()}
			{form}
			name="name"
			bind:value={$formData.name}
		/>
		<Button type="submit">{data.t.forms.buttons.save()}</Button>
		<Debug data={formData} />
	</Grid>
</form>
