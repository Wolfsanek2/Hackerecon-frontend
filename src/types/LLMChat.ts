import type { Hypothesis } from './hypothesis';

type HypothesisMessageType = 'hypothesis';
type LLMChatMessageType = HypothesisMessageType;

interface Message {
	type: LLMChatMessageType;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: any;
}

interface HypothesisMessage extends Message {
	type: HypothesisMessageType;
	data: Hypothesis;
}

export type LLMChatMessage = HypothesisMessage | string;
