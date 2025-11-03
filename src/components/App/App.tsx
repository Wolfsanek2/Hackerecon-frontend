import { useAppSelector, useWebsocket } from '@hooks';
import './App.scss';
import { Header, MainContent, ProxyPanel, RequestDetails } from '@components';

const App: React.FC = () => {
	const wsUrl = useAppSelector((state) => state.app.backendWsUrl);
	useWebsocket(wsUrl);
	return (
		<div className="app">
			<Header></Header>
			<div className="app__main-content">
				<ProxyPanel />
				<MainContent />
				<RequestDetails />
			</div>
		</div>
	);
};

export { App };
