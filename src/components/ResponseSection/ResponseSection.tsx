import './ResponseSection.scss';
import { useAppSelector } from '@/hooks';
import { Code } from '@components';

const ResponseSection: React.FC = () => {
	const response = useAppSelector(
		(state) => state.app.openedRequestData!.responseDetails
	);
	return (
		<div className="response-section">
			<div className="response-section__headers-container">
				<h3 className="response-section__headers-title">
					Заголовки ответа
				</h3>
				<Code className="response-section__headers-content">
					{Object.entries(response.headers).map(([key, value]) => {
						return (
							<div className="response-section__header">{`${key}: ${value}`}</div>
						);
					})}
				</Code>
			</div>
			<div className="response-section__body-container">
				<h3 className="response-section__body-title">Тело ответа</h3>
				<Code>{response.body}</Code>
			</div>
		</div>
	);
};

export { ResponseSection };
