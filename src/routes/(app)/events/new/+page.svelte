<script lang="ts">
	import EventsForm from '../EventsForm.svelte';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	export let data;
</script>

<PageHeader title={data.t.pages.events.new_event()} />
<EventsForm isUpdate={false} />
