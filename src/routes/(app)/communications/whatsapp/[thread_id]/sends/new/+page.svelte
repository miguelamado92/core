<script lang="ts">
	const { data } = $props();
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import { create } from '$lib/schema/communications/whatsapp/sends';
	import {
		superForm,
		valibotClient,
		Grid,
		Debug,
		Error,
		Button as FormButton
	} from '$lib/comps/ui/forms';
	import ListDropdown from '$lib/comps/widgets/lists/ListDropdown.svelte';
	const form = superForm(data.form, {
		validators: valibotClient(create),
		dataType: 'json'
	});
	const { form: formData, enhance, message } = form;
</script>

<PageHeader title="tite" />
<form use:enhance method="post">
	<Grid cols={1} class="mt-4">
		<Error error={$message} />
		<div class="flex items-center gap-4">
			<div>Choose list:</div>
			<ListDropdown bind:value={$formData.list_id} />
		</div>
		<FormButton>{data.t.forms.buttons.send()}</FormButton>
		<Debug data={$formData} />
	</Grid>
</form>
