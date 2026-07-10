import { PortableText } from '@portabletext/react';
import { createFileRoute } from '@tanstack/react-router';
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
			<section className="w-full max-w-lg mx-auto">
				<div className="w-full m-2 p-4 flex flex-col items-center gap-1 md:flex-row md:justify-center">
					<div className="p-4 my-20">
						<PortableText value={about?.bio} onMissingComponent={false} />
					</div>
				</div>
			</section>
			<hr className="gradient" />
		</div>
	);
}
