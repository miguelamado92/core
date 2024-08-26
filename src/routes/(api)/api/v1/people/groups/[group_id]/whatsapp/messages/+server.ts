import { json, error } from '$lib/server';
import { list } from '$lib/server/api/communications/whatsapp/received_whatsapp_group_messages';

export async function GET(event) {
	try {
		const listed = await list({
			instanceId: event.locals.instance.id,
			groupId: Number(event.params.group_id),
			url: event.url,
			t: event.locals.t
		});
		return json(listed);
	} catch (err) {
		return error(
			500,
			'API:/people/groups/[group_id]/whatsapp/messages:GET:01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
