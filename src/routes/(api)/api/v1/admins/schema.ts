import { json } from '$lib/server';
import { read as readAdmin } from '$lib/schema/core/admin';
export function GET() {
	return json({
		path: '/api/v1/admins',
		filter: {
			searchKey: 'full_name',
			description: 'The full name of the admin'
		},
		description: 'Get a list of all admins',
		success: {
			type: '200',
			description: 'Success',
			schema: {}
		}
	});
}
