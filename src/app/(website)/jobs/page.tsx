import Customers from '@/components/customers'
import Testimonials from '@/components/testimonials'
import { jobsPageQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import portableTextToString from '@/utils/portable-text-to-string'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'

import Partners from '@/components/partners'
import Jobs from './jobs'
import JobsPreview from './preview'

const url = '/jobs'

export async function generateMetadata(): Promise<Metadata> {
  const { published: jobs } = await load(jobsPageQuery, false, undefined, [
    'jobs-page',
  ])

  const meta = {
    title: jobs.header?.title
      ? portableTextToString(jobs.header?.title)
      : 'Jobs',
    description:
      jobs.header?.lead ??
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

export default async function JobsPage() {
  const { isEnabled } = draftMode()
  const { published, draft } = await load(jobsPageQuery, isEnabled, undefined, [
    'jobs-page',
  ])

  const testimonials = <Testimonials />
  const customers = <Customers />
  const partners = <Partners />

  return isEnabled ? (
    <JobsPreview
      initial={draft}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  ) : (
    <Jobs
      data={published}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  )
}
