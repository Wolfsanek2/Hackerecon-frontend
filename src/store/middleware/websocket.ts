import type { Middleware } from '@reduxjs/toolkit';
import type { AppDispatch, RootState } from '@store';
import {
	connect,
	connected,
	disconnected,
	messageReceived,
} from '@store/slices/websocketSlice';
import { addRequest } from '@store/slices/appSlice';
import { vulnerabilityReportToRequestData } from '@api';

class WebSocketService {
	private socket: WebSocket | null = null;

	connect(url: string, dispatch: AppDispatch) {
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
			store.dispatch(
				addRequest(vulnerabilityReportToRequestData(action.payload))
			);
		}

		return next(action);
	};
