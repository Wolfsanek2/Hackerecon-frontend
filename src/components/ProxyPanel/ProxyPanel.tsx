import { useAppSelector } from '@/hooks';
import './ProxyPanel.scss';

export const ProxyPanel: React.FC = () => {
	const visible = useAppSelector((state) => state.app.isProxyPanelOpened);
	return (
		<div
			className={'proxy-panel ' + (!visible ? 'proxy-panel_hidden' : '')}
		>
			<div className="proxy-panel__container">
				<div className="proxy-panel__header-container">
					<h3 className="proxy-panel__header-title">
						Настройки прокси
					</h3>
					<h4 className="proxy-panel__header-description">
						Конфигурация MITM прокси-сервера
					</h4>
				</div>
				<div className="proxy-panel__content">
					<div className="proxy-panel__address">
						<div className="proxy-panel__host">
							<h4 className="proxy-panel__host-title">Хост</h4>
							<span className="proxy-panel__host-value">
								127.0.0.1
							</span>
						</div>
						<div className="proxy-panel__port">
							<h4 className="proxy-panel__port-title">Порт</h4>
							<span className="proxy-panel__port-value">
								8080
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
