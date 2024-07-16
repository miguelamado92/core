<script lang="ts">
	export const ssr = false;
	import * as Menubar from '$lib/comps/ui/menubar';
	import * as Avatar from '$lib/comps/ui/avatar';
	import MainNav from '$lib/comps/nav/desktop/main-nav.svelte';
	import HamburgerIcon from 'lucide-svelte/icons/menu';
	import Drawer from '$lib/comps/nav/mobile/drawer.svelte';
	import MobileMainNav from '$lib/comps/nav/mobile/main-nav.svelte';
	import UserNav from '$lib/comps/nav/desktop/user-nav.svelte';
	import MobileUserNav from '$lib/comps/nav/mobile/user-nav.svelte';
	let show_mobile_draw = $state(false);
	let show_user_draw = $state(false);
	import { nameToInitials } from '$lib/utils/text/names';
	import { page } from '$app/stores';
</script>

<div
	class="flex items-center justify-between bg-blue-700 rounded-none border-none p-4 mb-6 h-12 shadow lg:hidden"
>
	<div>
		<button onclick={() => (show_mobile_draw = true)} class="text-white"><HamburgerIcon /></button>
		{#key $page.url.pathname}
			{#snippet drawerContent()}
				<MobileMainNav bind:open={show_mobile_draw} />
			{/snippet}
			<Drawer
				open={show_mobile_draw}
				content={drawerContent}
				onclickaway={() => (show_mobile_draw = false)}
				placement="left"
			/>
		{/key}
	</div>
	<div>
		<a class="pl-6 pr-4" href="/"><img src="/icon.png" alt="Belcoda logo" class="h-6" /></a>
	</div>

	<div>
		{#snippet userNavDrawer()}
			<MobileUserNav bind:open={show_user_draw} />
		{/snippet}
		<Drawer
			open={show_user_draw}
			content={userNavDrawer}
			onclickaway={() => (show_user_draw = false)}
			placement="right"
		/>
		<Avatar.Root
			role="button"
			class="h-8 w-8 cursor-pointer"
			onclick={() => (show_user_draw = true)}
		>
			<Avatar.Image src={$page.data.admin.profile_picture_url} alt={$page.data.admin.full_name} />
			<Avatar.Fallback class="bg-red-500"
				>{nameToInitials($page.data.admin.full_name)}</Avatar.Fallback
			>
		</Avatar.Root>
	</div>
</div>

<Menubar.Root
	class="bg-blue-700 rounded-none border-none text-white py-4 mb-12 h-12 shadow hidden lg:flex"
>
	<a class="pl-6 pr-4" href="/"><img src="/icon.png" alt="Belcoda logo" class="h-6" /></a>
	<div class="hidden lg:flex">
		<MainNav />
	</div>

	<div class="flex-grow flex justify-end items-center space-x-4">
		<UserNav />
	</div>
</Menubar.Root>
