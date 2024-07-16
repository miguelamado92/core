import { json } from '$lib/server';
import s3_put from '$lib/server/utils/s3/put';
import { parse } from '$lib/schema/valibot';
import { createLink, returnLink } from '$lib/schema/website/uploads.js';
import { AWS_S3_SITE_UPLOADS_BUCKET_NAME } from '$env/static/private';

export async function POST(event) {
	const body = await event.request.json();
	const parsed = parse(createLink, body);
	const put_url = await s3_put(AWS_S3_SITE_UPLOADS_BUCKET_NAME, parsed.file_name);
	const parsedReturn = parse(returnLink, { put_url });
	return json(parsedReturn);
}
