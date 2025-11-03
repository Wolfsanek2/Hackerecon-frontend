import type { VulnerabilityReport } from '@api';
import { createAction, createSlice } from '@reduxjs/toolkit';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
// type Message = any;
type Message = VulnerabilityReport;

interface WebSocketState {
	isConnected: boolean;
}

const initialState: WebSocketState = {
	isConnected: false,
};

const websocketSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {
		connected: (state) => {
			state.isConnected = true;
		},
		disconnected: (state) => {
			state.isConnected = false;
		},
	},
});

export interface ConnectPayload {
	url: string;
}

export const connect = createAction<ConnectPayload>(
	`${websocketSlice.name}/connect`
);
export const disconnect = createAction(`${websocketSlice.name}/disconnect`);
export const messageReceived = createAction<Message>(
	`${websocketSlice.name}/messageReceived`
);

export const { connected, disconnected } = websocketSlice.actions;
export const websocketReducer = websocketSlice.reducer;
