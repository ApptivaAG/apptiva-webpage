import { queryServicePagesFromCms } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { InferType } from 'groqd'
import { cache } from 'react'
import { CmsContent, Module, ServicePage } from './types'

const servicePages = new Map<string, ServicePage>()

export const getServicePages = cache(async () => {
  await getCmsServicePages()
  return servicePages
})

const getCmsServicePages = cache(async () => {
  const servicePagesFromCMS = await runQuery(queryServicePagesFromCms)

  type CmsServicePageWithSlug = InferType<
    typeof queryServicePagesFromCms
  >[number] & {
    slug: string
  }

  servicePagesFromCMS
    .filter(
      (servicePage): servicePage is CmsServicePageWithSlug => !!servicePage.slug
    )
    .forEach((servicePage) => {
      servicePages.set(servicePage.slug, {
        image: servicePage.header?.image,
        imageAlt: servicePage.header?.imageAlt,
        title: servicePage.header?.title ?? 'Ohne Titel',
        description: servicePage.header?.description ?? 'Ohne Beschreibung',
        content: servicePage.header?.content as CmsContent,
        slug: servicePage.slug,
        modules: servicePage.modules as Module[],
      })
    })
})
