import { returnLocalizationString as t, type SL } from '$lib/i18n/index';

type PersonJoinedType =
	| {
			method: 'petition_signature';
			petition_id: number;
			petition_name: string;
	  }
	| {
			method: 'event_registration';
			event_id: number;
			event_name: string;
	  }
	| {
			method: 'other';
	  };

type PersonAddedType =
	| {
			method: 'manual';
	  }
	| {
			method: 'import';
	  }
	| {
			method: 'petition_signature';
			petition_id: number;
			petition_name: string;
	  }
	| {
			method: 'event_registration';
			event_id: number;
			event_name: string;
	  }
	| {
			method: 'other';
	  };

export default function (locale: SL) {
	return {
		lists: {
			names: {
				new_list_name: (dateString: string, randomString: string) => {
					return t(locale, {
						en: `New list (${dateString}) [#${randomString}]`,
						ja: `新しいリスト (${dateString}) [#${randomString}]`,
						pt: `Nova lista (${dateString}) [#${randomString}]`,
						es: `Nueva lista (${dateString}) [#${randomString}]`,
						fr: `Nouvelle liste (${dateString}) [#${randomString}]`,
						sw: `Orodha mpya (${dateString}) [#${randomString}]`,
						th: `รายการใหม่ (${dateString}) [#${randomString}]`,
						zh: `新列表 (${dateString}) [#${randomString}]`
					});
				}
			}
		},
		actions: {
			search_and_add: () => {
				return t(locale, {
					en: 'Search and add people',
					ja: '人を検索して追加',
					pt: 'Pesquisar e adicionar pessoas',
					es: 'Buscar y agregar personas',
					fr: 'Rechercher et ajouter des personnes',
					sw: 'Tafuta na ongeza watu',
					th: 'ค้นหาและเพิ่มคน',
					zh: '搜索并添加人员'
				});
			}
		},
		filter: {
			results: {
				title: () => {
					return t(locale, {
						en: 'Filter results',
						ja: '結果をフィルター',
						pt: 'Filtrar resultados',
						es: 'Filtrar resultados',
						fr: 'Filtrer les résultats',
						sw: 'Chuja matokeo',
						th: 'กรองผลลัพธ์',
						zh: '筛选结果'
					});
				}
			}
		},
		interactions: {
			create_types: {
				whatsapp_msg_input_placeholder: () => {
					return t(locale, {
						en: 'Type a message...',
						ja: 'メッセージを入力...',
						pt: 'Digite uma mensagem...',
						es: 'Escribe un mensaje...',
						fr: 'Tapez un message...',
						sw: 'Andika ujumbe...',
						th: 'พิมพ์ข้อความ...',
						zh: '输入消息...'
					});
				},
				whatsapp_no_conversation_active: () => {
					return t(locale, {
						en: 'There is no conversation window currently active with this person. Create a new thread to start a conversation.',
						ja: 'この人とは現在会話ウィンドウがアクティブではありません。 会話を開始するには新しいスレッドを作成してください。',
						pt: 'Não há janela de conversa atualmente ativa com esta pessoa. Crie um novo tópico para iniciar uma conversa.',
						es: 'No hay una ventana de conversación actualmente activa con esta persona. Cree un nuevo hilo para iniciar una conversación.',
						fr: "Il n'y a pas de fenêtre de conversation actuellement active avec cette personne. Créez un nouveau fil pour commencer une conversation.",
						sw: 'Hakuna dirisha la mazungumzo linaloendelea kwa sasa na mtu huyu. Unda mjadala mpya kuanza mazungumzo.',
						th: 'ไม่มีหน้าต่างสนทนาที่กำลังใช้งานอยู่กับคนนี้ในขณะนี้ สร้างเรื่องใหม่เพื่อเริ่มการสนทนา',
						zh: '目前没有与此人进行中的对话窗口。 创建新主题以开始对话。'
					});
				},
				notes_input_placeholder: () => {
					return t(locale, {
						en: 'Add a note...',
						ja: 'メモを追加...',
						pt: 'Adicione uma nota...',
						es: 'Añadir una nota...',
						fr: 'Ajouter une note...',
						sw: 'Ongeza maelezo...',
						th: 'เพิ่มบันทึก...',
						zh: '添加笔记...'
					});
				},
				notes: () => {
					return t(locale, {
						en: 'Notes',
						ja: 'メモ',
						pt: 'Notas',
						es: 'Notas',
						fr: 'Notes',
						sw: 'Maelezo',
						th: 'บันทึก',
						zh: '笔记'
					});
				},
				whatsapp: () => {
					return t(locale, {
						en: 'WhatsApp',
						ja: 'WhatsApp',
						pt: 'WhatsApp',
						es: 'WhatsApp',
						fr: 'WhatsApp',
						sw: 'WhatsApp',
						th: 'WhatsApp',
						zh: 'WhatsApp'
					});
				},
				phone_call_outbound: () => {
					return t(locale, {
						en: 'Phone call (outbound)',
						ja: '電話 (発信)',
						pt: 'Chamada telefônica (saída)',
						es: 'Llamada telefónica (saliente)',
						fr: 'Appel téléphonique (sortant)',
						sw: 'Simu (ya kutoka)',
						th: 'โทรศัพท์ (ออก)',
						zh: '电话（外拨）'
					});
				},
				phone_call_inbound: () => {
					return t(locale, {
						en: 'Phone call (inbound)',
						ja: '電話 (着信)',
						pt: 'Chamada telefônica (entrada)',
						es: 'Llamada telefónica (entrante)',
						fr: 'Appel téléphonique (entrant)',
						sw: 'Simu (ya kuingia)',
						th: 'โทรศัพท์ (ขาเข้า)',
						zh: '电话（呼入）'
					});
				}
			},
			html: {
				added: (details: PersonAddedType) => {
					switch (details.method) {
						case 'petition_signature': {
							return t(locale, {
								en: `Added by signing <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								ja: `<a href="/petitions/${details.petition_id}">${details.petition_name}</a>に署名することで追加`,
								pt: `Adicionado ao assinar <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								es: `Añadido firmando <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								fr: `Ajouté en signant <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								sw: `Imeongezwa kwa kusaini <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								th: `เพิ่มโดยการลงชื่อ <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								zh: `通过签署<a href="/petitions/${details.petition_id}">${details.petition_name}</a>添加`
							});
						}
						case 'event_registration': {
							return t(locale, {
								en: `Added by registering for <a href="/events/${details.event_id}">${details.event_name}</a>`,
								ja: `<a href="/events/${details.event_id}">${details.event_name}</a>に登録することで追加`,
								pt: `Adicionado ao se registrar para <a href="/events/${details.event_id}">${details.event_name}</a>`,
								es: `Añadido al registrarse para <a href="/events/${details.event_id}">${details.event_name}</a>`,
								fr: `Ajouté en s'inscrivant à <a href="/events/${details.event_id}">${details.event_name}</a>`,
								sw: `Imeongezwa kwa kujisajili kwa <a href="/events/${details.event_id}">${details.event_name}</a>`,
								th: `เพิ่มโดยการลงทะเบียนสำหรับ <a href="/events/${details.event_id}">${details.event_name}</a>`,
								zh: `通过注册<a href="/events/${details.event_id}">${details.event_name}</a>添加`
							});
						}
						case 'import': {
							return t(locale, {
								en: 'Added via import',
								ja: 'インポートにより追加',
								pt: 'Adicionado via importação',
								es: 'Añadido vía importación',
								fr: 'Ajouté via importation',
								sw: 'Imeongezwa kupitia uagizaji',
								th: 'เพิ่มผ่านการนำเข้า',
								zh: '通过导入添加'
							});
						}
						case 'manual': {
							return t(locale, {
								en: `Added manually`,
								ja: `手動で追加`,
								pt: `Adicionado manualmente`,
								es: `Añadido manualmente`,
								fr: `Ajouté manuellement`,
								sw: `Imeongezwa kwa mkono`,
								th: `เพิ่มด้วยตนเอง`,
								zh: `手动添加`
							});
						}
						default: {
							return t(locale, {
								en: `Added (details unknown)`,
								ja: `追加 (詳細不明)`,
								pt: `Adicionado (detalhes desconhecidos)`,
								es: `Añadido (detalles desconocidos)`,
								fr: `Ajouté (détails inconnus)`,
								sw: `Imeongezwa (maelezo hayajulikani)`,
								th: `เพิ่ม (รายละเอียดที่ไม่ทราบ)`,
								zh: `添加（详细信息未知）`
							});
						}
					}
				},
				joined: (details: PersonJoinedType) => {
					switch (details.method) {
						case 'petition_signature': {
							return t(locale, {
								en: `Joined by signing <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								ja: `<a href="/petitions/${details.petition_id}">${details.petition_name}</a>に署名することで参加`,
								pt: `Juntou-se ao assinar <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								es: `Unido firmando <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								fr: `Rejoint en signant <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								sw: `Amejiunga kwa kusaini <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								th: `เข้าร่วมโดยการลงชื่อ <a href="/petitions/${details.petition_id}">${details.petition_name}</a>`,
								zh: `通过签署<a href="/petitions/${details.petition_id}">${details.petition_name}</a>加入`
							});
						}
						case 'event_registration': {
							return t(locale, {
								en: `Joined by registering for <a href="/events/${details.event_id}">${details.event_name}</a>`,
								ja: `<a href="/events/${details.event_id}">${details.event_name}</a>に登録することで参加`,
								pt: `Juntou-se ao se registrar para <a href="/events/${details.event_id}">${details.event_name}</a>`,
								es: `Unido al registrarse para <a href="/events/${details.event_id}">${details.event_name}</a>`,
								fr: `Rejoint en s'inscrivant à <a href="/events/${details.event_id}">${details.event_name}</a>`,
								sw: `Amejiunga kwa kujisajili kwa <a href="/events/${details.event_id}">${details.event_name}</a>`,
								th: `เข้าร่วมโดยการลงทะเบียนสำหรับ <a href="/events/${details.event_id}">${details.event_name}</a>`,
								zh: `通过注册<a href="/events/${details.event_id}">${details.event_name}</a>加入`
							});
						}
						case 'other': {
							return t(locale, {
								en: `Joined by another method`,
								ja: `他の方法で参加`,
								pt: `Juntou-se por outro método`,
								es: `Unido por otro método`,
								fr: `Rejoint par un autre moyen`,
								sw: `Amejiunga kwa njia nyingine`,
								th: `เข้าร่วมโดยวิธีอื่น`,
								zh: `通过其他方法加入`
							});
						}
					}
				},
				user_details_updated: (
					method: 'manual' | 'petition_signature' | 'website_signup' | 'event_registration'
				) => {
					switch (method) {
						case 'manual': {
							return t(locale, {
								en: `Updated manually`,
								ja: `手動で更新`,
								pt: `Atualizado manualmente`,
								es: `Actualizado manualmente`,
								fr: `Mis à jour manuellement`,
								sw: `Imesasishwa kwa mkono`,
								th: `อัปเดตด้วยตนเอง`,
								zh: `手动更新`
							});
						}
						case 'petition_signature': {
							return t(locale, {
								en: `Updated by signing a petition`,
								ja: `署名により更新`,
								pt: `Atualizado ao assinar uma petição`,
								es: `Actualizado al firmar una petición`,
								fr: `Mis à jour en signant une pétition`,
								sw: `Imesasishwa kwa kusaini ombi`,
								th: `อัปเดตโดยการลงชื่อ`,
								zh: `通过签署请愿书更新`
							});
						}
						case 'website_signup': {
							return t(locale, {
								en: `Updated by signing up on the website`,
								ja: `ウェブサイトでのサインアップにより更新`,
								pt: `Atualizado ao se inscrever no site`,
								es: `Actualizado al registrarse en el sitio web`,
								fr: `Mis à jour en s'inscrivant sur le site web`,
								sw: `Imesasishwa kwa kujisajili kwenye wavuti`,
								th: `อัปเดตโดยการลงทะเบียนในเว็บไซต์`,
								zh: `通过在网站上注册更新`
							});
						}
						case 'event_registration': {
							return t(locale, {
								en: `Updated by signing up for an event`,
								ja: `イベントへのサインアップにより更新`,
								pt: `Atualizado ao se inscrever para um evento`,
								es: `Actualizado al registrarse para un evento`,
								fr: `Mis à jour en s'inscrivant à un événement`,
								sw: `Imesasishwa kwa kujisajili kwa tukio`,
								th: `อัปเดตโดยการลงทะเบียนเข้าร่วมกิจกรรม`,
								zh: `通过注册参加活动更新`
							});
						}
					}
				},
				signed_petition: (petitionId: number, petitionName: string) => {
					return t(locale, {
						en: `Signed <a href="/petitions/${petitionId}">${petitionName}</a>`,
						ja: `<a href="/petitions/${petitionId}">${petitionName}</a>に署名`,
						pt: `Assinou <a href="/petitions/${petitionId}">${petitionName}</a>`,
						es: `Firmó <a href="/petitions/${petitionId}">${petitionName}</a>`,
						fr: `Signé <a href="/petitions/${petitionId}">${petitionName}</a>`,
						sw: `Alisaini <a href="/petitions/${petitionId}">${petitionName}</a>`,
						th: `ลงชื่อ <a href="/petitions/${petitionId}">${petitionName}</a>`,
						zh: `签署了<a href="/petitions/${petitionId}">${petitionName}</a>`
					});
				},
				registered_for_event: (eventId: number, eventName: string) => {
					return t(locale, {
						en: `Registered for <a href="/events/${eventId}">${eventName}</a>`,
						ja: `<a href="/events/${eventId}">${eventName}</a>に登録`,
						pt: `Registrado para <a href="/events/${eventId}">${eventName}</a>`,
						es: `Registrado para <a href="/events/${eventId}">${eventName}</a>`,
						fr: `Inscrit à <a href="/events/${eventId}">${eventName}</a>`,
						sw: `Amejisajili kwa <a href="/events/${eventId}">${eventName}</a>`,
						th: `ลงทะเบียนเข้าร่วม <a href="/events/${eventId}">${eventName}</a>`,
						zh: `注册参加<a href="/events/${eventId}">${eventName}</a>`
					});
				},
				attended_event: (eventId: number, eventName: string) => {
					return t(locale, {
						en: `Attended <a href="/events/${eventId}">${eventName}</a>`,
						ja: `<a href="/events/${eventId}">${eventName}</a>に参加`,
						pt: `Compareceu a <a href="/events/${eventId}">${eventName}</a>`,
						es: `Asistió a <a href="/events/${eventId}">${eventName}</a>`,
						fr: `A assisté à <a href="/events/${eventId}">${eventName}</a>`,
						sw: `Alhudhuria <a href="/events/${eventId}">${eventName}</a>`,
						th: `เข้าร่วม <a href="/events/${eventId}">${eventName}</a>`,
						zh: `参加了<a href="/events/${eventId}">${eventName}</a>`
					});
				},
				noshow_event: (eventId: number, eventName: string) => {
					return t(locale, {
						en: `Did not show up for <a href="/events/${eventId}">${eventName}</a>`,
						ja: `<a href="/events/${eventId}">${eventName}</a>に現れなかった`,
						pt: `Não compareceu a <a href="/events/${eventId}">${eventName}</a>`,
						es: `No se presentó a <a href="/events/${eventId}">${eventName}</a>`,
						fr: `N'a pas assisté à <a href="/events/${eventId}">${eventName}</a>`,
						sw: `Hakutokea kwa <a href="/events/${eventId}">${eventName}</a>`,
						th: `ไม่ไปเข้าร่วม <a href="/events/${eventId}">${eventName}</a>`,
						zh: `没有出现在<a href="/events/${eventId}">${eventName}</a>`
					});
				},
				cancelled_event_registration: (eventId: number, eventName: string) => {
					return t(locale, {
						en: `Cancelled registration for <a href="/events/${eventId}">${eventName}</a>`,
						ja: `<a href="/events/${eventId}">${eventName}</a>の登録をキャンセル`,
						pt: `Cancelou a inscrição para <a href="/events/${eventId}">${eventName}</a>`,
						es: `Canceló la inscripción para <a href="/events/${eventId}">${eventName}</a>`,
						fr: `A annulé son inscription à <a href="/events/${eventId}">${eventName}</a>`,
						sw: `Amebatilisha usajili wa <a href="/events/${eventId}">${eventName}</a>`,
						th: `ยกเลิกการลงทะเบียนเข้าร่วม <a href="/events/${eventId}">${eventName}</a>`,
						zh: `取消了<a href="/events/${eventId}">${eventName}</a>的注册`
					});
				},
				received_event_followup_email: (eventId: number, eventName: string, messageId: number) => {
					return t(locale, {
						en: `Received <a href="/communications/email/messages/${messageId}">follow-up email</a> for <a href="/events/${eventId}">${eventName}</a>`,
						ja: `<a href="/events/${eventId}">${eventName}</a>の<a href="/communications/email/messages/${messageId}">フォローアップメール</a>を受信`,
						pt: `Recebeu <a href="/communications/email/messages/${messageId}">e-mail de acompanhamento</a> para <a href="/events/${eventId}">${eventName}</a>`,
						es: `Recibió <a href="/communications/email/messages/${messageId}">correo electrónico de seguimiento</a> para <a href="/events/${eventId}">${eventName}</a>`,
						fr: `A reçu <a href="/communications/email/messages/${messageId}">un e-mail de suivi</a> pour <a href="/events/${eventId}">${eventName}</a>`,
						sw: `Imepokea <a href="/communications/email/messages/${messageId}">barua pepe ya kufuatilia</a> kwa <a href="/events/${eventId}">${eventName}</a>`,
						th: `ได้รับ<a href="/communications/email/messages/${messageId}">อีเมลติดตาม</a>สำหรับ<a href="/events/${eventId}">${eventName}</a>`,
						zh: `收到<a href="/communications/email/messages/${messageId}">后续电子邮件</a>用于<a href="/events/${eventId}">${eventName}</a>`
					});
				},
				received_event_reminder_email: (eventId: number, eventName: string, messageId: number) => {
					return t(locale, {
						en: `Received <a href="/communications/email/messages/${messageId}">reminder email</a> for <a href="/events/${eventId}">${eventName}</a>`,
						ja: `<a href="/events/${eventId}">${eventName}</a>の<a href="/communications/email/messages/${messageId}">リマインダーメール</a>を受信`,
						pt: `Recebeu <a href="/communications/email/messages/${messageId}">e-mail de lembrete</a> para <a href="/events/${eventId}">${eventName}</a>`,
						es: `Recibió <a href="/communications/email/messages/${messageId}">correo electrónico de recordatorio</a> para <a href="/events/${eventId}">${eventName}</a>`,
						fr: `A reçu <a href="/communications/email/messages/${messageId}">un e-mail de rappel</a> pour <a href="/events/${eventId}">${eventName}</a>`,
						sw: `Imepokea <a href="/communications/email/messages/${messageId}">barua pepe ya kukumbusha</a> kwa <a href="/events/${eventId}">${eventName}</a>`,
						th: `ได้รับ<a href="/communications/email/messages/${messageId}">อีเมลเตือน</a>สำหรับ<a href="/events/${eventId}">${eventName}</a>`,
						zh: `收到<a href="/communications/email/messages/${messageId}">提醒电子邮件</a>用于<a href="/events/${eventId}">${eventName}</a>`
					});
				},
				received_event_cancellation_email: (
					eventId: number,
					eventName: string,
					messageId: number
				) => {
					return t(locale, {
						en: `Received <a href="/communications/email/messages/${messageId}">cancellation email</a> for <a href="/events/${eventId}">${eventName}</a>`,
						ja: `<a href="/events/${eventId}">${eventName}</a>の<a href="/communications/email/messages/${messageId}">キャンセルメール</a>を受信`,
						pt: `Recebeu <a href="/communications/email/messages/${messageId}">e-mail de cancelamento</a> para <a href="/events/${eventId}">${eventName}</a>`,
						es: `Recibió <a href="/communications/email/messages/${messageId}">correo electrónico de cancelación</a> para <a href="/events/${eventId}">${eventName}</a>`,
						fr: `A reçu <a href="/communications/email/messages/${messageId}">un e-mail d'annulation</a> pour <a href="/events/${eventId}">${eventName}</a>`,
						sw: `Imepokea <a href="/communications/email/messages/${messageId}">barua pepe ya kufuta</a> kwa <a href="/events/${eventId}">${eventName}</a>`,
						th: `ได้รับ<a href="/communications/email/messages/${messageId}">อีเมลยกเลิก</a>สำหรับ<a href="/events/${eventId}">${eventName}</a>`,
						zh: `收到<a href="/communications/email/messages/${messageId}">取消电子邮件</a>用于<a href="/events/${eventId}">${eventName}</a>`
					});
				},
				received_event_registration_email: (
					eventId: number,
					eventName: string,
					messageId: number
				) => {
					return t(locale, {
						en: `Received <a href="/communications/email/messages/${messageId}">registration email</a> for <a href="/events/${eventId}">${eventName}</a>`,
						ja: `<a href="/events/${eventId}">${eventName}</a>の<a href="/communications/email/messages/${messageId}">登録メール</a>を受信`,
						pt: `Recebeu <a href="/communications/email/messages/${messageId}">e-mail de inscrição</a> para <a href="/events/${eventId}">${eventName}</a>`,
						es: `Recibió <a href="/communications/email/messages/${messageId}">correo electrónico de inscripción</a> para <a href="/events/${eventId}">${eventName}</a>`,
						fr: `A reçu <a href="/communications/email/messages/${messageId}">un e-mail d'inscription</a> pour <a href="/events/${eventId}">${eventName}</a>`,
						sw: `Imepokea <a href="/communications/email/messages/${messageId}">barua pepe ya usajili</a> kwa <a href="/events/${eventId}">${eventName}</a>`,
						th: `ได้รับ<a href="/communications/email/messages/${messageId}">อีเมลลงทะเบียน</a>สำหรับ<a href="/events/${eventId}">${eventName}</a>`,
						zh: `收到<a href="/communications/email/messages/${messageId}">注册电子邮件</a>用于<a href="/events/${eventId}">${eventName}</a>`
					});
				},
				received_petition_autoresponse_email: (
					petitionId: number,
					petitionName: string,
					messageId: number
				) => {
					return t(locale, {
						en: `Received <a href="/communications/email/messages/${messageId}">autoresponse email</a> for <a href="/petitions/${petitionId}">${petitionName}</a>`,
						ja: `<a href="/petitions/${petitionId}">${petitionName}</a>の<a href="/communications/email/messages/${messageId}">自動応答メール</a>を受信`,
						pt: `Recebeu <a href="/communications/email/messages/${messageId}">e-mail de autoresposta</a> para <a href="/petitions/${petitionId}">${petitionName}</a>`,
						es: `Recibió <a href="/communications/email/messages/${messageId}">correo electrónico de respuesta automática</a> para <a href="/petitions/${petitionId}">${petitionName}</a>`,
						fr: `A reçu <a href="/communications/email/messages/${messageId}">un e-mail de réponse automatique</a> pour <a href="/petitions/${petitionId}">${petitionName}</a>`,
						sw: `Imepokea <a href="/communications/email/messages/${messageId}">barua pepe ya majibu ya moja kwa moja</a> kwa <a href="/petitions/${petitionId}">${petitionName}</a>`,
						th: `ได้รับ<a href="/communications/email/messages/${messageId}">อีเมลตอบโต้อัตโนมัติ</a>สำหรับ<a href="/petitions/${petitionId}">${petitionName}</a>`,
						zh: `收到<a href="/communications/email/messages/${messageId}">自动回复电子邮件</a>用于<a href="/petitions/${petitionId}">${petitionName}</a>`
					});
				},
				whatsapp_verified: (phoneNumber: string) => {
					return t(locale, {
						en: `Verified WhatsApp number: ${phoneNumber}`,
						ja: `WhatsApp番号を確認済み: ${phoneNumber}`,
						pt: `Número de WhatsApp verificado: ${phoneNumber}`,
						es: `Número de WhatsApp verificado: ${phoneNumber}`,
						fr: `Numéro WhatsApp vérifié: ${phoneNumber}`,
						sw: `Nambari ya WhatsApp ilithibitishwa: ${phoneNumber}`,
						th: `ยืนยันหมายเลข WhatsApp: ${phoneNumber}`,
						zh: `已验证的WhatsApp号码: ${phoneNumber}`
					});
				},
				added_to_list: (listId: number, listName: string) => {
					return t(locale, {
						en: `Added to <a href="/people/lists/${listId}">${listName}</a>`,
						ja: `<a href="/people/lists/${listId}">${listName}</a>に追加`,
						pt: `Adicionado a <a href="/people/lists/${listId}">${listName}</a>`,
						es: `Añadido a <a href="/people/lists/${listId}">${listName}</a>`,
						fr: `Ajouté à <a href="/people/lists/${listId}">${listName}</a>`,
						sw: `Imeongezwa kwa <a href="/people/lists/${listId}">${listName}</a>`,
						th: `เพิ่มใน <a href="/people/lists/${listId}">${listName}</a>`,
						zh: `添加到<a href="/people/lists/${listId}">${listName}</a>`
					});
				},
				removed_from_list: (listId: number, listName: string) => {
					return t(locale, {
						en: `Removed from <a href="/people/lists/${listId}">${listName}</a>`,
						ja: `<a href="/lists/${listId}">${listName}</a>から削除`,
						pt: `Removido de <a href="/people/lists/${listId}">${listName}</a>`,
						es: `Eliminado de <a href="/people/lists/${listId}">${listName}</a>`,
						fr: `Supprimé de <a href="/people/lists/${listId}">${listName}</a>`,
						sw: `Imeondolewa kwenye <a href="/people/lists/${listId}">${listName}</a>`,
						th: `ลบออกจาก <a href="/people/lists/${listId}">${listName}</a>`,
						zh: `从<a href="/people/lists/${listId}">${listName}</a>中删除`
					});
				},
				added_tag: () => {
					return t(locale, {
						en: `Added tag`,
						ja: `タグを追加`,
						pt: `Adicionou uma tag`,
						es: `Añadió una etiqueta`,
						fr: `Ajouté un tag`,
						sw: `Imeongeza lebo`,
						th: `เพิ่มแท็ก`,
						zh: `添加标签`
					});
				},
				removed_tag: () => {
					return t(locale, {
						en: `Removed tag`,
						ja: `タグを削除`,
						pt: `Removeu uma tag`,
						es: `Eliminó una etiqueta`,
						fr: `Supprimé un tag`,
						sw: `Imeondoa lebo`,
						th: `ลบแท็ก`,
						zh: `删除标签`
					});
				},
				added_to_group: (groupId: number, groupName: string) => {
					return t(locale, {
						en: `Added to <a href="/people/groups/${groupId}">${groupName}</a>`,
						ja: `<a href="/people/groups/${groupId}">${groupName}</a>に追加`,
						pt: `Adicionado a <a href="/people/groups/${groupId}">${groupName}</a>`,
						es: `Añadido a <a href="/people/groups/${groupId}">${groupName}</a>`,
						fr: `Ajouté à <a href="/people/groups/${groupId}">${groupName}</a>`,
						sw: `Imeongezwa kwa <a href="/people/groups/${groupId}">${groupName}</a>`,
						th: `เพิ่มใน <a href="/people/groups/${groupId}">${groupName}</a>`,
						zh: `添加到<a href="/people/groups/${groupId}">${groupName}</a>`
					});
				},
				removed_from_group: (groupId: number, groupName: string) => {
					return t(locale, {
						en: `Removed from <a href="/people/groups/${groupId}">${groupName}</a>`,
						ja: `<a href="/people/groups/${groupId}">${groupName}</a>から削除`,
						pt: `Removido de <a href="/people/groups/${groupId}">${groupName}</a>`,
						es: `Eliminado de <a href="/people/groups/${groupId}">${groupName}</a>`,
						fr: `Supprimé de <a href="/people/groups/${groupId}">${groupName}</a>`,
						sw: `Imeondolewa kwenye <a href="/people/groups/${groupId}">${groupName}</a>`,
						th: `ลบออกจาก <a href="/people/groups/${groupId}">${groupName}</a>`,
						zh: `从<a href="/people/groups/${groupId}">${groupName}</a>中删除`
					});
				}
			},
			interactionMessage: {
				notes: (adminName: string) => {
					return t(locale, {
						en: `${adminName} added notes`
					});
				},
				phone_call_inbound: (adminName: string) => {
					return t(locale, {
						en: `${adminName} received a phone call`
					});
				},
				phone_call_outbound: (adminName: string) => {
					return t(locale, {
						en: `${adminName} made a phone call`
					});
				},
				email_outbound: (adminName: string) => {
					return t(locale, {
						en: `${adminName} via email`
					});
				},
				email_inbound: (personName: string) => {
					return t(locale, {
						en: `${personName} via email`
					});
				},
				signed_petition: {
					manual: (adminName: string, petitionName: string, petitionUrl: string) => {
						return t(locale, {
							en: `Signature <a href="${petitionUrl}">${petitionName}</a> to added by ${adminName}`
						});
					},
					self: (personName: string, petitionName: string, petitionUrl: string) => {
						return t(locale, {
							en: `${personName} signed <a href="${petitionUrl}">${petitionName}</a>`
						});
					}
				},
				events: {
					registered: {
						manual: (adminName: string, eventName: string, eventUrl: string) => {
							return t(locale, {
								en: `Registered for <a href=${eventUrl}>${eventName}</a> by ${adminName}`
							});
						},
						self: (personName: string, eventName: string, eventUrl: string) => {
							return t(locale, {
								en: `${personName} registered for <a href=${eventUrl}>${eventName}</a>`
							});
						}
					},
					cancelled: {
						manual: (adminName: string, eventName: string, eventUrl: string) => {
							return t(locale, {
								en: `Registration for <a href=${eventUrl}>${eventName}</a> cancelled by ${adminName}`
							});
						},
						self: (personName: string, eventName: string, eventUrl: string) => {
							return t(locale, {
								en: `${personName} cancelled their registration for <a href=${eventUrl}>${eventName}</a>`
							});
						}
					},
					attended: (personName: string, eventName: string, eventUrl: string) => {
						return t(locale, {
							en: `${personName} attended <a href=${eventUrl}>${eventName}</a>`
						});
					},
					noshow: (adminName: string, eventName: string, eventUrl: string) => {
						return t(locale, {
							en: `Marked as noshow for <a href=${eventUrl}>${eventName}</a> by ${adminName}`
						});
					}
				}
			}
		},
		groups: {
			show_banned: () => {
				return t(locale, {
					en: 'Show banned'
				});
			}
		}
	};
}
