import { IconClick } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import type { PostsListType } from '../../utils/blog-posts-list';
import { FormatDatetime } from './date-formater';
import { Image } from './image';
import { Badge } from './ui/badge';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from './ui/card';

export function PostCards({ posts }: { posts?: Array<PostsListType> | null }) {
	return (
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
							<FormatDatetime
								dateObject={{
									datetimeString: date,
									formatter: "MM/dd/yy hh:mm aaa",
								}}
							/>
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
	);
}
