<script lang="ts">
	import PetitionsForm from '../PetitionsForm.svelte';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	export let data;
</script>

<PageHeader title={data.t.pages.actions.petitions.new()} />
<PetitionsForm isUpdate={false} />
