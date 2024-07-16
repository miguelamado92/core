<script lang="ts">
	export let data;
	import CircleCheck from 'lucide-svelte/icons/circle-check';
</script>

<div>
	<CircleCheck class="text-green-500 w-16 h-16 mx-auto mb-4" />
	<h2 class="text-center text-2xl font-bold">
		{data.t.common.communications.email_unsubscribed.title()}
	</h2>
	<p class="mt-4 text-muted-foreground">
		{@html data.t.common.communications.email_unsubscribed.description(data.person.email?.email)}
	</p>
</div>
