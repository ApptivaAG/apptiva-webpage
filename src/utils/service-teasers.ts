import { servicesTeaserQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { cache } from 'react'

export const getServiceTeasers = cache(async () => {
  const servicesTeasers = await runQuery(servicesTeaserQuery, undefined, [
    'service-page-teasers',
  ])

  // type CmsProjectWithSlug = InferType<typeof servicesQuery>[number] & {
  //   slug: string
  // }
  return servicesTeasers
})
