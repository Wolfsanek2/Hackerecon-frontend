import type { Hypothesis, HypothesisDTO } from '@/types';

export const HypothesisFromDTO = (hypothesisDto: HypothesisDTO): Hypothesis => {
	return {
		id: hypothesisDto.id,
		title: hypothesisDto.title,
		description: hypothesisDto.description,
		attackVector: hypothesisDto.attack_vector,
		targetUrls: hypothesisDto.target_urls,
		attackSequence: hypothesisDto.attack_sequence,
		impact: hypothesisDto.impact,
		effort: hypothesisDto.effort,
		status: hypothesisDto.status,
		reasoning: hypothesisDto.reasoning,
		host: hypothesisDto.host,
	};
};
