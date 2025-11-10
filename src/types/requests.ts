export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface RequestData {
	id: string;
	url: string;
	method: string;
	status: number;
	timestamp: string;
	requestDetails: RequestResponseDetails;
	responseDetails: RequestResponseDetails;
	hasVulnerability: boolean;
	riskLevel: string;
	llmAnalysis: string;
}

export interface RequestResponseDetails {
	headers: Record<string, string>;
	resourceType: string;
	body?: string;
}
