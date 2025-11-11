import './RequestSection.scss';
import { useAppSelector } from '@/hooks';
import { Code, Headers } from '@components';

const RequestSection: React.FC = () => {
	const request = useAppSelector((state) => state.app.openedRequestData)!;
	return (
		<div className="request-section">
			<div className="request-section__headers-container">
				<h3 className="request-section__headers-title">
					Заголовки запроса
				</h3>
				<Headers
					className="request-section__headers-content"
					headers={request.requestDetails.headers}
				/>
			</div>
			<div className="request-section__body-container">
				<h3 className="request-section__body-title">Тело запроса</h3>
				<Code className="request-section__body-content">
					{request.requestDetails.body}
				</Code>
			</div>
		</div>
	);
};

export { RequestSection };
