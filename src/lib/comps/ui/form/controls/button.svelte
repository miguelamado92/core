<script lang="ts">
	let className = '';
	export { className as class };
	import { cn } from '$lib/utils';
	import Button from '$lib/comps/ui/button/button.svelte';
	import { page } from '$app/stores';
	export let variant:
		| 'default'
		| 'destructive'
		| 'ghost'
		| 'link'
		| 'destructive'
		| 'outline'
		| 'secondary' = 'default';
	export let size: 'default' | 'sm' | 'lg' | 'icon' = 'default';
</script>

<div class="lg:flex justify-end gap-4">
	<Button type="submit" {variant} {size} class={cn(className)} {...$$restProps}>
		{#if !$$slots.default}
			{$page.data.t.forms.buttons.submit()}
		{:else}
			<slot />
		{/if}
	</Button>
</div>
