<script lang="ts">
	let { data } = $props();
	import { update } from '$lib/schema/people/groups';
	import { default as PlainInput } from '$lib/comps/ui/input/input.svelte';
	import { Debug, Input, Button, superForm, Grid, valibotClient, Error } from '$lib/comps/ui/forms';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	const form = superForm(data.form, {
		validators: valibotClient(update)
	});
	const { form: formData, enhance, message } = form;
	import * as Alert from '$lib/comps/ui/alert';

	let whatsappGroupInvite: string | null = $state(null);
	import { linkWhatsappGroup } from './actions';

	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	const flash = getFlash(page);
	let loading = $state(false);
	async function linkGroup() {
		if (whatsappGroupInvite) {
			try {
				loading = true;
				const group = await linkWhatsappGroup(data.group.id, whatsappGroupInvite);
				data.group = group;
				flash.set({ type: 'success', message: data.t.forms.actions.success() });
			} catch (error) {
				if (error instanceof Error) {
					flash.set({ type: 'error', message: error.message });
				} else {
					flash.set({ type: 'error', message: data.t.errors.generic() });
				}
			} finally {
				loading = false;
			}
		}
	}
	import QuestionMarkCircle from 'lucide-svelte/icons/circle-help';
	import Whatsapp from '$lib/comps/icons/whatsapp.svelte';
</script>

<PageHeader title={data.t.pages.people.groups.edit()} />

{#if !data.group.whatsapp_id}
	<Alert.Root class="mt-6">
		<Alert.Title>Whatsapp Group</Alert.Title>
		<Alert.Description class="text-muted-foreground mt-2">
			No whatsapp group is currently connected. You can connect awhatsapp group by pasting the
			invite code below. See <a
				class="underline hover:text-foreground"
				href="https://belcoda.notion.site/Linking-a-Whatsapp-Group-24a9a81a24f24cd4a43ceac101ac8103?pvs=74"
				target="_blank">the documentation</a
			>
			for more information.
			<div class="flex gap-2 mt-4">
				<PlainInput
					placeholder="eg: F6hK763eR7S7mthwaX1Bysws"
					class="flex-grow"
					bind:value={whatsappGroupInvite as string}
				/>
				<Button disabled={!whatsappGroupInvite} onclick={linkGroup}>Link group</Button>
			</div>
		</Alert.Description>
	</Alert.Root>
{/if}

<form use:enhance method="post">
	<Grid cols={1} class="mt-6">
		<Error error={$message} />
		<Input
			label={data.t.forms.fields.generic.name.label()}
			{form}
			name="name"
			bind:value={$formData.name as string}
		/>
		<Button type="submit">{data.t.forms.buttons.save()}</Button>
		<Debug data={formData} />
	</Grid>
</form>
