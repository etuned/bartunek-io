import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import rsc from '@vitejs/plugin-rsc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		svgr(),
		cloudflare({ viteEnvironment: { 
			name: 'ssr',
			childEnvironments: ["rsc"],
		 } }),
		tailwindcss(),
		tanstackStart({
			rsc: {
				enabled: true,
			},
			prerender: {
				enabled: true,
			},
		}),
		rsc(),
		viteReact(),
	],
});

export default config;
