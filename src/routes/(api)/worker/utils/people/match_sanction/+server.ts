import { json, error } from '$lib/server';
import sendEmailPostmark from '$lib/server/utils/email/send_email_postmark';
import { v, parse, id } from '$lib/schema/valibot';
import { read as readAdmin } from '$lib/server/api/core/admins';
const exportSchema = v.object({
	adminId: id
});
import {
	OFAC_API_KEY,
	OFAC_DATA_SOURCES_ARRAY,
	OFAC_MATCH_SEND_EMAIL,
	OFAC_API_URL
} from '$env/static/private';
const DATA_SOURCES = OFAC_DATA_SOURCES_ARRAY.split(',');
export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(exportSchema, body);
		const admin = await readAdmin({
			instance_id: event.locals.instance.id,
			admin_id: parsed.adminId,
			t: event.locals.t
		});

		const sendBody = {
			apiKey: OFAC_API_KEY,
			minScore: 95, //recommended by ofac-api.com documentation for the best results
			sources: DATA_SOURCES,
			types: ['person'],
			cases: [
				{
					id: parsed.adminId,
					type: 'person',
					name: admin.full_name,
					emailAddress: admin.email,
					nationality: event.locals.instance.country
				}
			]
		};
		const result = await fetch(OFAC_API_URL, {
			headers: {
				ContentType: 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(sendBody)
		});
		const json = await result.json();
		if (json.error) {
			throw new Error(json.error);
		}
		if (json.results[0].matches.length > 0) {
			const subject = `OFAC_SANCTION:NOMATCH`;
			const body = `No match for newly added admin ID ${admin.id} in OFAC database`;
			await sendEmailPostmark({
				to: OFAC_MATCH_SEND_EMAIL,
				from: OFAC_MATCH_SEND_EMAIL,
				subject,
				html: body,
				replyTo: OFAC_MATCH_SEND_EMAIL,
				stream: 'outbound'
			});
		} else {
			const subject = `OFAC_SANCTION:MATCH`;
			const body = `Match found for newly added admin ID ${admin.id} in OFAC database
      
      ${JSON.stringify(json.results[0].matches)}`;
			await sendEmailPostmark({
				to: OFAC_MATCH_SEND_EMAIL,
				from: OFAC_MATCH_SEND_EMAIL,
				subject,
				html: body,
				replyTo: OFAC_MATCH_SEND_EMAIL,
				stream: 'outbound'
			});
		}

		return json({ success: true });
	} catch (err) {
		return error(
			500,
			'worker:utils/people/match_saction:POST:01',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
