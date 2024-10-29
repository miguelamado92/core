import { v, id, timestamp, uuid, mediumString, email, longString } from '$lib/schema/valibot';
import { Mail } from 'lucide-svelte';

export const base = v.object({
	id: uuid,
	message_id: v.nullable(id),
	person_id: id,
	subject: mediumString,
	message: longString,
	received_at: timestamp
});

export const read = base;
export type Read = v.InferOutput<typeof read>;

export const list = v.array(read);
export type List = v.InferOutput<typeof list>;

export const create = v.object({
	message_id: v.optional(base.entries.message_id, null),
	person_id: base.entries.person_id,
	subject: base.entries.subject,
	message: base.entries.message
});
export type Create = v.InferOutput<typeof create>;

const mailBox = v.object({
	address: email,
	raw: longString,
	name: v.optional(mediumString)
});

export const incomingWebhook = v.object({
	to: v.array(mailBox),
	from: mailBox,
	cc: v.optional(v.array(mailBox)),
	bcc: v.optional(v.array(mailBox)),
	subject: v.optional(mediumString, '[NO_SUBJECT]'),
	html: v.optional(longString),
	text: v.optional(longString),
	amp: v.optional(longString)
});

// Main schema
export const incomingPostmarkWebhook = v.object({
	FromName: v.optional(mediumString),
	MessageStream: v.optional(mediumString),
	From: email,
	FromFull: v.object({
		Email: email,
		Name: v.optional(mediumString),
		MailboxHash: v.optional(mediumString)
	}),
	To: v.optional(mediumString), // assuming To field is a string
	ToFull: v.array(
		v.object({
			Email: email,
			Name: v.optional(mediumString),
			MailboxHash: v.optional(mediumString)
		})
	),
	Cc: v.optional(mediumString), // assuming Cc field is a string
	CcFull: v.array(
		v.object({
			Email: email,
			Name: v.optional(mediumString),
			MailboxHash: v.optional(mediumString)
		})
	),
	Bcc: v.optional(mediumString), // assuming Bcc field is a string
	BccFull: v.array(
		v.object({
			Email: email,
			Name: v.optional(mediumString),
			MailboxHash: v.optional(mediumString)
		})
	),
	OriginalRecipient: email,
	Subject: v.optional(mediumString),
	MessageID: uuid,
	ReplyTo: v.optional(mediumString),
	MailboxHash: v.optional(mediumString),
	Date: v.optional(mediumString), // assuming date is in a string format
	TextBody: v.optional(v.string()),
	HtmlBody: v.optional(v.string()),
	StrippedTextReply: v.optional(v.string()),
	Tag: v.optional(mediumString),
	Headers: v.array(
		v.object({
			Name: v.optional(mediumString),
			Value: v.optional(mediumString)
		})
	),
	Attachments: v.array(
		v.object({
			Name: v.optional(mediumString),
			Content: v.optional(v.string()), // base64 encoded content
			ContentType: v.optional(mediumString),
			ContentLength: v.optional(v.number())
		})
	)
});
