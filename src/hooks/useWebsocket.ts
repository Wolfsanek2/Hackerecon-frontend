import { useEffect } from 'react';
import { connect, disconnect } from '@store/slices/websocketSlice';
import { useAppDispatch, useAppSelector } from '.';

export const useWebsocket = (url: string) => {
	const dispatch = useAppDispatch();
	const websocketState = useAppSelector((state) => state.websocket);

	useEffect(() => {
		dispatch(connect({ url }));

		return () => {
			dispatch(disconnect());
		};
	}, [url, dispatch]);

	return { ...websocketState };
};
