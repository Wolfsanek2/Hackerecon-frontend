import type {
	Effort,
	Finding,
	Impact,
	RequestData,
	RequestResponseDetails,
	SecurityAnalysis,
	TestRequest,
} from '@/types';

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

interface FindingDTO {
	title: string;
	observation: string;
	test_requests: TestRequest[];
	expected_if_vulnerable: string;
	expected_if_safe: string;
	effort: Effort;
	impact: Impact;
	verification_status: string;
	verification_reason: string;
}

export interface SecurityAnalysisResult {
	summary: string;
	findings: FindingDTO[];
}

export interface VulnerabilityReport {
	id: string;
	timestamp: string;
	analysis_result: SecurityAnalysisResult;
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

const getImpactFromFindings = (findings: FindingDTO[]): Impact => {
	return findings.reduce<Impact>((impact, finding) => {
		switch (finding.impact) {
			case 'critical':
				return finding.impact;
			case 'high':
				if (impact !== 'critical') {
					return finding.impact;
				}
				break;
			case 'medium':
				if (impact !== 'critical' && impact !== 'high') {
					return finding.impact;
				}
				break;
			case 'low':
				return impact;
		}
		return impact;
	}, 'low');
};

const GetFindingFromDTO = (finding: FindingDTO): Finding => {
	return {
		title: finding.title,
		observation: finding.observation,
		testRequests: finding.test_requests,
		expectedIfVulnerable: finding.expected_if_vulnerable,
		expectedIfSafe: finding.expected_if_safe,
		impact: finding.impact,
	};
};

export const securityAnalysisFromDTO = (
	securityAnalysis: SecurityAnalysisResult
): SecurityAnalysis => {
	return {
		summary: securityAnalysis.summary,
		hasVulnerability: securityAnalysis.findings.length > 0,
		impact: getImpactFromFindings(securityAnalysis.findings),
		findings: securityAnalysis.findings.map(GetFindingFromDTO),
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
		securityAnalysis: securityAnalysisFromDTO(analysisResult),
	};
};
