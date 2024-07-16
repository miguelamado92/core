<script>
	import { page } from '$app/stores';
	export let data;
	import Button from '$lib/comps/ui/button/button.svelte';
	import Avatar from '$lib/comps/ui/custom/avatar/avatar.svelte';
	import { Badge } from '$lib/comps/ui/badge';
	import DataTable from '$lib/comps/ui/custom/table/datatable.svelte';
</script>

<DataTable
	items={data.admins.items}
	count={data.admins.count}
	header={$page.data.t.pages.config.settings.admins.index()}
>
	{#snippet button()}
		<Button href="/settings/admins/new">{$page.data.t.pages.config.settings.admins.new()}</Button>
	{/snippet}

	{#snippet content(admin)}
		<div class="flex justify-between items-center gap-4">
			<div class="flex items-center gap-2">
				<div>
					<Avatar full_name={admin.full_name} profile_picture_url={admin.profile_picture_url} />
				</div>
				<div>
					<div class="font-medium">{admin.full_name}</div>
					<div class="font-light text-muted-foreground text-sm">{admin.email}</div>
				</div>
				<div class="hidden lg:block">
					{#if admin.has_signed_in}
						{#if admin.active}
							<Badge class="ml-3" variant="success">Active</Badge>
						{:else}
							<Badge class="ml-3" variant="danger">Inactive</Badge>
						{/if}
					{:else}
						<Badge class="ml-3" variant="warning">Pending</Badge>
					{/if}
				</div>
			</div>
			<div>
				<Button href="/settings/admins/{admin.id}" variant="outline" size="sm">
					{$page.data.t.forms.buttons.edit()}
				</Button>
			</div>
		</div>
	{/snippet}
</DataTable>
