import { IconClick } from '@tabler/icons-react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { FormatDatetime } from '#/components/date-formater';
import { Image } from '#/components/image';
import { Badge } from '#/components/ui/badge';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '#/components/ui/card';
import { fetchPostsList } from '../../utils/blog-posts-list';

export const Route = createFileRoute('/blog/')({
	head: () => ({
    meta: [
      {
        title: 'Blog | Edwin Bartunek',
		
      },
	  {
		name: 'description',
		content: 'Various topics about the web and life in general according to Edwin.'
	  }
    ],
    links: [
      {
        rel: "canonical",
        href: "https://www.bartunek.io/blog/",
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
				<div className="py-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-flow-col lg:place-items-center justify-center">
					{posts?.map(({ id, slug, date, category, title, short, image }) => (
						<Card
							size="default"
							key={id}
							className="relative mx-auto w-full max-w-lg pt-0"
						>
							<div className="absolute inset-0 z-30 aspect-video bg-black/5" />
							<Image
								loading="lazy"
								id={image?.id}
								alt={image?.alt}
								preview={image?.lqip}
								mode="cover"
								height={216}
								width={384}
								className="relative z-20 aspect-video w-full object-cover"
								sizes="(min-width: 1240px) 390px, calc((100vw - 40px - 30px) / 3)"
							/>
							<CardHeader>
								<CardAction>
									<Badge>{category.name}</Badge>
								</CardAction>
								<CardTitle>{title}</CardTitle>
								<CardDescription>
										<FormatDatetime dateObject={{ datetimeString: date, timezone: "Asia/Tokyo" }} />
								</CardDescription>
							</CardHeader>
							<CardContent className="w-full h-full">{short}</CardContent>
							<CardFooter className="justify-end">
								<Link
									className="inline-flex gap-2"
									to="/blog/$slug"
									params={{ slug }}
								>
									<span>Read the full post</span>
									<IconClick />
								</Link>
							</CardFooter>
						</Card>
					))}
				</div>
			</section>
			<hr className="gradient" />
		</div>
	);
}
