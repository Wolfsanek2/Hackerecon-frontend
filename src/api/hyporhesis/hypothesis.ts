import type { HypothesisResponse } from '@/types';
import { HYPOTHESIS_URL } from '@consts';
import { HypothesisFromDTO } from './hypothesisDTO';

const hypothesisUrl = (host: string) => `${HYPOTHESIS_URL}/${host}`;

const fetchHypothesis = async (host: string) => {
	console.log('fetch', host);
	const response = await fetch(hypothesisUrl(host), { method: 'POST' });
	const responseData = (await response.json()) as HypothesisResponse;
	return HypothesisFromDTO(responseData.data.hypothesis);
};

export const hypothesisApi = {
	fetchHypothesis,
};
