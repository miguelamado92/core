import { returnLocalizationString as t, type SL, type SupportedCountry } from '$lib/i18n/index';

export default function (locale: SL): { [key in SupportedCountry]: () => string } {
	return {
		us: () => `🇺🇸`,
		jp: () => `🇯🇵`,
		gb: () => `🇬🇧`,
		eg: () => `🇪🇬`,
		au: () => `🇦🇺`,
		ke: () => `🇰🇪`,
		lr: () => `🇱🇷`,
		ng: () => `🇳🇬`,
		tz: () => `🇹🇿`,
		sc: () => `🇸🇨`
	};
}
