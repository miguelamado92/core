import { default as install, type InstallOptions } from '$lib/server/utils/install/index';
import {
	DEFAULT_ADMIN_NAME,
	DEFAULT_ADMIN_EMAIL,
	DEFAULT_CREATE_TEST_DATA
} from '$env/static/private';
import { PUBLIC_HOST } from '$env/static/public';
import { DEFAULT_COUNTRY, DEFAULT_LANGUAGE } from '$lib/i18n';

const createTestData = DEFAULT_CREATE_TEST_DATA === 'true' ? true : false;

import { type Read as ReadInstance } from '$lib/schema/core/instance';
export default async function (t: App.Localization, queue: App.Queue): Promise<ReadInstance> {
	const options: InstallOptions = {
		instanceName: 'Test Instance',
		instanceSlug: 'belcoda-test',
		ownerEmail: DEFAULT_ADMIN_EMAIL,
		ownerName: DEFAULT_ADMIN_NAME,
		logoUrl: `${PUBLIC_HOST}/logos/logo.svg`,
		faviconUrl: `${PUBLIC_HOST}/logos/favicon.svg`,
		country: DEFAULT_COUNTRY,
		language: DEFAULT_LANGUAGE,
		options: {
			testData: createTestData
		}
	};
	const instance = await install(options, t, queue);
	return instance;
}
