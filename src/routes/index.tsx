// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { buildSrc, buildSrcSet } from 'sanity-image';
import { Image } from '#/components/image';
import { PostCards } from '#/components/post-cards';
import { ProjectCards } from '#/components/project-cards';
import { AnchorExternalLink } from '#/components/ui/anchor-link';
import { fetchHomeInfo } from '../../utils/home-info';
import { dataset, projectId } from '../sanity/client';

export const Route = createFileRoute('/')({
	head: ({ loaderData }) => {
		const imageId = loaderData?.author?.image?.id;
		const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`;
		const preloadLinks = imageId
			? [
					{
						rel: 'preload',
						as: 'image',
						href: buildSrc({
							baseUrl,
							id: imageId,
							width: 350,
							height: 350,
							mode: 'contain',
						}).src,
						imageSrcSet: buildSrcSet({
							baseUrl,
							id: imageId,
							width: 350,
							height: 350,
							mode: 'contain',
						}).join(', '),
						fetchPriority: 'high' as const,
					},
				]
			: [];

		return {
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
				...preloadLinks,
			],
		};
	},
	loader: async () => await fetchHomeInfo(),
	component: Home,
});

function Home() {
	const info = Route.useLoaderData();

	return (
		<>
			<section className="w-full max-w-lg mx-auto">
				<div className="w-full py-4 flex flex-col items-center gap-1 md:flex-row md:justify-between">
					<div className="w-full max-w-120 mb-4 p-6 flex flex-col gap-4 md:max-w-165">
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
						className="rounded-xl h-87.5 w-87.5 mx-6"
						id={info?.author?.image?.id ?? ''}
						alt={info?.author?.image?.alt}
						height={350}
						width={350}
						loading="eager"
						fetchPriority="high"
						style={
							info?.author?.image?.lqip
								? {
										backgroundImage: `url(${info.author.image.lqip})`,
										backgroundSize: 'cover',
									}
								: undefined
						}
					/>
				</div>
			</section>

			<section className="w-full mx-auto bg-brand-dkblue">
				<hr className="gradient" />
				<div className="p-6 max-w-lg mx-auto">
					<h3 className="text-3xl font-black">My Recent Blog Posts</h3>
					<div className="max-w-max my-20 mx-auto">
						<PostCards posts={info?.posts} />
					</div>
				</div>
			</section>
			<hr className="gradient" />
			<section className="w-full mx-auto bg-brand-plum">
				<div className="p-6 max-w-lg mx-auto">
					<h3 className="text-3xl font-black">My Recent Projects</h3>
					<ProjectCards projects={info?.projects} />
				</div>
				<hr className="gradient" />
			</section>
		</>
	);
}
