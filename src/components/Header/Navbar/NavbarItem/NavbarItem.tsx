import { Link } from 'react-router';
import styles from './NavbarItem.module.scss';
import { combineCN } from '@utils';

interface NavbarItemProps {
	className?: string;
	isActive: boolean;
	to: string;
	children: React.ReactNode;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
	className,
	isActive,
	to,
	children,
}) => {
	return (
		<div
			className={combineCN(
				className,
				styles['navbar-item'],
				isActive ? styles['navbar-item_active'] : ''
			)}
		>
			<Link className={styles.link} to={to}>
				{children}
			</Link>
		</div>
	);
};
