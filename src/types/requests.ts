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

export type Effort = 'low' | 'medium' | 'high' | 'critical';
export type Impact = 'low' | 'medium' | 'high' | 'critical';

export interface TestRequest {
	method: string;
	url: string;
	headers: Headers;
	body: string;
}

export interface Finding {
	title: string;
	observation: string;
	testRequests: TestRequest[];
	expectedIfVulnerable: string;
	expectedIfSafe: string;
	impact: Impact;
}

export interface SecurityAnalysis {
	summary: string;
	findings: Finding[];
	hasVulnerability: boolean;
	impact: Impact;
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
