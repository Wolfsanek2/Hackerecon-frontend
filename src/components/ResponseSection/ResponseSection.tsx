import './ResponseSection.scss';
import { useAppSelector } from '@hooks';
import { appSliceSelectors } from '@store/slices/appSlice';
import { Code, Headers } from '@components';

const ResponseSection: React.FC = () => {
	const responseDetails = useAppSelector(
		appSliceSelectors.selectOpenedResponseDetails
	)!;
	return (
		<div className="response-section">
			<div className="response-section__headers-container">
				<h3 className="response-section__headers-title">
					Заголовки ответа
				</h3>
				{Object.keys(responseDetails.headers).length ? (
					<Headers
						className="response-section__headers-content"
						headers={responseDetails.headers}
					/>
				) : (
					<div>Пусто</div>
				)}
			</div>
			<div className="response-section__body-container">
				<h3 className="response-section__body-title">Тело ответа</h3>
				{responseDetails.body ? (
					<Code>{responseDetails.body}</Code>
				) : (
					<div>Пусто</div>
				)}
			</div>
		</div>
	);
};

export { ResponseSection };
