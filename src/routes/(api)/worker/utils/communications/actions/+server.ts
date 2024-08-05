import { json, pino, error } from '$lib/server';
import { triggerAction } from '$lib/schema/communications/actions/actions';
import { parse } from '$lib/schema/valibot';
import { _getActions, _getByAction } from '$lib/server/api/communications/whatsapp/messages.js';
import { sendMessage } from '$lib/schema/communications/whatsapp/elements/message';
export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(triggerAction, body);
		const { messageId, actions } = await _getByAction({
			t: event.locals.t,
			action: parsed.action_id
		});
		for (const action of actions) {
			switch (action.type) {
				case 'send_whatsapp_message': {
					// send message
					const messageToSend = {
						person_id: parsed.person_id,
						message_id: action.message_id,
						from_admin_id: event.locals.admin.id
					};
					await event.locals.queue(
						'/whatsapp/send_message',
						event.locals.instance.id,
						messageToSend,
						event.locals.admin.id
					);
					break;
				}
				//TODO: The rest of the actions
				default: {
					break;
				}
			}
		}
		return json({ success: true });
	} catch (err) {
		return error(
			500,
			'WORKER:/utils/communications/actions:01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
