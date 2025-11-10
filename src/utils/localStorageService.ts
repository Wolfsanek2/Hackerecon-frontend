import { LOCAL_STORAGE_KEYS, THEMES } from '@consts';
import type { LocalStorageKey, RequestData, Theme } from '@/types';

class AppLocalStorage {
	getItem(key: LocalStorageKey) {
		return localStorage.getItem(key);
	}

	setItem(key: LocalStorageKey, value: string) {
		localStorage.setItem(key, value);
	}
}

class LocalStorageService {
	localStorage: AppLocalStorage;

	constructor() {
		this.localStorage = new AppLocalStorage();
	}

	has(key: LocalStorageKey): boolean {
		return !!localStorage.getItem(key);
	}

	get theme(): Theme {
		return (
			(this.localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as Theme) ||
			THEMES.LIGHT
		);
	}
	set theme(theme: Theme) {
		this.localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
	}

	get requests(): RequestData[] {
		const requestsString = this.localStorage.getItem(
			LOCAL_STORAGE_KEYS.REQUESTS
		);
		if (!requestsString) {
			return [];
		}
		return JSON.parse(requestsString) as RequestData[];
	}
	set requests(requests: RequestData[]) {
		this.localStorage.setItem(
			LOCAL_STORAGE_KEYS.REQUESTS,
			JSON.stringify(requests)
		);
	}
}

export const localStorageService = new LocalStorageService();
