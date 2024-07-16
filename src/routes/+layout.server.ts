export const load = (event) => {
	return {
		language: event.locals.language,
		admin: event.locals.admin,
		instance: event.locals.instance
	};
};
