<script lang="ts">
	import { page } from '$app/stores';
	import * as Select from '$lib/comps/ui/select';
	import Input from '$lib/comps/ui/input/input.svelte';
	type InteractionType =
		| 'notes'
		| 'phone_call_outbound'
		| 'phone_call_inbound'
		| 'outbound_whatsapp';
	import Button from '$lib/comps/ui/button/button.svelte';
	import Send from 'lucide-svelte/icons/send';
	import sendWhatsappMessage from '$lib/comps/widgets/interactions/sendWhatsappMessage.js';

	const types: { value: InteractionType; label: string }[] = [
		{ value: 'notes', label: $page.data.t.people.interactions.create_types.notes() },
		{
			value: 'outbound_whatsapp',
			label: $page.data.t.people.interactions.create_types.whatsapp()
		}
	];
	let selected = $state(types[0]);
	import { type List } from '$lib/schema/people/interactions';
	const {
		onLogged,
		personId
	}: { personId: number; onLogged: (interaction?: List[number]) => void } = $props();
	import { getFlash } from 'sveltekit-flash-message';
	let flash = getFlash(page);
	let notes: string | undefined = $state(undefined);

	let activeConversation: boolean = $state(false);
	let activeConversationLoading: boolean = $state(false);

	async function getConversationStatus() {
		try {
			activeConversationLoading = true;
			activeConversation = false;
			const response = await fetch(
				`/api/v1/people/${personId}/communication/whatsapp/conversations`
			);
			if (response.ok) {
				const body = await response.json();
				if (body.active) activeConversation = body.active;
			} else {
				throw new Error();
			}
		} catch (err) {
			if (err instanceof Error) {
				$flash = { type: 'error', message: err?.message || $page.data.t.errors.generic() };
			} else {
				$flash = { type: 'error', message: $page.data.t.errors.generic() };
			}
		} finally {
			activeConversationLoading = false;
		}
	}

	async function logInteraction(e: SubmitEvent) {
		try {
			e.preventDefault();
			if (selected.value === 'outbound_whatsapp' && notes) {
				await sendWhatsappMessage(notes, personId, $page.data.admin.id);
				onLogged();
			}
			const body = {
				details: { type: selected.value, notes: notes },
				admin_id: $page.data.admin.id,
				person_id: personId
			};
			const response = await fetch(`/api/v1/people/${$page.data.person.id}/interactions`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});
			if (response.ok) {
				const output: List[number] = await response.json();
				onLogged(output);
			} else {
				throw new Error();
			}
			$flash = { type: 'success', message: $page.data.t.forms.actions.created() };
		} catch (err) {
			if (err instanceof Error) {
				$flash = { type: 'error', message: err?.message || $page.data.t.errors.generic() };
			} else {
				$flash = { type: 'error', message: $page.data.t.errors.generic() };
			}
		} finally {
			notes = undefined;
		}
	}
</script>

<div class="bg-slate-200 p-4">
	<form onsubmit={logInteraction} class="flex items-center gap-2" method="post">
		<div class="flex-grow">
			{#if selected.value === 'outbound_whatsapp'}
				{#if activeConversationLoading}
					{$page.data.t.common.status.loading()}
				{:else if activeConversation}
					<Input
						bind:value={notes}
						name="message"
						class="flex items-center h-10 w-full rounded px-3 text-sm"
						type="text"
						placeholder={$page.data.t.people.interactions.create_types.whatsapp_msg_input_placeholder()}
					/>
				{:else}
					<div class="text-muted-foreground text-sm flex justify-center">
						{$page.data.t.people.interactions.create_types.whatsapp_no_conversation_active()}
					</div>
					<div class="flex justify-center mt-2">
						<Button variant="secondary" href="/communications/whatsapp/new"
							>{$page.data.t.pages.communications.whatsapp.new()}</Button
						>
					</div>
				{/if}
			{:else}
				<Input
					bind:value={notes}
					name="message"
					class="flex items-center h-10 w-full rounded px-3 text-sm"
					type="text"
					placeholder={$page.data.t.people.interactions.create_types.notes_input_placeholder()}
				/>
			{/if}
		</div>
		<div>
			{#if selected.value !== 'outbound_whatsapp' || activeConversation}<Button
					type="submit"
					variant="ghost"
					size="sm"><Send size={20} /></Button
				>
			{/if}
		</div>
	</form>
</div>
