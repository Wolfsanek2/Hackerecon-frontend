import './RequestDetails.scss';
import { closeRequestDetails } from '@store/slices/appSlice';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
	Button,
	LLMPanel,
	MethodBadge,
	RequestSection,
	ResponseSection,
	StatusBadge,
	TabList,
} from '@components';
import { SVG_SPRITE_URL } from '@/consts';

const closeButtonIcon = `${SVG_SPRITE_URL}#close-button`;

const RequestDetails: React.FC = () => {
	const dispatch = useAppDispatch();
	const request = useAppSelector((state) => state.app.openedRequestData);
	const openedSection = useAppSelector((state) => state.app.openedSection);
	return (
		<div
			className={
				'request-details ' + (!request ? 'request-details_hidden' : '')
			}
		>
			{request && (
				<div className="request-details__container">
					<div className="request-details__header">
						<div className="request-details__title-container">
							<h3 className="request-details__title">
								Детали запроса
							</h3>
							<h4 className="request-details__description">
								Просмотр заголовков и тела запроса/ответа
							</h4>
						</div>
						<Button
							className="request-details__close-button"
							onClick={() => dispatch(closeRequestDetails())}
							svgUrl={closeButtonIcon}
						/>
					</div>
					<div className="request-details__title-container">
						<span className="request-details__url">
							{request?.url}
						</span>
						<div className="request-details__badges">
							<MethodBadge
								className="request-details__method"
								method={request.method}
							/>
							<StatusBadge
								className="request-details__status"
								status={request.status}
							/>
						</div>
					</div>
					<TabList
						sections={[
							{
								name: 'request',
								title: 'Запрос',
								content: RequestSection,
								active: openedSection === 'request',
							},
							{
								name: 'response',
								title: 'Ответ',
								content: ResponseSection,
								active: openedSection === 'response',
							},
							{
								name: 'llmAnalysis',
								title: 'Анализ LLM',
								content: LLMPanel,
								active: openedSection === 'llmAnalysis',
							},
						]}
					/>
				</div>
			)}
		</div>
	);
};

export { RequestDetails };
