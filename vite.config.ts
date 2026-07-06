import { cloudflare } from '@cloudflare/vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import Sitemap from 'vite-plugin-sitemap';
import svgr from 'vite-plugin-svgr';

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		svgr(),
		cloudflare({ viteEnvironment: { name: 'ssr' } }),
		tailwindcss(),
		tanstackStart(),
		viteReact(),
		Sitemap(),
	],
});

export default config;
