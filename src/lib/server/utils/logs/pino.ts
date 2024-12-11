import { default as pino_instance } from 'pino';
import { LOG_LEVEL } from '$env/static/private';
export function pino(name: string) {
	return pino_instance({ name, level: LOG_LEVEL ?? 'info' });
}
