import './RequestSection.scss';
import { useAppSelector } from '@hooks';
import { Code, Headers } from '@components';
import { appSliceSelectors } from '@store/slices/appSlice';

const RequestSection: React.FC = () => {
	const requestDetails = useAppSelector(
		appSliceSelectors.selectOpenedRequestDetails
	)!;
	return (
		<div className="request-section">
			<div className="request-section__headers-container">
				<h3 className="request-section__headers-title">
					Заголовки запроса
				</h3>
				{Object.keys(requestDetails.headers).length ? (
					<Headers
						className="request-section__headers-content"
						headers={requestDetails.headers}
					/>
				) : (
					<div>Пусто</div>
				)}
			</div>
			<div className="request-section__body-container">
				<h3 className="request-section__body-title">Тело запроса</h3>
				{requestDetails.body ? (
					<Code className="request-section__body-content">
						{requestDetails.body}
					</Code>
				) : (
					<div>Пусто</div>
				)}
			</div>
		</div>
	);
};

export { RequestSection };
