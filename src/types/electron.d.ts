interface RequestData {
	id: number;
	url: string;
	method: string;
	timestamp: string;
	resourceType: string;
	headers?: Record<string, string>;
	response?: ResponseData;
	error?: ErrorData;
}

interface ResponseData {
	id: number;
	url: string;
	statusCode: number;
	statusLine: string;
	timestamp: string;
}

interface ErrorData {
	id: number;
	url: string;
	error: string;
	timestamp: string;
}

interface ElectronAPI {
	getBackendUrl: () => Promise<string>;
	updateBackendUrl: (newUrl: string) => Promise<boolean>;
	onRequestIntercepted: (
		callback: (event: any, request: RequestData) => void
	) => void;
	onResponseCompleted: (
		callback: (event: any, response: ResponseData) => void
	) => void;
	onErrorOccurred: (callback: (event: any, error: ErrorData) => void) => void;
	onBackendResponse: (
		callback: (
			event: any,
			backendData: { requestId: number; status: number }
		) => void
	) => void;
	removeAllListeners: (channel: string) => void;
}

declare global {
	interface Window {
		electronAPI: ElectronAPI;
	}
}

export type { RequestData, ResponseData, ErrorData, ElectronAPI };
