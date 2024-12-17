import { json, error } from '$lib/server';
import { generateHtmlMetatags } from '$lib/server/utils/openai/schemas/HTMLMeta';
import { htmlMetatags } from '$lib/schema/utils/openai';
import { parse, htmlMetatags as htmlMetaTagSchema } from '$lib/schema/valibot';
import { read as readEvent, update as updateEvent } from '$lib/server/api/events/events';
export async function POST(event) {
	try {
		const body = await event.request.json();
		const parsed = parse(htmlMetatags, body);
		switch (parsed.type) {
			case 'event': {
				const eventObject = await readEvent({
					eventId: parsed.eventId,
					instanceId: event.locals.instance.id,
					t: event.locals.t
				});
				const output = await generateHtmlMetatags(eventObject.heading, eventObject.html);
				const parsedOutput = parse(htmlMetaTagSchema, output.parsed);
				if (eventObject.html_metatags.isManuallySet === false) {
					await updateEvent({
						instanceId: event.locals.instance.id,
						eventId: parsed.eventId,
						body: {
							html_metatags: {
								...eventObject.html_metatags,
								...parsedOutput
							}
						},
						queue: event.locals.queue,
						t: event.locals.t,
						// if we don't skip meta generation, this same queued job will be triggered again which will cause an infite loop
						skipMetaGeneration: true
					});
				}
				break;
			}
		}
		return json({ success: true });
	} catch (err) {
		return error(
			500,
			'WORKER:/worker/utils/openai/generate_html_meta/+server.ts',
			event.locals.t.errors.http[500](),
			err
		);
	}
}
