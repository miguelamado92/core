<script lang="ts">
	import * as Menubar from '$lib/comps/ui/menubar';
	import * as Avatar from '$lib/comps/ui/avatar';
	import { page } from '$app/stores';
	import { nameToInitials } from '$lib/utils/text/names';
	import menuConstructor from '$lib/comps/nav/user_menu_items';
	const menu = menuConstructor($page.data.t);
</script>

{#snippet link(item: (typeof menu)['my_tasks'])}
	<Menubar.Item>
		<a href={item.href()} class="flex items-center gap-2">
			<svelte:component this={item.icon} class="w-4 h-4" strokeWidth={2} />
			{item.title()}
		</a>
	</Menubar.Item>
{/snippet}

<Menubar.Menu>
	<Menubar.Trigger>
		<Avatar.Root class="h-8 w-8">
			<Avatar.Image src={$page.data.admin.profile_picture_url} alt={$page.data.admin.full_name} />
			<Avatar.Fallback class="bg-red-500"
				>{nameToInitials($page.data.admin.full_name)}</Avatar.Fallback
			>
		</Avatar.Root>
	</Menubar.Trigger>
	<Menubar.Content>
		<div class="flex flex-col space-y-1 p-2">
			<p class="text-sm font-medium leading-none">{$page.data.admin.full_name}</p>
			<p class="text-xs leading-none text-muted-foreground">{$page.data.admin.email}</p>
		</div>
		<Menubar.Separator />
		{@render link(menu.my_tasks)}
		<Menubar.Separator />
		{@render link(menu.settings)}
		<!-- {@render link(menu.preferences)} -->
		<Menubar.Separator />
		{@render link(menu.logout)}
	</Menubar.Content>
</Menubar.Menu>
