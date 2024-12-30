import { update, type Secrets } from '$lib/schema/core/instance.js';
import { _readSecretsUnsafe } from '$lib/server/api/core/instances';
import { superValidate, message, valibot, redirect, type Infer, BelcodaError } from '$lib/server';
import { update as updateSecrets } from '$lib/server/api/core/instances';

export const load = async (event) => {
	const instance = event.locals.instance;
	const services = await _readSecretsUnsafe({ instanceId: instance.id });

	const formData = {
		secrets: services
	};

	const form = await superValidate(formData, valibot(update));
	return {
		form,
		services: Object.entries(services).map(([key, value]) => ({ key, value }))
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

		await updateSecrets({
			instanceId: event.locals.instance.id,
			body: { secrets: form.data.secrets as Secrets },
			t: event.locals.t
		});

		return redirect(event, {
			location: `/settings/secrets`,
			message: event.locals.t.forms.actions.updated()
		});
	}
};
