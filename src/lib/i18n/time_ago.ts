import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';
import ja from 'javascript-time-ago/locale/ja';

import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '$lib/i18n';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ja);

export default function (locale: string) {
	if (SUPPORTED_LANGUAGES.includes(locale as SupportedLanguage)) {
		return new TimeAgo(locale);
	} else {
		return new TimeAgo('en');
	}
}
