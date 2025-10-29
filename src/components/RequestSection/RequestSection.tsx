import './RequestSection.scss';
import { useAppSelector } from '@/hooks';
import { Code } from '@components';

const RequestSection: React.FC = () => {
	const request = useAppSelector((state) => state.app.openedRequestData)!;
	return (
		<div className="request-section">
			<div className="request-section__headers-container">
				<h3 className="request-section__headers-title">
					Заголовки запроса
				</h3>
				<Code className="request-section__headers-content">
					{Object.entries(request.headers).map(([key, value]) => {
						return (
							<div className="request-section__header">{`${key}: ${value}`}</div>
						);
					})}
				</Code>
			</div>
			<div className="request-section__body-container">
				<h3 className="request-section__body-title">Тело запроса</h3>
				<Code className="request-section__body-content">
					{request.body}
				</Code>
			</div>
		</div>
	);
};

export { RequestSection };
