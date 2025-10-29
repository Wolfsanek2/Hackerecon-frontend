import type { RequestData } from '@/types';

export interface SecurityCheckItem {
	checkName: string;
	description: string;
	priority: string;
	instructions: string;
	expectedResult: string;
}

export interface ExtractedSecret {
	type: string;
	value: string;
	context: string;
	confidence: number;
	location: string;
}

export interface DataObject {
	name: string;
	fields: string[];
}

export interface SecurityAnalysisResponse {
	url: string;
	hasVulnerability: boolean;
	riskLevel: string;
	aiComment: string;
	securityChecklist: SecurityCheckItem[];
	vulnerabilityTypes: string[];
	confidenceScore: number;
	recommendations: string[];
	extractedSecrets: ExtractedSecret[];
	timestamp: string;
	identifiedUserRole: string;
	identifiedDataObjects: DataObject[];
}

export interface VulnerabilityReport {
	id: string;
	timeStamp: string;
	sourceProxy: string;
	analysisResult: SecurityAnalysisResponse;
}

export const vulnerabilityReportToRequestData = (
	vulnerabilityReport: VulnerabilityReport
): RequestData => {
	return {
		id: vulnerabilityReport.id,
		url: vulnerabilityReport.analysisResult.url,
		method: '',
		headers: {},
		timestamp: vulnerabilityReport.timeStamp,
		llmAnalysis: vulnerabilityReport.analysisResult.aiComment,
		hasVulnerability: vulnerabilityReport.analysisResult.hasVulnerability,
	};
};
