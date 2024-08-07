<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	const { class: className = '', children }: { class?: string; children: Snippet } = $props();
</script>

<h1 class={cn('text-xl md:text-2xl lg:text-3xl xl:text-3xl font-bold', className)}>
	{@render children()}
</h1>
