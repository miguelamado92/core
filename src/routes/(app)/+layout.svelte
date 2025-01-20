<script lang="ts">
	import '../../app.css';
	import MainNav from '$lib/comps/nav/menu-bar.svelte';
	import BottomNav from '$lib/comps/nav/mobile/bottom-nav.svelte';
	import Sidebar from '$lib/comps/nav/desktop/sidebar.svelte';
	import Breadcrumb from '$lib/comps/nav/breadcrumbs/breadcrumbs.svelte';
	import Footer from '$lib/comps/nav/footer/footer.svelte';
	import { page } from '$app/stores';
	import {
		breadcrumbs as breadcrumbsConstructor,
		renderBreadcrumb
	} from '$lib/comps/nav/breadcrumbs/breadcrumbs';
	import { setLanguageTag, onSetLanguageTag, languageTag } from '$lib/paraglide/runtime';
	import * as Sentry from '@sentry/sveltekit';
	import { browser } from '$app/environment';
	import { invalidateAll } from '$app/navigation';
	if (browser) {
		Sentry.init({
			dsn: 'https://8b4cdb05d7907fe3f9b43aec4a060811@o4508220361342976.ingest.de.sentry.io/4508220380282960',
			integrations: [
				Sentry.feedbackIntegration({
					// Additional SDK configuration goes in here, for example:
					colorScheme: 'auto'
				})
			]
		});
	}
	const breadcrumbs = $state(breadcrumbsConstructor($page.data.t));

	import { PUBLIC_LOCALIZATION_COOKIE_NAME } from '$env/static/public';
	function setLocalizationCookie(value: SupportedLanguage) {
		if (browser) {
			// Only set the cookie on the client side not in SSR
			const expires = new Date();
			expires.setFullYear(expires.getFullYear() + 1); // One year from now
			document.cookie = `${PUBLIC_LOCALIZATION_COOKIE_NAME}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
		}
	}

	setLocalizationCookie($page.data.language);
	setLanguageTag($page.data.language); //Must be called before onSetLanguageTag to avoid infite loop of invalidation
	// Triggers each time the setLanguageTag is called clientSide
	onSetLanguageTag(async (tag) => {
		if (browser) {
			setLocalizationCookie(tag);
			await invalidateAll();
		}
	});

	const pageTitle = $derived.by(() => {
		try {
			return renderBreadcrumb(
				breadcrumbs[$page.route.id || '/(app)/'][
					breadcrumbs[$page.route.id || '/(app)/'].length - 1
				].title(),
				$page.data.pageTitle
			);
		} catch (err) {
			return $page.data.t.pages.home.index();
		}
	});
	const { children } = $props();

	import { getFlash } from 'sveltekit-flash-message';
	//TODO: Replace with svelte-french-toast when it supports svelte 5
	import toast, { Toaster } from 'svelte-hot-french-toast';
	import type { SupportedLanguage } from '$lib/i18n';

	const flash = getFlash(page);
	flash.subscribe(($flash) => {
		if (!$flash) return;
		if ($flash.type === 'success') {
			toast.success($flash.message);
		}
		if ($flash.type === 'error') {
			toast.error($flash.message);
		}
		flash.set(undefined);
	});
</script>

<svelte:head>
	{#key $page.url.pathname}
		<title>{pageTitle} - Belcoda</title>
	{/key}
</svelte:head>

<!-- Forces the layout to rerender when language is changed -->
{#key $page.data.language}
	<Toaster />
	<div class="min-h-screen bg-slate-50">
		<MainNav />
		<div class="container mx-auto px-4 grid grid-cols-12 gap-4">
			<div class="hidden lg:block lg:col-span-3 xl:col-span-2">
				{#key $page.url.pathname}<Sidebar />{/key}
			</div>
			<div class="col-span-12 lg:col-span-9 xl:col-span-10 mb-24 lg:mb-0">
				{#key $page.url.pathname}<Breadcrumb />{/key}
				{@render children()}
			</div>
		</div>
		<div class="block lg:hidden">
			{#key $page.url.pathname}<BottomNav />{/key}
		</div>
		<footer class="hidden lg:block">
			<Footer />
		</footer>
	</div>
{/key}
