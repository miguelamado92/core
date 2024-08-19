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
	import Plus from 'lucide-svelte/icons/plus';
</script>

<PageHeader title={data.t.pages.communications.whatsapp.sends.new()} />
<form use:enhance method="post">
	<Grid cols={1} class="mt-4">
		<Error error={$message} />
		<div class="flex items-center gap-4">
			<ListDropdown bind:value={$formData.list_id}>
				<Plus size={14} />
				{data.t.forms.fields.communications.whatsapp.send_message.choose_list_to_send()}
			</ListDropdown>
		</div>
		<FormButton>{data.t.forms.buttons.send()}</FormButton>
		<Debug data={$formData} />
	</Grid>
</form>
