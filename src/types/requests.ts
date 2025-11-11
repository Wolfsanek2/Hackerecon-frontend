export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type Headers = Record<string, string>;
export type RequestID = string;

export interface SecurityCheckItem {
	action: string;
	description: string;
	expected: string;
}

export interface SecurityAnalysis {
	hasVulnerability: boolean;
	riskLevel: string;
	aiComment: string;
	securityChecklist: SecurityCheckItem[];
}

export interface RequestData {
	id: RequestID;
	url: string;
	method: string;
	status: number;
	timestamp: string;
	requestDetails: RequestResponseDetails;
	responseDetails: RequestResponseDetails;
	securityAnalysis: SecurityAnalysis;
}

export interface RequestResponseDetails {
	headers: Headers;
	resourceType: string;
	body?: string;
}
