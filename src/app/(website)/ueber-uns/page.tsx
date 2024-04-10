import { aboutPageQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import About from './about'
import AboutPreview from './preview'
import Testimonials from '@/components/testimonials'
import Customers from '@/components/customers'
import { Metadata } from 'next'

import {} from '@portabletext/to-html'
import portableTextToString from '@/utils/portable-text-to-string'

const url = '/ueber-uns'

export async function generateMetadata(): Promise<Metadata> {
  const { published: about } = await load(aboutPageQuery, false, undefined, [
    'about-page',
  ])

  const meta = {
    title: portableTextToString(about.header?.title) ?? 'Über uns',
    description:
      about.header?.lead ??
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

export default async function AboutPage() {
  const { isEnabled } = draftMode()
  const { published, draft } = await load(
    aboutPageQuery,
    isEnabled,
    undefined,
    ['about-page']
  )

  const customers = (
    <>
      <Testimonials />
      <Customers />
    </>
  )

  return isEnabled ? (
    <AboutPreview initial={draft} customers={customers} />
  ) : (
    <About data={published} customers={customers} />
  )
}
