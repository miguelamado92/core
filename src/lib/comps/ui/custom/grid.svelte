<script lang="ts">
	import type { NumericRange } from '@sveltejs/kit';
	export let cols: NumericRange<1, 4> = 2;
	import { cn } from '$lib/utils';
	let className = '';
	export { className as class };
</script>

{#if cols === 1}
	<div class={cn('grid grid-cols-1 gap-4', className)}>
		<slot />
	</div>
{:else if cols === 2}
	<div class={cn('grid grid-cols-1 lg:grid-cols-2 gap-4', className)}>
		<slot />
	</div>
{:else if cols === 3}
	<div class={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
		<slot />
	</div>
{:else}
	<div class={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4', className)}>
		<slot />
	</div>{/if}
