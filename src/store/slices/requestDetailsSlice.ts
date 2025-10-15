// import type { RequestData } from '@/types';
// import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// type OpenedSection = 'request' | 'response';

// interface RequestDetailsState {
// 	requestData?: RequestData;
// 	openedSection: OpenedSection;
// }

// const initialState: RequestDetailsState = {
// 	openedSection: 'request',
// };

// export const requestDetailsSlice = createSlice({
// 	name: 'requestDetails',
// 	initialState,
// 	reducers: {
// 		openSection: (state, action: PayloadAction<OpenedSection>) => {
// 			state.openedSection = action.payload;
// 		},
// 	},
// });

// export const { openSection } = requestDetailsSlice.actions;
// export const requestDetailsReducer = requestDetailsSlice.reducer;
