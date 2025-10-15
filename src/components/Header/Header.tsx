import logo from '@assets/logo.svg';
import './Header.scss';
import { Button } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import { closeProxyPanel, openProxyPanel } from '@store/slices/appSlice';

const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const isProxyPanelOpened = useAppSelector(
		(state) => state.app.isProxyPanelOpened
	);
	return (
		<header className="header">
			<div className="header__left-side">
				<div className="header__logo-container">
					<img className="header__logo img" src={logo} alt="Logo" />
				</div>
				<div className="header__text">
					<div className="header__title-container">
						<h2 className="header__title">Hackerecon</h2>
					</div>
					<div className="header__description-container">
						<h4 className="header__description">
							MITM-прокси с поддержкой LLM
						</h4>
					</div>
				</div>
			</div>
			<div className="header__right-side">
				<Button
					className="header__proxy-button"
					text="Параметры прокси-сервера"
					onClick={() =>
						dispatch(
							isProxyPanelOpened
								? closeProxyPanel()
								: openProxyPanel()
						)
					}
				/>
			</div>
		</header>
	);
};

export { Header };
