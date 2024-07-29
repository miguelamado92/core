<script lang="ts">
	import type { Snippet } from 'svelte';
	const { children, selected }: { children: Snippet; selected: boolean } = $props();
</script>

<div class="flex justify-center">
	<div class="bg-white rounded-lg w-sm border" class:border-primary-500={selected}>
		{@render children()}
	</div>
</div>
