type ThemeKey = 'theme';
type RequestsKey = 'requests';

export type LocalStorageKey = ThemeKey | RequestsKey;

export interface LocalStorageKeys {
	THEME: ThemeKey;
	REQUESTS: RequestsKey;
}
