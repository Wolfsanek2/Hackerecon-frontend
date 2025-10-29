import type { ReactNode } from 'react';
import styles from './Code.module.scss';

interface CodeProps {
	content?: string;
	className?: string;
	children?: ReactNode;
}

export const Code: React.FC<CodeProps> = ({ className, content, children }) => {
	return (
		<code className={`${styles.code} ${className}`}>
			{content ? content : ''}
			{children}
		</code>
	);
};
