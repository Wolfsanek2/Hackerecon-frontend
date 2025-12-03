import { useEffect } from 'react';
import {
	disconnect,
	websocketSliceActions,
} from '@store/slices/websocketSlice';
import { useAppDispatch, useAppSelector } from '.';

export const useWebsocket = (url: string) => {
	const dispatch = useAppDispatch();
	const websocketState = useAppSelector((state) => state.websocket);

	useEffect(() => {
		dispatch(websocketSliceActions.connect({ url }));

		return () => {
			dispatch(disconnect());
		};
	}, [url, dispatch]);

	return { ...websocketState };
};
