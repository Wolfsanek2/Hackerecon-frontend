import { LOCAL_STORAGE_KEYS, THEMES } from '@consts';
import type { Theme } from '@/types';
import { localStorageService } from '@utils';
import { useEffect, useState } from 'react';

class ThemeManager {
	currentTheme: Theme;

	constructor() {
		if (localStorageService.has(LOCAL_STORAGE_KEYS.THEME)) {
			this.currentTheme = localStorageService.theme;
			return;
		}
		this.currentTheme = this.getSystemTheme();
	}

	changeTheme(theme: Theme) {
		this.currentTheme = theme;
		document.documentElement.setAttribute('data-theme', theme);
		localStorageService.theme = theme;
	}

	getSystemTheme(): Theme {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? THEMES.DARK
			: THEMES.LIGHT;
	}

	get theme() {
		return this.currentTheme;
	}
}
const themeManager = new ThemeManager();

export const useTheme = (): [Theme, () => void] => {
	const [theme, changeTheme] = useState<Theme>(themeManager.currentTheme);

	useEffect(() => {
		themeManager.changeTheme(theme);
	}, [theme]);

	const switchTheme = () => {
		changeTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
	};

	return [theme, switchTheme];
};
