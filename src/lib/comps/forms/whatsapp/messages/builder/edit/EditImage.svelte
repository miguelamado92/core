<script lang="ts">
	import SimpleFileUpload from '$lib/comps/ui/form/controls/file_upload/simple_file_upload.svelte';
	import { type Read } from '$lib/schema/communications/whatsapp/messages';
	type Props = {
		messages: Read[];
		index: number;
	};
	let { index, messages = $bindable() }: Props = $props();
	import * as imageActions from '$lib/comps/forms/whatsapp/messages/builder/actions/images';
	const startingImage = imageActions.extractImageUrl(messages[index].message);
	import Label from '$lib/comps/ui/label/label.svelte';
</script>

<Label>Image</Label>
<SimpleFileUpload
	value={startingImage}
	onUpload={({ url }) => {
		messages[index] = {
			...messages[index],
			message: imageActions.setImageUrl(messages[index].message, url)
		};
	}}
	onResetUploads={() => {
		messages[index] = {
			...messages[index],
			message: imageActions.removeImage(messages[index].message)
		};
	}}
/>
