<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	const { class: className = '', children }: { class?: string; children: Snippet } = $props();
</script>

<h1 class={cn('text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-extrabold', className)}>
	{@render children()}
</h1>
