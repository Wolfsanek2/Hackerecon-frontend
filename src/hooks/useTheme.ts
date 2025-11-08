import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

class ThemeManager {
	currentTheme: Theme;

	constructor() {
		if (localStorage.getItem('theme')) {
			this.currentTheme = localStorage.getItem('theme') as Theme;
			return;
		}
		this.currentTheme = this.getSystemTheme();
	}

	changeTheme(theme: Theme) {
		this.currentTheme = theme;
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}

	getSystemTheme(): Theme {
		return window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
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
		changeTheme(theme === 'dark' ? 'light' : 'dark');
	};

	return [theme, switchTheme];
};
