import { combineCN } from '@/utils';
import styles from './Loader.module.scss';

interface LoaderProps {
	className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => {
	return (
		<svg
			className={combineCN(className, styles.loader)}
			viewBox="0 0 100 100"
		>
			<circle cx={50} cy={50} r={35} fill="none" strokeWidth={15} />
		</svg>
	);
};
