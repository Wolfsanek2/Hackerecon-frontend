import { useAppSelector } from '@/hooks';
import styles from './LLMPanel.module.scss';
import { Code } from '@components';
import { selectSecurityAnalysis } from '@store/slices/appSlice';

export const LLMPanel: React.FC = () => {
	const { aiComment, securityChecklist } = useAppSelector(
		selectSecurityAnalysis
	);

	return (
		<div className={`${styles['llm-panel']}`}>
			<Code className={`${styles['llm-panel__content']}`}>
				{!!aiComment && (
					<p className={`${styles['llm-panel__paragraph']}`}>
						{aiComment}
					</p>
				)}
				{!!securityChecklist.length && (
					<p
						className={`${styles['llm-panel__paragraph']} ${styles['checklist']}`}
					>
						Чек-лист:
						{securityChecklist.map(
							({ action, description, expected }, index) => {
								return (
									<span
										key={index}
										className={`${styles['checklist__item']}`}
									>
										{`${index + 1}. ${action}` +
											'\n' +
											description +
											'\n' +
											`Ожидание: ${expected}` +
											'\n'}
									</span>
								);
							}
						)}
					</p>
				)}
			</Code>
		</div>
	);
};
