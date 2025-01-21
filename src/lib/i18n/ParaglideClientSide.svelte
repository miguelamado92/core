<script lang="ts">
	import { page } from '$app/state';
	import { type SupportedLanguage } from '$lib/i18n/index';
	let { locale = $bindable() }: { locale: SupportedLanguage } = $props();
	import { setLocale, defineSetLocale, defineGetLocale, getLocale } from '$lib/paraglide/runtime';
	import { PUBLIC_LOCALIZATION_COOKIE_NAME } from '$env/static/public';
	import { browser } from '$app/environment';
	function setLocalizationCookie(value: SupportedLanguage) {
		if (browser) {
			// Only set the cookie on the client side not in SSR
			const expires = new Date();
			expires.setFullYear(expires.getFullYear() + 1); // One year from now
			document.cookie = `${PUBLIC_LOCALIZATION_COOKIE_NAME}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
		}
	}
	setLocalizationCookie(page.data.language);
	setLocale(page.data.language); //Must be called before onSetLanguageTag to avoid infite loop of invalidation
	defineGetLocale(() => locale);
	// Triggers each time the setLocale is called clientSide
	defineSetLocale(async (newLocale) => {
		locale = newLocale;
		if (browser) {
			setLocalizationCookie(newLocale);
		}
	});
</script>
