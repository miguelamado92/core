import { parsePhoneNumber } from 'awesome-phonenumber';
import {
	v,
	phoneNumber as basePhoneNumber,
	email as emailAddress,
	country
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
		country: country
	}),
	v.transform((value) => {
		const pn = parsePhoneNumber(value.phone_number, { regionCode: value.country.toUpperCase() });
		if (!pn.valid)
			throw new v.ValiError([
				{
					kind: 'validation',
					type: 'custom',
					input: `phone_number: ${value.phone_number}, country: ${value.country}`,
					expected: 'Valid phone number for this country',
					received: 'Invalid phone number for this country',
					message: 'Invalid phone number'
				}
			]);
		return {
			phone_number: pn.number.e164,
			contactable: value.contactable,
			subscribed: value.subscribed,
			textable: value.textable,
			whatsapp: value.whatsapp,
			country: value.country
		};
	})
);
export function generateDefaultPhoneNumber(country: SupportedCountry) {
	return {
		phone_number: '',
		contactable: true,
		subscribed: true,
		textable: true,
		whatsapp: false,
		country: country
	};
}

export type PhoneNumber = v.InferOutput<typeof phoneNumber>;

export const whatsapp = v.pipe(
	v.object({
		phone_number: basePhoneNumber,
		contactable: v.optional(v.boolean(), false),
		subscribed: v.optional(v.boolean(), false),
		country: country
	}),
	v.transform((value) => {
		const pn = parsePhoneNumber(value.phone_number, { regionCode: value.country.toUpperCase() });
		if (!pn.valid)
			throw new v.ValiError([
				{
					kind: 'validation',
					type: 'custom',
					input: `phone_number: ${value.phone_number}, country: ${value.country}`,
					expected: 'Valid phone number for this country',
					received: 'Invalid phone number for this country',
					message: 'Invalid phone number'
				}
			]);
		return {
			phone_number: pn.number.e164,
			contactable: value.contactable,
			subscribed: value.subscribed,
			country: value.country
		};
	})
);

export type Whatsapp = v.InferOutput<typeof whatsapp>;
