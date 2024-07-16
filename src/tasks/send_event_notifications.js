//@ts-ignore
const handler = async (payload, helpers) => {
	// async is optional, but best practice

	const result = await fetch(`${process.env.GRAPHILE_WORKER_ENDPOINT}/cron/send_scheduled_emails`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${process.env.GRAPHILE_WORKER_TOKEN}`,
		},
		body: JSON.stringify({}),
	}).catch((e) => {
		helpers.logger.error(e);
		throw e;
	});
	if(!result.ok) throw new Error(`Failed to send task to worker: ${result.statusText}`);

	
};
export default handler;
