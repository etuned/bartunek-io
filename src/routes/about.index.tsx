import { PortableText } from '@portabletext/react';
import { createFileRoute } from '@tanstack/react-router';
import { components } from '#/sanity/utils/serializers';
import { fetchAboutBio } from '../../utils/about-bio';

export const Route = createFileRoute('/about/')({
	head: () => ({
		meta: [
			{
				title: 'About | Edwin Bartunek',
			},
			{
				name: 'description',
				content: 'Learn more about Edwin',
			},
		],
		links: [
			{
				rel: 'canonical',
				href: 'https://www.bartunek.io/about',
			},
		],
	}),
	loader: async () => fetchAboutBio(),
	component: RouteComponent,
});

function RouteComponent() {
	const about = Route.useLoaderData();
	return (
		<div className="bg-brand-dkblue">
			<hr className="gradient" />
			<section className="w-full my-20 m-2 p-4 max-w-lg mx-auto">
				<div className="w-full flex flex-col items-center justify-center">
					<div className="m-2 p-4">
						<PortableText
							value={about?.bio}
							components={components}
							onMissingComponent={false}
						/>
					</div>
				</div>
			</section>
			<hr className="gradient" />
		</div>
	);
}
