import type { Middleware } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@store';
import {
	connect,
	connected,
	disconnected,
	messageReceived,
} from '@store/slices/websocketSlice';
import { addRequest } from '@store/slices/appSlice';
import { reportDtoToRequestData } from '@api';
import { LOCAL_STORAGE_KEYS } from '@/consts';
import type { RequestData } from '@/types';

class WebSocketService {
	private socket: WebSocket | null = null;

	connect(url: string, dispatch: AppDispatch) {
		if (this.socket && this.socket.url === url) {
			return;
		}

		this.socket = new WebSocket(url);

		this.socket.onopen = () => {
			dispatch(connected());
		};

		this.socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			dispatch(messageReceived(message));
		};

		this.socket.onclose = () => {
			dispatch(disconnected());
		};
	}
}

export const webSocketService = new WebSocketService();

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export const websocketMiddleware: Middleware<{}, RootState> =
	(store) => (next) => (action) => {
		if (connect.match(action)) {
			webSocketService.connect(action.payload.url, store.dispatch);
		}
		if (messageReceived.match(action)) {
			const savedRequests = JSON.parse(
				localStorage.getItem(LOCAL_STORAGE_KEYS.REQUESTS)!
			) as RequestData[];
			const requestData = reportDtoToRequestData(action.payload);
			savedRequests.push(requestData);
			localStorage.setItem(
				LOCAL_STORAGE_KEYS.REQUESTS,
				JSON.stringify(savedRequests)
			);
			store.dispatch(addRequest(requestData));
		}

		return next(action);
	};
