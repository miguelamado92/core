import {
	generateFilterQueryParams,
	type RouteSpecification,
	generateRoute
} from '$lib/schema/openapi';
import { read } from '$lib/schema/core/admin';
/* export function GET(): RouteSpecification {
	return generateRoute({
		path: '/api/v1/admins',
		filter: {
			searchKey: 'full_name',
			description: 'The full name of the admin'
		},
		description: 'Get a list of all admins',
		success: {
			type: '200',
			description: 'Success',
			schema: read
		}
	});
}
 */
