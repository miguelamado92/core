import { default as pino_instance } from 'pino';
import { LOG_LEVEL, LOG_TRANSPORT, AXIOM_DATASET, AXIOM_TOKEN } from '$env/static/private';
export function pino(name: string) {
	if (LOG_TRANSPORT === 'axiom') {
		return pino_instance(
			{ name, level: LOG_LEVEL ?? 'info' },
			pino_instance.transport({
				target: '@axiomhq/pino',
				options: {
					dataset: AXIOM_DATASET,
					token: AXIOM_TOKEN
				}
			})
		);
	} else {
		return pino_instance({ name, level: LOG_LEVEL ?? 'info' });
	}
}
