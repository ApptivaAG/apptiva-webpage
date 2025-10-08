import Customers from '@/components/customers'
import Testimonials from '@/components/testimonials'
import { zusammenarbeitPageQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import portableTextToString from '@/utils/portable-text-to-string'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'

import Partners from '@/components/partners'
import ZusammenarbeitPreview from './preview'
import Zusammenarbeit from './zusammenarbeit'

const url = '/zusammenarbeit'

export async function generateMetadata(): Promise<Metadata> {
  const { published: zusammenarbeit } = await load(
    zusammenarbeitPageQuery,
    false,
    undefined,
    ['zusammenarbeit-page']
  )

  const meta = {
    title: zusammenarbeit.header?.title
      ? portableTextToString(zusammenarbeit.header?.title)
      : 'Zusammenarbeit',
    description:
      zusammenarbeit.header?.lead ??
      'Seit 2015 sind wir live. Seit 2015 leben wir eine Firmenkultur, die auf Ehrlichkeit, Offenheit und Agilität basiert - Holacracy.',
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

export default async function ZusammenarbeitPage() {
  const { isEnabled } = draftMode()
  const { published, draft } = await load(
    zusammenarbeitPageQuery,
    isEnabled,
    undefined,
    ['zusammenarbeit-page']
  )

  const testimonials = <Testimonials />
  const customers = <Customers />
  const partners = <Partners />

  return isEnabled ? (
    <ZusammenarbeitPreview
      initial={draft}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  ) : (
    <Zusammenarbeit
      data={published}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  )
}
