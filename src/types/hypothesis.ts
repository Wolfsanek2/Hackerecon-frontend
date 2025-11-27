export type HypothesisImpact = 'low' | 'medium' | 'high' | 'critical';
export type HypothesisEffort = 'low' | 'medium' | 'high' | 'critical';
export type HypothesisStatus = 'active';

export interface AttackSequenceStep {
	step: number;
	action: string;
	description: string;
	expected: string;
}

export interface Hypothesis {
	id: string;
	title: string;
	description: string;
	attackVector: string;
	targetUrls: string[];
	attackSequence: AttackSequenceStep[];
	impact: HypothesisImpact;
	effort: HypothesisEffort;
	status: HypothesisStatus;
	reasoning: string;
	host: string;
}
