// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		type Localization = import('$lib/i18n/index').Localization;
		type Queue = typeof import('$lib/server/utils/queue/add_job').default;
		interface Error {
			error: true;
			name: string; //Unique identifier for the type of error
			message: string; //Human-readable error message
			id: string; //uuid
		}
		interface Locals {
			language: import('$lib/i18n/index').SUPPORTED_LANGUAGES[number];
			t: import('$lib/i18n/index').Localization;
			admin: import('$lib/schema/core/admin').Read;
			instance: import('$lib/schema/core/instance').Read;
			queue: typeof import('$lib/server/utils/queue/add_job').default;
		}
		interface PageData {
			language: import('$lib/i18n/index').SUPPORTED_LANGUAGES[number];
			t: import('$lib/i18n/index').Localization;
			admin: import('$lib/schema/core/admin').Read;
			instance: import('$lib/schema/core/instance').Read;
			timeAgo: import('javascript-time-ago').default;
			pageTitle: { key: string; title: string }[];
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
