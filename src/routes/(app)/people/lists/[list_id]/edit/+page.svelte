<script lang="ts">
	export let data;
	import { update } from '$lib/schema/people/lists';
	import { Debug, Input, Button, superForm, Grid, valibotClient, Error } from '$lib/comps/ui/forms';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	const form = superForm(data.form, {
		validators: valibotClient(update)
	});
	const { form: formData, enhance, message } = form;
</script>

<PageHeader title={data.t.pages.people.lists.edit()} />

<form use:enhance method="post">
	<Grid cols={1} class="mt-6">
		<Error error={$message} />
		<Input
			label={data.t.forms.fields.generic.name.label()}
			{form}
			name="name"
			bind:value={$formData.name as string}
		/>
		<Button type="submit">{data.t.forms.buttons.save()}</Button>
		<Debug data={formData} />
	</Grid>
</form>
