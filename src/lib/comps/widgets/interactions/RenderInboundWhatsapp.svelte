<script lang="ts">
	import { page } from '$app/stores';
	import Frame from '$lib/comps/forms/whatsapp/messages/WhatsAppFrame.svelte';
	import type { Message as WebhookMessage } from '$lib/schema/communications/whatsapp/webhooks/messages';
	import type { Message as InboundMessage } from '$lib/schema/communications/whatsapp/webhooks/ycloud';
	import type { Read as ReadPerson, SimplePersonRecord } from '$lib/schema/people/people';
	import Avatar from '$lib/comps/ui/custom/avatar/avatar.svelte';
	import Whatsapp from '$lib/comps/icons/whatsapp.svelte';
	type Props = {
		messageId: string;
		message: WebhookMessage | InboundMessage;
		person: ReadPerson | SimplePersonRecord;
		timeAgo: Date;
	};
	const { messageId, person, timeAgo, message }: Props = $props();
	const selected = false;
</script>

<div class="flex items-start gap-2 mb-3">
	<Avatar profile_picture_url={null} full_name={person.full_name} class="h-10 w-10" />
	<div>
		<Frame selected={false}>
			{#if message.type === 'image'}
				{@render renderImage('https://via.placeholder.com/250x250')}
				{#if 'image' in message && message.image.caption}{message.image.caption}{/if}
			{:else if message.type === 'text'}
				<div class="text-sm">
					{message.text.body}
				</div>
			{:else if message.type === 'button'}
				<div class="text-sm">
					{message.button.text}
				</div>
			{/if}
		</Frame>
		<div class="flex items-center gap-1 mt-1">
			<div><Whatsapp class="w-4 h-4 text-gray-500" /></div>
			<span class="text-xs text-gray-500 leading-none">{$page.data.timeAgo.format(timeAgo)}</span>
		</div>
	</div>
</div>

{#snippet renderImage(url: string)}
	<div class="relative">
		<img src={url} alt="Sent via whatsapp (no alt)" class="rounded" />
	</div>
{/snippet}
