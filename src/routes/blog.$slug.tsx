import { PortableText } from '@portabletext/react';
import { ClientOnly, createFileRoute, Link } from '@tanstack/react-router';
import { FormatDatetime } from '#/components/date-formater';
import { Image } from '#/components/image';
import { Badge } from '#/components/ui/badge';
import { Skeleton } from '#/components/ui/skeleton';
import { fetchPost } from '../../utils/blog-post';

export const Route = createFileRoute('/blog/$slug')({
	loader: async ({ params: { slug } }) => {
		const post = await fetchPost({ data: slug });
		return post;
	},
	head: ({ loaderData }) => ({
		meta: [
			{ title: `${loaderData?.title ?? 'Blog Post'}  | Edwin Bartunek` },
			{
				name: 'description',
				content:
				`${loaderData?.short ?? 'A short blog post'}`,
			},
		],
		links: [
			{
				rel: 'canonical',
				href: `https://www.bartunek.io/blog/${loaderData?.slug ?? 'a-blog-slug'}`,
			},
		],
	}),

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
							preview={post?.mainImage?.lqip}
						/>

						<div className="relative z-2">
							<h1 className="p-4 bg-brand-dkblue/80 text-2xl">{post?.title}</h1>
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
											<div className="flex-col gap-4">
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
