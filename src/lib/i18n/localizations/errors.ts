import { returnLocalizationString as t, type SL } from '$lib/i18n/index';

export default function (locale: SL) {
	return {
		unique_violation: () => {
			return t(locale, {
				en: `This value must be unique. Please choose a unique value and try again`,
				ja: 'この値は一意でなければなりません。一意の値を選択してもう一度やり直してください',
				pt: 'Este valor deve ser único. Por favor, escolha um valor único e tente novamente',
				es: 'Este valor debe ser único. Por favor, elija un valor único e inténtelo de nuevo',
				fr: 'Cette valeur doit être unique. Veuillez choisir une valeur unique et réessayer',
				sw: 'Thamani hii lazima iwe ya kipekee. Tafadhali chagua thamani ya kipekee na ujaribu tena',
				th: 'ค่านี้ต้องเป็นค่าที่ไม่ซ้ำกัน โปรดเลือกค่าที่ไม่ซ้ำกันและลองอีกครั้ง',
				zh: '此值必须是唯一的。 请选择唯一值并重试'
			});
		},
		not_found: () => {
			return t(locale, {
				en: `The requested resource was not found.`,
				ja: '要求されたリソースが見つかりませんでした。',
				pt: 'O recurso solicitado não foi encontrado.',
				es: 'No se encontró el recurso solicitado.',
				fr: 'La ressource demandée est introuvable.',
				sw: 'Rasilimali iliyoombwa haikupatikana.',
				th: 'ไม่พบทรัพยากรที่ร้องขอ',
				zh: '找不到请求的资源。'
			});
		},
		sign_in: () => {
			return t(locale, {
				en: 'Unable to sign in. Please check the details and try again.',
				ja: 'サインインできません。詳細を確認してもう一度やり直してください。',
				pt: 'Não é possível fazer login. Verifique os detalhes e tente novamente.',
				es: 'No se puede iniciar sesión. Verifique los detalles e inténtelo de nuevo.',
				fr: 'Impossible de se connecter. Veuillez vérifier les détails et réessayer.',
				sw: 'Haiwezekani kuingia. Tafadhali angalia maelezo na ujaribu tena.',
				th: 'ไม่สามารถเข้าสู่ระบบ โปรดตรวจสอบรายละเอียดและลองอีกครั้ง',
				zh: '无法登录。 请检查详细信息并重试。'
			});
		},
		authorization: () => {
			return t(locale, {
				en: "You don't have permission to perform this action.",
				ja: 'この操作を実行する権限がありません。',
				pt: 'Você não tem permissão para realizar esta ação.',
				es: 'No tienes permiso para realizar esta acción.',
				fr: "Vous n'avez pas la permission d'effectuer cette action.",
				sw: 'Huna ruhusa ya kufanya kitendo hiki.',
				th: 'คุณไม่มีสิทธิ์ในการดำเนินการนี้',
				zh: '您无权执行此操作。'
			});
		},
		not_found_variants: {
			person: () => {
				return t(locale, {
					en: `The requested person was not found.`,
					ja: '要求された人物は見つかりませんでした。',
					pt: 'A pessoa solicitada não foi encontrada.',
					es: 'La persona solicitada no fue encontrada.',
					fr: 'La personne demandée est introuvable.',
					sw: 'Mtu aliyeombwa hakuonekana.',
					th: 'ไม่พบบุคคลที่ร้องขอ',
					zh: '找不到请求的人。'
				});
			},
			list: () => {
				return t(locale, {
					en: `The requested list was not found.`,
					ja: '要求されたリストが見つかりませんでした。',
					pt: 'A lista solicitada não foi encontrada.',
					es: 'La lista solicitada no fue encontrada.',
					fr: 'La liste demandée est introuvable.',
					sw: 'Orodha iliyoombwa haikupatikana.',
					th: 'ไม่พบรายการที่ร้องขอ',
					zh: '找不到请求的列表。'
				});
			}
		},

		creating_data: () => {
			return t(locale, {
				en: `An error occured while creating the data. Please try again.`,
				ja: 'データの作成中にエラーが発生しました。もう一度やり直してください。',
				pt: 'Ocorreu um erro ao criar os dados. Por favor, tente novamente.',
				es: 'Se ha producido un error al crear los datos. Por favor, inténtelo de nuevo.',
				fr: "Une erreur s'est produite lors de la création des données. Veuillez réessayer.",
				sw: 'Kumetokea kosa wakati wa kuunda data. Tafadhali jaribu tena.',
				th: 'เกิดข้อผิดพลาดขณะสร้างข้อมูล โปรดลองอีกครั้ง',
				zh: '创建数据时发生错误。 请重试。'
			});
		},
		updating_data: () => {
			return t(locale, {
				en: `An error occurred while updating the data. Please try again.`,
				ja: 'データの更新中にエラーが発生しました。もう一度やり直してください。',
				pt: 'Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.',
				es: 'Se ha producido un error al actualizar los datos. Por favor, inténtelo de nuevo.',
				fr: "Une erreur s'est produite lors de la mise à jour des données. Veuillez réessayer.",
				sw: 'Kumetokea kosa wakati wa kusasisha data. Tafadhali jaribu tena.',
				th: 'เกิดข้อผิดพลาดขณะอัปเดตข้อมูล โปรดลองอีกครั้ง',
				zh: '更新数据时发生错误。 请重试。'
			});
		},
		generic: () => {
			return t(locale, {
				en: `An error occurred. Please try again.`,
				ja: 'エラーが発生しました。もう一度やり直してください。',
				pt: 'Ocorreu um erro. Por favor, tente novamente.',
				es: 'Se ha producido un error. Por favor, inténtelo de nuevo.',
				fr: "Une erreur s'est produite. Veuillez réessayer.",
				sw: 'Kumetokea kosa. Tafadhali jaribu tena.',
				th: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
				zh: '发生了错误。 请重试。'
			});
		},
		validation: () => {
			return t(locale, {
				en: `The information provided is not invalid. Please check the values and try again.`,
				ja: '提供された情報は無効です。値を確認してもう一度やり直してください。',
				pt: 'As informações fornecidas são inválidas. Verifique os valores e tente novamente.',
				es: 'La información proporcionada no es válida. Por favor, verifique los valores e inténtelo de nuevo.',
				fr: 'Les informations fournies ne sont pas valides. Veuillez vérifier les valeurs et réessayer.',
				sw: 'Maelezo yaliyotolewa sio sahihi. Tafadhali angalia thamani na ujaribu tena.',
				th: 'ข้อมูลที่ให้มาไม่ถูกต้อง โปรดตรวจสอบค่าและลองอีกครั้ง',
				zh: '提供的信息无效。 请检查值并重试。'
			});
		},
		http: {
			500: () => {
				return t(locale, {
					en: 'Internal Server Error',
					ja: '内部サーバーエラー',
					pt: 'Erro interno do servidor',
					es: 'Error interno del servidor',
					fr: 'Erreur interne du serveur',
					sw: 'Kosa la ndani ya seva',
					th: 'ข้อผิดพลาดภายในเซิร์ฟเวอร์',
					zh: '内部服务器错误'
				});
			},
			400: () => {
				return t(locale, {
					en: 'Bad Request',
					ja: '不正なリクエスト',
					pt: 'Pedido ruim',
					es: 'Solicitud incorrecta',
					fr: 'Mauvaise demande',
					sw: 'Ombi mbaya',
					th: 'คำขอไม่ถูกต้อง',
					zh: '错误请求'
				});
			},
			404: () => {
				return t(locale, {
					en: 'Not Found',
					ja: '見つかりません',
					pt: 'Não encontrado',
					es: 'No encontrado',
					fr: 'Non trouvé',
					sw: 'Haijapatikana',
					th: 'ไม่พบ',
					zh: '未找到'
				});
			},
			403: () => {
				return t(locale, {
					en: 'Forbidden - You do not have permission to perform this action. This error occurs when your authorization credentials are valid, but do not have permissions to access the resource or undertake the requested action. Check your admin account permissions if you are receiving this unexpectedly.',
					ja: '禁止されています',
					pt: 'Proibido',
					es: 'Prohibido',
					fr: 'Interdit',
					sw: 'Imezuiwa',
					th: 'ห้าม',
					zh: '被禁止'
				});
			},
			401: () => {
				return t(locale, {
					en: 'Unauthorized - You are not authorized to access this resource. This is usually because you are not logged in.',
					ja: '許可されていません',
					pt: 'Não autorizado',
					es: 'No autorizado',
					fr: 'Non autorisé',
					sw: 'Hauruhusiwi',
					th: 'ไม่ได้รับอนุญาต',
					zh: '未经授权'
				});
			}
		},
		file_upload: {
			no_file_selected: () => {
				return t(locale, {
					en: 'No file selected',
					ja: 'ファイルが選択されていません',
					pt: 'Nenhum arquivo selecionado',
					es: 'Ningún archivo seleccionado',
					fr: 'Aucun fichier sélectionné',
					sw: 'Hakuna faili iliyochaguliwa',
					th: 'ไม่มีไฟล์ที่เลือก',
					zh: '未选择文件'
				});
			},
			too_large: (maxFileSize: string) => {
				return t(locale, {
					en: `File is too large. Maximum file size is ${maxFileSize}`,
					ja: `ファイルが大きすぎます。ファイルの最大サイズは${maxFileSize}です`,
					pt: `O arquivo é muito grande. O tamanho máximo do arquivo é ${maxFileSize}`,
					es: `El archivo es demasiado grande. El tamaño máximo del archivo es ${maxFileSize}`,
					fr: `Le fichier est trop gros. La taille maximale du fichier est de ${maxFileSize}`,
					sw: `Faili ni kubwa sana. Ukubwa wa faili ni ${maxFileSize}`,
					th: `ไฟล์ใหญ่เกินไป ขนาดไฟล์สูงสุดคือ ${maxFileSize}`,
					zh: `文件太大。 文件的最大大小为${maxFileSize}`
				});
			},
			unsupported_type: (supportedTypes: string) => {
				return t(locale, {
					en: `Unsupported file type. Supported types are ${supportedTypes}`,
					ja: `サポートされていないファイルタイプです。サポートされているタイプは${supportedTypes}です`,
					pt: `Tipo de arquivo não suportado. Os tipos suportados são ${supportedTypes}`,
					es: `Tipo de archivo no admitido. Los tipos admitidos son ${supportedTypes}`,
					fr: `Type de fichier non pris en charge. Les types pris en charge sont ${supportedTypes}`,
					sw: `Aina ya faili isiyosaidiwa. Aina zilizosaidiwa ni ${supportedTypes}`,
					th: `ประเภทไฟล์ที่ไม่รองรับ ประเภทที่รองรับคือ ${supportedTypes}`,
					zh: `不支持的文件类型。 支持的类型是${supportedTypes}`
				});
			},
			upload_error: () => {
				return t(locale, {
					en: `An error occurred while uploading the file. Please try again.`,
					ja: 'ファイルのアップロード中にエラーが発生しました。もう一度やり直してください。',
					pt: 'Ocorreu um erro ao enviar o arquivo. Por favor, tente novamente.',
					es: 'Se ha producido un error al cargar el archivo. Por favor, inténtelo de nuevo.',
					fr: "Une erreur s'est produite lors du téléchargement du fichier. Veuillez réessayer.",
					sw: 'Kumetokea kosa wakati wa kupakia faili. Tafadhali jaribu tena.',
					th: 'เกิดข้อผิดพลาดขณะอัปโหลดไฟล์ โปรดลองอีกครั้ง',
					zh: '上传文件时发生错误。 请重试。'
				});
			}
		}
	};
}
