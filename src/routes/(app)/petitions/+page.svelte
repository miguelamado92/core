<script lang="ts">
	export let data;
	import Datatable from '$lib/comps/ui/custom/table/datatable.svelte';
	import Button from '$lib/comps/ui/button/button.svelte';
	import type { List } from '$lib/schema/petitions/petitions';
	import AdminBadge from '$lib/comps/widgets/AdminBadge.svelte';
</script>

<Datatable
	items={data.petitions.items}
	count={data.petitions.count}
	header={data.t.pages.actions.petitions.index()}
>
	{#snippet button()}
		<Button href="/petitions/new">{data.t.pages.actions.petitions.new()}</Button>
	{/snippet}
	{#snippet content(item: List['items'][0])}
		<div class="items-center flex justify-between gap-4">
			<div>
				<a href="/petitions/{item.id}">
					<div class="font-medium text-md">{item.name}</div>
				</a>
			</div>
			<div>
				<div class="flex gap-4 items-center justify-end">
					<AdminBadge admin={item.point_person} />
					<Button href="/petitions/{item.id}">{data.t.forms.buttons.view()}</Button>
				</div>
			</div>
		</div>
	{/snippet}
</Datatable>
