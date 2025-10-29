import { createAction, type Middleware } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@store';
import {
	websocketConnected,
	websocketDisconnected,
} from '@store/slices/websocketSlice';
import { messageRecieved } from '@store/slices/appSlice';

class WebSocketService {
	private socket: WebSocket | null = null;

	connect(url: string, dispatch: AppDispatch) {
		this.socket = new WebSocket(url);

		this.socket.onopen = () => {
			dispatch(websocketConnected());
		};

		this.socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			dispatch(messageRecieved(message));
		};

		this.socket.onclose = () => {
			dispatch(websocketDisconnected());
		};
	}
}

export const webSocketService = new WebSocketService();

export interface ConnectPayload {
	url: string;
}
export const connect = createAction<ConnectPayload>('connect');
export const disconnect = createAction('disconnect');

/* eslint-disable-next-line @typescript-eslint/no-empty-object-type */
export const websocketMiddleware: Middleware<{}, RootState> =
	(store) => (next) => (action) => {
		if (connect.match(action)) {
			webSocketService.connect(action.payload.url, store.dispatch);
		}

		return next(action);
	};
