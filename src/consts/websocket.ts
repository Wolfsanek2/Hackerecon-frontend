import type {
	WebsocketStatusConnected,
	WebsocketStatusConnecting,
	WebsocketStatusDisconnected,
} from '@/types';

const DISCONNECTED: WebsocketStatusDisconnected = 'DISCONNECTED';
const CONNECTING: WebsocketStatusConnecting = 'CONNECTING';
const CONNECTED: WebsocketStatusConnected = 'CONNECTED';

export const WS_STATUS = {
	DISCONNECTED,
	CONNECTING,
	CONNECTED,
};
