import { v, mediumString } from '$lib/schema/valibot';

const validationMessage = v.nullable(mediumString);

export const validationRegex = v.object({
	type: v.literal('regex'),
	regex: mediumString,
	message: validationMessage
});

export const validationEmail = v.object({
	type: v.literal('email'),
	message: validationMessage
});

export const validationUrl = v.object({
	type: v.literal('url'),
	message: validationMessage
});

export const maxLength = v.object({
	type: v.literal('max_length'),
	max_length: v.pipe(v.number(), v.integer(), v.minValue(1)),
	message: validationMessage
});

export const integer = v.object({
	type: v.literal('integer'),
	message: validationMessage
});

export const required = v.object({
	type: v.literal('required'),
	message: validationMessage
});

export const minLength = v.object({
	type: v.literal('min_length'),
	min_length: v.number(),
	message: validationMessage
});

export const maxValue = v.object({
	type: v.literal('max_value'),
	max_value: v.number(),
	message: validationMessage
});

export const minValue = v.object({
	type: v.literal('min_value'),
	min_value: v.number(),
	message: validationMessage
});

export const validation = v.variant('type', [
	validationRegex,
	validationEmail,
	validationUrl,
	maxLength,
	minLength,
	maxValue,
	minValue
]);
export type Validation = v.InferOutput<typeof validation>;

export const validationArray = v.array(validation);
export type ValidationArray = v.InferOutput<typeof validationArray>;
