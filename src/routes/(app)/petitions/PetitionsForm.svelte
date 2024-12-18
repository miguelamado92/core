<script lang="ts" context="module">
	type T = Record<string, unknown>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>">
	import { page } from '$app/stores';
	import Collapsible from '$lib/comps/ui/custom/collapsible/collapsible.svelte';
	import Separator from '$lib/comps/ui/separator/separator.svelte';
	import {
		Input,
		Button,
		DateTime,
		Error,
		HTML,
		Checkbox,
		Textarea,
		Grid,
		Switch,
		Code,
		Debug,
		superForm,
		valibotClient
	} from '$lib/comps/ui/forms';
	import UploadWidget from '$lib/comps/widgets/uploads/UploadWidget.svelte';
	export let isUpdate: boolean = false;

	import { create, update } from '$lib/schema/petitions/petitions';
	const form = superForm($page.data.form, {
		validators: valibotClient(isUpdate ? update : create),
		dataType: 'json'
	});
	const { form: formData, enhance, message } = form;
</script>

<form use:enhance method="post">
	<Grid cols={1} class="mt-6">
		<Error error={$message} />
		<Input
			{form}
			name="name"
			label={$page.data.t.forms.fields.generic.name.label()}
			bind:value={$formData.name}
		/>
		<Input
			{form}
			name="slug"
			label={$page.data.t.forms.fields.generic.slug.label()}
			description={$page.data.t.forms.fields.generic.slug.description()}
			bind:value={$formData.slug}
		/>
		<Separator class="my-6" />
		<Input
			{form}
			name="petition_target"
			label={$page.data.t.forms.fields.petitions.petition_target.label()}
			description={$page.data.t.forms.fields.petitions.petition_target.description()}
			bind:value={$formData.petition_target}
		/>
		<Textarea
			{form}
			name="petition_text"
			label={$page.data.t.forms.fields.petitions.petition_text.label()}
			description={$page.data.t.forms.fields.petitions.petition_text.description()}
			bind:value={$formData.petition_text}
		/>
		<Separator class="my-6" />
		<Input
			{form}
			name="heading"
			label={$page.data.t.forms.fields.generic.page_heading.label()}
			bind:value={$formData.heading}
		/>
		<HTML
			{form}
			name="html"
			label={$page.data.t.forms.fields.generic.content.label()}
			bind:value={$formData.html}
		/>
		<UploadWidget
			label={$page.data.t.forms.fields.feature_image.label()}
			upload_id={$formData.feature_image_upload_id}
			onselected={(upload) => {
				if (upload?.id) $formData.feature_image_upload_id = upload.id;
				if (upload === null) $formData.feature_image_upload_id = null;
			}}
		/>

		<Collapsible class="mb-4">
			{#snippet trigger()}
				{$page.data.t.forms.fields.events.user_information_settings.label()}
			{/snippet}
			<Grid cols={1}>
				<Grid cols={2} class="border rounded p-4">
					<Checkbox
						{form}
						name="ask_email"
						label={$page.data.t.forms.fields.events.user_information_settings.fields.ask_email.label()}
						bind:checked={$formData.ask_email}
					/>
					<Checkbox
						{form}
						name="require_email"
						label={$page.data.t.forms.fields.events.user_information_settings.fields.require_email.label()}
						bind:checked={$formData.require_email}
					/>
				</Grid>
				<Grid cols={2} class="border rounded p-4">
					<Checkbox
						{form}
						name="ask_phone_number"
						label={$page.data.t.forms.fields.events.user_information_settings.fields.ask_phone_number.label()}
						bind:checked={$formData.ask_phone_number}
					/>
					<Checkbox
						{form}
						name="require_phone_number"
						label={$page.data.t.forms.fields.events.user_information_settings.fields.require_phone_number.label()}
						bind:checked={$formData.require_phone_number}
					/>
				</Grid>
				<Grid cols={2} class="border rounded p-4">
					<Checkbox
						{form}
						name="ask_address"
						label={$page.data.t.forms.fields.events.user_information_settings.fields.ask_full_address.label()}
						bind:checked={$formData.ask_address}
					/>
					<Checkbox
						{form}
						name="require_address"
						label={$page.data.t.forms.fields.events.user_information_settings.fields.require_full_address.label()}
						bind:checked={$formData.require_address}
					/>
				</Grid>
				<Grid cols={2} class="border rounded p-4">
					<Checkbox
						{form}
						name="ask_postcode"
						label={$page.data.t.forms.fields.events.user_information_settings.fields.ask_postcode.label()}
						bind:checked={$formData.ask_postcode}
					/>
					<Checkbox
						{form}
						name="require_postcode"
						label={$page.data.t.forms.fields.events.user_information_settings.fields.require_postcode.label()}
						bind:checked={$formData.require_postcode}
					/>
				</Grid>
			</Grid>
		</Collapsible>

		<Button></Button>
		<Debug data={$formData} />
	</Grid>
</form>
