import { OAuth2Client } from 'google-auth-library';
import { PUBLIC_GOOGLE_AUTH_CLIENT_ID } from '$env/static/public';
export async function verify(token: string) {
	const client = new OAuth2Client();
	console.log('starting');
	const ticket = await client
		.verifyIdToken({
			idToken: token,
			audience: PUBLIC_GOOGLE_AUTH_CLIENT_ID
		})
		.catch((err) => {
			console.error(err);
			throw new Error('Invalid token');
		});
	console.log('ending');
	const payload = ticket.getPayload();
	if (!payload) throw new Error('Invalid token');
	if (!['https://accounts.google.com'].includes(payload['iss'])) {
		throw new Error('Invalid token issuer');
	}
	return {
		email: payload['email'],
		google_access_token: token,
		google_refresh_token: null,
		google_id: payload['sub'],
		google_expires_in: new Date(payload['exp']).toISOString(),
		google_token_type: 'access_token',
		full_name: payload['name'],
		profile_picture_url: payload['picture']
	};
}
