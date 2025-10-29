export interface WebSocketMessage {
	type: string;
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	payload?: any;
}

export type WebsocketAction = 'WEBSOCKET_CONNECT' | 'WEBSOCKET_DISCONNECT';
