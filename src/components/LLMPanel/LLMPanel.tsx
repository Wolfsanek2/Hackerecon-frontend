import styles from './LLMPanel.module.scss';
import { useAppSelector } from '@hooks';
import { Code } from '@components';
import { appSliceSelectors } from '@store/slices/appSlice';
import { Finding } from './Finding';

export const LLMPanel: React.FC = () => {
	const { summary, findings } = useAppSelector(
		appSliceSelectors.selectSecurityAnalysis
	);

	return (
		<div className={`${styles['llm-panel']}`}>
			<Code className={`${styles['llm-panel__content']}`}>
				{!!summary && (
					<div className={`${styles['llm-panel__paragraph']}`}>
						{summary}
					</div>
				)}
				<div>
					<div>Найденные уязвимости:</div>
					<div className={styles['findings-container']}>
						{findings.map((finding, i) => (
							<div key={i}>
								<Finding finding={finding} />
							</div>
						))}
					</div>
				</div>
			</Code>
		</div>
	);
};
