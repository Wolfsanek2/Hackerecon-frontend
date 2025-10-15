import './StatusBadge.scss';

interface StatusBadgeProps {
	className: string;
	status: number;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ className, status }) => {
	const getStatusColor = (status: number): string => {
		// if (request.error) return '#ff4444';
		// if (request.response) {
		return status >= 400 ? '#ff8800' : '#44ff44';
		// }
		// return '';
	};

	return (
		<span
			className={'status-badge ' + className}
			style={{
				backgroundColor: getStatusColor(status),
			}}
		>
			{status}
		</span>
	);
};

export { StatusBadge };
