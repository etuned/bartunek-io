import { createFileRoute } from '@tanstack/react-router';
import { PostCards } from '#/components/post-cards';
import { fetchPostsList } from '../../utils/blog-posts-list';

export const Route = createFileRoute('/blog/')({
	head: () => ({
		meta: [
			{
				title: 'Blog | Edwin Bartunek',
			},
			{
				name: 'description',
				content:
					'Various topics about the web and life in general according to Edwin.',
			},
		],
		links: [
			{
				rel: 'canonical',
				href: 'https://www.bartunek.io/blog/',
			},
		],
	}),
	loader: () => fetchPostsList(),
	component: RouteComponent,
});

function RouteComponent() {
	const posts = Route.useLoaderData();
	return (
		<div className="w-full bg-brand-dkblue mx-auto">
			<hr className="gradient" />
			<section className="p-4 max-w-lg mx-auto">
				<h1>My Blog Posts</h1>
				<PostCards posts={posts} />
			</section>
			<hr className="gradient" />
		</div>
	);
}
