import { queryServicePagesFromCms } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { SanityImageSource } from '@sanity/asset-utils'
import { imageSize } from 'image-size'
import path from 'path'
import { cache } from 'react'
import { PortableTextBlock } from 'sanity'

const servicePages = new Map<string, CmsServicePage>()

interface ServicePage {
  title: string
  description: string
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

interface CmsServicePage extends ServicePage {
  kind: 'cms'
  image?: SanityImageSource | null
  modules?: Module[] | null
}

export const getServicePages = cache(async () => {
  await getCmsServicePages()
  return servicePages
})

const getCmsServicePages = cache(async () => {
  const servicePagesFromCMS = await runQuery(queryServicePagesFromCms)

  console.log(
    'servicePagesFromCMS modules content',
    servicePagesFromCMS
      .map((page) => page.modules?.map((module) => module.content))
      .flat()
  )

  servicePagesFromCMS.forEach((servicePage) => {
    servicePages.set(servicePage.slug, {
      kind: 'cms',
      image: servicePage.image,
      title: servicePage.header.title ?? 'Ohne Title',
      description: servicePage.header.description ?? 'Ohne Beschreibung',
      slug: servicePage.slug,
      modules: servicePage.modules as Module[],
    })
  })
})

export function getImageInfo(imageSrc: string) {
  return imageSize(path.join('./public', imageSrc))
}
