// import type { RequestData } from '@/types';
// import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// interface RequestsState {
// 	requestsArray: RequestData[];
// }

// const initialState: RequestsState = {
// 	requestsArray: [
// 		{
// 			id: 1,
// 			url: 'example.com',
// 			method: 'GET',
// 			timestamp: new Date().toISOString(),
// 			resourceType: 'script',
// 			response: {
// 				statusCode: 200,
// 				statusLine: 'OK',
// 			},
// 		},
// 		{
// 			id: 2,
// 			url: 'example.com/api',
// 			method: 'POST',
// 			timestamp: new Date().toISOString(),
// 			resourceType: 'json',
// 			response: {
// 				statusCode: 404,
// 				statusLine: 'Not found',
// 			},
// 		},
// 	],
// };

// export const requestsSlice = createSlice({
// 	name: 'requests',
// 	initialState,
// 	reducers: {
// 		addRequest: (state, action: PayloadAction<RequestData>) => {
// 			state.requestsArray.push(action.payload);
// 		},
// 		clearRequests: (state) => {
// 			state.requestsArray = [];
// 		},
// 	},
// });

// export const { addRequest, clearRequests } = requestsSlice.actions;
// export const requestReducer = requestsSlice.reducer;
