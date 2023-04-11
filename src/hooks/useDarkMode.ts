import { useState } from "react";

function useDarkMode(): [boolean, () => void] {
	const [isDark, setIsDark] = useState(() => {
		if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
			return localStorage.getItem("theme") === "dark" ? true : false;
		}
		if (
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			return true;
		}
		return false;
	});

	const toggleTheme = () => setIsDark(!isDark);

	return [isDark, toggleTheme];
}

export default useDarkMode;
