<script lang="ts">
	import { page } from '$app/stores';
	import FileUpload from '$lib/comps/ui/form/controls/file_upload/file_upload.svelte';
	import { type List, type Read } from '$lib/schema/website/uploads';
	import Button from '$lib/comps/ui/button/button.svelte';
	import { getFlash } from 'sveltekit-flash-message';
	const flash = getFlash(page);
	let { onselected, upload = $bindable() }: { onselected?: (upload: Read) => void; upload?: Read } =
		$props();
	import RenderUpload from './RenderUpload.svelte';
	import Input from '$lib/comps/ui/input/input.svelte';
	let filter: string | null = $state(null);
	let list: List = $state({ items: [], count: 0 });
	import { load, upload as handleUpload } from './actions';
	import Error from '$lib/comps/ui/form/controls/Error.svelte';
	import { onMount } from 'svelte';
	async function reload() {
		list = await load(filter);
	}
	onMount(async () => {
		await reload();
	});

	import { debounce } from '$lib/utils';
</script>

<Input
	placeholder={$page.data.t.forms.fields.generic.filter.placeholder()}
	bind:value={filter}
	oninput={debounce(reload, 400)}
/>

<div class="border rounded p-4">
	<FileUpload
		on:uploaded={async (e) => {
			try {
				const uploaded = await handleUpload(e.detail, $page.data.t);
				upload = uploaded;
				onselected && onselected(uploaded);
				$flash = { type: 'success', message: $page.data.t.forms.actions.created() };
			} catch (err) {
				if (err instanceof Error) {
					$flash = { type: 'error', message: err.message };
				} else {
					$flash = { type: 'error', message: $page.data.t.errors.generic() };
				}
			}
		}}
	/>
</div>

{#if list.count > 0}
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mt-4">
		{#each list.items as item}
			<RenderUpload upload={item} showCopyButton={false}>
				<Button
					onclick={() => {
						upload = item;
						onselected && onselected(item);
					}}>sdsdsds</Button
				>
			</RenderUpload>
		{/each}
	</div>
{/if}
