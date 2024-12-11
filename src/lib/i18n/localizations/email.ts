import { returnLocalizationString as t, type SL } from '$lib/i18n/index';

export default function (locale: SL) {
	return {
		unsubscribe: () => {
			return t(locale, {
				en: 'Unsubscribe',
				ja: '登録解除',
				pt: 'Cancelar inscrição',
				es: 'Darse de baja',
				fr: 'Se désabonner',
				sw: 'Gharama',
				th: 'ยกเลิกการสมัคร',
				zh: '退订'
			});
		},
		unsubscribe_description: () => {
			return t(locale, {
				en: "Don't want to receive these emails anymore?",
				ja: 'これ以上このメールを受け取りたくないですか？',
				pt: 'Não quer mais receber esses e-mails?',
				es: '¿No quieres recibir estos correos electrónicos más?',
				fr: 'Vous ne voulez plus recevoir ces courriels?',
				sw: 'Hutaki kupokea barua pepe hizi tena?',
				th: 'ไม่ต้องการรับอีเมลเหล่านี้อีกต่อไปหรือไม่?',
				zh: '不想再收到这些电子邮件了？'
			});
		}
	};
}
