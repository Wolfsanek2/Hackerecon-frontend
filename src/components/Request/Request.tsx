import styles from './Request.module.scss';
import { appSliceSelectors, openRequestDetails } from '@store/slices/appSlice';
import type { RequestData } from '@type';
import { useAppDispatch, useAppSelector } from '@hooks';
import { MethodBadge, StatusBadge, SvgIcon } from '@components';
import { WARNING_ICON_URL } from '@consts';

interface RequestProps {
	request: RequestData;
}

const Request: React.FC<RequestProps> = ({ request }) => {
	const dispatch = useAppDispatch();
	const selectedId = useAppSelector(appSliceSelectors.selectOpenedRequestId);
	let isWarningLow = false;
	let isWarningHigh = false;
	if (request.securityAnalysis.hasVulnerability) {
		switch (request.securityAnalysis.riskLevel) {
			case 'low':
			case 'medium':
				isWarningLow = true;
				break;
			case 'high':
			case 'critical':
				isWarningHigh = true;
				break;
		}
	}

	return (
		<tr
			key={request.id}
			className={`${styles['request']} ${
				selectedId === request.id ? styles['request_selected'] : ''
			} ${isWarningLow ? styles['request_warning-low'] : ''} ${
				isWarningHigh ? styles['request_warning-high'] : ''
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
					<SvgIcon
						svgUrl={WARNING_ICON_URL}
						className={`${styles['warning-icon']} ${
							isWarningLow ? styles['warning-icon_low'] : ''
						} ${
							isWarningHigh ? styles['warning-icon_high'] : ''
						} img`}
					/>
				) : (
					''
				)}
			</td>
		</tr>
	);
};

export default Request;
