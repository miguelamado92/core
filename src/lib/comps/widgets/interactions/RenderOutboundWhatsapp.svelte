<script lang="ts">
	import { page } from '$app/stores';
	import Frame from '$lib/comps/forms/whatsapp/Frame.svelte';
	import PreviewTemplate from '$lib/comps/forms/whatsapp/templates/Preview.svelte';
	import type { Message } from '$lib/schema/communications/whatsapp/elements/message';
	import { type Template as TemplateMessage } from '$lib/schema/communications/whatsapp/elements/template';
	import { type Read as ReadAdmin } from '$lib/schema/core/admin';
	import Avatar from '$lib/comps/ui/custom/avatar/avatar.svelte';
	import Reply from 'lucide-svelte/icons/reply';
	type Props = {
		messageId: string;
		admin: ReadAdmin;
		timeAgo: Date;
		message: Message;
		template?: TemplateMessage;
	};
	const { messageId, timeAgo, admin, template, message }: Props = $props();
	import Whatsapp from '$lib/comps/icons/whatsapp.svelte';
</script>

<div class="flex w-full mt-2 space-x-3 max-w-xl ml-auto justify-end mb-3">
	<div class="flex items-start w-full justify-end gap-2">
		<div>
			<div class="flex justify-end w-full flex-grow">{@render renderMessage()}</div>
			<div class="flex items-center gap-1 mt-1">
				<div><Whatsapp class="w-4 h-4 text-gray-500" /></div>
				<span class="text-xs text-gray-500 leading-none">{$page.data.timeAgo.format(timeAgo)}</span>
			</div>
		</div>
		<Avatar
			profile_picture_url={admin.profile_picture_url}
			full_name={admin.full_name}
			class="h-10 w-10"
		/>
	</div>
</div>

{#snippet renderMessage()}
	{#if message.type === 'text'}
		<Frame selected={true}>
			{message.text.body}
		</Frame>
	{/if}
	{#if message.type === 'image'}
		<Frame selected={true}>
			{@render renderImage(message.image.link)}
			{#if message.image.caption}{message.image.caption}{/if}
		</Frame>
	{/if}
	{#if message.type === 'interactive'}
		<Frame selected={true}>
			{#if message.interactive.header && message.interactive.header.type === 'image'}
				{@render renderImage(message.interactive.header.image.link)}
			{/if}
			{#if message.interactive.body.text}
				<div>{message.interactive.body.text}</div>
			{/if}
			<div class="mt-2 min-w-[180px]">
				{#each message.interactive.action.buttons as button, i}
					<div class="flex items-center gap-1 border-t">
						<button
							class="flex flex-grow py-1.5 text-sm justify-center items-center gap-2 text-blue-600 padding cursor-pointer"
						>
							{#if button.type === 'reply'}
								<Reply size={20} />
							{/if}
							<div>{button.title}</div>
						</button>
					</div>
				{/each}
			</div>
		</Frame>
	{/if}

	{#if message.type === 'template' && template}
		<PreviewTemplate {template} selected={false} components={message.template.components} />
	{/if}
{/snippet}

{#snippet renderImage(url: string)}
	<div class="relative">
		<img src={url} alt="Sent via whatsapp (no alt)" class="rounded" />
	</div>
{/snippet}
