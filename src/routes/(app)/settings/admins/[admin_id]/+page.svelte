<script lang="ts">
	import { page } from '$app/stores';
	export let data;
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import { Input, Button, superForm, valibotClient, Debug, Checkbox } from '$lib/comps/ui/forms';
	import { update } from '$lib/schema/core/admin';
	const form = superForm(data.form, {
		validators: valibotClient(update),
		dataType: 'json'
	});
	const { form: formData, errors: formErrors, enhance } = form;
</script>

<PageHeader title={$page.data.t.pages.config.settings.admins.edit()} />

<form method="post" use:enhance class="grid grid-cols-1 gap-4 mt-6">
	<Input
		{form}
		name="full_name"
		label={$page.data.t.forms.fields.generic.full_name.label()}
		bind:value={$formData.full_name as string}
	/>
	<Input
		{form}
		type="url"
		name="profile_picture_url"
		label={$page.data.t.forms.fields.generic.email.label()}
		bind:value={$formData.profile_picture_url as string}
		description={$page.data.t.config.settings.admins.forms.fields.email.description()}
	/>
	<Checkbox {form} name="active" label="Active" bind:checked={$formData.active as boolean} />

	<Button type="submit" class="col-span-2">{$page.data.t.forms.buttons.submit()}</Button>
	<Debug data={$formData} />
</form>
