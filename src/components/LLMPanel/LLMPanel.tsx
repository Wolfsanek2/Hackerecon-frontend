import { useAppSelector } from '@/hooks';
import './LLMPanel.scss';
import { Code } from '@components';

export const LLMPanel: React.FC = () => {
	const llmAnalysis = useAppSelector(
		(state) => state.app.openedRequestData?.llmAnalysis
	);
	return (
		<div className="llm-panel">
			<Code className="llm-panel__content">{llmAnalysis}</Code>
		</div>
	);
};
