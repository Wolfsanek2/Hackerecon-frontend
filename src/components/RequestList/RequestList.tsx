import React from 'react';
import type { RequestData } from '../../types/electron.d.ts';
import { Request } from '../Request/Request.tsx';

interface RequestListProps {
	requests: RequestData[];
}

const RequestList: React.FC<RequestListProps> = ({ requests }) => {
	return (
		<div className="request-list">
			{requests.length === 0 ? (
				<div className="empty-state">
					<p>
						No requests intercepted yet. Make some HTTP requests to
						see them here.
					</p>
				</div>
			) : (
				requests.map((request) => (
					<Request key={request.id} request={request} />
				))
			)}
		</div>
	);
};

export default RequestList;
