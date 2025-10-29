import { useEffect } from 'react';
import { connect } from '@store/middleware/websocket';
import { useAppDispatch, useAppSelector } from '.';

export const useWebsocket = (url: string) => {
	const dispatch = useAppDispatch();
	const websocketState = useAppSelector((state) => state.websocket);

	useEffect(() => {
		dispatch(connect({ url }));

		return () => {
			dispatch({ type: 'WEBSOCKET_DISCONNECT' });
		};
	}, [url, dispatch]);

	return { ...websocketState };
};
