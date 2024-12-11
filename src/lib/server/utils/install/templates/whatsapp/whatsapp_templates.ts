import {
	type InitialInsert,
	type InitialInsert as WhatsAppSchema
} from '$lib/schema/communications/whatsapp/template';
type WhatsAppTemplateResponse = {
	invitation: WhatsAppSchema;
	freeResponse: WhatsAppSchema;
};
export default function ({ instanceId }: { instanceId: number }): WhatsAppTemplateResponse {
	return {
		invitation: {
			instance_id: instanceId,
			name: 'Invitation',
			status: 'APPROVED',
			whatsapp_id: null,
			interactive: true,
			message: {
				name: 'generic_event_invitation',
				category: 'MARKETING',
				allow_category_change: true,
				language: 'en',
				components: [
					{
						type: 'HEADER',
						format: 'TEXT',
						text: "{{1}} - you're invited!"
					},
					{
						type: 'BODY',
						format: 'TEXT',
						text: `Hi {{1}}, did you hear about {{2}}? It's {{3}} at {{4}}.

Do you want more details?`,
						example: {
							body_text: [['Andy', 'the event', 'happening', '5pm']]
						}
					},
					{
						type: 'BUTTONS',
						buttons: [
							{
								type: 'QUICK_REPLY',
								text: 'Tell me more'
							}
						]
					}
				]
			}
		},
		freeResponse: {
			instance_id: instanceId,
			name: 'Free response',
			status: 'APPROVED',
			interactive: false,
			whatsapp_id: null,
			message: {
				name: 'generic_free_response',
				category: 'MARKETING',
				allow_category_change: true,
				language: 'en',
				components: [
					{
						type: 'BODY',
						format: 'TEXT',
						text: `Hello, do you have a second to talk about {{1}}? I just have a couple of questions regarding {{2}}`,
						example: {
							body_text: [['issues that concern you', 'climate change']]
						}
					}
				]
			}
		}
	};
}
