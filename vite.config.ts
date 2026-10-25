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
	environments: {
		ssr: {
			optimizeDeps: {
				include: [
					'@base-ui/react/button',
					'@base-ui/react/merge-props',
					'@base-ui/react/use-render',
					'@date-fns/tz',
					'@portabletext/react',
					'@sanity/client',
					'@sanity/react-loader',
					'@tabler/icons-react',
					'class-variance-authority',
					'clsx',
					'date-fns',
					'date-fns/format',
					'groq',
					'react-player',
					'react-syntax-highlighter',
					'react-syntax-highlighter/dist/esm/styles/hljs',
					'sanity-image',
					'tailwind-merge',
				],
			},
		},
		rsc: {
			optimizeDeps: {
				include: [
					'@date-fns/tz',
					'@sanity/client',
					'@sanity/core-loader',
					'@sanity/core-loader/create-data-attribute',
					'@sanity/core-loader/encode-data-attribute',
					'@tabler/icons-react',
					'@tanstack/router-core',
					'@tanstack/router-core/isServer',
					'@tanstack/start-client-core',
					'@tanstack/start-server-core/createServerRpc',
					'@tanstack/start-server-core/createSsrRpc',
					'@tanstack/start-storage-context',
					'class-variance-authority',
					'clsx',
					'date-fns',
					'date-fns/format',
					'groq',
					'sanity-image',
					'tailwind-merge',
				],
			},
		},
	},
	plugins: [
		devtools(),
		svgr(),
		cloudflare({
			viteEnvironment: {
				name: 'ssr',
				childEnvironments: ['rsc'],
			},
		}),
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
