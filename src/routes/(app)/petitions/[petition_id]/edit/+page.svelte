<script lang="ts">
	import EventsForm from '../../PetitionsForm.svelte';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
	export let data;
	import { page } from '$app/stores';
</script>

<PageHeader title={data.t.pages.actions.petitions.edit()}>
	{#snippet button()}
		<div class="flex items-center gap-2">
			<Button href="/petitions/{$page.params.petition_id}/edit/notifications" variant="outline"
				>Manage notifications</Button
			>
			<Button href="/petitions/{$page.params.petition_id}">Back</Button>
		</div>
	{/snippet}
</PageHeader>
<EventsForm isUpdate={true} />
