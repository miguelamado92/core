import type { Template } from '$lib/schema/communications/whatsapp/elements/template';

export function extractComponents(comonentArray: Template['components']) {
	const header = comonentArray.find((component) => component.type === 'HEADER');
	const body = comonentArray.find((component) => component.type === 'BODY');
	const footer = comonentArray.find((component) => component.type === 'FOOTER');
	const buttons = comonentArray.filter((component) => component.type === 'BUTTONS');
	return { header, body, footer, buttons };
}
