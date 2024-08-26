<script lang="ts">
	import { type List } from '$lib/schema/website/uploads';
	import { type Snippet } from 'svelte';
	const {
		upload,
		showCopyButton = false,
		children
	}: { upload: List['items'][number]; showCopyButton: boolean; children?: Snippet } = $props();
	import { humanReadableFileSize } from '$lib/utils/text/file_size';
	import Button from '$lib/comps/ui/button/button.svelte';
	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	import Badge from '$lib/comps/ui/badge/badge.svelte';
	const flash = getFlash(page);

	function copy() {
		navigator.clipboard.writeText(upload.url);
		$flash = { type: 'success', message: $page.data.t.forms.actions.copied_to_clipboard() };
	}
</script>

<div class="border rounded">
	{#if upload.mime_type.includes('image')}
		<img src={upload.url} alt={upload.file_name} />
	{/if}
	<div class="p-2">
		<div class="font-medium my-1">{upload.file_name}</div>
		<div class="font-light text-xs text-muted-foreground flex justify-between items-center mt-2">
			<div><Badge variant="secondary">{upload.mime_type}</Badge></div>
			<div><Badge variant="secondary">{humanReadableFileSize(upload.size, true)}</Badge></div>
		</div>
		{#if children}{@render children()}{/if}
		{#if showCopyButton}<div class="flex justify-center mt-3">
				<Button variant="outline" size="sm" onclick={copy}
					>{$page.data.t.forms.buttons.copy_url_to_clipboard()}</Button
				>
			</div>{/if}
	</div>
</div>
