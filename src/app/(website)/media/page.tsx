import { mediaPageQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import portableTextToString from '@/utils/portable-text-to-string'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'

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

export default async function Media() {
  const { isEnabled } = await draftMode()
  const { published, draft } = await load(
    mediaPageQuery,
    isEnabled,
    undefined,
    ['media-page', 'person']
  )

  return isEnabled ? (
    // <AboutPreview
    //   initial={draft}
    //   customers={customers}
    //   testimonials={testimonials}
    //   partners={partners}
    // />
    <p>Media draft Mode {draft.data.modules?.length}</p>
  ) : (
    // <About
    //   data={published}
    //   customers={customers}
    //   testimonials={testimonials}
    //   partners={partners}
    // />
    <p>Media Published {published?.modules?.length}</p>
  )
}
