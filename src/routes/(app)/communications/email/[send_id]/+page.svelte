<script lang="ts">
	export let data;
	import { update } from '$lib/schema/communications/email/messages';
	import { Debug, Button, superForm, Grid, valibotClient, Error } from '$lib/comps/ui/forms';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import EditMessageForm from '$lib/comps/forms/EditEmailMessageForm.svelte';
	const form = superForm(data.form, {
		validators: valibotClient(update)
	});
	const { form: formData, enhance, message } = form;
	const disabled = data.send.started_at !== null;
	import H1 from '$lib/comps/typography/H1.svelte';
	import Check from 'lucide-svelte/icons/check';
	import Badge from '$lib/comps/ui/badge/badge.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';

	import { invalidateAll } from '$app/navigation';
	if (data.send.started_at && !data.send.completed_at) {
		setTimeout(() => {
			invalidateAll();
		}, 10000);
	}
</script>

<PageHeader title={data.t.pages.communications.email.view()}>
	{#snippet headerSnippet()}
		<div class="flex items-center gap-4">
			<H1>{data.t.pages.communications.email.view()}</H1>
			{#if data.send.started_at && data.send.completed_at}
				<Badge class="flex items-center gap-2" variant="success" size="lg">
					<Check size={16} />
					Completed
				</Badge>
			{:else if data.send.started_at}
				<Badge variant="warning" class="flex items-center gap-2" size="lg">
					<LoaderCircle class="animated animate-spin" size={16} />
					Sending
				</Badge>
			{/if}
		</div>
		{#if data.send.completed_at}<div class="mt-2 text-muted-foreground text-lg">
				Completed {data.timeAgo.format(data.send.completed_at)}
			</div>{/if}
	{/snippet}
	{#snippet button()}
		<div class="flex items-center gap-2">
			{#if !disabled}
				<Button href="/communications/email/{data.send.id}/edit" variant="default" size="sm">
					{data.t.forms.buttons.edit()}
				</Button>
			{/if}
		</div>
	{/snippet}
</PageHeader>

<form use:enhance method="post" action="?message_id={data.message.id}">
	<Grid cols={1} class="mt-6">
		<Error error={$message} />
		<EditMessageForm
			{form}
			{disabled}
			templateId="template_id"
			templates={data.templates.items}
			messageId={data.message.id}
			name="name"
			previewText="preview_text"
			from="from"
			replyTo="reply_to"
			useHtmlAsText="use_html_for_plaintext"
			subject="subject"
			html="html"
			text="text"
		/>
		<Button {disabled} type="submit">{data.t.forms.buttons.save()}</Button>
		<Debug data={formData} />
	</Grid>
</form>
