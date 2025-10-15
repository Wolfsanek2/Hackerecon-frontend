import './MethodBadge.scss';

interface MethodBadgeProps {
	className: string;
	method: string;
}

const MethodBadge: React.FC<MethodBadgeProps> = ({ className, method }) => {
	const getMethodColor = (method: string): string => {
		const colors: Record<string, string> = {
			GET: '#61affe',
			POST: '#49cc90',
			PUT: '#fca130',
			DELETE: '#f93e3e',
			PATCH: '#50e3c2',
			HEAD: '#9012fe',
			OPTIONS: '#0d5aa7',
		};
		return colors[method] || '#61affe';
	};

	return (
		<span
			className={'method-badge ' + className}
			style={{
				backgroundColor: getMethodColor(method),
			}}
		>
			{method}
		</span>
	);
};

export { MethodBadge };
