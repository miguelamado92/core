<script lang="ts">
	/* export let title: string;
	export let subtitle: string | null = null;
	export let separator: boolean = true;
	export { className as class }; */
	import type { Snippet } from 'svelte';
	const {
		title,
		subtitle,
		class: className = '',
		separator = true,
		button,
		bottom,
		headerSnippet
	}: {
		title: string;
		subtitle?: string;
		separator?: boolean;
		class?: string;
		headerSnippet?: Snippet;
		button?: Snippet;
		bottom?: Snippet;
	} = $props();
	import H1 from '$lib/comps/typography/H1.svelte';
	import Separator from '$lib/comps/ui/separator/separator.svelte';
	import { cn } from '$lib/utils';
</script>

<div class={cn('flex flex-wrap lg:flex-nowrap gap-4 justify-between items-center', className)}>
	<div class="w-full">
		{#if headerSnippet}
			{@render headerSnippet()}
		{:else}
			<H1 class="border-b-0">{title}</H1>
			{#if subtitle}<h2 class="mt-2 font-medium text-slate-500">{subtitle}</h2>{/if}
		{/if}
	</div>
	{#if button}
		<div class="w-full flex items-center justify-end">
			{@render button()}
		</div>
	{/if}
</div>
{#if separator}
	{#if bottom}
		{@render bottom()}
	{:else}
		<Separator class="mt-4" />
	{/if}
{/if}
