<script lang="ts">
	export let data;
	import H1 from '$lib/comps/typography/H1.svelte';
	import Label from '$lib/comps/ui/label/label.svelte';
	import Switch from '$lib/comps/ui/switch/switch.svelte';
	import {
		superForm,
		valibotClient,
		Input,
		Button,
		Textarea,
		Grid,
		Checkbox,
		Debug,
		HTML,
		Error
	} from '$lib/comps/ui/forms';
	import { create } from '$lib/schema/communications/email/templates';
	const form = superForm(data.form, {
		validators: valibotClient(create),
		dataType: 'json'
	});
	const { form: formData, enhance, message } = form;
	let editHTML = true;
	import { page } from '$app/stores';
</script>

<form method="post" use:enhance>
	<Grid cols={1}>
		<H1>{$page.data.t.pages.config.settings.communications.email.templates.new()}</H1>
		<Error error={$message} />
		<Input
			{form}
			name="name"
			label={data.t.forms.fields.generic.name.label()}
			bind:value={$formData.name as string}
		/>
		<Grid>
			<Input
				{form}
				name="from"
				label={data.t.forms.fields.email.from.label()}
				bind:value={$formData.from as string}
			/>
			<Input
				{form}
				name="reply_to"
				label={data.t.forms.fields.email.reply_to.label()}
				bind:value={$formData.reply_to as string}
			/>
		</Grid>
		<Input
			{form}
			name="subject"
			label={data.t.forms.fields.email.subject.label()}
			bind:value={$formData.subject as string}
		/>
		<Textarea
			{form}
			name="preview_text"
			label={data.t.forms.fields.email.preview_text.label()}
			bind:value={$formData.preview_text as string}
		/>
		<div>
			<div class="flex justify-between items-baseline mb-2">
				<Label>{data.t.forms.fields.email.body.label()}</Label>
				<div class="flex gap-2 items-center">
					<Label class="text-muted-foreground"
						>{editHTML
							? data.t.forms.fields.generic.html.label()
							: data.t.forms.fields.generic.plain_text.label()}</Label
					>
					<Switch bind:checked={editHTML} />
				</div>
			</div>
			{#if editHTML}<HTML
					{form}
					name="html"
					label={null}
					description={null}
					bind:value={$formData.html as string}
				/>
			{:else}
				<Textarea {form} name="text" rows={16} label={null} bind:value={$formData.text as string} />
			{/if}
		</div>
		<Checkbox
			{form}
			name="active"
			label={data.t.forms.fields.generic.active.label()}
			bind:checked={$formData.active as boolean}
		/>
		<Button type="submit">{data.t.forms.buttons.save()}</Button>
		<Debug data={$formData} />
	</Grid>
</form>
