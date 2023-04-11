import useDarkMode from "@hooks/useDarkMode";
import * as Icons from "@svg/Icons";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ThemeToggle() {
	const [isDark, toggleTheme] = useDarkMode();

	const variants = {
		dark: { x: 0 },
		light: { x: 35 },
	};

	const spring = {
		type: "spring",
		stiffness: 700,
		damping: 30,
	};

	useEffect(() => {
		const root = document.documentElement;
		if (isDark) {
			root.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			root.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	return (
		<div
			className="relative z-20 w-[70px] py-[3px] flex rounded-full cursor-pointer bg-neutral-200 dark:bg-neutral-800"
			onClick={toggleTheme}
		>
			<motion.div
				animate={isDark ? "dark" : "light"}
				variants={variants}
				transition={spring}
				className="p-4 z-10 bg-neutral-400 dark:bg-white rounded-full"
			></motion.div>
			<div className="absolute w-full top-0 bottom-0 grid grid-flow-col auto-cols-[1fr] place-items-center px-1">
				<Icons.Day className="w-7 text-neutral-600" />
				<Icons.Night className="w-7 text-neutral-300" />
			</div>
		</div>
	);
}
