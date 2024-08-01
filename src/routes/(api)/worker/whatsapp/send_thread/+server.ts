import { json, error } from '$lib/server';
import * as schema from '$lib/schema/communications/whatsapp/sends';
import { parse } from '$lib/schema/valibot';

import {
	successfulResponse,
	sendMessage,
	type MessageWithBase
} from '$lib/schema/communications/whatsapp/elements/message';
import { create as createInteraction } from '$lib/server/api/people/interactions';
import { create as createInteractionSchema } from '$lib/schema/people/interactions';

import { _readSecretsUnsafe } from '$lib/server/api/core/instances';
import { _updateWhatsappId, read } from '$lib/server/api/people/people';
import { create as createSentMessage } from '$lib/server/api/communications/whatsapp/sent_messages';

export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(schema.read, body);

		const { WHATSAPP_ACCESS_KEY } = await _readSecretsUnsafe({
			instanceId: event.locals.instance.id
		});
		const PHONE_NUMBER_ID = event.locals.instance.settings.communications.whatsapp.phone_number_id;

		return json({ success: true });
	} catch (err) {
		return error(500, 'WORKER:/whatsapp/send_thread:01', event.locals.t.errors.http[500](), err);
	}
}
