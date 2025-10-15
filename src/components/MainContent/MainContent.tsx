import { RequestList } from '@components';
import './MainContent.scss';
import { useAppSelector } from '@/hooks';

const MainContent: React.FC = () => {
	const requestsLength = useAppSelector(
		(state) => state.app.requestsArray.length
	);
	return (
		<div className="main-content">
			<div className="main-content__title-container">
				<h3 className="main-content__title">Перехваченные запросы</h3>
				<h4 className="main-content__request-count">
					Всего: {requestsLength} запросов
				</h4>
			</div>
			<RequestList />
		</div>
	);
};

export { MainContent };
