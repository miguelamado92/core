import { loadFlash } from 'sveltekit-flash-message/server';

export const load = loadFlash(async (event) => {
	return {
		language: event.locals.language,
		instance: event.locals.instance,
		admin: event.locals.admin
	};
});
