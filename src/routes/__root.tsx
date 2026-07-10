// src/routes/__root.tsx

import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from '@tanstack/react-router';
import type { ReactNode } from 'react';
import '../styles/root.css';
import {
	IconBrandBluesky,
	IconBrandGithub,
	IconBrandLinkedin,
} from '@tabler/icons-react';
import { NavigationBar } from '#/components/navigation-bar';
import { AnchorExternalLink } from '#/components/ui/anchor-link';
import { Footer } from '#/components/ui/footer';
import { BLUESKY_URL, GITHUB_URL, LINKEDIN_URL } from '#/const';

import appCss from '../styles/root.css?url';

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
		],
		links: [
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				type: 'image/svg',
				href: '/favicon.svg',
			},
			{
				rel: 'icon',
				type: 'image/svg',
				sizes: '32x32',
				href: '/favicon.svg',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon.svg',
			},
			{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
			{ rel: 'icon', href: '/favicon.svg' },
			{
				rel: 'stylesheet',
				href: appCss,
			},
		],
	}),
	shellComponent: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en-US">
			<head>
				<HeadContent />
			</head>
			<body>
				<NavigationBar />
				<main className="root">{children}</main>
				<Footer>
					<div className="w-full">
						<p className="text-2xl text-center">
							Contact me through my social accounts!
						</p>
					</div>
					<div className="flex justify-center gap-10">
						<AnchorExternalLink href={LINKEDIN_URL}>
							<IconBrandLinkedin height={60} width={60} />
						</AnchorExternalLink>

						<AnchorExternalLink href={BLUESKY_URL}>
							<IconBrandBluesky height={60} width={60} />
						</AnchorExternalLink>

						<AnchorExternalLink href={GITHUB_URL}>
							<IconBrandGithub height={60} width={60} />
						</AnchorExternalLink>
					</div>

					<div className="w-full">
						<p className="text-center">
							&copy; 2022 - {new Date().getFullYear()} Edwin Bartunek. All
							rights reserved.
						</p>
					</div>
				</Footer>
				<Scripts />
			</body>
		</html>
	);
}
