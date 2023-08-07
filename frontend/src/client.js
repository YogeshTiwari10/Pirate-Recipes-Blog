import {createClient} from '@sanity/client'


export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-08-03",  
  token: process.env.REACT_APP_SANITY_PROJECT_TOKEN,
})