import {
	openRequestDetails,
	selectOpenedRequestId,
} from '@store/slices/appSlice';
import styles from './Request.module.scss';
import type { RequestData } from '@type';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { MethodBadge, StatusBadge } from '@components';
import warningIcon from '@assets/warning.svg';

interface RequestProps {
	request: RequestData;
}

const Request: React.FC<RequestProps> = ({ request }) => {
	const dispatch = useAppDispatch();
	const selectedId = useAppSelector(selectOpenedRequestId);

	return (
		<tr
			key={request.id}
			className={`${styles['request']} ${
				selectedId === request.id ? styles['request_selected'] : ''
			}`}
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
					status={request.status}
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
				{request.securityAnalysis.hasVulnerability ? (
					<img src={warningIcon} className="img" />
				) : (
					''
				)}
			</td>
		</tr>
	);
};

export default Request;
