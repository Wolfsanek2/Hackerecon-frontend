import { LLMChat } from './LLMChat';
import styles from './LLMPage.module.scss';

export const LLMPage: React.FC = () => {
	return (
		<div className={styles['llm-page']}>
			<LLMChat />
		</div>
	);
};
