import { Route, Routes } from 'react-router';
import { useWebsocket } from '@hooks';
import styles from './App.module.scss';
import {
	Header,
	LLMPage,
	MainContent,
	ProxyPanel,
	RequestDetails,
} from '@components';
import { WS_URL } from '@consts';

const App: React.FC = () => {
	useWebsocket(WS_URL);
	return (
		<div className={styles.app}>
			<Header />
			<div className={styles['app__main-content']}>
				<ProxyPanel />
				<Routes>
					<Route
						path="/"
						element={
							<>
								<MainContent />
								<RequestDetails />
							</>
						}
					/>
					<Route path="/llm" element={<LLMPage />} />
				</Routes>
			</div>
		</div>
	);
};

export { App };
