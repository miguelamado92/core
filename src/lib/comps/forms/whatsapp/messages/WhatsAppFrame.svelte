<script lang="ts">
	import { type Snippet } from 'svelte';
	const { selected, children }: { selected: boolean; children: Snippet } = $props();
</script>

<div
	class={'rounded-lg border text-sm text-left py-1.5 px-2'}
	class:bg-white={!selected}
	class:bg-blue-500={selected}
	class:border-blue-500={selected}
	class:text-white={selected}
>
	{@render children()}
</div>
