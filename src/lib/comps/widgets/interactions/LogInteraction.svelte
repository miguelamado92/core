<script lang="ts">
	import { page } from '$app/stores';
	import * as Select from '$lib/comps/ui/select';
	import Input from '$lib/comps/ui/input/input.svelte';
	type InteractionType = 'notes' | 'phone_call_outbound' | 'phone_call_inbound';
	import Button from '$lib/comps/ui/button/button.svelte';
	import Send from 'lucide-svelte/icons/send';
	const types: { value: InteractionType; label: string }[] = [
		{ value: 'notes', label: $page.data.t.people.interactions.create_types.notes() },
		{
			value: 'phone_call_outbound',
			label: $page.data.t.people.interactions.create_types.phone_call_outbound()
		},
		{
			value: 'phone_call_inbound',
			label: $page.data.t.people.interactions.create_types.phone_call_inbound()
		}
	];
	let selected = $state(types[0]);
	import { type List } from '$lib/schema/people/interactions';
	const {
		onLogged,
		personId
	}: { personId: number; onLogged: (interaction: List[number]) => void } = $props();
	import { getFlash } from 'sveltekit-flash-message';
	let flash = getFlash(page);
	let notes: string | undefined = $state(undefined);
	async function logInteraction(e: SubmitEvent) {
		e.preventDefault();
		try {
			const body = {
				details: { type: selected.value, notes: notes },
				admin_id: $page.data.admin.id,
				person_id: personId
			};
			notes = undefined;
			selected = types[0];
			const response = await fetch(`/api/v1/people/${$page.data.person.id}/interactions`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});
			if (response.ok) {
				const output: List[number] = await response.json();
				onLogged(output);
			}
			$flash = { type: 'success', message: $page.data.t.forms.actions.created() };
		} catch (err) {
			$flash = { type: 'error', message: $page.data.t.errors.generic() };
		}
	}
</script>

<div class="bg-slate-200 p-4">
	<form onsubmit={logInteraction} class="flex items-center gap-2">
		<Select.Root items={types} bind:selected>
			<Select.Trigger class="w-[100px]">
				<Select.Value placeholder="Select a fruit" />
			</Select.Trigger>
			<Select.Content>
				{#each types as type}
					<Select.Item value={type.value} label={type.label} class="flex items-center gap-2">
						{type.label}
					</Select.Item>
				{/each}
			</Select.Content>
			<Select.Input name="type" />
		</Select.Root>
		<div class="flex-grow">
			<Input
				bind:value={notes}
				class="flex items-center h-10 w-full rounded px-3 text-sm"
				type="text"
				placeholder={$page.data.t.people.interactions.create_types.notes_input_placeholder()}
			/>
		</div>
		<div>
			<Button type="submit" variant="ghost" size="sm"><Send size={20} /></Button>
		</div>
	</form>
</div>
