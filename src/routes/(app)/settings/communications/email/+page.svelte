<script lang="ts">
	import PageHeader from '$lib/comps/layout/PageHeader.svelte';
	import { page } from '$app/stores';
	import * as Card from '$lib/comps/ui/card';
	import Button from '$lib/comps/ui/button/button.svelte';
	import Grid from '$lib/comps/ui/custom/grid.svelte';
</script>

<PageHeader title={$page.data.t.pages.config.settings.communications.email.index()} />

<Grid cols={1}>
	<Card.Root class="mt-4">
		<Card.Header>
			<Card.Title
				>{$page.data.t.pages.config.settings.communications.email.templates.index()}</Card.Title
			>
		</Card.Header>
		<Card.Content>
			<Grid>
				<Button variant="outline" href="/settings/communications/email/templates"
					>{$page.data.t.pages.config.settings.communications.email.templates.index()}</Button
				>
				<Button variant="outline" href="/settings/communications/email/templates/new"
					>{$page.data.t.pages.config.settings.communications.email.templates.new()}</Button
				>
			</Grid>
		</Card.Content>
	</Card.Root>
</Grid>
