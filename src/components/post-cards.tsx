import { IconClick } from '@tabler/icons-react';
import { ClientOnly, Link } from '@tanstack/react-router';
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
import { Skeleton } from './ui/skeleton';

export function PostCards({ posts }: { posts?: PostsListType | null }) {
	return (
		<div className="py-6 grid gap-6 grid-flow-col">
			{posts?.map(({ id, slug, date, category, title, short, image }) => (
				<Card
					size="sm"
					key={id}
					className="relative mx-auto w-full max-w-lg pt-0"
				>
					<div className="absolute inset-0 z-30 aspect-video bg-black/5" />
					<Image
						loading="lazy"
						id={image?.id}
						alt={image?.alt}
						height={216}
						width={384}
						mode='cover'
						style={
							image?.lqip ? 
								{
									backgroundImage: `url(${image?.lqip})`,
									backgroundSize: 'cover',
								}
								: undefined
						}
						className="relative z-20 aspect-video w-full object-cover"
						sizes="(min-width: 1240px) 390px, calc((100vw - 40px - 30px) / 3)"
					/>
					<CardHeader>
						<CardAction>
							<Badge>{category.name}</Badge>
						</CardAction>
						<CardTitle>{title}</CardTitle>
						<CardDescription>
							<ClientOnly
								fallback={
								<Skeleton className="my-0.5 h-4 w-42" />
									}
							>
								<FormatDatetime
									dateObject={{ datetimeString: date }}
								/>
							</ClientOnly>
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
