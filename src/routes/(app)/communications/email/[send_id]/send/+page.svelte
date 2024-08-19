<script lang="ts">
	export let data;
	import { sendToList } from '$lib/schema/communications/email/sends';
	import {
		Debug,
		Button,
		superForm,
		Grid,
		SelectList,
		valibotClient,
		Error
	} from '$lib/comps/ui/forms';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	const form = superForm(data.form, {
		validators: valibotClient(sendToList)
	});
	const { form: formData, enhance, message } = form;
</script>

<PageHeader title={data.t.pages.communications.email.edit()}>
	{#snippet button()}
		<Button variant="default" size="sm">
			{data.t.forms.buttons.send()}
		</Button>
	{/snippet}
</PageHeader>

<form use:enhance method="post">
	<Grid cols={1} class="mt-6">
		<Error error={$message} />
		<SelectList label={null} {form} name="list_id" bind:value={$formData.list_id as number} />
		<Button type="submit">{data.t.forms.buttons.send()}</Button>
		<Debug data={formData} />
	</Grid>
</form>
