import { returnLocalizationString as t, type SL } from '$lib/i18n/index';

export default function (locale: SL) {
	return {
		data: {
			no_items: () => {
				return t(locale, {
					en: `No items found`,
					ja: 'アイテムが見つかりません',
					pt: 'Nenhum item encontrado',
					es: 'No se encontraron elementos',
					fr: 'Aucun élément trouvé',
					sw: 'Hakuna vitu vilivyopatikana',
					th: 'ไม่พบรายการ',
					zh: '找不到任何项目'
				});
			}
		},
		communications: {
			email_unsubscribed: {
				title: () => {
					return t(locale, {
						en: 'Unsubscribed',
						ja: '購読解除',
						pt: 'Desinscrito',
						es: 'Dado de baja',
						fr: 'Désabonné',
						sw: 'Haujasajiliwa',
						th: 'ยกเลิกการสมัคร',
						zh: '取消订阅'
					});
				},
				description: (email?: string) => {
					return t(locale, {
						en: `The email address <span class="font-bold">${email || 'that you requested'}</span> has been unsubscribed from our mailing list.`,
						ja: `メーリングリストから${email || 'リクエストされた'}メールアドレスが購読解除されました。`,
						pt: `O endereço de e-mail ${email || 'solicitado'} foi cancelado da nossa lista de discussão.`,
						es: `La dirección de correo electrónico ${email || 'solicitada'} ha sido dada de baja de nuestra lista de correo.`,
						fr: `L'adresse e-mail ${email || 'demandée'} a été désabonnée de notre liste de diffusion.`,
						sw: `Anwani ya barua pepe ${email || 'ulioomba'} imeondolewa kutoka kwenye orodha yetu ya barua pepe.`,
						th: `ที่อยู่อีเมล ${email || 'ที่คุณขอ'} ได้ถูกยกเลิกการสมัครจากรายชื่อสมาชิกของเราแล้ว`,
						zh: `您请求的电子邮件地址${email || '已'}已从我们的邮件列表中取消订阅。`
					});
				}
			},
			nouns: {
				template: () => {
					return t(locale, {
						en: 'Template',
						ja: 'テンプレート',
						pt: 'Modelo',
						es: 'Plantilla',
						fr: 'Modèle',
						sw: 'Kiolezo',
						th: 'เทมเพลต',
						zh: '模板'
					});
				}
			}
		},
		status: {
			sending: () => {
				return t(locale, {
					en: 'Sending',
					ja: '送信中',
					pt: 'Enviando',
					es: 'Enviando',
					fr: 'Envoi en cours',
					sw: 'Inatuma',
					th: 'กำลังส่ง',
					zh: '发送中'
				});
			},
			sent: () => {
				return t(locale, {
					en: 'Sent',
					ja: '送信済み',
					pt: 'Enviado',
					es: 'Enviado',
					fr: 'Envoyé',
					sw: 'Imetumwa',
					th: 'ส่งแล้ว',
					zh: '已发送'
				});
			},
			completed: {
				en: 'Completed',
				ja: '完了',
				pt: 'Concluído',
				es: 'Completado',
				fr: 'Terminé',
				sw: 'Imekamilika',
				th: 'เสร็จสิ้น',
				zh: '已完成'
			},
			active: () => {
				return t(locale, {
					en: 'Active',
					ja: 'アクティブ',
					pt: 'Ativo',
					es: 'Activo',
					fr: 'Actif',
					sw: 'Active',
					th: 'ใช้งาน',
					zh: '活跃'
				});
			},
			inactive: () => {
				return t(locale, {
					en: 'Inactive',
					ja: '非アクティブ',
					pt: 'Inativo',
					es: 'Inactivo',
					fr: 'Inactif',
					sw: 'Haipo',
					th: 'ไม่ได้ใช้งาน',
					zh: '不活跃'
				});
			},
			loading: () => {
				return t(locale, {
					en: 'Loading...',
					ja: '読み込み中...',
					pt: 'Carregando...',
					es: 'Cargando...',
					fr: 'Chargement en cours...',
					sw: 'Inapakia...',
					th: 'กำลังโหลด...',
					zh: '载入中...'
				});
			},
			subscribed: () => {
				return t(locale, {
					en: 'Subscribed',
					ja: '購読済み',
					pt: 'Inscrito',
					es: 'Suscrito',
					fr: 'Abonné',
					sw: 'Amejisajili',
					th: 'สมัครสมาชิกแล้ว',
					zh: '已订阅'
				});
			}
		},
		actions: {
			search: () => {
				return t(locale, {
					en: 'Search',
					ja: '検索',
					pt: 'Pesquisar',
					es: 'Buscar',
					fr: 'Chercher',
					sw: 'Tafuta',
					th: 'ค้นหา',
					zh: '搜索'
				});
			}
		},
		alerts: {
			send_email: () => {
				return t(locale, {
					en: 'Are you sure? Pres OK to send the email.',
					ja: '本当にいいですか？ メールを送信するにはOKを押してください。',
					pt: 'Tem certeza? Pressione OK para enviar o e-mail.',
					es: '¿Estás seguro? Presiona OK para enviar el correo electrónico.',
					fr: "Êtes-vous sûr? Appuyez sur OK pour envoyer l'e-mail.",
					sw: 'Je, uhakika? Bonyeza OK kutuma barua pepe.',
					th: 'แน่ใจหรือไม่? กด OK เพื่อส่งอีเมล',
					zh: '您确定吗？按OK发送电子邮件。'
				});
			}
		}
	};
}
