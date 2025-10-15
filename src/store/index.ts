import { configureStore } from '@reduxjs/toolkit';
// import { requestReducer } from './slices/requestsSlice';
import { appReducer } from './slices/appSlice';
// import { requestDetailsReducer } from './slices/requestDetailsSlice';

export const store = configureStore({
	reducer: {
		// requests: requestReducer,
		app: appReducer,
		// requestDetails: requestDetailsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
