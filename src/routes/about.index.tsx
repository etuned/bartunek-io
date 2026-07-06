import { createFileRoute } from '@tanstack/react-router'
import { fetchAboutBio } from '../../utils/about-bio'
import { PortableText } from '@portabletext/react';

export const Route = createFileRoute('/about/')({
  loader: async () => fetchAboutBio(),
  component: RouteComponent,
})

function RouteComponent() {
  const about = Route.useLoaderData();
  return (<div className='bg-brand-dkblue'>
    <hr className="gradient" />
    <section className='w-full max-w-lg mx-auto'>
      <div className='w-full m-2 p-4 flex flex-col items-center gap-1 md:flex-row md:justify-center'>


        <div className='p-4 my-20'>

          <PortableText
            value={about?.bio}
            onMissingComponent={false}
          />
        </div>


      </div>
    </section>
    <hr className="gradient" />
  </div>

  )
}
