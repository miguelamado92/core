import { returnLocalizationString as t, type SL } from '$lib/i18n/index';

export default function (locale: SL) {
	return {
		website: {
			menus: {
				default: {
					items: {
						home: {
							title: () => {
								return t(locale, {
									en: 'Home',
									ja: 'ホーム',
									pt: 'Início',
									es: 'Inicio',
									fr: 'Accueil',
									sw: 'Nyumbani',
									th: 'บ้าน',
									zh: '家'
								});
							}
						},
						events: {
							title: () => {
								return t(locale, {
									en: 'Events',
									ja: 'イベント',
									pt: 'Eventos',
									es: 'Eventos',
									fr: 'Événements',
									sw: 'Matukio',
									th: 'เหตุการณ์',
									zh: '事件'
								});
							}
						},
						petitions: {
							title: () => {
								return t(locale, {
									en: 'Petitions',
									ja: '請願',
									pt: 'Petições',
									es: 'Peticiones',
									fr: 'Pétitions',
									sw: 'Maombi',
									th: 'คำร้อง',
									zh: '请愿'
								});
							},
							news: {
								title: () => {
									return t(locale, {
										en: 'News',
										ja: 'ニュース',
										pt: 'Notícias',
										es: 'Noticias',
										fr: 'Actualités',
										sw: 'Habari',
										th: 'ข่าว',
										zh: '新闻'
									});
								}
							},
							photos: {
								title: () => {
									return t(locale, {
										en: 'Photos',
										ja: '写真',
										pt: 'Fotos',
										es: 'Fotos',
										fr: 'Photos',
										sw: 'Picha',
										th: 'รูปถ่าย',
										zh: '照片'
									});
								}
							},
							blog: {
								title: () => {
									return t(locale, {
										en: 'Blog',
										ja: 'ブログ',
										pt: 'Blog',
										es: 'Blog',
										fr: 'Blog',
										sw: 'Blogi',
										th: 'บล็อก',
										zh: '博客'
									});
								}
							}
						}
					}
				}
			}
		}
	};
}
