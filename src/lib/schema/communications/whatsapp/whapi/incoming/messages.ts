import {
	v,
	shortString,
	shortStringNotEmpty,
	longStringNotEmpty,
	integer,
	url,
	longString
} from '$lib/schema/valibot';

export const messageTypes = v.picklist([
	'text',
	'image',
	'video',
	'gif',
	'audio',
	'voice',
	'short',
	'document',
	'link_preview',
	'location',
	'live_location',
	'contact',
	'contact_list',
	'sticker',
	'system',
	'call',
	'unknown',
	'action',
	'group_invite',
	'product',
	'interactive',
	'reply',
	'poll',
	'hsm',
	'order',
	'story'
]);

export const actionTypes = {
	emojiReaction: v.object({
		target: shortString,
		type: v.literal('reaction'),
		emoji: v.pipe(v.string(), v.length(1))
	}),
	pollVote: v.object({
		target: shortString,
		type: v.literal('vote'),
		votes: v.array(shortString)
	})
};

const messageBodies = {
	text: v.object({
		body: longString
	}),
	link_preview: v.object({
		body: longString,
		url: url,
		title: longString,
		id: shortStringNotEmpty,
		sha256: longString,
		description: longString,
		preview: longString
	}),
	document: v.object({
		id: shortStringNotEmpty,
		mime_type: shortString,
		file_size: integer,
		sha256: longString,
		link: v.optional(url),
		caption: v.optional(longString),
		filename: longString,
		page_count: v.optional(integer),
		preview: longString
	}),
	voice: v.object({
		id: shortStringNotEmpty,
		mime_type: shortString,
		file_size: integer,
		sha256: longString,
		link: v.optional(url),
		seconds: integer
	}),
	location: v.object({
		latitude: v.number(),
		longitude: v.number(),
		preview: longString
	}),
	live_location: v.object({
		latitude: v.number(),
		longitude: v.number(),
		caption: v.optional(longString),
		sequence_number: integer,
		preview: longString
	}),
	contact: v.object({
		name: shortString,
		vcard: longString
	}),
	contact_list: v.object({
		contacts: v.array(
			v.object({
				name: shortString,
				vcard: longString
			})
		)
	}),
	sticker: v.object({
		id: shortStringNotEmpty,
		mime_type: shortString,
		file_size: integer,
		sha256: longString,
		link: v.optional(url),
		width: integer,
		height: integer,
		animated: v.boolean()
	}),
	group_invite: v.object({
		body: longString,
		url: url,
		title: shortString,
		invite_code: shortString,
		id: shortString,
		sha256: v.optional(longString),
		description: v.optional(longString),
		preview: v.optional(longString)
	}),
	product: v.object({
		product_id: shortString,
		catalog_id: shortString
	}),
	catalog: v.object({
		body: longString,
		url: url,
		canonical: url,
		title: shortString,
		catalog_id: shortString,
		preview: longString
	}),
	poll: v.object({
		title: longString,
		options: v.array(longString),
		total: integer,
		result: v.array(
			v.object({
				name: longString,
				voters: v.array(shortString),
				count: integer,
				id: shortString
			})
		)
	}),
	action: v.variant('type', [actionTypes.emojiReaction, actionTypes.pollVote])
};

const messageBodiesArray = Object.values(messageBodies);

export const context = v.object({
	forwarded: v.boolean(),
	forwarding_score: integer,
	mentions: v.optional(v.array(shortString)), //phone numbers of mentioned poeple...
	quoted_id: shortString,
	quoted_type: messageTypes,
	quoted_content: v.union(messageBodiesArray), //corresponds to a message type (eg: text, or image, or video, etc)
	quoted_author: shortString //phone number of person who was quoted...
});

export const base = v.object({
	id: shortStringNotEmpty,
	from_me: v.boolean(),
	chat_id: shortStringNotEmpty,
	timestamp: v.number(),
	source: v.picklist(['mobile', 'web', 'api', 'system', ' business_api']),
	from: shortStringNotEmpty,
	from_name: shortString,
	context: v.optional(context)
});

const messageContentTypes = {
	text: v.object({
		type: v.literal('text'),
		text: messageBodies.text,
		...base.entries
	}),
	link_preview: v.object({
		type: v.literal('link_preview'),
		link_preview: messageBodies.link_preview,
		...base.entries
	}),
	document: v.object({
		type: v.literal('document'),
		document: messageBodies.document,
		...base.entries
	}),
	voice: v.object({
		type: v.literal('voice'),
		voice: messageBodies.voice,
		...base.entries
	}),
	location: v.object({
		type: v.literal('location'),
		location: messageBodies.location,
		...base.entries
	}),
	live_location: v.object({
		type: v.literal('live_location'),
		live_location: messageBodies.live_location,
		...base.entries
	}),
	contact: v.object({
		type: v.literal('contact'),
		contact: messageBodies.contact,
		...base.entries
	}),
	contact_list: v.object({
		type: v.literal('contact_list'),
		contacts: messageBodies.contact_list,
		...base.entries
	}),
	sticker: v.object({
		type: v.literal('sticker'),
		sticker: messageBodies.sticker,
		...base.entries
	}),
	group_invite: v.object({
		type: v.literal('group_invite'),
		group_invite: messageBodies.group_invite,
		...base.entries
	}),
	product: v.object({
		type: v.literal('product'),
		product: messageBodies.product,
		...base.entries
	}),
	catalog: v.object({
		type: v.literal('catalog'),
		catalog: messageBodies.catalog,
		...base.entries
	}),
	poll: v.object({
		type: v.literal('poll'),
		poll: messageBodies.poll,
		...base.entries
	}),
	action: v.object({
		type: v.literal('action'),
		action: messageBodies.action,
		...base.entries
	})
};

export const messageContentArray = Object.values(messageContentTypes);

export const message = v.variant('type', messageContentArray);
