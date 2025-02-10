<script lang="ts">
	type Props = {
		buttonId: string;
		createSendWhatsAppMessageAction: (buttonId: string) => Promise<void>;
		createEventRegistrationAction: (buttonId: string) => Promise<void>;
	};
	let { buttonId, createSendWhatsAppMessageAction, createEventRegistrationAction }: Props =
		$props();
	import * as DropdownMenu from '$lib/comps/ui/dropdown-menu';
	import Plus from 'lucide-svelte/icons/plus';
	import { buttonVariants } from '$lib/comps/ui/button/index';
	import { cn } from '$lib/utils';
	import * as actionsActions from '$lib/comps/forms/whatsapp/messages/builder/actions/actions';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={cn('flex items-center gap-2', buttonVariants({ variant: 'outline', size: 'xs' }))}
	>
		<Plus size={16} />
		<div class="text-xs font-bold">Add effect</div>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item onclick={() => createSendWhatsAppMessageAction(buttonId)}
				>Send WhatsApp Message</DropdownMenu.Item
			>
			<DropdownMenu.Item onclick={() => createEventRegistrationAction(buttonId)}
				>Register to Event</DropdownMenu.Item
			>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
