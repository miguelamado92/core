import { v, id } from '$lib/schema/valibot';

export const setFieldValue = v.object({
	person_id: id,
	field: v.string(),
	value: v.string()
});
export type SetFieldValue = v.InferOutput<typeof setFieldValue>;

export const readFieldValue = v.object({
	field: setFieldValue.entries.field,
	value: setFieldValue.entries.value
});
export type ReadFieldValue = v.InferOutput<typeof readFieldValue>;

export const setFieldValueFromApi = v.object({
	field: setFieldValue.entries.field,
	value: setFieldValue.entries.value
});
export type SetFieldValueFromApi = v.InferOutput<typeof setFieldValueFromApi>;
