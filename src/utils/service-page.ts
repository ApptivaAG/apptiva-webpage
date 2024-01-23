import { queryServicePagesFromCms } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { SanityImageSource } from '@sanity/asset-utils'
import { imageSize } from 'image-size'
import path from 'path'
import { cache } from 'react'
import { PortableTextBlock } from 'sanity'

const servicePages = new Map<string, ServicePage>()

interface ServicePage {
  title: string
  image?: SanityImageSource | null
  imageAlt?: string | null
  description: string
  content?: CmsContent | null
  slug: string
  modules?: Module[] | null
}

type CmsContent = Array<PortableTextBlock> | undefined

type Module = {
  title?: string | null
  layout?: string | null
  image?: SanityImageSource | null
  imageAlt?: string | null
  content: CmsContent | null
}

export const getServicePages = cache(async () => {
  await getCmsServicePages()
  return servicePages
})

const getCmsServicePages = cache(async () => {
  const servicePagesFromCMS = await runQuery(queryServicePagesFromCms)

  servicePagesFromCMS.forEach((servicePage) => {
    servicePages.set(servicePage.slug, {
      image: servicePage.header?.image,
      imageAlt: servicePage.header?.imageAlt,
      title: servicePage.header?.title ?? 'Ohne Title',
      description: servicePage.header?.description ?? 'Ohne Beschreibung',
      content: servicePage.header?.content as CmsContent,
      slug: servicePage.slug,
      modules: servicePage.modules as Module[],
    })
  })
})

export function getImageInfo(imageSrc: string) {
  return imageSize(path.join('./public', imageSrc))
}
