import type { Template } from '$lib/schema/communications/whatsapp/elements/template';
import { PLACEHOLDER_IMAGE_URL } from '$lib/comps/forms/whatsapp/messages/actions';
import type {
	Template as TemplateMessage,
	HeaderParams,
	TemplateMessageButtonComponentParameter
} from '$lib/schema/communications/whatsapp/elements/template_message';

export function extractTemplateMessageParams(array: TemplateMessage['components']) {
	const header = array.find((component) => component.type === 'header');
	const body = array.find((component) => component.type === 'body');
	const buttons = array.filter((component) => component.type === 'button');
	return { header, body, buttons };
}

export function interpolateTextParams(text: string, params: HeaderParams[]) {
	if (!params) return text;
	const textParams = params.filter((param) => param.type === 'text');
	return text.replace(/{{(\d+)}}/g, function (match, number) {
		const index = parseInt(number, 10);
		return textParams[index - 1].text; //in the text the params are {{index}} and index is 1-based
	});
}

export function templateMessageParamsIndexes(array: TemplateMessage['components']) {
	const header = array.findIndex((component) => component.type === 'header');
	const body = array.findIndex((component) => component.type === 'body');
	const buttonIndexes: number[] = [];
	array.forEach((component, i) => {
		if (component.type === 'button') {
			buttonIndexes.push(i);
		}
	});
	return { header, body, button: buttonIndexes };
}

export function extractComponents(componentArray: Template['components']) {
	const header = componentArray.find((component) => component.type === 'HEADER');
	const body = componentArray.find((component) => component.type === 'BODY');
	const footer = componentArray.find((component) => component.type === 'FOOTER');
	const buttons = componentArray.find((component) => component.type === 'BUTTONS');
	return { header, body, footer, buttons };
}

export function countTextTemplatePlaceholders(input: string): number {
	const regex = /{{(\d+)}}/g;
	const matches = new Set<string>();
	let match;

	while ((match = regex.exec(input)) !== null) {
		matches.add(match[1]);
	}

	return matches.size;
}
import { v4 as uuid } from 'uuid';
import { type Read as ReadThread } from '$lib/schema/communications/whatsapp/threads';

export function extractTemplateMessageComponents(
	componentArray: ReadThread['template_message']['template']['components']
) {
	const header = componentArray.find((component) => component.type === 'header');
	const body = componentArray.find((component) => component.type === 'body');
	const buttons = componentArray.filter((component) => component.type === 'button');
	return { header, body, buttons };
}

export function createMessageComponentsFromTemplateComponents(
	componentArray: Template['components'],
	actions: ReadThread['actions'],
	threadMessage: ReadThread['template_message']
): { components: TemplateMessage['components']; actions: ReadThread['actions'] } {
	const { header, body, buttons } = extractComponents(componentArray);
	const actionsObject = { ...actions };
	const message = extractTemplateMessageComponents(threadMessage.template.components);
	const components: TemplateMessage['components'] = [];
	if (header) {
		switch (header.format) {
			case 'IMAGE': {
				//ok so there's a lot going on in the next line...
				//we're checking if the header has an image, and if it does, we're using that image's link as the image link (with a fallback). Otherwise, we're just using the fallback
				//most of the hard stuff is just to keep TS happy and handle edgecases (more) gracefully
				const imageUrl =
					message.header && message.header.parameters[0].type === 'image'
						? message.header.parameters[0].image.link || PLACEHOLDER_IMAGE_URL
						: PLACEHOLDER_IMAGE_URL;
				components.push({
					type: 'header',
					parameters: [
						{
							type: 'image',
							image: {
								link: imageUrl
							}
						}
					]
				});
				break;
			}
			case 'DOCUMENT': {
				components.push({
					type: 'header',
					parameters: [
						{
							type: 'document',
							document: {
								link: '',
								filename: ''
							}
						}
					]
				});
				break;
			}
			case 'VIDEO': {
				components.push({
					type: 'header',
					parameters: [
						{
							type: 'video',
							video: {
								link: ''
							}
						}
					]
				});
				break;
			}
			case 'TEXT': {
				const placeholderCount = countTextTemplatePlaceholders(header.text);
				const params: { type: 'text'; text: string }[] = [];
				for (let i = 0; i < placeholderCount; i++) {
					if (message.header && message.header.parameters[i].type === 'text') {
						const headerParam = message.header.parameters[i];
						if (headerParam.type === 'text') {
							params.push({ type: 'text', text: headerParam.text });
						}
					} else {
						params.push({
							type: 'text',
							text: `{{${i + 1}}}`
						});
					}
				}
				components.push({
					type: 'header',
					parameters: params
				});
				break;
			}
		}
	}
	if (body) {
		const placeholderCount = countTextTemplatePlaceholders(body.text);
		const params: { type: 'text'; text: string }[] = [];
		for (let i = 0; i < placeholderCount; i++) {
			if (message.body?.parameters[i]?.type === 'text') {
				const param = message.body.parameters[i];
				if (param.type === 'text') {
					params.push({
						type: 'text',
						text: param.text
					});
				}
			} else {
				params.push({
					type: 'text',
					text: `{{${i + 1}}}`
				});
			}
		}
		components.push({
			type: 'body',
			parameters: params
		});
	}
	//there is no footer params, so you don't need it in the template message.

	if (buttons) {
		const buttonParams: TemplateMessageButtonComponentParameter[] = [];
		buttons.buttons.forEach((button, i) => {
			let buttonId = uuid();
			if (message.buttons[i]?.subtype === 'quick_reply') {
				if (message.buttons[i]?.parameters[0]?.type === 'payload') {
					buttonId = message.buttons[i].parameters[0].payload;
				}
			}
			switch (button.type) {
				case 'QUICK_REPLY': {
					buttonParams.push({
						type: 'button',
						subtype: 'quick_reply',
						index: i,
						parameters: [
							{
								type: 'payload',
								payload: buttonId
							}
						]
					});
					break;
				}
				case 'URL': {
					buttonParams.push({
						type: 'button',
						subtype: 'url',
						index: i,
						parameters: [
							{
								type: 'text',
								text: ''
							}
						]
					});
					break;
				}
			}

			actionsObject[buttonId] = actionsObject[buttonId]?.length > 0 ? actionsObject[buttonId] : [];
		});
		components.push(...buttonParams);
	}
	return { components, actions: actionsObject };
}
