import styles from './ConnectionIndicator.module.scss';
import { combineCN } from '@utils';
import { SVG_ICON_URLS, WS_URL } from '@consts';
import { Button, Loader, SvgIcon } from '@components';
import { useAppDispatch, useAppSelector } from '@hooks';
import {
	websocketSliceActions,
	websocketSliceSelectors,
} from '@/store/slices/websocketSlice';

interface ConnectionIndicatorProps {
	isConnected: boolean;
	className?: string;
}

export const ConnectionIndicator: React.FC<ConnectionIndicatorProps> = ({
	isConnected: status,
	className,
}) => {
	const dispatch = useAppDispatch();
	const isConnecting = useAppSelector(
		websocketSliceSelectors.selectIsConnecting
	);
	const statusClass = status ? styles.connected : styles.disconnected;
	return (
		<div className={styles['connection-indicator']}>
			<SvgIcon
				svgUrl={SVG_ICON_URLS.CONNECTION_INDICATOR}
				className={combineCN(className, styles.icon, statusClass)}
			/>
			{!status && (
				<div className={styles['reconnect-container']}>
					<div className={styles.arrow}></div>
					<div>Подключение к серверу отсутствует</div>
					{isConnecting ? (
						<Loader className={styles.loader} />
					) : (
						<Button
							text="Переподключиться"
							onClick={() =>
								dispatch(
									websocketSliceActions.connect({
										url: WS_URL,
									})
								)
							}
						/>
					)}
				</div>
			)}
		</div>
	);
};
