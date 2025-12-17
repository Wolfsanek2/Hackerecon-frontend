import type {
	Hypothesis,
	HypothesisDTO,
	InvestigationSuggestion,
	InvestigationSuggestionDTO,
	SiteUnderstanding,
	SiteUnderstandingDTO,
} from '@/types';

const investigationSuggestionFromDTO = (
	suggestion: InvestigationSuggestionDTO
): InvestigationSuggestion => {
	return {
		title: suggestion.title,
		reasoning: suggestion.reasoning,
		affectedEndpoints: suggestion.affected_endpoints,
		whatToCheck: suggestion.what_to_check,
		priority: suggestion.priority,
		// crossEndpointPattern: suggestion.cross_endpoint_pattern,
	};
};

const siteUnderstandingFromDTO = (
	siteUnderstanding: SiteUnderstandingDTO
): SiteUnderstanding => {
	return {
		likelyArchitecture: siteUnderstanding.likely_architecture,
		authMechanism: siteUnderstanding.auth_mechanism,
		dataSensitivity: siteUnderstanding.data_sensitivity,
		attackSurfaceSummary: siteUnderstanding.attack_surface_summary,
	};
};

export const HypothesisFromDTO = (hypothesisDto: HypothesisDTO): Hypothesis => {
	return {
		investigationSuggestions: hypothesisDto.investigation_suggestions.map(
			investigationSuggestionFromDTO
		),
		siteUnderstanding: siteUnderstandingFromDTO(
			hypothesisDto.site_understanding
		),
	};
};
