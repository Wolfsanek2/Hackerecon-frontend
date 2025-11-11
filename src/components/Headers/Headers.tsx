import styles from './Headers.module.scss';
import { Code } from '@components';
import type { Headers as HeadersType } from '@/types';

interface HeadersProps {
	headers: HeadersType;
	className?: string;
}

const Headers: React.FC<HeadersProps> = ({ headers, className }) => {
	return (
		<Code className={`${styles['headers']} ${className}`}>
			{Object.entries(headers).map(([key, value], index) => {
				return (
					<div
						key={index}
						className={`${styles['headers__header']}`}
					>{`${key}: ${value}`}</div>
				);
			})}
		</Code>
	);
};

export { Headers };
