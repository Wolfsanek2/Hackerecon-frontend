import type {
	AttackSequenceStep,
	HypothesisEffort,
	HypothesisImpact,
	HypothesisStatus,
} from './hypothesis';

export interface HypothesisDTO {
	id: string;
	title: string;
	description: string;
	attack_vector: string;
	target_urls: string[];
	attack_sequence: AttackSequenceStep[];
	confidence: number;
	impact: HypothesisImpact;
	effort: HypothesisEffort;
	status: HypothesisStatus;
	created_at: string;
	reasoning: string;
	host: string;
}

export interface HypothesisResponse {
	type: string;
	data: {
		hypothesis: HypothesisDTO;
	};
}
