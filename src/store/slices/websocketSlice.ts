import type { ReportDTO } from '@api';
import { createAction, createSlice } from '@reduxjs/toolkit';

// В общем случае Message - это any, надо сделать определение типа сообщения, когда их будет несколько. Сейчас только один тип, поэтому оставлен костыль
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
// type Message = any;
type Message = ReportDTO;

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
