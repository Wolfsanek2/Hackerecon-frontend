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
			riskLevel: generateRiskLevel(),
			aiComment:
				'Гипотеза: Сервер полностью доверяет значению, переданному в поле "clicks", и не проверяет его на plausibility, накопление или максимальный лимит. Злоумышленник может отправить чрезвычайно высокое число (например, 1000000) в этом поле, что приведет к немедленному завершению задачи, обходя требуемые усилия или временные затраты. Это классический пример Excessive Trust in Client-Side Input, позволяющий читерство и полный обход бизнес-правил.',
			securityChecklist: [
				{
					action: 'Проверка №1',
					description: 'Эта проверка нужна, чтобы...',
					expected: 'Должно произойти...',
				},
				{
					action: 'Проверка №2',
					description: 'Эта проверка нужна, чтобы...',
					expected: 'Должно произойти...',
				},
			],
			vulnerabilityTypes: [
				'Уязвимость 1',
				'Уязвимость 2',
				'Уязвимость 3',
			],
			extractedSecrets: [
				{
					type: 'api ключ',
					value: crypto.randomUUID(),
					location: 'example.com/api/example',
					context: 'Секрет был обнаружен при...',
				},
				{
					type: 'Пароль',
					value: crypto.randomUUID(),
					location: 'example.com/api/example',
					context: 'Секрет был обнаружен при...',
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
			riskLevel: 'high',
			hasVulnerability: true,
			aiComment: 'Это анализ от LLM',
			securityChecklist: [],
			vulnerabilityTypes: [],
			extractedSecrets: [],
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
			riskLevel: 'low',
			hasVulnerability: false,
			aiComment: '',
			securityChecklist: [],
			vulnerabilityTypes: [],
			extractedSecrets: [],
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
