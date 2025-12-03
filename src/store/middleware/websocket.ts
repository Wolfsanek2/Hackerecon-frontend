import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from '@store';
import {
	messageReceived,
	websocketSliceActions,
} from '@store/slices/websocketSlice';
import { addRequest, clearRequests } from '@store/slices/appSlice';
import { reportDtoToRequestData } from '@api';
import { localStorageService, webSocketService } from '@utils';

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export const websocketMiddleware: Middleware<{}, RootState> =
	(store) => (next) => (action) => {
		if (websocketSliceActions.connect.match(action)) {
			webSocketService.connect(action.payload.url, store.dispatch);
		} else if (messageReceived.match(action)) {
			const savedRequests = localStorageService.requests;
			const requestData = reportDtoToRequestData(action.payload);
			savedRequests.push(requestData);
			localStorageService.requests = savedRequests;
			store.dispatch(addRequest(requestData));
		} else if (clearRequests.match(action)) {
			localStorageService.requests = [];
		}

		return next(action);
	};
