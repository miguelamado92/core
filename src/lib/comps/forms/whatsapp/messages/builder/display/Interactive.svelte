<script lang="ts">
	import Reply from 'lucide-svelte/icons/reply';
	import { type Read, type List } from '$lib/schema/communications/whatsapp/messages';
	const { messages, index }: { messages: Read[]; index: number } = $props();
</script>

{#if messages[index].message.type === 'interactive'}
	{#if messages[index].message.interactive.type === 'button'}
		{#each messages[index].message.interactive.action.buttons as button, i}
			<div class=" flex items-center gap-1 border-t">
				<Reply size={16} />
				<div>{button.title}</div>
			</div>
		{/each}
	{/if}
{/if}
