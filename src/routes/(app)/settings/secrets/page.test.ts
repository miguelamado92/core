import { secrets as secretsSchema } from '$lib/schema/core/instance';
import { parse } from '$lib/schema/valibot';
import { describe, expect, it } from 'vitest';

describe('Validation schema for secrets', () => {
	it('Contains WHATSAPP_ACCESS_KEY key', async () => {
		const secretsSchemaKeys = Object.keys(secretsSchema);
		expect(secretsSchemaKeys).toContain('WHATSAPP_ACCESS_KEY');
	});

	it('Accepts specified schemas, including any extra keys not defined in schema', async () => {
		const secrets = {
			WHATSAPP_ACCESS_KEY: '123',
			OTHER_KEY: 'other value'
		};
		const parsed = parse(secretsSchema, secrets);
		expect(parsed).toEqual(secrets);
	});
});
