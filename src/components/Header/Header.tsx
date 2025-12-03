import logo from '@assets/logo.svg';
import styles from './Header.module.scss';
import { Button, ThemeSwitch } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { closeProxyPanel, openProxyPanel } from '@store/slices/appSlice';
import { Navbar } from './Navbar';
import { ConnectionIndicator } from './ConnectionIndicator';
import { websocketSliceSelectors } from '@/store/slices/websocketSlice';

const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const isProxyPanelOpened = useAppSelector(
		(state) => state.app.isProxyPanelOpened
	);
	const isConnected = useAppSelector(
		websocketSliceSelectors.selectIsConnected
	);
	return (
		<header className={styles.header}>
			<div className={styles['top-container']}>
				<div className={`${styles['header__left-side']}`}>
					<div className={`${styles['header__logo-container']}`}>
						<img
							className={`${styles['header__logo']} img`}
							src={logo}
							alt="Logo"
						/>
					</div>
					<div className={`${styles['header__text']}`}>
						<div className={`${styles['header__title-container']}`}>
							<h2 className={`${styles['header__title']}`}>
								Hackerecon
							</h2>
						</div>
						<div
							className={`${styles['header__description-container']}`}
						>
							<h4 className={`${styles['header__description']}`}>
								MITM-прокси с поддержкой LLM
							</h4>
						</div>
					</div>
				</div>
				<div className={`${styles['header__right-side']}`}>
					<ConnectionIndicator
						isConnected={isConnected}
						className={styles['connection-indicator']}
					/>
					<Button
						className={`${styles['header__proxy-button']}`}
						text="Параметры прокси-сервера"
						onClick={() =>
							dispatch(
								isProxyPanelOpened
									? closeProxyPanel()
									: openProxyPanel()
							)
						}
					/>
					<ThemeSwitch />
				</div>
			</div>
			<Navbar className={styles['bottom-container']} />
		</header>
	);
};

export { Header };
