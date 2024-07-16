import { json } from '@sveltejs/kit';
export async function GET(event) {
	return json({
		openapi: '3.1.0',
		info: {
			title: 'My API',
			version: '1.0.0'
		},
		paths: {
			'/api/v1/admins': {
				get: {}
			}
			//'/api/v1/admins': api_v1_admins,
			//'/api/v1/admins/{admin_id}': api_v1_admin
		}
	});
}
