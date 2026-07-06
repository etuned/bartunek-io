import { client } from "../src/sanity/client"
import { notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import groq from 'groq';

export type ProjectsType = {
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

const ProjectsQuery = groq`*[_type == "project"]| order(dates.startDate desc){
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
        }`

export const fetchAllProjects = createServerFn({ method: 'GET' })
  .handler(async () => {
    console.info(`Fetching Projects...`)
    try {
      const projects = await client.fetch<ProjectsType>(ProjectsQuery).then((res) => res)
      console.log("fetched:", "fetchAllProjects on server")
      return projects
    } catch (err) {
      console.log("ERROR:", err)
      notFound({ throw: true })
    }
  })
