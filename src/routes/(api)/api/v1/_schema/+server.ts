import { json } from '@sveltejs/kit';
import { GET as getSchema } from '../admins/schema';
export async function GET(event) {
	let schema = getSchema();
	return json({
		openapi: '3.1.0',
		info: {
			title: 'My API',
			version: '1.0.0'
		},
		paths: {
			'/api/v1/admins': {
				get: schema
			}
			//'/api/v1/admins': api_v1_admins,
			//'/api/v1/admins/{admin_id}': api_v1_admin
		}
	});
}
