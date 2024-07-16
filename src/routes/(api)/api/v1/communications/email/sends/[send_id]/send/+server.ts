import { json, error, BelcodaError } from '$lib/server';
import { update } from '$lib/server/api/communications/email/sends';
import { sendToList } from '$lib/schema/communications/email/sends';
import { parse } from '$lib/schema/valibot';
export async function PUT(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(sendToList, body);
		const send = await update({
			instanceId: event.locals.instance.id,
			sendId: Number(event.params.send_id),
			body: parsed,
			t: event.locals.t
		});
		if (send.started_at)
			throw new BelcodaError(
				400,
				'API:/communications/email/sends/[send_id]/send:02',
				event.locals.t.errors.generic()
			);
		await event.locals.queue(
			'/utils/email/send_to_list',
			event.locals.instance.id,
			{ send_id: Number(event.params.send_id) },
			event.locals.admin.id
		);
		return json({ success: true });
	} catch (err) {
		return error(
			500,
			'API:/communications/email/sends/[send_id]/send:01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
