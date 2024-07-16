<script lang="ts">
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import {
		Debug,
		Grid,
		Error,
		Input,
		Checkbox,
		superForm,
		valibotClient
	} from '$lib/comps/ui/forms';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import { update } from '$lib/schema/core/tags';
	const form = superForm(data.form, {
		validators: valibotClient(update)
	});
	const { form: formData, enhance, message } = form;
</script>

<PageHeader title={data.t.pages.config.settings.tags.new()} />
<form use:enhance method="POST" class="mt-6">
	<Grid cols={1}>
		<Error error={$message} />
		<Input
			{form}
			label={data.t.forms.fields.generic.name.label()}
			bind:value={$formData.name as string}
			name="name"
		/>
		<Checkbox
			{form}
			label={data.t.forms.fields.generic.active.label()}
			bind:checked={$formData.active as boolean}
			name="active"
		/>
		<div class="flex justify-end"><Button type="submit">{data.t.forms.buttons.save()}</Button></div>
		<Debug data={$formData} />
	</Grid>
</form>
