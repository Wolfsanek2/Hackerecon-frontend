import './Button.scss';

interface ButtonProps {
	text?: string;
	className?: string;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	text = '',
	className = '',
	onClick,
}) => {
	return (
		<button className={className + ' button'} onClick={onClick}>
			{text}
		</button>
	);
};

export { Button };
