import { update, type Secrets } from '$lib/schema/core/instance.js';
import { _readSecretsUnsafe } from '$lib/server/api/core/instances';
import { superValidate, message, valibot, redirect, type Infer, BelcodaError } from '$lib/server';
import { update as updateSecrets } from '$lib/server/api/core/instances';

let servicesArray: Record<string, string>[] = [];
export const load = async (event) => {
	const form = await superValidate(valibot(update));
	const services = await _readSecretsUnsafe({ instanceId: event.locals.instance.id });
	servicesArray = Object.entries(services).map(([key, value]) => {
		return {
			key,
			value
		};
	});
	return {
		form,
		services: servicesArray
	};
};

export const actions = {
	default: async function post(event) {
		const form = await superValidate<Infer<typeof update>, BelcodaError>(
			event.request,
			valibot(update)
		);
		if (!form.valid) {
			return message(
				form,
				new BelcodaError(400, 'VALIDATION', event.locals.t.errors.validation()),
				{ status: 400 }
			);
		}
		const j = servicesArray.reduce(
			(acc, { key, value }) => {
				acc[key] = value;
				return acc;
			},
			{} as Record<string, string>
		);

		await updateSecrets({
			instanceId: event.locals.instance.id,
			body: { secrets: j as Secrets },
			t: event.locals.t
		});
		return redirect(event, {
			location: `/settings/secrets`,
			message: event.locals.t.forms.actions.updated()
		});
	}
};
