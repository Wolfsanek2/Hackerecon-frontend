import styles from './HypothesisMessage.module.scss';
import type { Hypothesis } from '@/types';

interface HypothesisProps {
	hypothesis: Hypothesis;
}

export const HypothesisMessage: React.FC<HypothesisProps> = ({
	hypothesis,
}) => {
	return (
		<div className={styles['hypothesis-message']}>
			<div>Гипотеза: {hypothesis.title}</div>
			<div>Описание: {hypothesis.description}</div>
			<div>Хост: {hypothesis.host}</div>
			<div>Вектор атаки: {hypothesis.attackVector}</div>
			<div>
				<div>Целевые URL: </div>
				<ul>
					{hypothesis.targetUrls.map((targetURL, i) => (
						<li key={i}>{targetURL}</li>
					))}
				</ul>
			</div>
			<div>Влияние: {hypothesis.impact}</div>
			<div>Затраты: {hypothesis.effort}</div>
			<div>Обоснование: {hypothesis.reasoning}</div>
		</div>
	);
};
