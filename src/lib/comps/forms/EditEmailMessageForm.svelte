<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	const flash = getFlash(page);
	import {
		formFieldProxy,
		type SuperForm,
		type FormPathLeaves,
		type FormFieldProxy
	} from 'sveltekit-superforms';
	import type { List as ListTemplates } from '$lib/schema/communications/email/templates';
	export let messageId: number;
	export let disabled: boolean = false;
	export let form: SuperForm<T>;
	export let name: FormPathLeaves<T>;
	export let templateId: FormPathLeaves<T, number>;
	export let from: FormPathLeaves<T>;
	export let replyTo: FormPathLeaves<T>;
	export let subject: FormPathLeaves<T>;
	export let previewText: FormPathLeaves<T>;
	export let useHtmlAsText: FormPathLeaves<T, boolean>;
	export let html: FormPathLeaves<T>;
	export let text: FormPathLeaves<T>;

	export let hideName: boolean = true;
	export let templates: ListTemplates['items'] = [];
	export let allowTestEmail: boolean = true;
	const { value: fromValue } = formFieldProxy(form, from);
	const { value: replyToValue } = formFieldProxy(form, replyTo);
	const { value: subjectValue } = formFieldProxy(form, subject);
	const { value: nameValue } = formFieldProxy(form, name);
	const { value: templateIdValue } = formFieldProxy(
		form,
		templateId
	) satisfies FormFieldProxy<number>;
	const { value: useHtmlAsTextValue } = formFieldProxy(
		form,
		useHtmlAsText
	) satisfies FormFieldProxy<boolean>;
	const { value: htmlValue } = formFieldProxy(form, html);
	const { value: textValue } = formFieldProxy(form, text);
	const { value: previewTextValue } = formFieldProxy(form, previewText);

	import { Input, HTML, Checkbox, Button, Textarea, Grid, Switch } from '$lib/comps/ui/forms';
	import * as Select from '$lib/comps/ui/select';
	import * as Card from '$lib/comps/ui/card';

	let editHTML = true;
	$: templatesForSelect = templates.map((template) => ({
		value: template.id,
		label: template.name
	}));
	//test email
	import InputWidget from '$lib/comps/ui/input/input.svelte';
	let testEmail: string | undefined;
	import { sendTestEmail } from '$lib/comps/forms/actions/sendTestEmail';
	import Separator from '$lib/comps/ui/separator/separator.svelte';

	async function triggerTestSend() {
		const result = await sendTestEmail({
			email: testEmail,
			messageId,
			successMessage: $page.data.t.forms.actions.success(),
			errorMessage: $page.data.t.forms.actions.failed(),
			message: {
				id: messageId,
				name: $nameValue as string,
				from: $fromValue as string,
				reply_to: $replyToValue as string,
				preview_text: $previewTextValue as string,
				subject: $subjectValue as string,
				html: $htmlValue as string,
				text: $textValue as string,
				use_html_for_plaintext: $useHtmlAsTextValue as boolean,
				template_id: $templateIdValue as number,
				point_person_id: $page.data.admin.id,
				created_at: new Date(),
				updated_at: new Date()
			},
			context: {}
		});
		$flash = result;
	}
</script>

<Grid cols={1} class="mt-6">
	{#if !hideName}
		<Input
			{disabled}
			{form}
			{name}
			label={$page.data.t.forms.fields.generic.name.label()}
			bind:value={$nameValue as string}
		/>
	{/if}
	<Input
		{disabled}
		{form}
		name={from}
		label={$page.data.t.forms.fields.email.from.label()}
		bind:value={$fromValue as string}
	/>
	<Input
		{disabled}
		{form}
		name={replyTo}
		label={$page.data.t.forms.fields.email.reply_to.label()}
		bind:value={$replyToValue as string}
	/>
	<Input
		{disabled}
		{form}
		name={subject}
		label={$page.data.t.forms.fields.email.subject.label()}
		bind:value={$subjectValue as string}
	/>

	<Textarea
		{disabled}
		{form}
		name={previewText}
		label={$page.data.t.forms.fields.email.preview_text.label()}
		description={$page.data.t.forms.fields.email.preview_text.description()}
		bind:value={$previewTextValue  as string}
	/>

	<!-- Right now, we don't need this, and it will be confusing for users
  <Checkbox
		{form}
		name={`${formKey}.useHtmlAsText`}
		label={$page.data.t.forms.fields.email.useHtmlAsPlainText.label()}
		description={$page.data.t.forms.fields.email.useHtmlAsPlainText.description()}
		bind:checked={$formData[formKey].useHtmlAsText}
	/> -->
	<!-- {#if $useHtmlAsTextValue}
		<div class="flex justify-end items-center gap-2">
			<Label class="text-muted-foreground"
				>{editHTML
					? $page.data.t.forms.fields.generic.html.label()
					: $page.data.t.forms.fields.generic.plain_text.label()}</Label
			>
			<SwitchWidget disabled={$useHtmlAsTextValue} bind:checked={editHTML} />
		</div>
	{/if} -->
	<Separator class="my-6" />
	{@render templateChange()}
	{#if editHTML}
		<div class="relative">
			{#if disabled}<div class="bg-white opacity-70 absolute z-20 inset-0"></div>{/if}
			<HTML {form} name={html} label={null} description={null} bind:value={$htmlValue as string} />
		</div>
	{:else}
		<Textarea
			{disabled}
			{form}
			name={text}
			rows={16}
			label={null}
			bind:value={$textValue as string}
		/>
	{/if}
</Grid>

{#if allowTestEmail && !disabled}
	<Separator class="my-6" />
	<Card.Root class="mb-6">
		<Card.Header>
			<Card.Title>{$page.data.t.forms.fields.email.send_test_email.label()}</Card.Title>
		</Card.Header>
		<Card.Content>
			<InputWidget bind:value={testEmail} />
			<div class="text-muted-foreground mt-1">
				{$page.data.t.forms.fields.email.send_test_email.description()}
			</div>
		</Card.Content>
		<Card.Footer>
			<Button type="button" onclick={() => triggerTestSend()}
				>{$page.data.t.forms.buttons.send()}</Button
			>
		</Card.Footer>
	</Card.Root>
{/if}

{#snippet templateChange()}
	{#if templates.length > 0}
		<div class="flex justify-end">
			<Select.Root
				items={templatesForSelect}
				onSelectedChange={(val) => {
					if (!val) return;
					const id = Number(val?.value);
					$templateIdValue = id;
				}}
			>
				<Select.Trigger class="w-[480px]">
					<Select.Value placeholder={$page.data.t.forms.fields.email.template.label()} />
				</Select.Trigger>
				<Select.Content>
					{#each templates as template}
						<Select.Item value={template.id}>{template.name}</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
		</div>
	{/if}
{/snippet}
