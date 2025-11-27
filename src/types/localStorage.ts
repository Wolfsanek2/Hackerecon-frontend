type ThemeKey = 'theme';
type RequestsKey = 'requests';
type LLMChatMessagesKey = 'llm-chat-messages';

export type LocalStorageKey = ThemeKey | RequestsKey | LLMChatMessagesKey;

export interface LocalStorageKeys {
	THEME: ThemeKey;
	REQUESTS: RequestsKey;
	LLM_CHAT_MESSAGES: LLMChatMessagesKey;
}
