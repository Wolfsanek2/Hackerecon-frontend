import styles from './Message.module.scss';
import { combineCN } from '@utils';
import type { LLMChatMessage } from '@/types';
import { HypothesisMessage } from './HypothesisMessage';

interface MessageProps {
	className?: string;
	message: LLMChatMessage;
}

export const Message: React.FC<MessageProps> = ({ className, message }) => {
	let messageContent;
	if (typeof message === 'string') {
		messageContent = message;
	} else {
		switch (message.type) {
			case 'hypothesis':
				messageContent = (
					<HypothesisMessage hypothesis={message.data} />
				);
				break;
		}
	}
	return (
		<div className={combineCN(styles.message, className)}>
			{messageContent}
		</div>
	);
};
