import { useEffect, useState } from 'react';
import './App.css';
import type { ErrorData, RequestData, ResponseData } from './types/electron';
import RequestList from './components/RequestList/RequestList';

const mockRequests = [
	{
		id: 1,
		url: 'example.com',
		method: 'GET',
		timestamp: new Date().toISOString(),
		resourceType: 'script',
	},
	{
		id: 2,
		url: 'example.com/api',
		method: 'POST',
		timestamp: new Date().toISOString(),
		resourceType: 'json',
	},
];

const App = () => {
	const [requests, setRequests] = useState<RequestData[]>(mockRequests);
	const [backendURL, setBackendURL] = useState('http://localhost:3000');
	const [isMonitoring, setIsMonitoring] = useState<boolean>(true);

	useEffect(() => {
		console.log('useEffect()');
		console.log('requests: ', requests);
		window.electronAPI.getBackendUrl().then(setBackendURL);

		const handleRequestIntercepted = (event: any, request: RequestData) => {
			console.log('handleRequestIntercepted()');
			console.log('request: ', request);
			if (isMonitoring) {
				setRequests((requests) => [request, ...requests.slice(0, 999)]);
			}
		};

		const handleResponseCompleted = (
			event: any,
			response: ResponseData
		) => {
			console.log('handleResponseCompleted');
			if (isMonitoring) {
				setRequests((requests) =>
					requests.map((req) => {
						return response.id === req.id
							? { ...req, response }
							: req;
					})
				);
			}
		};

		const handleErrorOccurred = (event: any, error: ErrorData) => {
			console.log('handleErrorOccurred');
			if (isMonitoring) {
				setRequests((requests) =>
					requests.map((req) =>
						req.id === error.id ? { ...req, error } : req
					)
				);
			}
		};
		const handleBackendResponse = (
			event: any,
			backendData: { requestId: number; status: number }
		) => {
			console.log('handleBackendResponse()');
			setRequests((requests) =>
				requests.map((req) =>
					req.id === backendData.requestId
						? { ...req, backendStatus: backendData.status }
						: req
				)
			);
		};

		// console.log('window.electronAPI: ', window.electronAPI);

		window.electronAPI.onRequestIntercepted(handleRequestIntercepted);
		window.electronAPI.onResponseCompleted(handleResponseCompleted);
		window.electronAPI.onErrorOccurred(handleErrorOccurred);
		window.electronAPI.onBackendResponse(handleBackendResponse);

		return () => {
			window.electronAPI.removeAllListeners('http-request-intercepted');
			window.electronAPI.removeAllListeners('http-response-completed');
			window.electronAPI.removeAllListeners('http-error-occurred');
			window.electronAPI.removeAllListeners('backend-response');
		};
	}, [isMonitoring]);

	const handleBackendUrlUpdate = async (): Promise<void> => {
		const success = await window.electronAPI.updateBackendUrl(backendURL);
		if (success) {
			alert('Backend URL updated successfully!');
		}
	};

	const clearRequests = (): void => {
		setRequests([]);
	};

	const testRequest = () => {
		console.log('testRequest()');
		fetch('https://jsonplaceholder.typicode.com/posts/1')
			.then((response) => response.json())
			.then((data) => console.log('Test request completed:', data))
			.catch((error) => console.error('Test request failed:', error));
	};

	return (
		<div className="app">
			<header className="app-header">
				<h1>Hackerecon</h1>
				<div className="controls">
					<div className="monitoring-controls">
						<button
							onClick={() => setIsMonitoring(!isMonitoring)}
							className={`monitoring-btn ${
								isMonitoring ? 'active' : 'inactive'
							}`}
						>
							{isMonitoring
								? 'Pause Monitoring'
								: 'Resume Monitoring'}
						</button>
						<button onClick={clearRequests} className="clear-btn">
							Clear Requests
						</button>
						<button onClick={testRequest} className="test-btn">
							Test Request
						</button>
					</div>
				</div>
			</header>

			<footer className="app-footer">
				<p>Total requests intercepted: {requests.length}</p>
			</footer>

			<main className="app-main">
				<RequestList requests={requests} />
			</main>
		</div>
	);
};

export default App;
