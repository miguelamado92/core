<script lang="ts">
	export let data;
	import { page } from '$app/stores';
	import { Switch, Debug, Error, Input, Grid, superForm, valibotClient } from '$lib/comps/ui/forms';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';

	import { update } from '$lib/schema/petitions/petitions';
	const form = superForm(data.form, {
		validators: valibotClient(update),
		dataType: 'json'
	});
	let { form: formData, enhance, message, allErrors } = form;
</script>

<PageHeader title={data.t.pages.actions.petitions.edit()}>
	{#snippet button()}
		<div class="flex items-center gap-2">
			<Button href="/petitions/{$page.params.petition_id}/edit"
				>{data.t.forms.buttons.back()}</Button
			>
		</div>
	{/snippet}
</PageHeader>

{#snippet editPreviewButtons(messageId: number, visible: boolean)}
	{#if visible}
		<div class="flex items-center gap-2">
			<Button href="/communications/email/messages/{messageId}" target="_blank">
				{data.t.forms.buttons.edit()}
			</Button>
			<Button
				variant="outline"
				href="/preview/email/{messageId}?petition_id={$page.params.petition_id}"
				target="_blank"
			>
				{data.t.forms.buttons.preview()}
			</Button>
		</div>
	{/if}
{/snippet}

<form method="post" use:enhance>
	<Grid cols={1} class="mt-4">
		<Error error={$message} />
		<Grid cols={1} class="border rounded-lg p-4">
			<Switch
				class="border-none p-0"
				{form}
				name="send_autoresponse_email"
				label={data.t.forms.fields.events.email_notification_settings.send_registration_email.label()}
				description={data.t.forms.fields.events.email_notification_settings.send_registration_email.description()}
				bind:checked={$formData.send_autoresponse_email as boolean}
			/>

			{@render editPreviewButtons(data.petition.autoresponse_email.id, $formData.send_autoresponse_email as boolean)}
		</Grid>

		<div class="flex justify-end">
			<Button type="submit">{data.t.forms.buttons.submit()}</Button>
		</div>
		<Debug data={$formData} />
	</Grid>
</form>
