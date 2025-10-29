import { createSlice } from '@reduxjs/toolkit';

interface WebSocketState {
	isConnected: boolean;
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
	message?: any;
}

const initialState: WebSocketState = {
	isConnected: false,
};

const websocketSlice = createSlice({
	name: 'websocket',
	initialState,
	reducers: {
		websocketConnected: (state) => {
			state.isConnected = true;
		},
		websocketDisconnected: (state) => {
			state.isConnected = false;
		},
	},
});

export const { websocketConnected, websocketDisconnected } =
	websocketSlice.actions;
export const websocketReducer = websocketSlice.reducer;
