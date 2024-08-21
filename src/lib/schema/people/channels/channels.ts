import { parsePhoneNumber } from 'awesome-phonenumber';
import {
	v,
	phoneNumber as basePhoneNumber,
	email as emailAddress,
	country,
	id,
	longStringNotEmpty,
	mediumString,
	longString
} from '$lib/schema/valibot';
import type { SupportedCountry } from '$lib/i18n';

export const email = v.object({
	email: emailAddress,
	verified: v.optional(v.boolean(), false),
	subscribed: v.optional(v.boolean(), false),
	contactable: v.optional(v.boolean(), true)
});
export type Email = v.InferOutput<typeof email>;
export const DEFAULT_EMAIL = {
	email: '',
	verified: false,
	subscribed: true,
	contactable: true
};

export const phoneNumber = v.pipe(
	v.object({
		phone_number: basePhoneNumber,
		contactable: v.optional(v.boolean(), true),
		subscribed: v.optional(v.boolean(), false),
		textable: v.optional(v.boolean(), false),
		whatsapp: v.optional(v.boolean(), false),
		strict: v.optional(v.boolean(), true),
		validated: v.optional(v.boolean(), false),
		whatsapp_id: v.optional(v.nullable(v.string())),
		whapi_id: v.optional(v.nullable(v.string())),
		country: country
	}),
	v.transform((value) => {
		const pn = parsePhoneNumber(value.phone_number, { regionCode: value.country.toUpperCase() });
		if (!pn.valid) {
			if (value.strict) {
				throw new v.ValiError([
					{
						kind: 'validation',
						type: 'custom',
						input: `phone_number: ${value.phone_number}, country: ${value.country}`,
						expected: `A valid phone number ${value.country.toUpperCase()}`,
						received: `${value.phone_number}, an invalid phone number for this country`,
						message: 'Please enter a valid phone number for this country'
					}
				]);
			} else {
				return {
					phone_number: value.phone_number,
					contactable: value.contactable,
					subscribed: value.subscribed,
					textable: value.textable,
					whatsapp: value.whatsapp,
					strict: value.strict,
					validated: false,
					whatsapp_id: value.whatsapp_id,
					whapi_id: value.whapi_id,
					country: value.country
				};
			}
		} else {
			return {
				phone_number: pn.number.e164,
				contactable: value.contactable,
				subscribed: value.subscribed,
				textable: value.textable,
				whatsapp: value.whatsapp,
				strict: value.strict,
				validated: true,
				whatsapp_id: value.whatsapp_id,
				whapi_id: value.whapi_id,
				country: value.country
			};
		}
	})
);
export function generateDefaultPhoneNumber(country: SupportedCountry) {
	return {
		phone_number: '',
		contactable: true,
		subscribed: true,
		textable: true,
		whatsapp: false,
		strict: true,
		validated: false,
		whatsapp_id: null,
		whapi_id: null,
		country: country
	};
}

export type PhoneNumber = v.InferOutput<typeof phoneNumber>;

export const formattedPhoneNumber = v.pipe(
	phoneNumber,
	v.transform((value) => {
		const parsed = parsePhoneNumber(value.phone_number, {
			regionCode: value.country.toUpperCase()
		});
		if (!parsed.valid) return value;
		return {
			...value,
			phone_number: parsed.number.national
		};
	})
);

export const whatsappNumberForVerification = v.object({
	person_id: id
});

export const whatsapp = v.partial(
	v.object({
		id: longStringNotEmpty,
		name: mediumString,
		pushname: mediumString,
		is_business: v.boolean(),
		profile_pic: mediumString,
		profile_pic_full: mediumString,
		status: longString
	})
);
