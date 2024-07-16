<script lang="ts">
	export let data;
	import { update } from '$lib/schema/communications/email/sends';
	import {
		Debug,
		Input,
		Button,
		superForm,
		Grid,
		SelectList,
		valibotClient,
		Error
	} from '$lib/comps/ui/forms';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	const form = superForm(data.form, {
		validators: valibotClient(update)
	});
	const { form: formData, enhance, message } = form;

	import { page } from '$app/stores';
	import { getFlash } from 'sveltekit-flash-message';
	let flash = getFlash(page);
	import { goto } from '$app/navigation';
	async function send() {
		try {
			if (confirm($page.data.t.common.alerts.send_email()) === false) return;
			const response = await fetch(
				`/api/v1/communications/email/sends/${$page.params.send_id}/send`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ list_id: $formData.list_id })
				}
			);
			if (!response.ok) {
				$flash = { type: 'error', message: data.t.errors.generic() };
			}
			$flash = { type: 'success', message: data.t.forms.actions.success() };
			await goto(`/communications/email/${$page.params.send_id}`);
		} catch (err) {
			if (err instanceof Error) {
				$flash = { type: 'error', message: err.message };
			} else {
				$flash = { type: 'error', message: data.t.errors.generic() };
			}
		}
	}
</script>

<PageHeader title={data.t.pages.communications.email.edit()}>
	{#snippet button()}
		<Button onclick={send} variant="default" size="sm">
			{data.t.forms.buttons.send()}
		</Button>
	{/snippet}
</PageHeader>

<form use:enhance method="post">
	<Grid cols={1} class="mt-6">
		<Error error={$message} />
		<Input
			label={data.t.forms.fields.generic.name.label()}
			{form}
			name="name"
			bind:value={$formData.name as string}
		/>
		<SelectList label="List" {form} name="list_id" bind:value={$formData.list_id as number} />
		<Button type="submit">{data.t.forms.buttons.save()}</Button>
		<Debug data={formData} />
	</Grid>
</form>
