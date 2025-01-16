<script lang="ts">
	import AdminBadge from '$lib/comps/widgets/AdminBadge.svelte';
	import { type Read, read } from '$lib/schema/core/admin';
	import { parse } from '$lib/schema/valibot';
	import Loading from '$lib/comps/helpers/Loading.svelte';
	const { adminId }: { adminId: number } = $props();
	let admin: Read | null = $state(null);
	import { onMount } from 'svelte';
	onMount(async () => {
		const res = await fetch(`/api/v1/admins/${adminId}`);
		const data = await res.json();
		const parsed = parse(read, data);
		admin = parsed;
	});
</script>

{#if !admin}
	<Loading />
{:else}
	<AdminBadge {admin} />
{/if}
