//@ts-ignore
const handler = async (payload, helpers) => {
	// async is optional, but best practice
	//payload = {task: 'path/from/worker/to/my/route', instance_id: number, admin_id: number, data: unknown};
	//send task to
	const task = payload.task;
	const data = payload.data;
	const instance_id = payload.instance_id;
	const admin_id = payload.admin_id;

	console.debug(`Received ${JSON.stringify(payload)}`);
	const result = await fetch(`${process.env.GRAPHILE_WORKER_ENDPOINT}/${task}?admin_id=${admin_id}&instance_id=${instance_id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.GRAPHILE_WORKER_TOKEN}`,
		},
		body: JSON.stringify(data),
	}).catch((e) => {
		helpers.logger.error(e);
		throw e;
	});
	if(!result.ok) throw new Error(`Failed to send task to worker: ${result.statusText}`);

	
};
export default handler;
