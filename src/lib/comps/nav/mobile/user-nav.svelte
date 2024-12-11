<script lang="ts">
	import menuItemsConstrcutor from '$lib/comps/nav/user_menu_items';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/comps/ui/button';
	import { page } from '$app/stores';
	import { Separator } from '$lib/comps/ui/separator';
	import * as Avatar from '$lib/comps/ui/avatar';
	import { nameToInitials } from '$lib/utils/text/names';
	const menuItems = menuItemsConstrcutor($page.data.t);
	export let open: boolean;
</script>

{#snippet link(item: (typeof menuItems)['my_tasks'])}
	<a
		href={item.href()}
		onclick={() => (open = false)}
		class={cn(
			buttonVariants({ variant: 'ghost', size: 'sm' }),
			$page.url.pathname === item.href() ? 'bg-muted hover:bg-muted' : 'hover:bg-muted',
			'justify-start w-full flex gap-2 items-center'
		)}
	>
		<div>
			<svelte:component this={item.icon} size={18} class="text-slate-900" strokeWidth={2} />
		</div>
		{item.title()}
	</a>
{/snippet}

<nav>
	<ul class="flex flex-col gap-2 my-4">
		<li class="flex gap-2 items-center justify-center my-2">
			<div>
				<Avatar.Root class="h-8 w-8">
					<Avatar.Image
						src={$page.data.admin.profile_picture_url}
						alt={$page.data.admin.full_name}
					/>
					<Avatar.Fallback class="bg-red-500"
						>{nameToInitials($page.data.admin.full_name)}</Avatar.Fallback
					>
				</Avatar.Root>
			</div>
			<div class="flex flex-col space-y-1 p-2">
				<p class="text-sm font-medium leading-none">{$page.data.admin.full_name}</p>
				<p class="text-xs leading-none text-muted-foreground">{$page.data.admin.email}</p>
			</div>
		</li>
		<li>{@render link(menuItems.my_tasks)}</li>
		<Separator class="my-1" />
		<li>{@render link(menuItems.settings)}</li>
		<!-- <li>{@render link(menuItems.preferences)}</li> -->
		<Separator class="my-1" />
		<li>{@render link(menuItems.logout)}</li>
	</ul>
</nav>
