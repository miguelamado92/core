import { cn } from '$lib/utils';
import Handlebars from 'handlebars';
export default function (
	value: any,
	hb: typeof Handlebars
): { display: boolean; pre: string; post: string } {
	let display = value.hash.display ? true : false;
	let form_class = value.hash.form_class ? cn('', hb.escapeExpression(value.hash.form_class)) : '';
	return { display, pre: `<form class="${form_class}">`, post: '</form>' };
}
