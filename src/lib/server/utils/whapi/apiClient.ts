import { WHAPI_API_URL, WHAPI_API_TOKEN } from '$env/static/private';
import { BelcodaError } from '$lib/server';
import type { NumericRange } from '@sveltejs/kit';
export async function apiClient({
	method,
	endpoint,
	data
}: {
	method: 'POST' | 'PUT' | 'PATCH' | 'GET' | 'DELETE';
	endpoint: `/${string}`;
	data: unknown;
}) {
	try {
		const response = await fetch(WHAPI_API_URL + endpoint, {
			method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${WHAPI_API_TOKEN}`
			},
			body: JSON.stringify(data)
		});
		if (response.ok) {
			return await response.json();
		}
		throw new BelcodaError(
			response.status as NumericRange<400, 599>,
			`WA:APICLIENT:ERROR:01`,
			'An unknown error occured communicating with Whatsapp servers'
		);
	} catch (err) {
		throw new BelcodaError(
			500,
			`WA:APICLIENT:ERROR:02`,
			'An unknown error occured communicating with Whatsapp servers',
			err
		);
	}
}
