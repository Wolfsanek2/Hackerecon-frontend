import { useAppSelector } from '@/hooks';
import './ResponseSection.scss';

const ResponseSection: React.FC = () => {
	const response = useAppSelector(
		(state) => state.app.openedRequestData!.response
	)!;
	return (
		<div className="response-section">
			<div className="response-section__headers-container">
				<h3 className="response-section__headers-title">
					Заголовки запроса
				</h3>
				<div className="response-section__headers-content">
					{Object.entries(response.headers).map(([key, value]) => {
						return (
							<div className="response-section__header">{`${key}: ${value}`}</div>
						);
					})}
				</div>
			</div>
			<div className="response-section__body-container">
				<h3 className="response-section__body-title">Тело запроса</h3>
				<div className="response-section__body-content">
					{response.body}
				</div>
			</div>
		</div>
	);
};

export { ResponseSection };
