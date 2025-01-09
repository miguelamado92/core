<script lang="ts">
	let { data } = $props();
	import ActivityFeed from './activity_feed/ActivityFeed.svelte';
	import PersonFrame from './PersonFrame.svelte';
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
	<div class="col-span-1"><PersonFrame person={data.person} children={activityFeed} /></div>
	<div class="col-span-1 md:col-span-2 lg:col-span-3">
		<ActivityFeed bind:interactions={data.interactions} person={data.person} />
	</div>
</div>

{#snippet activityFeed()}{/snippet}
