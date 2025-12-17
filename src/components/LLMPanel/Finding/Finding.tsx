import { combineCN } from '@utils';
import styles from './Finding.module.scss';
import type { Finding as FindingData } from '@/types';

interface FindingProps {
	finding: FindingData;
	className?: string;
}

export const Finding: React.FC<FindingProps> = ({ finding, className }) => {
	return (
		<div className={combineCN(className, styles.finding)}>
			<div>Уязвимость: {finding.title}</div>
			<div>Описание: {finding.observation}</div>
			<div>
				<div>Рекомендуемые запросы:</div>
				<ul>
					{finding.testRequests.map(
						({ method, url, headers, body }, i) => (
							<li key={i}>
								<div>URL: {url}</div>
								<div>Метод: {method}</div>
								<div>
									<div>Заголовки:</div>
									<div>
										{Object.entries(headers).map(
											([key, value], i) => (
												<div
													key={i}
													className={styles.header}
												>
													{key}: {value}
												</div>
											)
										)}
									</div>
								</div>
								<div>Тело запроса: {body}</div>
							</li>
						)
					)}
				</ul>
			</div>
			<div>
				Ожидаемое поведение, если уязвимость есть:{' '}
				{finding.expectedIfVulnerable}
			</div>
			<div>
				Ожидаемое поведение, если уязвимости нет:{' '}
				{finding.expectedIfSafe}
			</div>
			<div>Степень опасности: {finding.impact}</div>
		</div>
	);
};
