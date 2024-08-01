<script lang="ts">
	import type { Snippet } from 'svelte';
	type Props = {
		selected: boolean;
		messageId?: string;
		children: Snippet;
		removePadding?: boolean;
	};
	let { selected, messageId, children, removePadding = false }: Props = $props();
</script>

<div>
	{#if messageId}<div class="mt-1 text-xs text-muted-foreground">MSGID:{messageId}</div>{/if}
	<div class="flex">
		<div
			class="bg-white rounded-lg border text-sm text-left"
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
