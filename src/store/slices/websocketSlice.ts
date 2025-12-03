import { WS_STATUS } from '@/consts';
import type { WebsocketStatus } from '@/types';
import type { ReportDTO } from '@api';
import {
	createAction,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';

// В общем случае Message - это any, надо сделать определение типа сообщения, когда их будет несколько. Сейчас только один тип, поэтому оставлен костыль
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
// type Message = any;
type Message = ReportDTO;

interface WebSocketState {
	url?: string;
	status: WebsocketStatus;
}

const initialState: WebSocketState = {
	status: WS_STATUS.DISCONNECTED,
};

export interface ConnectPayload {
	url: string;
}

const websocketSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {
		connect: (state, action: PayloadAction<ConnectPayload>) => {
			state.url = action.payload.url;
			state.status = WS_STATUS.CONNECTING;
		},
		connected: (state) => {
			state.status = WS_STATUS.CONNECTED;
		},
		disconnected: (state) => {
			state.status = WS_STATUS.DISCONNECTED;
		},
	},
	selectors: {
		selectIsConnected: (state) => state.status === WS_STATUS.CONNECTED,
		selectIsConnecting: (state) => state.status === WS_STATUS.CONNECTING,
	},
});

export const disconnect = createAction(`${websocketSlice.name}/disconnect`);
export const messageReceived = createAction<Message>(
	`${websocketSlice.name}/messageReceived`
);

export const websocketSliceActions = websocketSlice.actions;
export const websocketSliceSelectors = websocketSlice.selectors;
export const websocketReducer = websocketSlice.reducer;
