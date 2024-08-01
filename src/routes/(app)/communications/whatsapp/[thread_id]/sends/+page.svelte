<script lang="ts">
	const { data } = $props();
	import DataGrid from '$lib/comps/ui/custom/table/DataGrid.svelte';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import H1 from '$lib/comps/typography/H3.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	let newSendOpen = $state(false);
	import { create } from '$lib/schema/communications/whatsapp/sends';
	import {
		superForm,
		valibotClient,
		Input,
		Grid,
		Debug,
		Error,
		Button as FormButton
	} from '$lib/comps/ui/forms';
	import ListDropdown from '$lib/comps/widgets/lists/ListDropdown.svelte';
	const form = superForm(data.form, {
		validators: valibotClient(create),
		dataType: 'json'
	});
	const { form: formData, enhance, message } = form;
</script>

<DataGrid items={data.sends.items} count={data.sends.count}>
	{#snippet header(filter, filterKey)}
		<div class="w-full">
			<div class="flex justify-between items-center w-full">
				<div><H1>Title</H1></div>
				<div class="flex items-center gap-2">
					<Button
						variant="secondary"
						class="flex gap-1 items-center"
						onclick={() => (newSendOpen = !newSendOpen)}
					>
						<CirclePlus size={16} /> New send
					</Button>
					{@render filter(filterKey)}
				</div>
			</div>
			{#if newSendOpen}
				<form use:enhance method="post">
					<Grid cols={1} class="mt-4">
						<Error errors={$message} />
						<div class="flex items-center gap-4">
							<div>Choose list:</div>
							<ListDropdown bind:value={$formData.list_id} />
							<FormButton>{data.t.forms.buttons.send()}</FormButton>
						</div>
						<Debug data={$formData} />
					</Grid>
				</form>
			{/if}
		</div>
	{/snippet}

	{#snippet content(send: typeof data.sends.items[0], i: number)}
		<div class="flex items-center justify-between p-4">
			<div class="flex items">
				<p>{send.id}</p>
				<p>{send.list_id}</p>
				<p>{send.thread_id}</p>
			</div>
		</div>
	{/snippet}
</DataGrid>
