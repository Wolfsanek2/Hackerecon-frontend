import type { RequestData, RequestResponseDetails, RiskLevel } from '@/types';

export type Headers = Record<string, string>;

export interface RequestResponseInfo {
	url: string;
	method: string;
	status_code: number;
	request_headers: Headers;
	response_headers: Headers;
	request_body?: string;
	response_body?: string;
}

export interface SecurityCheckItem {
	action: string;
	description: string;
	expected: string;
}

export interface ExtractedSecret {
	type: string;
	value: string;
	context: string;
	confidence: number;
	location: string;
}

export interface SecurityAnalysisResponse {
	has_vulnerability: boolean;
	risk_level: RiskLevel;
	ai_comment: string;
	security_checklist?: SecurityCheckItem[];
	vulnerability_types?: string[];
	confidence_score?: number;
	extracted_secrets?: ExtractedSecret[];
	timestamp: string;
	identified_user_role?: string;
}

export interface VulnerabilityReport {
	id: string;
	timestamp: string;
	analysis_result: SecurityAnalysisResponse;
}

export interface ReportDTO {
	report: VulnerabilityReport;
	request_response: RequestResponseInfo;
}

export const requestResponseToRequestDetails = (
	requestResponse: RequestResponseInfo
): RequestResponseDetails => {
	return {
		headers: requestResponse.request_headers,
		resourceType: requestResponse.request_headers['resourceType'] || '',
		body: requestResponse.request_body || '',
	};
};

export const requestResponseToResponseData = (
	requestResponse: RequestResponseInfo
): RequestResponseDetails => {
	return {
		headers: requestResponse.response_headers,
		resourceType: requestResponse.response_headers['resourceType'] || '',
		body: requestResponse.response_body || '',
	};
};

export const reportDtoToRequestData = (reportDto: ReportDTO): RequestData => {
	const { report, request_response: requestResponse } = reportDto;
	const analysisResult = report.analysis_result;
	return {
		id: report.id,
		url: requestResponse.url,
		method: requestResponse.method,
		status: requestResponse.status_code,
		timestamp: report.timestamp,
		requestDetails: requestResponseToRequestDetails(requestResponse),
		responseDetails: requestResponseToResponseData(requestResponse),
		hasVulnerability: analysisResult.has_vulnerability,
		riskLevel: analysisResult.risk_level,
		llmAnalysis: report.analysis_result.ai_comment,
	};
};
