import Customers from '@/components/customers'
import Testimonials from '@/components/testimonials'
import { homepageQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'

import { draftMode } from 'next/headers'
import ModuleWrapper from './modules'
import ModulesPreview from './modules-preview'

export default async function ModulesPage() {
  const { isEnabled } = draftMode()
  const { published, draft } = await load(homepageQuery, isEnabled, undefined, [
    'homepage',
  ])
  const testimonials = <Testimonials />
  const customers = <Customers />

  return isEnabled ? (
    <ModulesPreview
      initial={draft}
      customers={customers}
      testimonials={testimonials}
    />
  ) : (
    <ModuleWrapper
      data={published}
      customers={customers}
      testimonials={testimonials}
    />
  )
}
