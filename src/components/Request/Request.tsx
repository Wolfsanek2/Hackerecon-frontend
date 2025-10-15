import { openRequestDetails } from '@store/slices/appSlice';
import './Request.scss';
import type { RequestData } from '@type';
import { useAppDispatch } from '@/hooks';
import { MethodBadge, StatusBadge } from '@components';

interface RequestProps {
	request: RequestData;
}

const Request: React.FC<RequestProps> = ({ request }) => {
	const dispatch = useAppDispatch();

	return (
		<tr
			key={request.id}
			className="request"
			onClick={() => dispatch(openRequestDetails(request.id))}
		>
			<td className="request__method-container request__details-container">
				<MethodBadge
					className="request__method"
					method={request.method}
				/>
			</td>
			<td className="request__url-container request__details-container">
				<span className="request__url">{request.url}</span>
			</td>
			<td className="request__status-container request__details-container">
				<StatusBadge
					className="request__status"
					status={request.response!.statusCode}
				/>
			</td>
			<td className="request__date-container request__details-container">
				<span className="request__date">
					{new Date(request.timestamp).toLocaleTimeString()}
				</span>
			</td>
		</tr>
	);
};

export default Request;
