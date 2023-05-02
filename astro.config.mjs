import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import copy from "rollup-plugin-copy";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [
			copy({
				targets: [
					{
						src: "node_modules/@mxsir/image-tiny/dist/pngtiny-custom.wasm",
						dest: "public",
					},
				],
				verbose: true,
				hook: "writeBundle",
			}),
		],
	},
	integrations: [
		react(),
		tailwind({
			config: {
				applyBaseStyles: false,
			},
		}),
	],
	server: { port: 1420 }

	// output: "server",
	// adapter: node({
	// 	mode: "standalone",
	// }),
});
