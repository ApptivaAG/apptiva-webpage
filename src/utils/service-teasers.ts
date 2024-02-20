import { servicesTeaserQuery } from '@/sanity/lib/queries'
import { load, runQuery } from '@/sanity/lib/sanityFetch'
import { InferType } from 'groqd'
import { draftMode } from 'next/headers'
import { cache } from 'react'

export type ServiceTeaser = InferType<typeof servicesTeaserQuery>

export const getServiceTeasers = cache(async () => {
  // const servicesTeasers = await runQuery(servicesTeaserQuery, undefined, [
  //   'service-page-teasers',
  // ])

  const servicesTeasers = await load(
    servicesTeaserQuery,
    draftMode().isEnabled,
    undefined,
    ['service-page-teasers']
  )

  // type CmsProjectWithSlug = InferType<typeof servicesQuery>[number] & {
  //   slug: string
  // }
  return servicesTeasers
})
