import type { RequestData } from '../../types/electron.d.ts';

interface RequestProps {
	request: RequestData;
}

export const Request: React.FC<RequestProps> = ({ request }) => {
	const getStatusColor = (request: RequestData): string => {
		if (request.error) return '#ff4444';
		if (request.response) {
			return request.response.statusCode >= 400 ? '#ff8800' : '#44ff44';
		}
		return '#8888ff';
	};

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
		<div key={request.id} className="request-item" style={{ margin: 20 }}>
			<div
				className="request-header"
				style={{ gap: 10, display: 'flex', justifyContent: 'center' }}
			>
				<span
					className="method-badge"
					style={{
						backgroundColor: getMethodColor(request.method),
					}}
				>
					{request.method}
				</span>
				<span className="url">{request.url}</span>
				<span
					className="status-indicator"
					style={{
						backgroundColor: getStatusColor(request),
					}}
				></span>
			</div>

			<div className="request-details">
				<div className="detail-row">
					<strong>Time:</strong>{' '}
					{new Date(request.timestamp).toLocaleTimeString()}
				</div>
				<div className="detail-row">
					<strong>Resource Type:</strong> {request.resourceType}
				</div>

				{request.response && (
					<div className="detail-row">
						<strong>Status:</strong>
						<span
							className={`status-code ${
								request.response.statusCode >= 400
									? 'error'
									: 'success'
							}`}
						>
							{request.response.statusCode}{' '}
							{request.response.statusLine}
						</span>
					</div>
				)}

				{request.error && (
					<div className="detail-row error">
						<strong>Error: {request.error.error}</strong>
					</div>
				)}

				{request.headers && Object.keys(request.headers).length > 0 && (
					<div className="detail-row">
						<strong>Headers:</strong>
						<pre
							className="headers"
							style={{ wordWrap: 'break-word' }}
						>
							{JSON.stringify(request.headers, null, 2)}
						</pre>
					</div>
				)}
			</div>
		</div>
	);
};
