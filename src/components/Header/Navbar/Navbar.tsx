import { combineCN } from '@utils';
import styles from './Navbar.module.scss';
import { NavbarItem } from './NavbarItem';
import { useLocation } from 'react-router';

interface NavbarProps {
	className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
	const location = useLocation().pathname;
	return (
		<nav className={combineCN(styles.navbar, className)}>
			<NavbarItem to={'/'} isActive={location === '/'}>
				Прокси
			</NavbarItem>
			<NavbarItem to={'/llm'} isActive={location === '/llm'}>
				Чат с LLM
			</NavbarItem>
		</nav>
	);
};
