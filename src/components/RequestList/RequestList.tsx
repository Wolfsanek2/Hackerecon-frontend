import React from 'react';
import './RequestList.scss';
import { Request } from '@components';
import { useAppSelector } from '@hooks';

const RequestList: React.FC = () => {
	const requests = useAppSelector((state) => state.app.requestsArray);
	return (
		<table className="request-list">
			<thead>
				<tr className="request-list__header-container">
					<th className="request-list__header">Метод</th>
					<th className="request-list__header">URL</th>
					<th className="request-list__header">Статус</th>
					<th className="request-list__header">Время</th>
					<th className="request-list__header"></th>
				</tr>
			</thead>
			<tbody>
				{requests.map((request) => (
					<Request key={request.id} request={request} />
				))}
			</tbody>
		</table>
	);
};

export default RequestList;
