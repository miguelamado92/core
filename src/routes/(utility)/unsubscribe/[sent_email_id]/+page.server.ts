import { unsubscribeFromSentEmail } from '$lib/server/api/communications/email/sent_emails';

export async function load(event) {
	//todo: update the sent_emails table to have a colum for the emailMessage so that we can always add that to the senc
	//todo: in the worker for sending the email, make sure there is either an email_id included, and add it or the mesage to the sent_emails table
	//here, lookup the sent_email by the id, then get the person.
	// unsubscribe the person from email
	// return the page, with their email address.
	// creat ethe page
	const person = await unsubscribeFromSentEmail({
		id: event.params.sent_email_id,
		t: event.locals.t
	});
	return { person };
}
