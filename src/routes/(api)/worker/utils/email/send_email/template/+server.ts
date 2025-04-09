import { parse, emailTemplateMessage } from '$lib/schema/valibot';
import { json, BelcodaError, pino } from '$lib/server';
import * as m from '$lib/paraglide/messages';
const log = pino(import.meta.url);

export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(emailTemplateMessage, body);
	} catch (err) {
		new BelcodaError(
			500,
			'WORKER:/utils/email/send_email/template',
			m.happy_vivid_jackal_aim(),
			err
		);
	} finally {
		return json({ success: true });
	}
}
