import { appSliceSelectors } from '@store/slices/appSlice';
import styles from './LLMChat.module.scss';
// import { ChatInput } from './ChatInput';
import { Message } from './Message';
import Button from '@components/Button';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchHypothesisByHost, llmChatSelectors } from '@store/slices/llmChat';
import { useRef, useState } from 'react';

export const LLMChat: React.FC = () => {
	const dispatch = useAppDispatch();
	const messages = useAppSelector(llmChatSelectors.selectMessages);
	const hosts = useAppSelector(appSliceSelectors.selectHosts);
	const [selectedHost, setSelectedHost] = useState(hosts[0] || '');
	const selectRef = useRef<HTMLSelectElement>(null);
	return (
		<div className={styles['llm-chat']}>
			<div className={styles.messages}>
				{messages.map((message, i) => {
					return <Message key={i} message={message} />;
				})}
			</div>
			<div className={styles.footer}>
				<div className={styles['footer__title']}>
					Запрос гипотезы для хоста
				</div>
				<div className={styles.input}>
					{hosts.length ? (
						<>
							<select
								className={styles.select}
								name="host"
								ref={selectRef}
								onChange={() =>
									setSelectedHost(selectRef.current!.value)
								}
							>
								{hosts.map((host, i) => (
									<option key={i} value={host}>
										{host}
									</option>
								))}
							</select>
							<Button
								text="Отправить"
								onClick={() =>
									dispatch(
										fetchHypothesisByHost(selectedHost)
									)
								}
							/>
						</>
					) : (
						<div>Список запросов пустой</div>
					)}
				</div>
			</div>
		</div>
	);
};
