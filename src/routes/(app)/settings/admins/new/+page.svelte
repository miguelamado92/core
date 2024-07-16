<script>
	import { page } from '$app/stores';
	export let data;
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import { Input, Button, superForm, valibotClient, Debug } from '$lib/comps/ui/forms';
	import { create } from '$lib/schema/core/admin';
	const form = superForm(data.form, {
		validators: valibotClient(create),
		dataType: 'json'
	});
	const { form: formData, errors: formErrors, enhance } = form;
</script>

<PageHeader title={$page.data.t.pages.config.settings.admins.new()} />

<form method="post" use:enhance class="grid grid-cols-1 gap-4 mt-6">
	<Input
		{form}
		name="full_name"
		label={$page.data.t.forms.fields.generic.full_name.label()}
		bind:value={$formData.full_name}
	/>
	<Input
		{form}
		type="email"
		name="email"
		label={$page.data.t.forms.fields.generic.email.label()}
		bind:value={$formData.email}
		description={$page.data.t.config.settings.admins.forms.fields.email.description()}
	/>
	<Button type="submit" class="col-span-2">{$page.data.t.forms.buttons.submit()}</Button>
	<Debug data={$formData} />
</form>
