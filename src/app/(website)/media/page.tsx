import Customers from '@/components/customers'
import Partners from '@/components/partners'
import Testimonials from '@/components/testimonials'
import { mediaPageQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import portableTextToString from '@/utils/portable-text-to-string'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import Media from './media'
import MediaPreview from './preview'

const url = '/media'

export async function generateMetadata(): Promise<Metadata> {
  const { published: media } = await load(mediaPageQuery, false, undefined, [
    'media-page',
    'person',
  ])

  const meta = {
    title: media?.header?.title
      ? portableTextToString(media.header?.title)
      : 'Media',
    description:
      media.header?.lead ?? 'Aktuelle Medienberichte rund um die Apptiva',
  }
  return {
    ...meta,
    alternates: { canonical: url },
    openGraph: {
      ...meta,
      url,
    },
  }
}

export default async function MediaPage() {
  const { isEnabled } = await draftMode()
  const { published, draft } = await load(
    mediaPageQuery,
    isEnabled,
    undefined,
    ['media-page', 'person']
  )

  const testimonials = <Testimonials />
  const customers = <Customers />
  const partners = <Partners />

  /**
   * todo: Implement Media Page
   * - render header
   * - render media items
   * - render modules
   */

  return isEnabled ? (
    <MediaPreview
      initial={draft}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  ) : (
    <Media
      data={published}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  )
}
