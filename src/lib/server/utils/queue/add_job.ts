import addJob from '$lib/server/utils/queue/init';
import { read as readAdmin } from '$lib/server/api/core/admins';
import { read as readInstance } from '$lib/server/api/core/instances';
import { Localization, DEFAULT_LANGUAGE } from '$lib/i18n';
import { dev } from '$app/environment';

type AddQueueOptions = {
	runAt?: Date;
};

export default async function (
	task: string,
	instance_id: number,
	data: unknown,
	admin_id?: number,
	options?: AddQueueOptions
) {
	if (!admin_id) {
		const t = new Localization(DEFAULT_LANGUAGE);
		const instance = await readInstance({ instance_id });
		const admin = await readAdmin({
			instance_id,
			admin_id: admin_id || instance.settings.default_admin_id,
			t
		});
		admin_id = admin.id;
	}
	const taskOptions = {
		...options,
		maxAttempts: dev ? 1 : 25
	};
	if (task[0] === '/') {
		task = task.slice(1);
	}
	await addJob('worker', { task, instance_id, data, admin_id }, taskOptions);
}
