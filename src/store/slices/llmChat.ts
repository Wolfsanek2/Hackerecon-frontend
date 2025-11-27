import type { LLMChatMessage } from '@/types';
import { localStorageService } from '@utils';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEYS } from '@consts';
import { hypothesisApi } from '@api';

interface LLMChatState {
	messages: LLMChatMessage[];
}

if (!localStorageService.has(LOCAL_STORAGE_KEYS.LLM_CHAT_MESSAGES)) {
	const message: LLMChatMessage = {
		type: 'hypothesis',
		data: {
			id: crypto.randomUUID(),
			title: 'Заголовок гипотезы',
			description: 'Описание гипотезы',
			attackVector: 'Вектор атаки',
			targetUrls: ['url1', 'url2', 'url3'],
			attackSequence: [
				{
					step: 1,
					action: 'Действие 1',
					description: 'Описание 1',
					expected: 'Ожидается что-то 1',
				},
				{
					step: 2,
					action: 'Действие 2',
					description: 'Описание 2',
					expected: 'Ожидается что-то 2',
				},
			],
			impact: 'low',
			effort: 'medium',
			status: 'active',
			reasoning: 'Потому-что',
			host: 'mock.com',
		},
	};
	localStorageService.llmChatMessages = Array.from<LLMChatMessage>({
		length: 5,
	}).fill(message);
}

const initialState: LLMChatState = {
	messages: localStorageService.llmChatMessages,
};

export const fetchHypothesisByHost = createAsyncThunk(
	'llmChat/fetchHypothesisStatus',
	async (host: string) => {
		console.log('thunk');
		return hypothesisApi.fetchHypothesis(host);
	}
);

const llmChatSlice = createSlice({
	name: 'llmChat',
	initialState,
	reducers: {
		addMessage: (state, action: PayloadAction<LLMChatMessage>) => {
			state.messages.push(action.payload);
		},
		clearMessages: (state) => {
			state.messages = [];
		},
	},
	selectors: {
		selectMessages: (state) => state.messages,
	},
	extraReducers(builder) {
		builder.addAsyncThunk(fetchHypothesisByHost, {
			fulfilled: (state, action) => {
				state.messages.push({
					type: 'hypothesis',
					data: action.payload,
				});
			},
		});
	},
});

export const llmChatActions = llmChatSlice.actions;
export const llmChatReducer = llmChatSlice.reducer;
export const llmChatSelectors = llmChatSlice.selectors;
