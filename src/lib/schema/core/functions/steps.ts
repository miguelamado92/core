import { v, mediumString, longString, url } from '$lib/schema/valibot';
export const functionTypes = v.picklist(['http', 'code']);

export const httpFunction = v.object({
	type: v.literal('http'),
	url: url,
	headers: v.array(v.object({ name: mediumString, value: longString }))
});

export const codeFunction = v.object({
	type: v.literal('code'),
	code: longString
});

export const functionStep = v.variant('type', [httpFunction, codeFunction]);
export type FunctionStep = v.InferOutput<typeof functionStep>;
const functionStepArray = v.array(functionStep);
export type FunctionStepArray = v.InferOutput<typeof functionStepArray>;
