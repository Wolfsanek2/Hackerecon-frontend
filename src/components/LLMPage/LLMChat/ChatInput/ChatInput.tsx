import styles from './ChatInput.module.scss';
import { combineCN } from '@utils';

interface ChatInputProps {
	className?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ className }) => {
	return (
		<div className={combineCN(className, styles['chat-input'])}>
			<input type="text" />
		</div>
	);
};
