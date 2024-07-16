<script lang="ts">
	let { data } = $props();
	import * as Card from '$lib/comps/ui/card';
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import Grid from '$lib/comps/ui/custom/grid.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
</script>

<PageHeader title={data.t.pages.website.index()} />

<Grid cols={1}>
	<Card.Root class="mt-4">
		<Card.Header>
			<Card.Title>{data.t.pages.website.posts.index()}</Card.Title>
		</Card.Header>
		<Card.Content>
			<Grid>
				<Button variant="outline" href="/website/posts">{data.t.pages.website.posts.index()}</Button
				>
				<Button variant="outline" href="/website/posts/new"
					>{data.t.pages.website.posts.new()}</Button
				>
			</Grid>
		</Card.Content>
	</Card.Root>
	<Card.Root class="mt-4">
		<Card.Header>
			<Card.Title>{data.t.pages.website.pages.index()}</Card.Title>
		</Card.Header>
		<Card.Content>
			<Grid>
				<Button variant="outline" href="/website/pages">{data.t.pages.website.pages.index()}</Button
				>
				<Button variant="outline" href="/website/pages/new"
					>{data.t.pages.website.pages.new()}</Button
				>
			</Grid>
		</Card.Content>
	</Card.Root>
</Grid>
