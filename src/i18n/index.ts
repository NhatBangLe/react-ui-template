import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import global from './locales/vi/global.json';

export const defaultNS = 'global';
export const resources = {
	vi: {
		global,
	},
} as const;

i18n.use(initReactI18next).init({
	lng: 'vi',
	ns: ['global'],
	defaultNS,
	resources,
});
