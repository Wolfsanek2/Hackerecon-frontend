import styles from './Button.module.scss';

interface ButtonProps {
	text?: string;
	imgUrl?: string;
	className?: string;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	text = '',
	imgUrl = '',
	className = '',
	onClick,
}) => {
	return (
		<button
			className={`${className} ${styles.button} ${
				text ? styles.button_text : ''
			} ${imgUrl ? styles.button_img : ''}`}
			onClick={onClick}
		>
			{imgUrl ? <img className="img" src={imgUrl} alt="" /> : text}
		</button>
	);
};

export { Button };
