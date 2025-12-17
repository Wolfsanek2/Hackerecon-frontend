import {
	createSelector,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import type { OpenedSection, RequestData, RequestID, RiskLevel } from '@/types';
import { LOCAL_STORAGE_KEYS } from '@consts';
import { localStorageService } from '@utils';

interface AppState {
	requestsArray: RequestData[];
	requestDetailsOpened?: RequestID;
	openedRequestData?: RequestData;
	openedSection: OpenedSection;
	isProxyPanelOpened: boolean;
}

const generateRiskLevel = (() => {
	let count = 0;
	return (): RiskLevel => {
		switch (count++ % 4) {
			case 0:
				return 'low';
			case 1:
				return 'medium';
			case 2:
				return 'high';
			default:
				return 'critical';
		}
	};
})();

const createMockRequest = (): RequestData => {
	return {
		id: crypto.randomUUID(),
		url: 'https://mock.com',
		method: 'GET',
		status: 200,
		timestamp: new Date().toISOString(),
		requestDetails: {
			headers: {
				'cache-control':
					'no-cache, no-store, max-age=0, must-revalidate',
				'content-security-policy':
					'script-src "unsafe-eval" "self" "unsafe-inline" https://www.google.com https://apis.google.com https://ssl.gstatic.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://*.youtube.com https://*.google.com https://*.gstatic.com https://youtube.com https://www.youtube.com https://google.com https://*.doubleclick.net https://*.googleapis.com https://www.googleadservices.com https://tpc.googlesyndication.com https://www.youtubekids.com https://www.youtube-nocookie.com https://www.youtubeeducation.com https://www-onepick-opensocial.googleusercontent.com;report-uri /cspreport/allowlist, require-trusted-types-for "script"',
				'Очень-длинный-заголовок':
					'ОченьДлинныйЗаголовокОченьДлинныйЗаголовокОченьДлинныйЗаголовокОченьДлинныйЗаголовокОченьДлинныйЗаголовокОченьДлинныйЗаголовокОченьДлинныйЗаголовокОченьДлинныйЗаголовокОченьДлинныйЗаголовокОченьДлинныйЗаголовок',
			},
			resourceType: 'json',
		},
		responseDetails: {
			headers: {},
			resourceType: 'json',
		},
		securityAnalysis: {
			hasVulnerability: !!Math.round(Math.random()),
			impact: generateRiskLevel(),
			summary:
				'User profile update endpoint with potential authorization bypass',
			findings: [
				{
					title: 'IDOR in user profile update - test with different user_id',
					observation:
						'Endpoint accepts user_id=123 in request, no session validation visible',
					testRequests: [
						{
							method: 'PUT',
							url: 'https://example.com/api/users/456/profile',
							headers: {
								Authorization: 'Bearer original_token',
								'Content-Type': 'application/json',
							},
							body: '{"name":"Modified Name"}',
						},
					],
					expectedIfVulnerable:
						'HTTP 200, profile of user 456 gets updated despite token belonging to user 123',
					expectedIfSafe: 'HTTP 403 Forbidden or validation error',
					impact: 'high',
				},
				{
					title: 'Missing CSRF protection on sensitive operation',
					observation:
						'No CSRF token in form, no anti-CSRF headers checked',
					testRequests: [
						{
							method: 'POST',
							url: 'https://example.com/api/users/123/delete',
							headers: {
								Cookie: 'session=abc123',
							},
							body: '',
						},
					],
					expectedIfVulnerable:
						'Request succeeds without additional tokens',
					expectedIfSafe: 'HTTP 403 or missing CSRF token error',
					impact: 'critical',
				},
			],
		},
	};
};

const mockRequests = Array.from({ length: 20 }).map(() =>
	createMockRequest()
) as RequestData[];

const initialRequests: RequestData[] = [
	{
		id: '1',
		url: 'http://example.com',
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
		securityAnalysis: {
			impact: 'high',
			hasVulnerability: true,
			summary: 'Это summary',
			findings: [],
		},
	},
	{
		id: '2',
		url: 'http://example.com/api',
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
		securityAnalysis: {
			impact: 'low',
			hasVulnerability: false,
			summary: '',
			findings: [],
		},
	},
	...mockRequests,
];

if (!localStorageService.has(LOCAL_STORAGE_KEYS.REQUESTS)) {
	localStorageService.requests = initialRequests;
}

const initialState: AppState = {
	requestsArray: localStorageService.requests,
	openedSection: 'request',
	isProxyPanelOpened: false,
};

export const selectRequestById = createSelector(
	[(state: AppState) => state.requestsArray, (_, id: RequestID) => id],
	(requests, id) => requests.find((request) => request.id === id)
);

const selectHosts = createSelector(
	[(state: AppState) => state.requestsArray],
	(requests) => {
		return Array.from(
			requests.reduce((result, request) => {
				result.add(new URL(request.url).host);
				return result;
			}, new Set<string>())
		);
	}
);

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
		openRequestDetails: (state, action: PayloadAction<RequestID>) => {
			state.requestDetailsOpened = action.payload;
			state.openedRequestData = selectRequestById(state, action.payload);
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
	selectors: {
		selectRequestById,
		selectSecurityAnalysis: (state) =>
			state.openedRequestData!.securityAnalysis,
		selectOpenedRequestId: (state) => state.openedRequestData?.id,
		selectOpenedRequestData: (state) => state.openedRequestData,
		selectOpenedRequestDetails: (state) =>
			state.openedRequestData?.requestDetails,
		selectOpenedResponseDetails: (state) =>
			state.openedRequestData?.responseDetails,
		selectHosts,
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
export const appSliceSelectors = appSlice.selectors;
export const appReducer = appSlice.reducer;
