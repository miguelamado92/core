<script lang="ts">
	import * as Drawer from '$lib/comps/ui/drawer/index';
	import { type Read } from '$lib/schema/communications/whatsapp/messages';
	type Props = {
		selectedMessageId: string | null;
		index: number;
		messages: Read[];
		onSaveMessage: (message: Read) => Promise<void>;
	};
	let {
		selectedMessageId = $bindable(),
		messages = $bindable(),
		index,
		onSaveMessage
	}: Props = $props();
	let selected: boolean = $derived(selectedMessageId === messages[index].id);
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/comps/ui/button/index';

	import EditImage from '$lib/comps/forms/whatsapp/messages/builder/edit/EditImage.svelte';
	import EditText from '$lib/comps/forms/whatsapp/messages/builder/edit/EditText.svelte';
	import EditButtons from '$lib/comps/forms/whatsapp/messages/builder/edit/Buttons.svelte';
</script>

<Drawer.Root
	open={selected}
	onClose={async () => {
		await onSaveMessage(messages[index]);
		selectedMessageId = null;
	}}
>
	<Drawer.Portal>
		<Drawer.Overlay class="fixed inset-0 bg-black/40" />
		<Drawer.Content
			class="flex flex-col mx-auto max-w-4xl fixed bottom-0 left-0 right-0 max-h-[96%]"
			><div class="w-full mx-auto overflow-auto p-4 grid grid-cols-1 gap-4">
				<EditImage bind:messages {index} />
				<EditText bind:messages {index} />
				<EditButtons bind:messages {index} />
			</div>
			<Drawer.Footer>
				<Drawer.Close class={cn(buttonVariants({ size: 'sm', variant: 'default' }))}
					>Save</Drawer.Close
				>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
