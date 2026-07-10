import { createFileRoute } from '@tanstack/react-router';
import { ProjectCards } from '#/components/project-cards';
import { fetchAllProjects } from '../../utils/full-projects';

export const Route = createFileRoute('/projects')({
	head: () => ({
    meta: [
      {
        title: 'Projects | Edwin Bartunek',
		
      },
	  {
		name: 'description',
		content: `Edwin's latest projects and information about technologies he uses.`
	  }
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.bartunek.io/projects",
      },
    ],
  }),
	loader: () => fetchAllProjects(),
	component: RouteComponent,
});

function RouteComponent() {
	const projects = Route.useLoaderData();
	return (
		<div className="w-full bg-brand-dkblue mx-auto">
			<hr className="gradient" />
			<section className="p-4 w-full max-w-lg mx-auto">
				<div className="p-4 max-w-lg mx-auto">
					<h3 className="text-3xl font-black">My Recent Projects</h3>
					<ProjectCards projects={projects} />
				</div>
			</section>
			<hr className="gradient" />
		</div>
	);
}
