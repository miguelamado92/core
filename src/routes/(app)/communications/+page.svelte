<script lang="ts">
	let { data } = $props();
	import * as Card from '$lib/comps/ui/card';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Grid from '$lib/comps/ui/custom/grid.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
</script>

<PageHeader title={data.t.pages.communications.index()} />

<Grid cols={1}>
	<Card.Root class="mt-4">
		<Card.Header>
			<Card.Title>{data.t.pages.communications.email.index()}</Card.Title>
		</Card.Header>
		<Card.Content>
			<Grid>
				<Button variant="outline" href="/communications/email"
					>{data.t.pages.communications.email.index()}</Button
				>
				<Button variant="outline" href="/communications/email/new"
					>{data.t.pages.communications.email.new()}</Button
				>
			</Grid>
		</Card.Content>
	</Card.Root>
</Grid>
