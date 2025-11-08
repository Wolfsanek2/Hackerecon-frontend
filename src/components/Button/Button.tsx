import styles from './Button.module.scss';

interface ButtonProps {
	className?: string;
	text?: string;
	imgUrl?: string;
	svgUrl?: string;
	onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
	className = '',
	text = '',
	imgUrl = '',
	svgUrl = '',
	onClick,
}) => {
	let content: React.ReactNode | string = text;
	if (imgUrl) {
		content = <img className="img" src={imgUrl} alt="" />;
	} else if (svgUrl) {
		content = (
			<svg className="svg">
				<use href={svgUrl} />
			</svg>
		);
	}
	return (
		<button
			className={`
				${className} ${styles.button}
				${text ? styles.button_text : ''}
				${imgUrl ? styles.button_img : ''}
				${svgUrl ? styles.button_svg : ''}
			`}
			onClick={onClick}
		>
			{content}
		</button>
	);
};

export { Button };
