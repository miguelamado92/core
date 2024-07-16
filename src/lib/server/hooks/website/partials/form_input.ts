import { cn } from '$lib/utils';
export default function (value: any, escapeExpression: (arg0: string) => string) {
	let display = value.hash.display ? true : false;
	let type = escapeExpression(value.hash.type) || 'text';
	let name = escapeExpression(value.hash.name);
	let label_class = value.hash.label_class
		? cn('mb-1 text-xs uppercase tracking-wider', escapeExpression(value.hash.label_class))
		: 'mb-1 text-xs uppercase tracking-wider';
	let label = value.hash.label ? escapeExpression(value.hash.label) : null;
	let required = value.hash.required ? true : false;
	let required_label_class = value.hash.required_label_class
		? cn('text-red-500', escapeExpression(value.hash.required_label_class))
		: 'text-red-500';
	let required_text = value.hash.required_text ? escapeExpression(value.hash.required_text) : '*';

	let container_class = value.hash.container_class
		? cn('my-2', escapeExpression(value.hash.container_class))
		: 'my-2';
	let input_class = value.hash.input_class
		? cn(
				'block w-full placeholder-gray-500 px-2 py-1 text-md border-2 border-white text-gray-700 rounded',
				escapeExpression(value.hash.input_class)
			)
		: 'block w-full placeholder-gray-500 px-2 py-1 text-md border-2 border-white text-gray-700 rounded';
	if (!display) return ``;
	return `<div class="${container_class}">
			${
				label
					? `<div class="${label_class}">${label} ${
							required ? `<span class="${required_label_class}">${required_text}</span>` : ``
						}</div>`
					: ``
			}
			<div><input
				${required ? 'required' : ''} 
					type="${type}"
					name="${name}"
					class="${input_class}" >
			</div>
		</div>`;
}
