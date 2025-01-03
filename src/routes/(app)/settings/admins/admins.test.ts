import { expect, describe, it, vi, beforeEach } from 'vitest';
import { load } from './+page.server';
import { load as loadEdit } from './[admin_id]/+page.server';
import { parse } from '$lib/schema/valibot';
import { list as schema } from '$lib/schema/core/admin';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockAdmin = {
	id: 1,
	full_name: 'John Doe',
	email: 'john@example.com',
	profile_picture_url: 'https://example.com/photo.jpg',
	has_signed_in: true,
	active: true,
	permissions: ['all'],
	created_at: new Date(),
	updated_at: new Date()
};

const mockAdmins = {
	items: [mockAdmin],
	count: 1
};

describe('Admin List Page Server', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('loads admin list successfully', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockAdmins)
		});

		const response = await load({
			fetch: mockFetch,
			url: new URL('http://localhost/settings/admins')
		});

		expect(response).toEqual({ admins: mockAdmins });
		expect(mockFetch).toHaveBeenCalledWith('/api/v1/admins');
	});

	it('validates schema', () => {
		const parsed = parse(schema, mockAdmins);
		expect(parsed).toEqual(mockAdmins);
	});
});

describe('Edit Admin Page Server', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('loads single admin successfully', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockAdmin)
		});

		const response = await loadEdit({
			fetch: mockFetch,
			params: { admin_id: '1' }
		});

		expect(response).toHaveProperty('form');
		expect(mockFetch).toHaveBeenCalledWith('/api/v1/admins/1');
	});
});
