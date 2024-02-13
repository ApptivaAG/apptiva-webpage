import { projectsQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { cache } from 'react'

export const getProjects = cache(async () => {
  const projectsFromCMS = await runQuery(projectsQuery, undefined, ['project'])

  // type CmsProjectWithSlug = InferType<typeof servicesQuery>[number] & {
  //   slug: string
  // }
  return projectsFromCMS
})
