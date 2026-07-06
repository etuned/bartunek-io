import { client } from "../src/sanity/client"
import { createServerFn } from "@tanstack/react-start"
import groq from 'groq';

export type PostType = {
  id: string;
  title: string;
  slug: string;
  date: string;
  mainImage: {
      id: string;
      alt: string;
      lqip: string;
      };
  categories: {id: string,name:string}[];
  authors: {
    id: string;
    name: string;
    image: {
      id: string;
      alt: string;
      lqip: string;
      }
    }[];
    short: string;
    mainContent: any;
  }

const postQuery = groq`*[_type == "post" && slug.current == $slug ][0]
    {
        "id": _id,
        title,
        "slug": slug.current,
        date,
        categories[] {
        _type == 'reference' => @->{"id": _id, name},
      },
       authors[] {
        _type == 'reference' => @->{
          "id": _id,
          name, 
          image {
            "id": image.asset._ref,
            alt,
            "lqip": image.asset->metadata.lqip,
              },
            },
          },
        mainImage {
            "id": image.asset._ref,
            alt,
            "lqip": image.asset->metadata.lqip,
        },
        short,
        mainContent
    }
    `

export const fetchPost = createServerFn({ method: 'GET' })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    console.info(`Fetching post with id ${data}...`)
    console.log("Fetched:", "fetchPost on server")
    return await client.fetch<PostType>(postQuery,{slug:data})
  })