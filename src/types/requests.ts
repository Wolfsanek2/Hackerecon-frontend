export type Headers = Record<string, string>;
export type RequestID = string;
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface SecurityCheckItem {
	action: string;
	description: string;
	expected: string;
}

export interface ExtractedSecret {
	type: string;
	value: string;
	context: string;
	location: string;
}

export interface SecurityAnalysis {
	hasVulnerability: boolean;
	riskLevel: RiskLevel;
	aiComment: string;
	securityChecklist: SecurityCheckItem[];
	vulnerabilityTypes: string[];
	extractedSecrets: ExtractedSecret[];
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
