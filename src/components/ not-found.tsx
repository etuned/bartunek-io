import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { Button } from './ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from './ui/empty';

export function NotFound({ children }: { children?: ReactNode }) {
	return (
		<>
			<hr className="gradient" />
			<Empty className="bg-brand-dkblue">
				<EmptyHeader>
					<EmptyTitle className="text-2xl font-bold">
						Oops. Not Found
					</EmptyTitle>
					<EmptyMedia>
						<img
							src="/404-page-img.png"
							alt="a man looking at a map confused to show the page is not found"
							width={250}
							height={120}
							sizes="(min-width: 1240px) 390px, calc((100vw - 40px - 30px) / 3)"
						/>
					</EmptyMedia>
					<EmptyDescription>
						{children || (
							<p>
								The page you are looking for does not exist. We could back one
								page or just start over.
							</p>
						)}
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent className="flex-row justify-center gap-2">
					<Button onClick={() => window.history.back()}>Go Back</Button>
					<Link
						to="/"
						className="bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm"
					>
						Start Over
					</Link>
				</EmptyContent>
			</Empty>
			<hr className="gradient" />
		</>
	);
}
