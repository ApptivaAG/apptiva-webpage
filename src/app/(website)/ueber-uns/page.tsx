import Customers from '@/components/customers'
import Partners from '@/components/partners'
import Testimonials from '@/components/testimonials'
import { aboutPageQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import portableTextToString from '@/utils/portable-text-to-string'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import About from './about'
import AboutPreview from './preview'

const url = '/ueber-uns'

export async function generateMetadata(): Promise<Metadata> {
  const { published: about } = await load(aboutPageQuery, false, undefined, [
    'about-page',
    'person',
  ])

  const meta = {
    title: about.header?.title
      ? portableTextToString(about.header?.title)
      : 'Über uns',
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
  const { isEnabled } = await draftMode()
  const { published, draft } = await load(
    aboutPageQuery,
    isEnabled,
    undefined,
    ['about-page', 'person']
  )

  const testimonials = <Testimonials />
  const customers = <Customers />
  const partners = <Partners />

  return isEnabled ? (
    <AboutPreview
      initial={draft}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  ) : (
    <About
      data={published}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  )
}
