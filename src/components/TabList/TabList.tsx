import { useAppDispatch } from '@hooks';
import './TabList.scss';
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
}

const TabList: React.FC<TabListProps> = ({ sections }) => {
	const dispatch = useAppDispatch();
	const Content = sections.find((section) => section.active)?.content;
	return (
		<div className="tablist">
			<div className="tablist__header">
				{sections.map((section, i) => {
					return (
						<div
							key={i}
							onClick={() => dispatch(openSection(section.name))}
							className={
								'tablist__title-button ' +
								(section.active
									? 'tablist__title-button_active'
									: '')
							}
						>
							{section.title}
						</div>
					);
				})}
			</div>
			<div className="tablist__content">{Content ? <Content /> : ''}</div>
		</div>
	);
};

export { TabList };
