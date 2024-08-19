<script lang="ts">
	let { data } = $props();
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
	import H1 from '$lib/comps/typography/H1.svelte';
	import Avatar from '$lib/comps/ui/custom/avatar/avatar.svelte';
	import Separator from '$lib/comps/ui/separator/separator.svelte';

	import PersonInfo from './PersonInfo.svelte';

	import Interaction from '$lib/comps/widgets/interactions/Interaction.svelte';
	import ActivityFeed from './ActivityFeed.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { parse } from '$lib/schema/valibot';
	import { list as listParseSchema } from '$lib/schema/people/interactions';
	import LogInteraction from '$lib/comps/widgets/interactions/LogInteraction.svelte';

	let interactionsArray = $derived(data.interactions.items.toReversed());
	import PersonFrame from './PersonFrame.svelte';
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
	<div class="col-span-1"><PersonFrame person={data.person} children={activityFeed} /></div>
	<div class="col-span-1 md:col-span-2 lg:col-span-3">
		<ActivityFeed bind:interactions={data.interactions} person={data.person} />
	</div>
</div>

{#snippet activityFeed()}{/snippet}
