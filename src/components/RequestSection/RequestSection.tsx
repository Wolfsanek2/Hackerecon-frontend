import { useAppSelector } from '@/hooks';
import './RequestSection.scss';

const RequestSection: React.FC = () => {
	const request = useAppSelector((state) => state.app.openedRequestData)!;
	return (
		<div className="request-section">
			<div className="request-section__headers-container">
				<h3 className="request-section__headers-title">
					Заголовки запроса
				</h3>
				<div className="request-section__headers-content">
					{Object.entries(request.headers).map(([key, value]) => {
						return (
							<div className="request-section__header">{`${key}: ${value}`}</div>
						);
					})}
				</div>
			</div>
			<div className="request-section__body-container">
				<h3 className="request-section__body-title">Тело запроса</h3>
				<div className="request-section__body-content">
					{request.body}
				</div>
			</div>
		</div>
	);
};

export { RequestSection };
