import { useTheme } from '@/hooks';
import styles from './ThemeSwitch.module.scss';

const ThemeSwitch: React.FC = () => {
	const [theme, switchTheme] = useTheme();
	return (
		<button
			className={styles['theme-switch']}
			onClick={() => switchTheme()}
		>
			<div className={`${styles['container-left']}`}>
				<svg
					className={`
						${styles['icon-container']} 
						${theme === 'dark' ? '' : 'hidden'}
						img
					`}
				>
					<use
						className={`${styles['dark-theme-icon']} img`}
						href="/sprites.svg#moon"
					/>
				</svg>
			</div>
			<div className={`${styles['container-right']}`}>
				<svg
					className={`
						${theme === 'light' ? '' : 'hidden'}
						${styles['icon-container']}
						img
					`}
				>
					<use
						className={`
						${styles['light-theme-icon']}
						img
					`}
						href="/sprites.svg#sun"
					/>
				</svg>
			</div>
		</button>
	);
};

export { ThemeSwitch };
