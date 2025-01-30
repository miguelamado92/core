<script lang="ts">
	import { type Read, type List } from '$lib/schema/communications/whatsapp/messages';
	const {
		messages,
		index,
		removeImage,
		selected = $bindable(false)
	}: { messages: Read[]; index: number; removeImage: () => void; selected: boolean } = $props();
	import Button from '$lib/comps/ui/button/button.svelte';
	import XIcon from 'lucide-svelte/icons/x';
</script>

{#if messages[index].message.type === 'text'}
	{@render renderText(messages[index].message.text.body)}
{/if}

{#if messages[index].message.type === 'image'}
	{@render renderImage(messages[index].message.image.link)}
	{#if messages[index].message.image.caption}{@render renderText(
			messages[index].message.image.caption
		)}{/if}
{/if}

{#if messages[index].message.type === 'interactive'}
	{#if messages[index].message.interactive.header && messages[index].message.interactive.header.type === 'image'}
		{@render renderImage(messages[index].message.interactive.header.image.link)}
	{/if}
	{@render renderText(messages[index].message.interactive.body.text)}
{/if}

{#snippet renderText(text: string)}
	<div class="px-2 py-1.5">{text}</div>
{/snippet}

{#snippet renderImage(link: string)}
	<div class="relative">
		<img src={link} alt="To be sent via whatsapp (no alt)" class="rounded-t rounded-b-none" />
		<div class="absolute top-0 right-0">
			<Button
				variant="ghost"
				size="xs"
				onclick={removeImage}
				class="text-xs text-gray-100 hover:text-white hover:bg-opacity-0"
			>
				<XIcon size={16} /></Button
			>
		</div>
	</div>
{/snippet}
