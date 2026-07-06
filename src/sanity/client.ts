import { createClient } from '@sanity/client'

export const projectId =  import.meta.env.VITE_SANITY_PROJECT_ID
export const dataset = import.meta.env.VITE_SANITY_DATASET
export const apiVersion = import.meta.env.VITE_SANITY_API_VERSION 
export const useCdn = import.meta.env.VITE_SANITY_USE_CDN 

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
})