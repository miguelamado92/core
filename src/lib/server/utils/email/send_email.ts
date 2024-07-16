import { env } from '$env/dynamic/private';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
const client = new SESClient({
	region: 'us-east-1',
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY,
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY
	}
});

export default async function (options: {
	to: string;
	from: string;
	subject: string;
	html: string;
	text?: string | undefined;
	replyTo: string;
	//returnPath: string;
}): Promise<string> {
	// if we don't have a plain text version of the email, we can just send the HTML version and SES will figure it out
	const body = options.text
		? {
				/* required */
				Html: {
					Charset: 'UTF-8',
					Data: options.html
				},
				Text: {
					Charset: 'UTF-8',
					Data: options.text
				}
			}
		: {
				/* required */
				Html: {
					Charset: 'UTF-8',
					Data: options.html
				}
			};
	const command = new SendEmailCommand({
		Destination: {
			/* required */
			//CcAddresses: [],
			ToAddresses: [options.to]
		},
		Message: {
			/* required */
			Body: body,
			Subject: {
				Charset: 'UTF-8',
				Data: options.subject
			}
		},
		Source: options.from,
		ReplyToAddresses: [options.replyTo]
		//ReturnPath: options.returnPath
	});
	try {
		const result = await client.send(command);
		let message_id = result.MessageId ? result.MessageId : 'MESSAGE_ID_MISSING';
		return message_id;
	} catch (err) {
		console.log(err);
		return 'ERROR';
	}
}
