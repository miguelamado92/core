<script lang="ts">
	export const ssr = false;
	import * as Breadcrumb from '$lib/comps/ui/breadcrumb';
	import { breadcrumbs, renderBreadcrumb } from '$lib/comps/nav/breadcrumbs/breadcrumbs';
	import { page } from '$app/stores';
	let url = $state($page.route.id || '/(app)/');

	let menu = $state(breadcrumbs($page.data.t)[url] ? breadcrumbs($page.data.t)[url] : []);
	let back = $derived.by(() => {
		if (menu) {
			return menu[menu.length - 2];
		} else {
			return menu[0];
		}
	});
	let isHome = $derived(back ? false : true); // if back is undefined, it means there is nowhere we can go back... so we are on the home page
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
</script>

{#snippet menuItem(item)}
	<Breadcrumb.Item>
		<Breadcrumb.Link href={item.href({ ...$page.params })}>
			{renderBreadcrumb(item.title(), $page.data.pageTitle)}
		</Breadcrumb.Link>
	</Breadcrumb.Item>
	<Breadcrumb.Separator />
{/snippet}

<div class="hidden lg:block">
	<div class="mb-5">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				{#each menu as item}
					{#if item.href($page.params) === $page.url.pathname}
						<Breadcrumb.Item>
							<Breadcrumb.Page
								>{renderBreadcrumb(item.title(), $page.data.pageTitle)}</Breadcrumb.Page
							>
						</Breadcrumb.Item>
					{:else}
						{@render menuItem(item)}
					{/if}
				{/each}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</div>
</div>

{#if !isHome}
	<div class="lg:hidden text-sm">
		<a href={back.href({ ...$page.params })} class="hover:text-foreground text-muted-foreground">
			<div class="mb-2 flex items-center gap-1">
				<ChevronLeft size={16} />
				{renderBreadcrumb(back.title(), $page.data.pageTitle)}
			</div>
		</a>
	</div>
{/if}
