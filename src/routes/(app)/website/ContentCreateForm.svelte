<script lang="ts">
	import { page } from '$app/stores';
	import {
		superForm,
		Input,
		valibotClient,
		Debug,
		Code,
		Textarea,
		Button,
		Error,
		Grid,
		HTML
	} from '$lib/comps/ui/forms';
	import UploadWidget from '$lib/comps/widgets/uploads/UploadWidget.svelte';
	import { create, update } from '$lib/schema/website/content';
	import Collapsible from '$lib/comps/ui/custom/collapsible/collapsible.svelte';
	const { isCreate }: { isCreate: boolean } = $props();
	const form = superForm($page.data.form, {
		validators: valibotClient(isCreate ? create : update),
		dataType: 'json'
	});
	const { form: formData, message, enhance } = form;
</script>

<form method="post" use:enhance>
	<Grid cols={1}>
		<Error error={$message} />
		<Grid cols={2}>
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
		</Grid>
		<Input
			{form}
			name="heading"
			label={$page.data.t.forms.fields.generic.page_heading.label()}
			bind:value={$formData.heading}
		/>

		<HTML
			{form}
			name="html"
			label={$page.data.t.forms.fields.generic.html.label()}
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
		<Button></Button>
		<Debug data={$formData} />
	</Grid>
</form>
