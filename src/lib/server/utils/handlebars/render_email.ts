import { PUBLIC_HOST } from '$env/static/public';
import render from '$lib/server/utils/handlebars/render';
export default async function ({
	messageTemplate,
	templateTemplate,
	context,
	emailUnsubscribeToken,
	instanceId
}: {
	messageTemplate: string;
	templateTemplate: string;
	context: { [key: string]: unknown };
	emailUnsubscribeToken?: `${string}-${string}-${string}-${string}`;
	instanceId: number;
}): Promise<string> {
	const combinedString = templateTemplate.replace('{{{body}}}', messageTemplate);
	const renderContext = emailUnsubscribeToken
		? {
				...context,
				unsubscribe_url: `${PUBLIC_HOST}/unsubscribe/${emailUnsubscribeToken}`
			}
		: context;
	const renderedString = await render({
		template: combinedString,
		context: renderContext,
		instanceId: instanceId
	});
	return renderedString;
}
