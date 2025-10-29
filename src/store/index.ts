import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appReducer } from './slices/appSlice';
import { websocketReducer } from './slices/websocketSlice';
import { websocketMiddleware } from './middleware/websocket';

const rootReducer = combineReducers({
	app: appReducer,
	websocket: websocketReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(websocketMiddleware);
	},
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
