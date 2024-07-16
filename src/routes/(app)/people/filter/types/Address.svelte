<script lang="ts">
	import { page } from '$app/stores';
	import { type FilterTypeAddress } from '$lib/schema/people/filters/filters';
	let { item = $bindable() }: { item: FilterTypeAddress } = $props();
	import Input from '$lib/comps/ui/input/input.svelte';
</script>

<div class="flex gap-4 items-center">
	<div class="flex-grow">
		<Input
			bind:value={item.address}
			placeholder={$page.data.t.forms.fields.address.address.label()}
		/>
	</div>
</div>
