<script lang="ts">
	import { page } from '$app/stores';
	import { type FilterTypeNotInList } from '$lib/schema/people/filters/filters';
	let { item = $bindable() }: { item: FilterTypeNotInList } = $props();
	import ListDropdown from '$lib/comps/widgets/lists/ListDropdown.svelte';
</script>

<div class="flex gap-4 items-center">
	<div class="flex-grow">
		<ListDropdown bind:value={item.list_id} onSelectList={(e) => (item.list_id = e.id)} />
	</div>
</div>
