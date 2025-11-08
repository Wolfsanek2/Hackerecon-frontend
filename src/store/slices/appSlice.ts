import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OpenedSection, RequestData } from '@/types';

interface AppState {
	backendWsUrl: string;
	requestsArray: RequestData[];
	requestDetailsOpened?: string;
	openedRequestData?: RequestData;
	openedSection: OpenedSection;
	isProxyPanelOpened: boolean;
}

const initialState: AppState = {
	backendWsUrl: 'ws://127.0.0.1:8081/ws',
	requestsArray: [
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
	],
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
