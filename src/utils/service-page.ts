import { serviceBySlugQuery, servicesQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { InferType } from 'groqd'
import { cache } from 'react'
import { Service } from './types'

export const getServicePages = cache(async () => {
  const servicePagesFromCMS = await runQuery(servicesQuery, undefined, [
    'service-page',
  ])

  type CmsServicePageWithSlug = InferType<typeof servicesQuery>[number] & {
    slug: string
  }

  return servicePagesFromCMS
    .filter(
      (servicePage): servicePage is CmsServicePageWithSlug => !!servicePage.slug
    )
    .map((servicePage) => {
      return {
        title: servicePage.header?.title ?? 'Ohne Titel',
        image: servicePage.header?.image ?? null,
        description: servicePage.header?.description ?? 'Ohne Beschreibung',
        content: servicePage.header?.content,
        slug: servicePage.slug,
      } satisfies Service
    })
})

export const getServiceBySlug = cache(async (slug: string) => {
  const service = await runQuery(
    serviceBySlugQuery,
    {
      slug,
    },
    ['service-page']
  )

  if (!service.slug) {
    return undefined
  }

  return {
    slug: service.slug,
    title: service.header?.title ?? 'Ohne Title',
    description: service.header?.description ?? 'Ohne Beschreibung',
    image: service.header?.image ?? null,
    content: service.header?.content,
    modules: service.modules,
  } satisfies Service
})
