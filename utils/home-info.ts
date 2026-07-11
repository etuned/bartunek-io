import { client } from "../src/sanity/client"
import { notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import groq from 'groq';

export type HomeInfoType = {
  author: {
    name: string

    employer: {
      name: string
      website: string
    }

    image: {
      id: string
      alt: string
      lqip: string
    }
  }

  posts: {
    id: string
    title: string
    updatedAt: string
    date: string
    slug: string
    category: {
      id: string
      name: string
    }
    image: {
      id: string,
      lqip: string,
      alt: string
    }
    short: string
  }[]

  projects: {
    id: string
    name: string
    createdAt: string
    updatedAt: string
    dates: {
      isInProgress: string
      startDate: string
      endDate: string
    }
    slug: string
    liveUrl: {
      isPrivate: boolean
      link?: string
    }
    codeUrl: {
      isPrivate: boolean
      link?: string
    }
    image: {
      id: string,
      lqip: string,
      alt: string
    }
    technologies: {
      description?: string | null
      id: string
      title: string
    }[]
    employer: {
      id: string
      name: string
      website: string
      image: {
        id: string,
        lqip: string,
        alt: string
      }
    }

    short: string
  }[]

}


const homeInfoQuery = groq`*[_type == "author" && name == $authorName] [0]{
        "author": {
        name,
        employer->{name,website},
        image {
            "id": image.asset._ref,
            alt,
            "lqip": image.asset->metadata.lqip,
              },
            },
      "posts": *[_type == "post"][0...3]{
            "id": _id,
            title,
            date,
            "category": categories[_type == 'reference'][0]->{"id": _id, name},
            "slug": slug.current,
            "image":mainImage{
              "id": image.asset._ref,
              "lqip": image.asset->metadata.lqip,
              alt,
            },
            short,
        }, 
        "projects": *[_type == "project" && dates.isInProgress][0...3]{
              "id": _id,
              name,
              codeUrl{
                  isPrivate,
                  link
                },
              liveUrl{
                isPrivate,
                link
              },
              dates{
                isInProgress,
                startDate,
                endDate,
              },
              short,
              "slug": slug.current,
              "createdAt":_createdAt,
              "updatedAt":_updatedAt,
              name,
              "image":mainImage{
              "id": image.asset._ref,
              "lqip": image.asset->metadata.lqip,
              alt,
            },
            "technologies": techList[] {
              _type == 'reference' => @->{"id":_id,title,description},
              },
            employer->{"id": _id,name,website,"image":image{
              "id": image.asset._ref,
              "lqip": image.asset->metadata.lqip,
              alt,
            },
          },
        },   
    }
    `

export const fetchHomeInfo = createServerFn({ method: 'GET' })
  .handler(async () => {
    console.info(`Fetching About Bio list...`)
    try {
      const about = await client.fetch<HomeInfoType>(homeInfoQuery, { authorName: "Edwin Bartunek", authorSlice: 0 }).then((res) => res)
      console.log("fetched:", "fetchHomeInfo on server")
      return about
    } catch (err) {
      console.log("ERROR:", err)
      notFound({ throw: true })
    }
  })