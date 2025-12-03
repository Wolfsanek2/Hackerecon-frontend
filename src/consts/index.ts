import type { LocalStorageKeys, Themes } from '@/types';

const SVG_SPRITE_URL = '/sprites.svg';
export const SVG_ICON_URLS = {
	WARNING: `${SVG_SPRITE_URL}#warning`,
	CLOSE_BUTTON: `${SVG_SPRITE_URL}#close-button`,
	CONNECTION_INDICATOR: `${SVG_SPRITE_URL}#connection-indicator`,
};

export const LOCAL_STORAGE_KEYS: LocalStorageKeys = {
	THEME: 'theme',
	REQUESTS: 'requests',
	LLM_CHAT_MESSAGES: 'llm-chat-messages',
};

export const THEMES: Themes = {
	DARK: 'dark',
	LIGHT: 'light',
};

export * from './api';
export * from './websocket';
