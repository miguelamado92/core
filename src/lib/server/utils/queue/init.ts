import { makeWorkerUtils } from 'graphile-worker';
import { pool, pino } from '$lib/server';
const log = pino('$lib/server/utils/queue');
async function main() {
	const workerUtils = await makeWorkerUtils({
		pgPool: pool
	});
	try {
		await workerUtils.migrate();
		return workerUtils.addJob;
	} catch (e) {
		log.error(e);
		throw e;
	}
}

export default await main();
