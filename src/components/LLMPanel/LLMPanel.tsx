import { useAppSelector } from '@/hooks';
import './LLMPanel.scss';

export const LLMPanel: React.FC = () => {
	const llmAnalysis = useAppSelector(
		(state) => state.app.openedRequestData?.llmAnalysis
	);
	return (
		<div className="llm-panel">
			<div className="llm-panel__content">{llmAnalysis}</div>
		</div>
	);
};
