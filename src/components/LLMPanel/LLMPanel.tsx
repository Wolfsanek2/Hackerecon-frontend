import { useAppSelector } from '@/hooks';
import styles from './LLMPanel.module.scss';
import { Code } from '@components';
import { selectSecurityAnalysis } from '@store/slices/appSlice';

export const LLMPanel: React.FC = () => {
	const {
		aiComment,
		securityChecklist,
		vulnerabilityTypes,
		extractedSecrets,
	} = useAppSelector(selectSecurityAnalysis);

	return (
		<div className={`${styles['llm-panel']}`}>
			<Code className={`${styles['llm-panel__content']}`}>
				{!!aiComment && (
					<p className={`${styles['llm-panel__paragraph']}`}>
						{aiComment}
					</p>
				)}
				{!!vulnerabilityTypes.length && (
					<p className={`${styles['llm-panel__paragraph']}`}>
						Найденные уязвимости:
						<ul
							className={`${styles['llm-panel__vulnerabilities']}`}
						>
							{vulnerabilityTypes.map((vulnerability) => (
								<li>{vulnerability}</li>
							))}
						</ul>
					</p>
				)}
				{!!extractedSecrets.length && (
					<p className={`${styles['llm-panel__paragraph']}`}>
						Найденные флаги и секреты:
						<ul className={`${styles['llm-panel__secrets']}`}>
							{extractedSecrets.map((secret) => (
								<li
									className={`${styles['llm-panel__secret']}`}
								>
									<span>{`${secret.type}: ${secret.value}`}</span>
									<span>{`Расположение: ${secret.location}`}</span>
									<span>{secret.context}</span>
								</li>
							))}
						</ul>
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
