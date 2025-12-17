import styles from './HypothesisMessage.module.scss';
import type { Hypothesis } from '@/types';

interface HypothesisProps {
	hypothesis: Hypothesis;
}

export const HypothesisMessage: React.FC<HypothesisProps> = ({
	hypothesis,
}) => {
	const { investigationSuggestions } = hypothesis;
	return (
		<div className={styles['hypothesis-message']}>
			<div className={styles['suggestion-title']}>
				Предлагаемые действия:
			</div>
			<div className={styles['suggestions-container']}>
				{investigationSuggestions.map((suggestion, i) => {
					return (
						<div key={i} className={styles.suggestion}>
							<div>Предложение: {suggestion.title}</div>
							<div>Обоснование: {suggestion.reasoning}</div>
							<div>
								Эндпоинты:
								<ul>
									{suggestion.affectedEndpoints.map(
										(endpoint, i) => {
											return <li key={i}>{endpoint}</li>;
										}
									)}
								</ul>
							</div>
							<div>
								Последовательность действий:{' '}
								<ul>
									{suggestion.whatToCheck.map((step, i) => {
										return <li key={i}>{step}</li>;
									})}
								</ul>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
