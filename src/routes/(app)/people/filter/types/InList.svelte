<script lang="ts">
	import { type FilterTypeInList } from '$lib/schema/people/filters/filters';
	let { item = $bindable() }: { item: FilterTypeInList } = $props();
	import ListDropdown from '$lib/comps/widgets/lists/ListDropdown.svelte';
</script>

<div class="flex gap-4 items-center">
	<div class="flex-grow">
		<ListDropdown bind:value={item.list_id} onSelectList={(e) => (item.list_id = e.id)} />
	</div>
</div>
