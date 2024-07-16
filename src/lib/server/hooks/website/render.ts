import {
	v,
	customCode as customCodeSchema,
	parse,
	htmlMetatags,
	type CustomCode,
	type HtmlMetatags
} from '$lib/schema/valibot';
import type { Read as ReadTemplate } from '$lib/schema/website/templates';
import type { Read as ReadContent } from '$lib/schema/website/content';
import type { Read as ReadEvent } from '$lib/schema/events/events';
import type { Read as ReadPetition } from '$lib/schema/petitions/petitions';

import { pino } from '$lib/server';
const log = pino(`/server/website_render/render.ts`);

export function compile_custom_code(content: unknown, template: unknown) {
	const customCode = parse(customCodeSchema, content);
	const customTemplate = parse(customCodeSchema, template);
	const custom_css = `${customCode.custom_css || ''} ${customTemplate.custom_css || ''}`;
	const custom_jss = `${customCode.custom_js || ''} ${customTemplate.custom_js || ''}`;
	return {
		custom_css: custom_css.length > 0 ? custom_css : null,
		custom_js: custom_jss.length > 0 ? custom_jss : null,
		custom_html_head: `${customCode.custom_html_head || ''} ${customTemplate.custom_html_head || ''}`,
		custom_html_body: `${customCode.custom_html_body || ''} ${customTemplate.custom_html_body || ''}`
	};
}
export type RenderStatus = { success: boolean; error: string | null };
export type RenderContext =
	| { content: ReadContent; status: RenderStatus }
	| { event: ReadEvent; status: RenderStatus }
	| { petition: ReadPetition; status: RenderStatus };

export function render({
	context,
	renderedContent,
	template,
	customCode,
	metatags
}: {
	context: RenderContext;
	renderedContent: string;
	template: ReadTemplate;
	customCode: CustomCode;
	metatags: HtmlMetatags;
}): string {
	try {
		const parsedCustomCode = parse(customCodeSchema, customCode);
		const parsedMetatags = parse(htmlMetatags, metatags);
		return `<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="utf-8">
				${generate_html_head(parsedMetatags, template.html_metatags)}
				${parsedCustomCode.custom_html_head}
				${parsedCustomCode.custom_css ? `<style>${parsedCustomCode.custom_css}</style>` : ''}
				<script src="https://cdn.tailwindcss.com?plugins=typography"></script>
				<link rel="icon" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAAC0CAYAAAD2FuLMAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQGSURBVHgB7d3dbRtHAIXRGZkSoLeUkBKiDqIS1IHcQdxB0kFcQZwO3IFVgjqIOgjfDEgUJ0vHAWLLMimSl9yfcwDDFXzYnQtqpy7aYyu8QLuZ1dllofcWbXFdSv2jHNFJAWIEBkECgyCBQZDAIEhgECQwCBIYBAkMggQGQQKDIIFBkMAgSGAQJDAIEhgECQyCBAZBAoMggUGQwCBIYBAkMAgSGAQJDIIEBkECgyCBQdCsHFkry7fdf+/LQLTS5gU21IPA2u1ZPbspMEJeESFIYBAkMAgSGAQJDIIEBkECgyCBQZDAIEhgECQwCBIYBAkMggQGQQKDIIFBkMAgSGAQJDAIEhgECQyCBAZBAoMggUGQwCBIYBAkMAgSGAQJDIIEBkECgyCBQZDAIEhgECQwCBIYBAkMggQGQQKDIIFBkMAgSGAQJDAIEhgECQyCBAZBAoMggUGQwCBIYBAkMAgSGAQJDIIEBkECgyCBQZDAIEhgECQwCBIYBAkMggQGQQKDIIFBkMAgSGAQJDAIEhgECQyCBAZBAoMggUGQwCBIYBAkMAgSGAQJDIIEBkECgyCBQZDAIEhgECQwCKqL9tgKm5q3srw6rac3ZYIWbfmhlPZzYWOzwqbuHsr95Xk9vyuwIa+IG6il3oqLbQhsjWVpf56UKi62IrDv6M5bv53V2XWtdV5gC85gz1iWxzdn9ez3AjsQ2FOflsIurpsCOxLYlyyF7JUz2GeWQhIEViyF5Ew+MEshSRM/g7XXp/X0XYGQqQY272b4y24pvC0QNMVXxNVSeCEuDmFST7DVUrgaM2b13HmLg5jME6wbM96+qicXxgwOaRKBrZbCbsz4pcCBjf0VsXtatTeWQo5lzIHddUvhlTGDYxprYH5TSC+M8AzWbl6Vkwtx0QejCmy1FM7q7NJSSF+MJjBLIX00hjOYpZDeGnpglkJ6bciBWQrpvYGewSyFDMPgArMUMiSDCsxSyNAM5fKHT0th9+R6Vzia+3b/Uy31h8LGhhCYpZDB6vUr4n+fUhMXQ9XjwOp7n1Jj6HoZ2L9L4cmVpZCh611gq0sXLIWMRZ9+yeHSBUanL4H52ROjdPRXRJcuMGZHDcylC4zd0QJz6QJTcJQzmOtZmYpDB2YpZFIOGZilkMk5yBnMUshUxQOzFDJl0cAshUxd7AxmKYRMYJZC+GzfgVkK4X/2dgazFMJTewnMUgjftnNglkJ43o5nsPbapQvwvG0Dm3czvK89wRrbvCKulsILccF6LwzMpQvwEhsH5tIF2MLq09nr/j20h18L8HJr4vp70RbXBdjOd+L6a3WbRgG291xcH9vHHwuwm6dxLT601twBBfvw1Zjh77dgnyyFEGQphCBLIeT8A+FktT4FEdGVAAAAAElFTkSuQmCC" />
			</head>
			<body>
				${renderedContent}
				${parsedCustomCode.custom_js ? `<script>${parsedCustomCode.custom_js}</script>` : ''}
				${parsedCustomCode.custom_html_body}
			</body>
		</html>
			`;
	} catch (error) {
		log.debug({ error }, 'Error rendering HTML');
		throw {
			title: 'Unknown error',
			error_code: 'Error 500',
			error_message: 'An unknown error occurred while rendering the page'
		};
	}
}

function generate_html_head(raw_content: unknown, raw_template: unknown) {
	const content = parse(htmlMetatags, raw_content);
	const template = parse(htmlMetatags, raw_template);

	const merged = {
		title: content.title || template.title,
		description: content.description || template.description,
		subject: content.subject || template.subject,
		keywords: content.keywords || template.keywords,
		openGraph: {
			title: content.openGraph.title || template.openGraph.title,
			description: content.openGraph.description || template.openGraph.description,
			image: content.openGraph.image || template.openGraph.image,
			image_alt: content.openGraph.image_alt || template.openGraph.image_alt
		},
		twitter: {
			card: content.twitter.card || template.twitter.card,
			title: content.twitter.title || template.twitter.title,
			description: content.twitter.description || template.twitter.description,
			image: content.twitter.image || template.twitter.image,
			image_alt: content.twitter.image_alt || template.twitter.image_alt
		}
	};

	return `<title>${merged.title || 'Untitled'}</title>
${merged.description ? `<meta name="description" content="${merged.description}">` : ''}
${merged.subject ? `<meta name="subject" content="${merged.subject}">` : ''}
${merged.keywords ? `<meta name="keywords" content="${merged.keywords}">` : ''}
<meta property="og:type" content="website">
${merged.openGraph.title ? `<meta property="og:title" content="${merged.openGraph.title}">` : ''}
${merged.openGraph.description ? `<meta property="og:description" content="${merged.openGraph.description}">` : ''}
${merged.openGraph.image ? `<meta property="og:image" content="${merged.openGraph.image}">` : ''}
${merged.openGraph.image_alt ? `<meta property="og:image:alt" content="${merged.openGraph.image_alt}">` : ''}
${merged.twitter.card ? `<meta name="twitter:card" content="${merged.twitter.card}">` : ''}
${merged.twitter.title ? `<meta name="twitter:title" content="${merged.twitter.title}">` : ''}
${merged.twitter.description ? `<meta name="twitter:description" content="${merged.twitter.description}">` : ''}
${merged.twitter.image ? `<meta name="twitter:image" content="${merged.twitter.image}">` : ''}
${merged.twitter.image_alt ? `<meta name="twitter:image:alt" content="${merged.twitter.image_alt}">` : ''}
`;
}
