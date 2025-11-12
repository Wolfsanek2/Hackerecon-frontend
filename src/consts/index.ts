import type { LocalStorageKeys, Themes } from '@/types';

export const SVG_SPRITE_URL = '/sprites.svg';
export const WARNING_ICON_URL = `${SVG_SPRITE_URL}#warning`;

export const LOCAL_STORAGE_KEYS: LocalStorageKeys = {
	THEME: 'theme',
	REQUESTS: 'requests',
};

export const THEMES: Themes = {
	DARK: 'dark',
	LIGHT: 'light',
};
