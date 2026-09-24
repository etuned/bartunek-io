import { PortableText } from '@portabletext/react';
import { ClientOnly, createFileRoute, Link } from '@tanstack/react-router';
import { buildSrc, buildSrcSet } from 'sanity-image';
import { NotFound } from '#/components/ not-found';
import { FormatDatetime } from '#/components/date-formater';
import { Image } from '#/components/image';
import { Badge } from '#/components/ui/badge';
import { Skeleton } from '#/components/ui/skeleton';
import { dataset, projectId } from '#/sanity/client';
import { components } from '#/sanity/utils/serializers';
import { fetchPost } from '../../utils/blog-post';

export const Route = createFileRoute('/blog/$slug')({
	notFoundComponent: () => (
		<NotFound title="Oops, No Post Found">
			<p>
				Looks like I didn't write a post at that url. We could go back one page
				or just start over.
			</p>
		</NotFound>
	),
	loader: async ({ params: { slug } }) => {
		const post = await fetchPost({ data: slug });
		return post;
	},
	head: ({ loaderData }) => {
		const imageId = loaderData?.mainImage?.id;
		const baseUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/`;
		const preloadLinks = imageId
			? [
					{
						rel: 'preload',
						as: 'image',
						href: buildSrc({
							baseUrl,
							id: imageId,
						}).src,
						imageSrcSet: buildSrcSet({
							baseUrl,
							id: imageId,
						}).join(', '),
						imageSizes: '100vw',
						fetchPriority: 'high' as const,
					},
				]
			: [];

		return {
			meta: [
				{
					title: `${loaderData?.title ?? 'No Blog Post Found'}  | Edwin Bartunek`,
				},
				loaderData?.short
					? {
							name: 'description',
							content: `${loaderData?.short}`,
						}
					: {},
			],

			links: [
				loaderData?.slug
					? {
							rel: 'canonical',
							href: `https://www.bartunek.io/blog/${loaderData?.slug}`,
						}
					: {},
				...preloadLinks,
			],
		};
	},

	component: BlogSlugComponent,
});

function BlogSlugComponent() {
	const post = Route.useLoaderData();
	return (
		<div>
			{post && (
				<>
					<hr className="gradient" />
					<section className="w-full h-95 relative overflow-clip">
						<Image
							className="absolute top-0 left-0 w-full h-full object-cover select-none z-1"
							id={post?.mainImage?.id}
							alt={post?.mainImage?.alt}
							loading="eager"
							fetchPriority="high"
							sizes="100vw"
							style={
								post?.mainImage?.lqip
									? {
											backgroundImage: `url(${post.mainImage.lqip})`,
											backgroundSize: 'cover',
										}
									: undefined
							}
						/>

						<div className="p-4 w-full relative z-2 bg-brand-dkblue/80">
							<div className="max-w-lg mx-auto">
								<span className="text-2xl">{post?.title}</span>
							</div>
						</div>
					</section>

					<hr className="gradient" />

					<section className="p-4 w-full mx-auto bg-brand-dkblue">
						<div className="w-full max-w-lg mx-auto p-4">
							<div className="my-1 flex justify-between">
								<div className="flex-start">
									<h2>Written:</h2>
									<h2>
										<ClientOnly
											fallback={<Skeleton className="my-0.5 h-4 w-42" />}
										>
											<FormatDatetime
												dateObject={{ datetimeString: post?.date }}
											/>
										</ClientOnly>
									</h2>
									<h2>by</h2>

									{post?.authors?.map(({ id, name, image }) => (
										<h2 key={id} className="flex-0 justify-center items-center">
											<div className="my-4 flex-col gap-4">
												<Image
													className="rounded-full"
													id={image?.id}
													alt={post?.authors.at(0)?.image?.alt}
													preview={image?.lqip}
													mode="cover"
													height={45}
													width={45}
													sizes="(min-width: 1280px) 390px, calc((100vw - 40px - 30px) / 3)"
												/>
												<p>{name}</p>
											</div>
										</h2>
									))}
								</div>

								<div className="flex-wrap">
									{post?.categories?.map(({ id, name }) => (
										<div
											key={id}
											className="flex-0 justify-center items-center"
										>
											<div className="flex-col gap-4">
												<Badge key={id}>{name}</Badge>
											</div>
										</div>
									))}
								</div>
							</div>

							<PortableText
								value={post?.mainContent}
								onMissingComponent={false}
								components={components}
							/>
							<p className="mt-4 text-center">
								<Link to="/blog">Back to the blog list</Link>
							</p>
						</div>
					</section>
					<hr className="gradient" />
				</>
			)}
		</div>
	);
}
