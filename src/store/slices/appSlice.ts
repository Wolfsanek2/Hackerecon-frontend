import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OpenedSection, RequestData } from '@/types';
import { LOCAL_STORAGE_KEYS } from '@/consts';
import { localStorageService } from '@/utils';

interface AppState {
	backendWsUrl: string;
	requestsArray: RequestData[];
	requestDetailsOpened?: string;
	openedRequestData?: RequestData;
	openedSection: OpenedSection;
	isProxyPanelOpened: boolean;
}

const createMockRequest = (): RequestData => {
	return {
		id: crypto.randomUUID(),
		url: 'https://mock.com',
		method: 'GET',
		status: 200,
		timestamp: new Date().toISOString(),
		requestDetails: {
			headers: {},
			resourceType: 'json',
		},
		responseDetails: {
			headers: {},
			resourceType: 'json',
		},
		hasVulnerability: false,
		riskLevel: 'low',
		llmAnalysis: '',
	};
};

const initialRequests: RequestData[] = [
	{
		id: '1',
		url: 'example.com',
		method: 'GET',
		timestamp: new Date().toISOString(),
		status: 200,
		requestDetails: {
			headers: {
				key1: 'value 1',
				key2: 'value 2',
			},
			resourceType: 'json',
			body: 'body 1, body 1, body 1, body 1, body 1, body 1',
		},
		responseDetails: {
			headers: {
				key3: 'value 3',
				key4: 'value 4',
			},
			resourceType: 'json',
			body: 'body 2, body 2, body 2, body 2, body 2, body 2',
		},
		riskLevel: 'high',
		llmAnalysis: 'Это анализ от LLM',
		hasVulnerability: true,
	},
	{
		id: '2',
		url: 'example.com/api',
		method: 'POST',
		timestamp: new Date().toISOString(),
		status: 404,
		requestDetails: {
			headers: {},
			resourceType: 'json',
		},
		responseDetails: {
			resourceType: 'json',
			headers: {},
		},
		riskLevel: 'low',
		llmAnalysis: '',
		hasVulnerability: false,
	},
	...(Array.from({ length: 20 }).fill(createMockRequest()) as RequestData[]),
];

if (!localStorageService.has(LOCAL_STORAGE_KEYS.REQUESTS)) {
	localStorageService.requests = initialRequests;
}

const initialState: AppState = {
	backendWsUrl: 'ws://127.0.0.1:8081/ws',
	requestsArray: localStorageService.requests,
	openedSection: 'request',
	isProxyPanelOpened: false,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		addRequest: (state, action: PayloadAction<RequestData>) => {
			state.requestsArray.push(action.payload);
		},
		clearRequests: (state) => {
			state.requestsArray = [];
		},
		openRequestDetails: (state, action: PayloadAction<string>) => {
			state.requestDetailsOpened = action.payload;
			state.openedRequestData = state.requestsArray.find(
				(request) => request.id === action.payload
			);
		},
		closeRequestDetails: (state) => {
			state.requestDetailsOpened = undefined;
			state.openedRequestData = undefined;
		},
		openSection: (state, action: PayloadAction<OpenedSection>) => {
			state.openedSection = action.payload;
		},
		openProxyPanel: (state) => {
			state.isProxyPanelOpened = true;
		},
		closeProxyPanel: (state) => {
			state.isProxyPanelOpened = false;
		},
	},
});

export const {
	addRequest,
	clearRequests,
	openRequestDetails,
	closeRequestDetails,
	openSection,
	openProxyPanel,
	closeProxyPanel,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
