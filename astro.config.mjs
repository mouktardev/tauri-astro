import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
	],
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
});
