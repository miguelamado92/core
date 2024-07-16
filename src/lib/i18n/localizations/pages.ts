import { returnLocalizationString as t, type SL } from '$lib/i18n/index';

export default function (l: SL) {
	return {
		home: {
			index: () => {
				return t(l, {
					en: 'Home',
					ja: 'トップページ',
					pt: 'Início',
					es: 'Inicio',
					fr: 'Accueil',
					sw: 'Nyumbani',
					th: 'บ้าน',
					zh: '家'
				});
			}
		},
		people: {
			index: () => {
				return t(l, {
					en: 'People',
					ja: '人々',
					pt: 'Pessoas',
					es: 'Gente',
					fr: 'Personnes',
					sw: 'Watu',
					th: 'คน',
					zh: '人'
				});
			},
			new_person: () => {
				return t(l, {
					en: 'New Person',
					ja: '新しい人',
					pt: 'Nova Pessoa',
					es: 'Nueva Persona',
					fr: 'Nouvelle Personne',
					sw: 'Mtu Mpya',
					th: 'คนใหม่',
					zh: '新人'
				});
			},
			view_person: () => {
				return t(l, {
					en: `{PERSONNAME|View person}`,
					ja: `{PERSONNAME|人を表示}`,
					pt: `{PERSONNAME|Ver pessoa}`,
					es: `{PERSONNAME|Ver persona}`,
					fr: `{PERSONNAME|Voir la personne}`,
					sw: `{PERSONNAME|Tazama mtu}`,
					th: `{PERSONNAME|ดูคน}`,
					zh: `{PERSONNAME|查看人}`
				});
			},
			edit_person: () => {
				return t(l, {
					en: 'Edit',
					ja: '人を編集',
					pt: 'Editar Pessoa',
					es: 'Editar Persona',
					fr: 'Modifier la Personne',
					sw: 'Hariri Mtu',
					th: 'แก้ไขคน',
					zh: '编辑人'
				});
			},
			filter: () => {
				return t(l, {
					en: `Filter`,
					ja: 'フィルター',
					pt: 'Filtro',
					es: 'Filtrar',
					fr: 'Filtrer',
					sw: 'Chuja',
					th: 'กรอง',
					zh: '过滤'
				});
			},
			groups: {
				index: () => {
					return t(l, {
						en: `Groups`,
						ja: 'グループ',
						pt: 'Grupos',
						es: 'Grupos',
						fr: 'Groupes',
						sw: 'Vikundi',
						th: 'กลุ่ม',
						zh: '组'
					});
				},
				new: () => {
					return t(l, {
						en: `New Group`,
						ja: '新しいグループ',
						pt: 'Novo Grupo',
						es: 'Nuevo Grupo',
						fr: 'Nouveau Groupe',
						sw: 'Kikundi Kipya',
						th: 'กลุ่มใหม่',
						zh: '新组'
					});
				},
				view: () => {
					return t(l, {
						en: `{GROUPNAME|View group}`,
						ja: `{GROUPNAME|グループを表示}`,
						pt: `{GROUPNAME|Ver grupo}`,
						es: `{GROUPNAME|Ver grupo}`,
						fr: `{GROUPNAME|Voir le groupe}`,
						sw: `{GROUPNAME|Tazama kikundi}`,
						th: `{GROUPNAME|ดูกลุ่ม}`,
						zh: `{GROUPNAME|查看组}`
					});
				},
				edit: () => {
					return t(l, {
						en: `Edit Group`,
						ja: 'グループを編集',
						pt: 'Editar Grupo',
						es: 'Editar Grupo',
						fr: 'Modifier le Groupe',
						sw: 'Hariri Kikundi',
						th: 'แก้ไขกลุ่ม',
						zh: '编辑组'
					});
				}
			},
			lists: {
				index: () => {
					return t(l, {
						en: `Lists`,
						ja: 'リスト',
						pt: 'Listas',
						es: 'Listas',
						fr: 'Listes',
						sw: 'Orodha',
						th: 'รายการ',
						zh: '清单'
					});
				},
				new: () => {
					return t(l, {
						en: `New List`,
						ja: '新しいリスト',
						pt: 'Nova Lista',
						es: 'Nueva Lista',
						fr: 'Nouvelle Liste',
						sw: 'Orodha Mpya',
						th: 'รายการใหม่',
						zh: '新清单'
					});
				},
				view: () => {
					return t(l, {
						en: `{LISTNAME|View list}`,
						ja: `{LISTNAME|リストを表示}`,
						pt: `{LISTNAME|Ver lista}`,
						es: `{LISTNAME|Ver lista}`,
						fr: `{LISTNAME|Voir la liste}`,
						sw: `{LISTNAME|Tazama orodha}`,
						th: `{LISTNAME|ดูรายการ}`,
						zh: `{LISTNAME|查看清单}`
					});
				},
				edit: () => {
					return t(l, {
						en: `Edit List`,
						ja: 'リストを編集',
						pt: 'Editar Lista',
						es: 'Editar Lista',
						fr: 'Modifier la Liste',
						sw: 'Hariri Orodha',
						th: 'แก้ไขรายการ',
						zh: '编辑清单'
					});
				}
			}
		},
		communications: {
			index: () => {
				return t(l, {
					en: 'Communications',
					ja: '通信',
					pt: 'Comunicações',
					es: 'Comunicaciones',
					fr: 'Communications',
					sw: 'Mawasiliano',
					th: 'การสื่อสาร',
					zh: '通讯'
				});
			},
			whatsapp: () => {
				return t(l, {
					en: `WhatsApp`,
					ja: 'WhatsApp',
					pt: 'WhatsApp',
					es: 'WhatsApp',
					fr: 'WhatsApp',
					sw: 'WhatsApp',
					th: 'WhatsApp',
					zh: 'WhatsApp'
				});
			},
			email: {
				index: () => {
					return t(l, {
						en: `Email`,
						ja: 'Eメール',
						pt: 'E-mail',
						es: 'Correo Electrónico',
						fr: 'Email',
						sw: 'Barua Pepe',
						th: 'อีเมล',
						zh: '电子邮件'
					});
				},
				new: () => {
					return t(l, {
						en: `New Email`,
						ja: '新しいEメール',
						pt: 'Novo E-mail',
						es: 'Nuevo Correo Electrónico',
						fr: 'Nouveau Email',
						sw: 'Barua Pepe Mpya',
						th: 'อีเมลใหม่',
						zh: '新电子邮件'
					});
				},
				view: () => {
					return t(l, {
						en: 'Email send',
						ja: 'Eメールを送信',
						pt: 'Enviar e-mail',
						es: 'Enviar correo electrónico',
						fr: 'Envoyer un email',
						sw: 'Tuma barua pepe',
						th: 'ส่งอีเมล',
						zh: '发送电子邮件'
					});
				},
				edit: () => {
					return t(l, {
						en: `Edit Email`,
						ja: 'Eメールを編集',
						pt: 'Editar E-mail',
						es: 'Editar Correo Electrónico',
						fr: "Modifier l'Email",
						sw: 'Hariri Barua Pepe',
						th: 'แก้ไขอีเมล',
						zh: '编辑电子邮件'
					});
				}
			},
			sms: () => {
				return t(l, {
					en: `SMS`,
					ja: 'SMS',
					pt: 'SMS',
					es: 'SMS',
					fr: 'SMS',
					sw: 'SMS',
					th: 'SMS',
					zh: 'SMS'
				});
			}
		},
		website: {
			index: () => {
				return t(l, {
					en: 'Website',
					ja: 'ウェブサイト',
					pt: 'Site',
					es: 'Sitio Web',
					fr: 'Site Web',
					sw: 'Tovuti',
					th: 'เว็บไซต์',
					zh: '网站'
				});
			},
			dashboard: () => {
				return t(l, {
					en: `Dashboard`,
					ja: 'ダッシュボード',
					pt: 'Painel',
					es: 'Tablero',
					fr: 'Tableau de Bord',
					sw: 'Dashibodi',
					th: 'แดชบอร์ด',
					zh: '仪表板'
				});
			},
			pages: {
				index: () => {
					return t(l, {
						en: `Pages`,
						ja: 'ページ',
						pt: 'Páginas',
						es: 'Páginas',
						fr: 'Pages',
						sw: 'Kurasa',
						th: 'หน้า',
						zh: '页面'
					});
				},
				new: () => {
					return t(l, {
						en: `New Page`,
						ja: '新しいページ',
						pt: 'Nova Página',
						es: 'Nueva Página',
						fr: 'Nouvelle Page',
						sw: 'Ukurasa Mpya',
						th: 'หน้าใหม่',
						zh: '新页面'
					});
				},
				page_details: () => {
					return t(l, {
						en: `{PAGETITLE|Page details}`,
						ja: `{PAGETITLE|ページの詳細}`,
						pt: `{PAGETITLE|Detalhes da página}`,
						es: `{PAGETITLE|Detalles de la página}`,
						fr: `{PAGETITLE|Détails de la page}`,
						sw: `{PAGETITLE|Taarifa za Ukurasa}`,
						th: `{PAGETITLE|รายละเอียดหน้า}`,
						zh: `{PAGETITLE|页面详情}`
					});
				},
				edit: () => {
					return t(l, {
						en: `Edit Page`,
						ja: 'ページを編集',
						pt: 'Editar Página',
						es: 'Editar Página',
						fr: 'Modifier la Page',
						sw: 'Hariri Ukurasa',
						th: 'แก้ไขหน้า',
						zh: '编辑页面'
					});
				},
				analytics: () => {
					return t(l, {
						en: `Analytics`,
						ja: 'アナリティクス',
						pt: 'Análise',
						es: 'Analítica',
						fr: 'Analytique',
						sw: 'Takwimu',
						th: 'การวิเคราะห์',
						zh: '分析'
					});
				}
			},
			posts: {
				index: () => {
					return t(l, {
						en: `Posts`,
						ja: '投稿',
						pt: 'Postagens',
						es: 'Publicaciones',
						fr: 'Des Postes',
						sw: 'Machapisho',
						th: 'โพสต์',
						zh: '帖子'
					});
				},
				new: () => {
					return t(l, {
						en: `New Post`,
						ja: '新しい投稿',
						pt: 'Nova Postagem',
						es: 'Nueva Publicación',
						fr: 'Nouveau Post',
						sw: 'Chapisho Jipya',
						th: 'โพสต์ใหม่',
						zh: '新帖子'
					});
				},
				post_details: () => {
					return t(l, {
						en: `{POSTTITLE|Post details}`,
						ja: `{POSTTITLE|投稿の詳細}`,
						pt: `{POSTTITLE|Detalhes da postagem}`,
						es: `{POSTTITLE|Detalles de la publicación}`,
						fr: `{POSTTITLE|Détails du post}`,
						sw: `{POSTTITLE|Taarifa za Chapisho}`,
						th: `{POSTTITLE|รายละเอียดโพสต์}`,
						zh: `{POSTTITLE|帖子详情}`
					});
				},
				edit: () => {
					return t(l, {
						en: `Edit`,
						ja: '編集',
						pt: 'Editar',
						es: 'Editar',
						fr: 'Modifier',
						sw: 'Hariri',
						th: 'แก้ไข',
						zh: '编辑'
					});
				},
				analytics: () => {
					return t(l, {
						en: `Analytics`,
						ja: 'アナリティクス',
						pt: 'Análise',
						es: 'Analítica',
						fr: 'Analytique',
						sw: 'Takwimu',
						th: 'การวิเคราะห์',
						zh: '分析'
					});
				}
			},
			uploads: () => {
				return t(l, {
					en: `Uploads`,
					ja: 'アップロード',
					pt: 'Carregamentos',
					es: 'Cargas',
					fr: 'Téléchargements',
					sw: 'Upakiaji',
					th: 'อัปโหลด',
					zh: '上传'
				});
			}
		},
		events: {
			index: () => {
				return t(l, {
					en: 'Events',
					ja: 'イベント',
					pt: 'Eventos',
					es: 'Eventos',
					fr: 'Événements',
					sw: 'Matukio',
					th: 'เหตุการณ์',
					zh: '事件'
				});
			},
			dashboard: () => {
				return t(l, {
					en: `Dashboard`,
					ja: 'ダッシュボード',
					pt: 'Painel',
					es: 'Tablero',
					fr: 'Tableau de Bord',
					sw: 'Dashibodi',
					th: 'แดชบอร์ด',
					zh: '仪表板'
				});
			},
			my_events: () => {
				return t(l, {
					en: `My Events`,
					ja: '私のイベント',
					pt: 'Meus Eventos',
					es: 'Mis Eventos',
					fr: 'Mes Événements',
					sw: 'Matukio Yangu',
					th: 'กิจกรรมของฉัน',
					zh: '我的事件'
				});
			},
			upcoming: () => {
				return t(l, {
					en: 'Upcoming Events',
					ja: '今後のイベント',
					pt: 'Próximos Eventos',
					es: 'Próximos Eventos',
					fr: 'Événements à Venir',
					sw: 'Matukio Yanayokuja',
					th: 'กิจกรรมที่จะมาถึง',
					zh: '即将到来的事件'
				});
			},
			past_events: () => {
				return t(l, {
					en: 'Past Events',
					ja: '過去のイベント',
					pt: 'Eventos Passados',
					es: 'Eventos Pasados',
					fr: 'Événements Passés',
					sw: 'Matukio Yaliyopita',
					th: 'กิจกรรมที่ผ่านมา',
					zh: '过去的事件'
				});
			},
			all_events: () => {
				return t(l, {
					en: 'All Events',
					ja: 'すべてのイベント',
					pt: 'Todos os Eventos',
					es: 'Todos los Eventos',
					fr: 'Tous les Événements',
					sw: 'Matukio Yote',
					th: 'กิจกรรมทั้งหมด',
					zh: '所有事件'
				});
			},
			events_calendar: () => {
				return t(l, {
					en: 'Events Calendar',
					ja: 'イベントカレンダー',
					pt: 'Calendário de Eventos',
					es: 'Calendario de Eventos',
					fr: 'Calendrier des Événements',
					sw: 'Kalenda ya Matukio',
					th: 'ปฏิทินกิจกรรม',
					zh: '事件日历'
				});
			},
			events_map: () => {
				return t(l, {
					en: 'Events Map',
					ja: 'イベントマップ',
					pt: 'Mapa de Eventos',
					es: 'Mapa de Eventos',
					fr: 'Carte des Événements',
					sw: 'Ramani ya Matukio',
					th: 'แผนที่กิจกรรม',
					zh: '事件地图'
				});
			},
			new_event: () => {
				return t(l, {
					en: 'New Event',
					ja: '新しいイベント',
					pt: 'Novo Evento',
					es: 'Nuevo Evento',
					fr: 'Nouvel Événement',
					sw: 'Matukio Mapya',
					th: 'กิจกรรมใหม่',
					zh: '新事件'
				});
			},
			event_details: () => {
				return t(l, {
					en: '{EVENTNAME|Event details}',
					ja: '{EVENTNAME|イベントの詳細}',
					pt: '{EVENTNAME|Detalhes do evento}',
					es: '{EVENTNAME|Detalles del evento}',
					fr: "{EVENTNAME|Détails de l'événement}",
					sw: '{EVENTNAME|Taarifa za Matukio}',
					th: '{EVENTNAME|รายละเอียดกิจกรรม}',
					zh: '{EVENTNAME|事件详情}'
				});
			},
			edit_event: () => {
				return t(l, {
					en: 'Edit Event',
					ja: 'イベントを編集',
					pt: 'Editar Evento',
					es: 'Editar Evento',
					fr: "Modifier l'Événement",
					sw: 'Hariri Matukio',
					th: 'แก้ไขกิจกรรม',
					zh: '编辑事件'
				});
			},
			attendees: () => {
				return t(l, {
					en: 'Attendees',
					ja: '参加者',
					pt: 'Participantes',
					es: 'Asistentes',
					fr: 'Participants',
					sw: 'Washiriki',
					th: 'ผู้เข้าร่วม',
					zh: '参与者'
				});
			},
			register_attendees: () => {
				return t(l, {
					en: 'Register Attendees',
					ja: '参加者を登録',
					pt: 'Registrar Participantes',
					es: 'Registrar Asistentes',
					fr: 'Enregistrer les Participants',
					sw: 'Jisajili Washiriki',
					th: 'ลงทะเบียนผู้เข้าร่วม',
					zh: '注册参与者'
				});
			}
		},
		actions: {
			index: () => {
				return t(l, {
					en: 'Actions',
					ja: 'アクション',
					pt: 'Ações',
					es: 'Acciones',
					fr: 'Actions',
					sw: 'Vitendo',
					th: 'การกระทำ',
					zh: '行动'
				});
			},
			dashboard: () => {
				return t(l, {
					en: `Dashboard`,
					ja: 'ダッシュボード',
					pt: 'Painel',
					es: 'Tablero',
					fr: 'Tableau de Bord',
					sw: 'Dashibodi',
					th: 'แดชบอร์ด',
					zh: '仪表板'
				});
			},
			petitions: {
				index: () => {
					return t(l, {
						en: `Petitions`,
						ja: '請願',
						pt: 'Petições',
						es: 'Peticiones',
						fr: 'Pétitions',
						sw: 'Maombi',
						th: 'คำร้อง',
						zh: '请愿'
					});
				},
				new: () => {
					return t(l, {
						en: `New Petition`,
						ja: '新しい請願',
						pt: 'Nova Petição',
						es: 'Nueva Petición',
						fr: 'Nouvelle Pétition',
						sw: 'Maombi Mapya',
						th: 'คำร้องใหม่',
						zh: '新请愿'
					});
				},
				view: () => {
					return t(l, {
						en: `{PETITIONTITLE|View petition}`,
						ja: `{PETITIONTITLE|請願を表示}`,
						pt: `{PETITIONTITLE|Ver petição}`,
						es: `{PETITIONTITLE|Ver petición}`,
						fr: `{PETITIONTITLE|Voir la pétition}`,
						sw: `{PETITIONTITLE|Tazama maombi}`,
						th: `{PETITIONTITLE|ดูคำร้อง}`,
						zh: `{PETITIONTITLE|查看请愿}`
					});
				},
				signatures: () => {
					return t(l, {
						en: `Signatures`,
						ja: '署名',
						pt: 'Assinaturas',
						es: 'Firmas',
						fr: 'Signatures',
						sw: 'Saini',
						th: 'ลายเซ็น',
						zh: '签名'
					});
				},
				edit: () => {
					return t(l, {
						en: `Edit Petition`,
						ja: '請願を編集',
						pt: 'Editar Petição',
						es: 'Editar Petición',
						fr: 'Modifier la Pétition',
						sw: 'Hariri Maombi',
						th: 'แก้ไขคำร้อง',
						zh: '编辑请愿'
					});
				}
			},
			surveys: () => {
				return t(l, {
					en: `Surveys`,
					ja: '調査',
					pt: 'Pesquisas',
					es: 'Encuestas',
					fr: 'Sondages',
					sw: 'Utafiti',
					th: 'สำรวจ',
					zh: '调查'
				});
			},
			fundraising: () => {
				return t(l, {
					en: `Fundraising`,
					ja: '資金調達',
					pt: 'Captação de Recursos',
					es: 'Recaudación de Fondos',
					fr: 'Collecte de Fonds',
					sw: 'Uchangishaji wa Fedha',
					th: 'ระดมทุน',
					zh: '筹款'
				});
			},
			contact_campaigns: () => {
				return t(l, {
					en: `Contact Campaigns`,
					ja: '連絡キャンペーン',
					pt: 'Campanhas de Contato',
					es: 'Campañas de Contacto',
					fr: 'Campagnes de Contact',
					sw: 'Kampeni za Mawasiliano',
					th: 'แคมเปญติดต่อ',
					zh: '联系活动'
				});
			}
		},
		tasks: {
			index: () => {
				return t(l, {
					en: 'Tasks',
					ja: 'タスク',
					pt: 'Tarefas',
					es: 'Tareas',
					fr: 'Tâches',
					sw: 'Kazi',
					th: 'งาน',
					zh: '任务'
				});
			},
			new: () => {
				return t(l, {
					en: 'New Task',
					ja: '新しいタスク',
					pt: 'Nova Tarefa',
					es: 'Nueva Tarea',
					fr: 'Nouvelle Tâche',
					sw: 'Kazi Mpya',
					th: 'งานใหม่',
					zh: '新任务'
				});
			}
		},
		config: {
			settings: {
				index: () => {
					return t(l, {
						en: 'Settings',
						ja: '設定',
						pt: 'Configurações',
						es: 'Configuraciones',
						fr: 'Paramètres',
						sw: 'Vipimo',
						th: 'การตั้งค่า',
						zh: '设置'
					});
				},
				admins: {
					index: () => {
						return t(l, {
							en: 'Admins',
							ja: '管理者',
							pt: 'Administradores',
							es: 'Administradores',
							fr: 'Administrateurs',
							sw: 'Waadmin',
							th: 'ผู้ดูแลระบบ',
							zh: '管理员'
						});
					},
					new: () => {
						return t(l, {
							en: 'New Admin',
							ja: '新しい管理者',
							pt: 'Novo Administrador',
							es: 'Nuevo Administrador',
							fr: 'Nouvel Administrateur',
							sw: 'Mwadmin Mpya',
							th: 'ผู้ดูแลระบบใหม่',
							zh: '新管理员'
						});
					},
					edit: () => {
						return t(l, {
							en: 'Edit Admin',
							ja: '管理者を編集',
							pt: 'Editar Administrador',
							es: 'Editar Administrador',
							fr: "Modifier l'Administrateur",
							sw: 'Hariri Waadmin',
							th: 'แก้ไขผู้ดูแลระบบ',
							zh: '编辑管理员'
						});
					}
				},
				communications: {
					index: () => {
						return t(l, {
							en: 'Communications',
							ja: '通信設定',
							pt: 'Comunicação',
							es: 'Comunicaciones',
							fr: 'Communication',
							sw: 'Mawasiliano',
							th: 'การสื่อสาร',
							zh: '通信设置'
						});
					},
					email: {
						index: () => {
							return t(l, {
								en: 'Email settings',
								ja: 'メール設定',
								pt: 'Configurações de e-mail',
								es: 'Configuración de correo electrónico',
								fr: 'Paramètres de messagerie',
								sw: 'Vipimo vya barua pepe',
								th: 'การตั้งค่าอีเมล',
								zh: '电子邮件设置'
							});
						},
						templates: {
							index: () => {
								return t(l, {
									en: 'Email templates',
									ja: 'メールテンプレート',
									pt: 'Modelos de e-mail',
									es: 'Plantillas de correo electrónico',
									fr: 'Modèles de messagerie',
									sw: 'Mifano ya barua pepe',
									th: 'เทมเพลตอีเมล',
									zh: '电子邮件模板'
								});
							},
							new: () => {
								return t(l, {
									en: 'New email template',
									ja: '新しいメールテンプレート',
									pt: 'Novo modelo de e-mail',
									es: 'Nueva plantilla de correo electrónico',
									fr: 'Nouveau modèle de messagerie',
									sw: 'Mfano mpya wa barua pepe',
									th: 'เทมเพลตอีเมลใหม่',
									zh: '新电子邮件模板'
								});
							},
							edit: () => {
								return t(l, {
									en: 'Edit email template',
									ja: 'メールテンプレートを編集',
									pt: 'Editar modelo de e-mail',
									es: 'Editar plantilla de correo electrónico',
									fr: 'Modifier le modèle de messagerie',
									sw: 'Hariri mfano wa barua pepe',
									th: 'แก้ไขเทมเพลตอีเมล',
									zh: '编辑电子邮件模板'
								});
							}
						}
					}
				},
				website: {
					index: () => {
						return t(l, {
							en: 'Website',
							ja: 'ウェブサイト',
							pt: 'Site',
							es: 'Sitio web',
							fr: 'Site Web',
							sw: 'Tovuti',
							th: 'เว็บไซต์',
							zh: '网站设置'
						});
					},
					templates: {
						index: () => {
							return t(l, {
								en: 'Templates',
								ja: 'テンプレート',
								pt: 'Modelos',
								es: 'Plantillas',
								fr: 'Modèles',
								sw: 'Mifano',
								th: 'เทมเพลต',
								zh: '模板'
							});
						},
						new: () => {
							return t(l, {
								en: 'New template',
								ja: '新しいテンプレート',
								pt: 'Novo modelo',
								es: 'Nueva plantilla',
								fr: 'Nouveau modèle',
								sw: 'Mfano mpya',
								th: 'เทมเพลตใหม่',
								zh: '新模板'
							});
						},
						edit: () => {
							return t(l, {
								en: 'Edit template',
								ja: 'テンプレートを編集',
								pt: 'Editar modelo',
								es: 'Editar plantilla',
								fr: 'Modifier le modèle',
								sw: 'Hariri mfano',
								th: 'แก้ไขเทมเพลต',
								zh: '编辑模板'
							});
						}
					},
					blocks: {
						index: () => {
							return t(l, {
								en: 'Blocks',
								ja: 'ブロック',
								pt: 'Blocos',
								es: 'Bloques',
								fr: 'Blocs',
								sw: 'Vipande',
								th: 'บล็อก',
								zh: '块'
							});
						},
						new: () => {
							return t(l, {
								en: 'New block',
								ja: '新しいブロック',
								pt: 'Novo bloco',
								es: 'Nuevo bloque',
								fr: 'Nouveau bloc',
								sw: 'Kipande kipya',
								th: 'บล็อกใหม่',
								zh: '新块'
							});
						},
						edit: () => {
							return t(l, {
								en: 'Edit block',
								ja: 'ブロックを編集',
								pt: 'Editar bloco',
								es: 'Editar bloque',
								fr: 'Modifier le bloc',
								sw: 'Hariri kipande',
								th: 'แก้ไขบล็อก',
								zh: '编辑块'
							});
						}
					}
				},
				tags: {
					index: () => {
						return t(l, {
							en: 'Tags',
							ja: 'タグ',
							pt: 'Tags',
							es: 'Etiquetas',
							fr: 'Balises',
							sw: 'Lebo',
							th: 'แท็ก',
							zh: '标签'
						});
					},
					edit: () => {
						return t(l, {
							en: 'Edit Tag',
							ja: 'タグを編集',
							pt: 'Editar Tag',
							es: 'Editar Etiqueta',
							fr: 'Modifier la Balise',
							sw: 'Hariri Lebo',
							th: 'แก้ไขแท็ก',
							zh: '编辑标签'
						});
					},
					new: () => {
						return t(l, {
							en: 'New Tag',
							ja: '新しいタグ',
							pt: 'Nova Tag',
							es: 'Nueva Etiqueta',
							fr: 'Nouvelle Balise',
							sw: 'Lebo Mpya',
							th: 'แท็กใหม่',
							zh: '新标签'
						});
					}
				}
			},
			preferences: () => {
				return t(l, {
					en: 'Preferences',
					ja: '設定',
					pt: 'Preferências',
					es: 'Preferencias',
					fr: 'Préférences',
					sw: 'Mapendeleo',
					th: 'ความชอบ',
					zh: '偏好'
				});
			}
		},
		auth: {
			login: () => {
				return t(l, {
					en: 'Login',
					ja: 'ログイン',
					pt: 'Entrar',
					es: 'Iniciar Sesión',
					fr: 'Connexion',
					sw: 'Ingia',
					th: 'เข้าสู่ระบบ',
					zh: '登录'
				});
			},
			signup: () => {
				return t(l, {
					en: 'Signup',
					ja: 'サインアップ',
					pt: 'Inscrever-se',
					es: 'Regístrate',
					fr: "S'inscrire",
					sw: 'Jiandikishe',
					th: 'ลงชื่อ',
					zh: '注册'
				});
			},
			logout: () => {
				return t(l, {
					en: 'Logout',
					ja: 'ログアウト',
					pt: 'Sair',
					es: 'Cerrar Sesión',
					fr: 'Déconnexion',
					sw: 'Toka',
					th: 'ออกจากระบบ',
					zh: '登出'
				});
			}
		}
	};
}
