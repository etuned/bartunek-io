
import { client } from "../src/sanity/client"
import { notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import groq from 'groq';

export type PostsListType = {
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

export const postsListQuery = groq`*[_type == "post"] 
    {
      "id": _id,
      title,
      "updatedAt": _updatedAt,
      date,
      "category": categories[_type == 'reference'][0]->{"id": _id, name},
      "slug": slug.current,
      "image":mainImage{
        "id": image.asset._ref,
        "lqip": image.asset->metadata.lqip,
        alt,
      },
      short,
    }
    `

export const fetchPostsList = createServerFn({ method: 'GET' })
  .handler(async () => {
    console.info(`Fetching blog post list...`)
    try {
      const post = await client.fetch<PostsListType>(postsListQuery).then((res) => res)
      console.log("fetched", "fetchPostsList on server")
      return post
    } catch (err) {
      console.log("ERROR:", err)
      notFound({ throw: true })
    }
  })