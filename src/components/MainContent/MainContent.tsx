import { Button, RequestList } from '@components';
import './MainContent.scss';
import { useAppDispatch, useAppSelector } from '@hooks';
import { clearRequests } from '@store/slices/appSlice';

const MainContent: React.FC = () => {
	const dispatch = useAppDispatch();
	const requestsLength = useAppSelector(
		(state) => state.app.requestsArray.length
	);
	return (
		<div className="main-content">
			<div className="main-content__header-container">
				<div className="main-content__title-container">
					<h3 className="main-content__title">
						Перехваченные запросы
					</h3>
					<h4 className="main-content__request-count">
						Всего: {requestsLength} запросов
					</h4>
				</div>
				<Button
					className="main-content__clear-button"
					text="Очистить запросы"
					onClick={() => {
						dispatch(clearRequests());
					}}
				/>
			</div>
			<RequestList />
		</div>
	);
};

export { MainContent };
