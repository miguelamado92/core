<script lang="ts">
	import SuperDebug from 'sveltekit-superforms';
	export let data: any;
	import { PUBLIC_FROM_DEBUG_MODE } from '$env/static/public';
	const debug = Boolean(PUBLIC_FROM_DEBUG_MODE);
	let className: string = 'my-6';
	export { className as class };
	import { cn } from '$lib/utils';
	import { browser } from '$app/environment';
</script>

{#if browser}
	{#if debug}<div class={cn(className)}><SuperDebug {data} /></div>{/if}
{/if}
