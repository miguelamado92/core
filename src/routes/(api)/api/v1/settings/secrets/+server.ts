import { update as updateSecrets, _readSecretsUnsafe } from '$lib/server/api/core/instances';
import { secrets as secretSchema } from '$lib/schema/core/instance';
import { parse } from '$lib/schema/valibot';
import { json, error } from '$lib/server';

export async function PUT(event) {
	try {
		const instanceId = event.locals.instance.id;
		const body = await event.request.json();
		const parsed = parse(secretSchema, body.secrets);
		await updateSecrets({
			instanceId,
			body: { secrets: parsed },
			t: event.locals.t
		});
		const secrets = await _readSecretsUnsafe({ instanceId });
		return json(secrets);
	} catch (e) {
		return error(500, 'API:/settings/secrets:PUT:01', event.locals.t.errors.http[500](), e);
	}
}

export async function GET(event) {
	try {
		const instanceId = event.locals.instance.id;
		const secrets = await _readSecretsUnsafe({ instanceId });
		return json(secrets);
	} catch (err) {
		return error(500, 'API:/settings/secrets:GET:01', event.locals.t.errors.http[500](), err);
	}
}
