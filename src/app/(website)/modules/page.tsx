import Customers from '@/components/customers'
import Testimonials from '@/components/testimonials'
import { settingsQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'

import { draftMode } from 'next/headers'
import ModuleWrapper from './modules'
import ModulesPreview from './modules-preview'

export default async function ModulesPage() {
  const { isEnabled } = draftMode()
  const { published, draft } = await load(settingsQuery, isEnabled, undefined, [
    'settings',
  ])
  const customers = (
    <>
      <Testimonials />
      <Customers />
    </>
  )

  return isEnabled ? (
    <ModulesPreview initial={draft} customers={customers} />
  ) : (
    <ModuleWrapper data={published} customers={customers} />
  )
}
