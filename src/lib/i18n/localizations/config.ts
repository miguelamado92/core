import { returnLocalizationString as t, type SL } from '$lib/i18n/index';

export default function (locale: SL) {
	return {
		settings: {
			admins: {
				forms: {
					fields: {
						email: {
							description: () => {
								return t(locale, {
									en: `This email address must have an active Google account. The admin will sign into the app via Google using this email address.`,
									ja: 'このメールアドレスはアクティブなGoogleアカウントを持っている必要があります。このメールアドレスを使用してGoogle経由でアプリにサインインします。',
									pt: 'Este endereço de e-mail deve ter uma conta Google ativa. O administrador fará login no aplicativo via Google usando este endereço de e-mail.',
									es: 'Esta dirección de correo electrónico debe tener una cuenta de Google activa. El administrador iniciará sesión en la aplicación a través de Google usando esta dirección de correo electrónico.',
									fr: `Cette adresse e-mail doit avoir un compte Google actif. L'administrateur se connectera à l'application via Google en utilisant cette adresse e-mail.`,
									sw: 'Anwani hii ya barua pepe lazima iwe na akaunti ya Google iliyopo. Msimamizi atajiunga na programu kupitia Google kwa kutumia anwani hii ya barua pepe.',
									th: 'ที่อยู่อีเมลนี้ต้องมีบัญชี Google ที่ใช้งานอยู่ ผู้ดูแลระบบจะเข้าสู่แอปผ่าน Google โดยใช้อีเมลนี้',
									zh: '此电子邮件地址必须具有活动的Google帐户。管理员将使用此电子邮件地址通过Google登录应用程序。'
								});
							}
						}
					}
				}
			}
		}
	};
}
