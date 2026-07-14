// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { Image } from '#/components/image';
import { PostCards } from '#/components/post-cards';
import { ProjectCards } from '#/components/project-cards';
import { AnchorExternalLink } from '#/components/ui/anchor-link';

import { fetchHomeInfo } from '../../utils/home-info';

export const Route = createFileRoute('/')({
	head: () => ({
		meta: [
			{
				title: 'Edwin Bartunek - A Senior Software Engineer',
			},
			{
				name: 'description',
				content:
					'A software engineer building for the web and writing about it.',
			},
		],
		links: [
			{
				rel: 'canonical',
				href: 'https://www.bartunek.io',
			},
		],
	}),
	loader: async () => await fetchHomeInfo(),
	component: Home,
});

function Home() {
	const info = Route.useLoaderData();

	return (
		<>
			<section className="w-full max-w-lg mx-auto">
				<div className="w-full p-4 flex flex-col items-center gap-1 md:flex-row md:justify-center">
					<div className="w-full max-w-120 mb-4 p-2 flex flex-col gap-4 md:max-w-165 md:p-6">
						<p>
							<span className="block">Hi, my name is</span>
							<span className=" block text-[4rem] text-brand-aqua">
								{info?.author?.name}.
							</span>
						</p>
						<h2 className="text-[2.5rem] font-normal">I help build the web.</h2>
						<p className="w-full md:max-w-110">
							I am a senior software engineer, focused on creating accessible,
							user friendly software platforms on the web. I am also obssesed
							with pizza and coffee!
						</p>
						<p>
							Currently, I am working at{' '}
							<AnchorExternalLink href={info?.author?.employer?.website}>
								{info?.author?.employer?.name}
							</AnchorExternalLink>
						</p>
					</div>
					<Image
						className="rounded-xl h-[350px] w-[350px]"
						id={info?.author?.image?.id ?? ''}
						alt={info?.author?.image?.alt}
						preview={info?.author?.image?.lqip}
						height={350}
						width={350}
					/>
				</div>
			</section>

			<section className="w-full mx-auto bg-brand-dkblue">
				<hr className="gradient" />
				<div className="p-4 max-w-lg mx-auto">
					<h3 className="text-3xl font-black">My Recent Blog Posts</h3>
					<div className="max-w-max my-20 mx-auto">
						<PostCards posts={info?.posts} />
					</div>
				</div>
			</section>
			<hr className="gradient" />
			<section className="w-full mx-auto bg-brand-plum">
				<div className="p-4 max-w-lg mx-auto">
					<h3 className="text-3xl font-black">My Recent Projects</h3>
					<ProjectCards projects={info?.projects} />
				</div>
				<hr className="gradient" />
			</section>
		</>
	);
}
