<script lang="ts">
	import { page } from '$app/stores';
	const LANGUAGE = $page.data.language;
	import { buttonVariants } from '$lib/comps/ui/button';
	import { cn } from '$lib/utils';
	import menuItemsConstructor from '$lib/comps/nav/menu_items';
	const menuItems = menuItemsConstructor($page.data.t);
	let url = $state($page.url.pathname);
	let items = $derived.by(() => {
		if (url.startsWith('/people')) {
			return menuItems.people.children;
		} else if (url.startsWith('/settings')) {
			return menuItems.settings.children;
		} else if (url.startsWith('/communications')) {
			return menuItems.communications.children;
		} else if (url.startsWith('/website')) {
			return menuItems.website.children;
		} else if (url.startsWith('/events')) {
			return menuItems.events.children;
		} else if (url.startsWith('/petitions')) {
			return menuItems.actions.children;
		} else if (url.startsWith('/tasks')) {
			return menuItems.tasks.children;
		} else {
			return menuItems.top.children;
		}
	});
</script>

{#each items as item}
	<a
		href={item.href({ ...$page.params })}
		class={cn(
			buttonVariants({ variant: 'ghost' }),
			$page.url.pathname === item.href({ ...$page.params })
				? 'bg-muted hover:bg-muted'
				: 'hover:bg-transparent hover:underline',
			'justify-start lg:w-full flex gap-4 items-center'
		)}
	>
		<svelte:component this={item.icon} class="inline-block mb-1" size={20} />
		{item.title()}
	</a>
{/each}
