export type HypothesisImpact = 'low' | 'medium' | 'high' | 'critical';
export type HypothesisEffort = 'low' | 'medium' | 'high' | 'critical';
export type HypothesisStatus = 'active';

export interface AttackSequenceStep {
	step: number;
	action: string;
	description: string;
	expected: string;
}

export interface InvestigationSuggestion {
	title: string;
	reasoning: string;
	affectedEndpoints: string[];
	whatToCheck: string[];
	priority: string;
	// crossEndpointPattern: string;
}

export interface SiteUnderstanding {
	likelyArchitecture: string;
	authMechanism: string;
	dataSensitivity: string;
	attackSurfaceSummary: string;
}

export interface Hypothesis {
	investigationSuggestions: InvestigationSuggestion[];
	siteUnderstanding: SiteUnderstanding;
}
