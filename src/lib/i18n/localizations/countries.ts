import { returnLocalizationString as t, type SL, type SupportedCountry } from '$lib/i18n/index';

export default function (locale: SL): { [key in SupportedCountry]: () => string } {
	return {
		us: () => {
			return t(locale, {
				en: 'United States',
				ja: 'アメリカ合衆国',
				pt: 'Estados Unidos',
				es: 'Estados Unidos',
				fr: 'États-Unis',
				sw: 'Marekani',
				th: 'สหรัฐอเมริกา',
				zh: '美国'
			});
		},
		jp: () => {
			return t(locale, {
				en: 'Japan',
				ja: '日本',
				pt: 'Japão',
				es: 'Japón',
				fr: 'Japon',
				sw: 'Japani',
				th: 'ญี่ปุ่น',
				zh: '日本'
			});
		},
		gb: () => {
			return t(locale, {
				en: 'United Kingdom',
				ja: 'イギリス',
				pt: 'Reino Unido',
				es: 'Reino Unido',
				fr: 'Royaume-Uni',
				sw: 'Uingereza',
				th: 'สหราชอาณาจักร',
				zh: '英国'
			});
		},
		eg: () => {
			return t(locale, {
				en: 'Egypt',
				ja: 'エジプト',
				pt: 'Egito',
				es: 'Egipto',
				fr: 'Égypte',
				sw: 'Misri',
				th: 'อียิปต์',
				zh: '埃及'
			});
		},
		au: () => {
			return t(locale, {
				en: 'Australia',
				ja: 'オーストラリア',
				pt: 'Austrália',
				es: 'Australia',
				fr: 'Australie',
				sw: 'Australia',
				th: 'ออสเตรเลีย',
				zh: '澳大利亚'
			});
		},
		ke: () => {
			return t(locale, {
				en: 'Kenya',
				ja: 'ケニア',
				pt: 'Quênia',
				es: 'Kenia',
				fr: 'Kenya',
				sw: 'Kenya',
				th: 'เคนยา',
				zh: '肯尼亚'
			});
		},
		lr: () => {
			return t(locale, {
				en: 'Liberia',
				ja: 'リベリア',
				pt: 'Libéria',
				es: 'Liberia',
				fr: 'Libéria',
				sw: 'Liberia',
				th: 'ลิเบอเรีย',
				zh: '利比里亚'
			});
		},
		ng: () => {
			return t(locale, {
				en: 'Nigeria',
				ja: 'ナイジェリア',
				pt: 'Nigéria',
				es: 'Nigeria',
				fr: 'Nigéria',
				sw: 'Nigeria',
				th: 'ไนจีเรีย',
				zh: '尼日利亚'
			});
		},
		tz: () => {
			return t(locale, {
				en: 'Tanzania',
				ja: 'タンザニア',
				pt: 'Tanzânia',
				es: 'Tanzania',
				fr: 'Tanzanie',
				sw: 'Tanzania',
				th: 'แทนซาเนีย',
				zh: '坦桑尼亚'
			});
		},
		sc: () => {
			return t(locale, {
				en: 'Seychelles',
				ja: 'セーシェル',
				pt: 'Seicheles',
				es: 'Seychelles',
				fr: 'Seychelles',
				sw: 'Shelisheli',
				th: 'เซเชลส์',
				zh: '塞舌尔'
			});
		}
	};
}
