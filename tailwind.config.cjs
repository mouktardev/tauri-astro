const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		// fontSize: {
		// 	xs: ".75rem",
		// 	sm: ".875rem",
		// 	base: "1rem",
		// 	lg: "1.125rem",
		// 	xl: "1.25rem",
		// 	"2xl": "1.5rem",
		// 	"3xl": "1.875rem",
		// 	"4xl": "2.25rem",
		// 	"5xl": "3rem",
		// 	"6xl": "4rem",
		// },
		screens: {
			sm: { max: "639px" },
			// => @media (max-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-dark":
					"radial-gradient(ellipse at 21% 33%, #03001C, transparent 50%),radial-gradient(ellipse at 50% 32%, #301E67, transparent 50%),radial-gradient(ellipse at 26% 83%, #2D033B, transparent 50%)",
				"gradient-light":
					"radial-gradient(ellipse at 21% 33%, #E3DFFD, transparent 50%),radial-gradient(ellipse at 50% 32%, #E5D1FA, transparent 50%),radial-gradient(ellipse at 26% 83%, #FFF4D2, transparent 50%)",
				"gradient-lines-dark":
					"linear-gradient(90deg, transparent 49%, #431E8C 49% 51%, transparent 51%) , linear-gradient(-180deg, transparent 49%, #431E8C 49% 51%, transparent 51%)",
				"gradient-lines-light":
					"linear-gradient(90deg, transparent 49%, #DC8449 49% 51%, transparent 51%) , linear-gradient(-180deg, transparent 49%, #DC8449 49% 51%, transparent 51%)",
			},
			zIndex: {
				"-1": "-1",
			},
			fontFamily: {
				open: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
			},
			cursor: {
				grab: "grab",
			},
			boxShadow: {
				"3xl":
					"-10px -10px 30px 4px rgba(0,0,0,0.1), 10px 10px 30px 4px rgba(45,78,255,0.15)",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/line-clamp"),
		require("tailwind-gradient-mask-image"),
		require("tailwind-scrollbar")({ nocompatible: true }),
	],
};
