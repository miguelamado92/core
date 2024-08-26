<script lang="ts">
	const { data } = $props();
	import { superForm, Error, Button, Input, valibotClient, Debug } from '$lib/comps/ui/forms';
	import HrefButton from '$lib/comps/ui/button/button.svelte';
	import FileUpload from '$lib/comps/ui/form/controls/file_upload/file_upload.svelte';
	import { create } from '$lib/schema/website/uploads';
	const form = superForm(data.form, {
		validators: valibotClient(create),
		dataType: 'json'
	});
	const { message, form: formData, enhance } = form;
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
</script>

<PageHeader title={data.t.pages.website.uploads.new()}>
	{#snippet button()}
		<HrefButton href="/website/uploads">{data.t.forms.buttons.back()}</HrefButton>
	{/snippet}
</PageHeader>
<form method="post" use:enhance class="mt-6">
	<Error error={$message} />
	<div class="my-3">
		<FileUpload
			on:uploaded={(e) => {
				const { url, file_name, mimeType, size } = e.detail;
				if (url) $formData.url = url;
				if (file_name) $formData.file_name = file_name;
				if (mimeType) $formData.mime_type = mimeType;
				if (size) $formData.size = size;
			}}
		/>
	</div>
	<Button disabled={!$formData.url} />
	<Debug data={$formData} />
</form>
