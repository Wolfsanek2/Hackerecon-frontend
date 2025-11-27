import styles from './LLMPanel.module.scss';
import { useAppSelector } from '@hooks';
import { Code } from '@components';
import { appSliceSelectors } from '@store/slices/appSlice';

export const LLMPanel: React.FC = () => {
	const {
		aiComment,
		securityChecklist,
		vulnerabilityTypes,
		extractedSecrets,
	} = useAppSelector(appSliceSelectors.selectSecurityAnalysis);

	return (
		<div className={`${styles['llm-panel']}`}>
			<Code className={`${styles['llm-panel__content']}`}>
				{!!aiComment && (
					<div className={`${styles['llm-panel__paragraph']}`}>
						{aiComment}
					</div>
				)}
				{!!vulnerabilityTypes.length && (
					<div className={`${styles['llm-panel__paragraph']}`}>
						Найденные уязвимости:
						<ul
							className={`${styles['llm-panel__vulnerabilities']}`}
						>
							{vulnerabilityTypes.map((vulnerability, i) => (
								<li key={i}>{vulnerability}</li>
							))}
						</ul>
					</div>
				)}
				{!!extractedSecrets.length && (
					<div className={`${styles['llm-panel__paragraph']}`}>
						Найденные флаги и секреты:
						<ul className={`${styles['llm-panel__secrets']}`}>
							{extractedSecrets.map((secret, i) => (
								<li
									key={i}
									className={`${styles['secret-item']}`}
								>
									<div>{`${secret.type}: ${secret.value}`}</div>
									<div>{`Расположение: ${secret.location}`}</div>
									<div>{secret.context}</div>
								</li>
							))}
						</ul>
					</div>
				)}
				{!!securityChecklist.length && (
					<div
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
					</div>
				)}
			</Code>
		</div>
	);
};
