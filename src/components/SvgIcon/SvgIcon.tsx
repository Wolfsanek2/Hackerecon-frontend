import styles from './SvgIcon.module.scss';

interface SvgIconProps {
	svgUrl: string;
	className?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({ svgUrl, className }) => {
	return (
		<svg className={`${styles['svg']} ${className} svg`}>
			<use href={svgUrl} />
		</svg>
	);
};

export { SvgIcon };
