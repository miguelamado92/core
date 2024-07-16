<script lang="ts">
	export let data;
	import PersonForm from '../PersonForm.svelte';
	import { create } from '$lib/schema/people/people';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
</script>

<PageHeader title={data.t.pages.people.new_person()} />

<PersonForm superform={data.form} schema={create} />
