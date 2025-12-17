export interface InvestigationSuggestionDTO {
	title: string;
	reasoning: string;
	affected_endpoints: string[];
	what_to_check: string[];
	priority: string;
	cross_endpoint_pattern: string;
}

export interface SiteUnderstandingDTO {
	likely_architecture: string;
	auth_mechanism: string;
	data_sensitivity: string;
	attack_surface_summary: string;
}

export interface HypothesisDTO {
	investigation_suggestions: InvestigationSuggestionDTO[];
	site_understanding: SiteUnderstandingDTO;
}

export interface HypothesisResponse {
	type: string;
	data: HypothesisDTO;
}
