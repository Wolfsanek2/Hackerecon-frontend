import { openRequestDetails } from '@store/slices/appSlice';
import styles from './Request.module.scss';
import type { RequestData } from '@type';
import { useAppDispatch } from '@/hooks';
import { MethodBadge, StatusBadge } from '@components';
import warningIcon from '@assets/warning.svg';

interface RequestProps {
	request: RequestData;
}

const Request: React.FC<RequestProps> = ({ request }) => {
	const dispatch = useAppDispatch();

	return (
		<tr
			key={request.id}
			className={`${styles['request']}`}
			onClick={() => dispatch(openRequestDetails(request.id))}
		>
			<td
				className={`${styles['request__method-container']} ${styles['request__details-container']}`}
			>
				<MethodBadge
					className={`${styles['request__method']}`}
					method={request.method}
				/>
			</td>
			<td
				className={`${styles['request__url-container']} ${styles['request__details-container']}`}
			>
				<span className={`${styles['request__url']}`}>
					{request.url}
				</span>
			</td>
			<td
				className={`${styles['request__status-container']} ${styles['request__details-container']}`}
			>
				<StatusBadge
					className={`${styles['request__status']}`}
					status={request.response!.statusCode}
				/>
			</td>
			<td
				className={`${styles['request__date-container']} ${styles['request__details-container']}`}
			>
				<span className={`${styles['request__date']}`}>
					{new Date(request.timestamp).toLocaleTimeString()}
				</span>
			</td>
			<td
				className={`${styles['request__warning-container']} ${styles['request__details-container']}`}
			>
				{request.hasVulnerability ? (
					<img src={warningIcon} className="img" />
				) : (
					''
				)}
			</td>
		</tr>
	);
};

export default Request;
