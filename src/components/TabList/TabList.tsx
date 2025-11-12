import styles from './TabList.module.scss';
import { useAppDispatch } from '@hooks';
import { openSection } from '@store/slices/appSlice';
import type { OpenedSection } from '@/types';

interface TabListSection {
	name: OpenedSection;
	title: string;
	content: React.FC;
	active: boolean;
}

interface TabListProps {
	sections: TabListSection[];
	className?: string;
}

const TabList: React.FC<TabListProps> = ({ sections, className }) => {
	const dispatch = useAppDispatch();
	const Content = sections.find((section) => section.active)?.content;
	return (
		<div className={`${styles['tablist']} ${className}`}>
			<div className={`${styles['tablist__header']}`}>
				{sections.map((section, i) => {
					return (
						<div
							key={i}
							onClick={() => dispatch(openSection(section.name))}
							className={`${styles['tablist__title-button']} ${
								section.active
									? `${styles['tablist__title-button_active']}`
									: ''
							}`}
						>
							{section.title}
						</div>
					);
				})}
			</div>
			<div className={`${styles['tablist__content']}`}>
				{Content ? <Content /> : ''}
			</div>
		</div>
	);
};

export { TabList };
