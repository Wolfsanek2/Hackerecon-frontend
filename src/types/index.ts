export interface RequestData {
	id: number;
	url: string;
	method: string;
	timestamp: string;
	resourceType: string;
	headers: Record<string, string>;
	response?: ResponseData;
	body?: string;
	llmAnalysis: string;
	error?: ErrorData;
}

export interface ResponseData {
	statusCode: number;
	statusLine: string;
	headers: Record<string, string>;
	body?: string;
}

export interface ErrorData {
	id: number;
	url: string;
	error: string;
	timestamp: string;
}

export type OpenedSection = 'request' | 'response' | 'llmAnalysis';
