import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { renderServerComponent } from '@tanstack/react-start/rsc';
import { ProjectCards } from '#/components/project-cards';
import { fetchProjectsData } from '../../utils/full-projects';

const getProjectsCards = createServerFn().handler(async () => {
	const data = await fetchProjectsData();
	const Renderable = await renderServerComponent(
		<ProjectCards projects={data} />,
	);
	return { Renderable };
});

export const Route = createFileRoute('/projects')({
	head: () => ({
		meta: [
			{
				title: 'Projects | Edwin Bartunek',
			},
			{
				name: 'description',
				content: `Edwin's latest projects and information about technologies he uses.`,
			},
		],
		links: [
			{
				rel: 'canonical',
				href: 'https://www.bartunek.io/projects',
			},
		],
	}),
	loader: async () => {
		const { Renderable } = await getProjectsCards();
		return { projectCards: Renderable };
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { projectCards } = Route.useLoaderData();
	return (
		<div className="w-full bg-brand-dkblue mx-auto">
			<hr className="gradient" />
			<section className="p-4 w-full max-w-lg mx-auto">
				<div className="p-4 max-w-lg mx-auto">
					<h3 className="text-3xl font-black">My Recent Projects</h3>
					{projectCards}
				</div>
			</section>
			<hr className="gradient" />
		</div>
	);
}
