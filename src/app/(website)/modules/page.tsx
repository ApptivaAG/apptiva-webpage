import Customers from '@/components/customers'
import Partners from '@/components/partners'
import Testimonials from '@/components/testimonials'

import { homepageQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { extractTestimonialTags } from '@/utils/extract-testimonial-tags'

import { draftMode } from 'next/headers'
import ModuleWrapper from './modules'
import ModulesPreview from './modules-preview'

export default async function ModulesPage() {
  const { isEnabled } = await draftMode()
  const { published, draft } = await load(homepageQuery, isEnabled, undefined, [
    'homepage',
  ])

  const homepage = isEnabled ? draft.data : published
  const testimonialTags = extractTestimonialTags(homepage)

  const testimonials = <Testimonials tags={testimonialTags} />
  const customers = <Customers />
  const partners = <Partners />

  return isEnabled ? (
    <ModulesPreview
      initial={draft}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  ) : (
    <ModuleWrapper
      data={published}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  )
}
