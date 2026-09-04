import { loadQuery } from "#/sanity/loader.server"
import { notFound } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/react-start"
import groq from 'groq';

export type AboutBiotType = {
  bio: any
}

const aboutBioQuery = groq`*[_type == "author" && name == $authorName] [$slice] 
    {
        bio,
    }
    `

export const fetchAboutBio = createServerFn({ method: 'GET' })
  .handler(async () => {
    console.info(`Fetching About Bio list...`)
    try {
      const { data } = await loadQuery<AboutBiotType>(aboutBioQuery, { authorName: "Edwin Bartunek", slice: 0 })
      console.log("fetched:", "fetchAboutBio on server")
      return data
    } catch (err) {
      console.log("ERROR:", err)
      notFound({ throw: true })
    }
  })
