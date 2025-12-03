import type { AppDispatch } from '@store';
import {
	messageReceived,
	websocketSliceActions,
} from '@store/slices/websocketSlice';

class WebSocketService {
	private socket: WebSocket | null = null;

	connect(url: string, dispatch: AppDispatch) {
		if (
			this.socket &&
			this.socket.readyState === this.socket.OPEN &&
			this.socket.url === url
		) {
			return;
		}

		this.socket = new WebSocket(url);

		this.socket.onopen = () => {
			dispatch(websocketSliceActions.connected());
		};

		this.socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			dispatch(messageReceived(message));
		};

		this.socket.onclose = () => {
			dispatch(websocketSliceActions.disconnected());
		};
	}
}

export const webSocketService = new WebSocketService();
