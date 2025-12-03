import styles from './ProxyPanel.module.scss';
import { useAppDispatch, useAppSelector } from '@hooks';
import { Button } from '@components';
import { closeProxyPanel } from '@store/slices/appSlice';
import { SVG_ICON_URLS } from '@consts';

export const ProxyPanel: React.FC = () => {
	const visible = useAppSelector((state) => state.app.isProxyPanelOpened);
	const dispatch = useAppDispatch();
	return (
		<div
			className={`${styles['proxy-panel']} ${
				!visible ? styles['proxy-panel_hidden'] : ''
			}`}
		>
			<div className={styles['proxy-panel__container']}>
				<div className={styles['proxy-panel__header-container']}>
					<div className={styles['proxy-panel__title-container']}>
						<h3 className={styles['proxy-panel__header-title']}>
							Настройки прокси
						</h3>
						<h4
							className={
								styles['proxy-panel__header-description']
							}
						>
							Конфигурация MITM прокси-сервера
						</h4>
					</div>
					<Button
						className={styles['close-button']}
						svgUrl={SVG_ICON_URLS.CLOSE_BUTTON}
						onClick={() => dispatch(closeProxyPanel())}
					/>
				</div>
				<div className={styles['proxy-panel__content']}>
					<div className={styles['proxy-panel__address']}>
						<div className={styles['proxy-panel__host']}>
							<h4 className={styles['proxy-panel__host-title']}>
								Хост
							</h4>
							<span className={styles['proxy-panel__host-value']}>
								127.0.0.1
							</span>
						</div>
						<div className={styles['proxy-panel__port']}>
							<h4 className={styles['proxy-panel__port-title']}>
								Порт
							</h4>
							<span className={styles['proxy-panel__port-value']}>
								8090
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
