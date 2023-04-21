import { pushButton, transition2 } from "@anim/ani";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

type Props = {
	// onClick: React.MouseEventHandler<HTMLButtonElement>
	children: ReactNode;
	onClick?: any;
	onStart?: any;
	className?: string;
	id?: string;
};

export default function Button({
	children,
	onClick,
	onStart,
	className,
	id,
}: Props) {
	let [pressing, setPressing] = useState(false);
	return (
		<motion.button
			type="button"
			onClick={onClick}
			onTapStart={() => {
				setPressing(true);
				onStart;
			}}
			onTap={() => {
				setPressing(false);
			}}
			onTapCancel={() => {
				setPressing(false);
			}}
			animate={pressing ? "pressed" : "unpressed"}
			initial={false}
			variants={pushButton}
			transition={transition2}
			className={`flex items-center justify-center  ${className}`}
			id={id}
		>
			{children}
		</motion.button>
	);
}
