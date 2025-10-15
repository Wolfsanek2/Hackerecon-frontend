import type { OpenedSection, RequestData } from '@/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppState {
	requestsArray: RequestData[];
	requestDetailsOpened?: number;
	openedRequestData?: RequestData;
	openedSection: OpenedSection;
	isProxyPanelOpened: boolean;
}

const initialState: AppState = {
	requestsArray: [
		{
			id: 1,
			url: 'example.com',
			method: 'GET',
			headers: {
				key1: 'value 1',
				key2: 'value 2',
			},
			timestamp: new Date().toISOString(),
			resourceType: 'script',
			body: 'body 1, body 1, body 1, body 1, body 1, body 1',
			response: {
				statusCode: 200,
				statusLine: 'OK',
				headers: {
					key3: 'value 3',
					key4: 'value 4',
				},
				body: 'body 2, body 2, body 2, body 2, body 2, body 2',
			},
			llmAnalysis: 'Это анализ от LLM',
		},
		{
			id: 2,
			url: 'example.com/api',
			method: 'POST',
			headers: {},
			timestamp: new Date().toISOString(),
			resourceType: 'json',
			response: {
				statusCode: 404,
				statusLine: 'Not found',
				headers: {},
			},
			llmAnalysis: '',
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
		openRequestDetails: (state, action: PayloadAction<number>) => {
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
