<script lang="ts">
	import type { Snippet } from 'svelte';
	type Props = {
		selected: boolean;
		messageId?: string | null;
		noStyle?: boolean;
		children: Snippet;
		removePadding?: boolean;
	};
	let { selected, noStyle = false, messageId, children, removePadding = false }: Props = $props();
</script>

<div>
	{#if messageId}<div class="mt-1 text-xs text-muted-foreground">MSGID:{messageId}</div>{/if}
	<div class="flex">
		<div
			class={noStyle ? '' : 'rounded-lg border text-sm text-left'}
			class:bg-white={!selected}
			class:bg-blue-500={selected}
			class:border-blue-500={selected}
			class:text-white={selected}
			class:p-2={!removePadding}
			class:py-1.5={!removePadding}
		>
			{@render children()}
		</div>
	</div>
</div>
