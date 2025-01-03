import { describe, it, expect, vi, beforeEach } from 'vitest';
import { parse } from '$lib/schema/valibot';
import { secrets as secretsSchema } from '$lib/schema/core/instance';
import { load } from './+page.server';

vi.mock('$app/stores', () => ({
	page: {
		subscribe: vi.fn(),
		data: {
			t: {
				pages: {
					config: {
						settings: {
							secrets: {
								index: () => 'Secrets'
							}
						}
					}
				},
				forms: {
					buttons: {
						submit: () => 'Submit'
					}
				}
			}
		}
	}
}));

vi.mock('$lib/server', () => ({
	superValidate: vi.fn(),
	valibot: vi.fn()
}));

// Test data
const mockSecrets = {
	WHATSAPP_ACCESS_KEY: '123',
	OTHER_KEY: 'other-value'
};

describe('Secrets Page Server Load', () => {
	const mockEvent = {
		fetch: vi.fn()
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('should load secrets successfully', async () => {
		mockEvent.fetch.mockResolvedValueOnce({
			json: async () => mockSecrets
		});

		const result = await load(mockEvent);

		expect(result.services).toHaveLength(2);
		expect(result.services).toEqual([
			{ key: 'WHATSAPP_ACCESS_KEY', value: '123' },
			{ key: 'OTHER_KEY', value: 'other-value' }
		]);
	});
});

describe('Validation schema for secrets', () => {
	it('Contains WHATSAPP_ACCESS_KEY key', async () => {
		const secretsSchemaKeys = Object.keys(secretsSchema.entries);
		expect(secretsSchemaKeys).toContain('WHATSAPP_ACCESS_KEY');
	});

	it('Accepts specified schemas, including any extra keys not defined in schema', async () => {
		const parsed = parse(secretsSchema, mockSecrets);
		expect(parsed).toEqual(mockSecrets);
	});
});
