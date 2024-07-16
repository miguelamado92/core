<script lang="ts">
	export let data;
	import PersonForm from '../../PersonForm.svelte';
	import { update } from '$lib/schema/people/people';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
</script>

<PageHeader title={data.t.pages.people.edit_person()} />
<PersonForm superform={data.form} schema={update} />
