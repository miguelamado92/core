<script lang="ts">
	import { page } from '$app/stores';
	import menuItemsConstructor from '$lib/comps/nav/menu_items';
	const menuItems = menuItemsConstructor($page.data.t);
	let url = $state($page.url.pathname);
	let menu_items = $derived.by(() => {
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

<section id="bottom-navigation" class="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
	<nav class="flex justify-between items-center">
		{#each menu_items as item}
			<a
				href={item.href({ ...$page.params })}
				class="w-full focus:text-slate-600 hover:bg-muted justify-center inline-block text-center pt-2 pb-1"
				class:bg-muted={url === item.href({ ...$page.params })}
			>
				<svelte:component this={item.icon} class="inline-block mb-1" />

				<span class="block text-xs">{item.title()}</span>
			</a>
		{/each}
	</nav>
</section>
