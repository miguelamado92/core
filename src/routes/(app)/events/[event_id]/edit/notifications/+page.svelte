<script lang="ts">
	export let data;
	import { page } from '$app/stores';
	import { Switch, Debug, Error, Input, Grid, superForm, valibotClient } from '$lib/comps/ui/forms';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';

	import { update } from '$lib/schema/events/events';
	const form = superForm(data.form, {
		validators: valibotClient(update),
		dataType: 'json'
	});
	let { form: formData, enhance, message, allErrors } = form;
</script>

<PageHeader title={data.t.pages.events.edit_event()}>
	{#snippet button()}
		<div class="flex items-center gap-2">
			<Button href="/events/{$page.params.event_id}/edit">{data.t.forms.buttons.back()}</Button>
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
				href="/preview/email/{messageId}?event_id={$page.params.event_id}"
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
				name="send_registration_email"
				label={data.t.forms.fields.events.email_notification_settings.send_registration_email.label()}
				description={data.t.forms.fields.events.email_notification_settings.send_registration_email.description()}
				bind:checked={$formData.send_registration_email as boolean}
			/>

			{@render editPreviewButtons(data.event.registration_email.id, $formData.send_registration_email as boolean)}
		</Grid>
		<Grid cols={1} class="border rounded-lg p-4">
			<Switch
				class="border-none p-0"
				{form}
				name="send_reminder_email"
				label={data.t.forms.fields.events.email_notification_settings.send_reminder_email.label()}
				description={$formData.followup_sent_at
					? data.t.forms.fields.events.email_notification_settings.send_reminder_email.sent(
							data.timeAgo.format($formData.followup_sent_at)
						)
					: data.t.forms.fields.events.email_notification_settings.send_reminder_email.description()}
				disabled={$formData.reminder_sent_at !== null}
				bind:checked={$formData.send_reminder_email as boolean}
			/>

			<Input
				type="number"
				{form}
				name="send_reminder_hours_before_start"
				label={data.t.forms.fields.events.email_notification_settings.send_reminder_email.hours_before_start.label()}
				bind:value={$formData.send_reminder_hours_before_start as number}
			/>
			{@render editPreviewButtons(data.event.reminder_email.id, $formData.send_reminder_email as boolean)}
		</Grid>
		<Grid cols={1} class="border rounded-lg p-4">
			<Switch
				class="border-none p-0"
				{form}
				name="send_cancellation_email"
				label={data.t.forms.fields.events.email_notification_settings.send_cancellation_email.label()}
				description={data.t.forms.fields.events.email_notification_settings.send_cancellation_email.description()}
				bind:checked={$formData.send_cancellation_email as boolean}
			/>

			{@render editPreviewButtons(data.event.cancellation_email.id, $formData.send_cancellation_email as boolean)}
		</Grid>
		<Grid cols={1} class="border rounded-lg p-4">
			<Switch
				class="border-none p-0"
				{form}
				name="send_followup_email"
				label={data.t.forms.fields.events.email_notification_settings.send_followup_email.label()}
				description={$formData.followup_sent_at
					? data.t.forms.fields.events.email_notification_settings.send_followup_email.sent(
							data.timeAgo.format($formData.followup_sent_at)
						)
					: data.t.forms.fields.events.email_notification_settings.send_followup_email.description()}
				disabled={$formData.followup_sent_at !== null}
				bind:checked={$formData.send_followup_email as boolean}
			/>

			<Input
				type="number"
				{form}
				name="send_followup_hours_after_end"
				label={data.t.forms.fields.events.email_notification_settings.send_followup_email.hours_after_end.label()}
				bind:value={$formData.send_followup_hours_after_end as number}
			/>
			{@render editPreviewButtons(data.event.followup_email.id, $formData.send_followup_email as boolean)}
		</Grid>

		<div class="flex justify-end">
			<Button type="submit">{data.t.forms.buttons.submit()}</Button>
		</div>
		<Debug data={$formData} />
	</Grid>
</form>
