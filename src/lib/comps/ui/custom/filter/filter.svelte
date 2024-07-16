<script lang="ts">
	import Input from '$lib/comps/ui/input/input.svelte';
	let {
		filterKey,
		placeholder = 'Filter...',
		loading = $bindable(false)
	}: { filterKey: string; placeholder?: string; loading: boolean } = $props();
	import { page } from '$app/stores';
	let filterValue = $state($page.url.searchParams.get(filterKey));
	import { debounce } from '$lib/utils';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	async function handlePageChange() {
		//set the params... invalidate;
		if (browser) {
			loading = true;
			const params = new URLSearchParams(window.location.search);
			if (filterValue) {
				params.set(filterKey, filterValue);
				await goto(`${window.location.pathname}?${params.toString()}`, { keepFocus: true });
			} else {
				params.delete(filterKey);
				await goto(`${window.location.pathname}?${params.toString()}`, { keepFocus: true });
			}
			loading = false;
		}
	}
</script>

<div class="flex justify-end">
	<Input
		{placeholder}
		class="w-full min-w-48 md:min-w-80 lg:min-w-96"
		bind:value={filterValue}
		oninput={debounce(handlePageChange, 700)}
	/>
</div>
