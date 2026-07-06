import { ClientOnly, createFileRoute, Link } from '@tanstack/react-router'
import { fetchPostsList } from '../../utils/blog-posts-list'
import { Image } from '#/components/image';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '#/components/ui/card';
import { Badge } from '#/components/ui/badge';
import { IconClick } from '@tabler/icons-react';
import { FormatDatetime } from '#/components/date-formater';
import { Skeleton } from '#/components/ui/skeleton';


export const Route = createFileRoute('/blog/')({
  head: () => ({
    meta: [
      { title: "Blog | Edwin Bartunek" }
    ]
  }),
  loader: () => fetchPostsList(),
  component: RouteComponent,
})

function RouteComponent() {
  const posts = Route.useLoaderData();
  return (
    <div className='w-full bg-brand-dkblue mx-auto'>
      <hr className='gradient' />
      <section className='p-4 max-w-lg mx-auto'>
        <h1>Recent Blog Posts</h1>
        <div className='py-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-flow-col lg:place-items-center justify-center'>

          {posts?.map(({ id, slug, date, category, title, short, image }) =>
            <Card size='default' key={id} className="relative mx-auto w-full max-w-lg pt-0">
              <div className="absolute inset-0 z-30 aspect-video bg-black/5" />
              <Image
                loading='lazy'
                id={image?.id}
                alt={image?.alt}
                preview={image?.lqip}
                mode='cover'
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
                  <ClientOnly
                    fallback={<Skeleton className='my-0.5 h-4 w-42' />}>
                    <FormatDatetime dateObject={{ datetimeString: date }} />
                  </ClientOnly>
                </CardDescription>
              </CardHeader>
              <CardContent className='w-full h-full'>
                {short}
              </CardContent>
              <CardFooter className='justify-end'>
                <Link
                  className='inline-flex gap-2'
                  to='/blog/$slug'
                  params={{ slug }}
                >
                  <span>Read the full post</span>
                  <IconClick />
                </Link>
              </CardFooter>
            </Card>
          )}
        </div>
      </section>
      <hr className='gradient' />
    </div>
  )
}
