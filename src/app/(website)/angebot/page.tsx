import { servicesQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import ServiceList from './list'
import ServicesPreview from './preview'

export default async function Home() {
  const { isEnabled } = await draftMode()
  const { published, draft } = await load(servicesQuery, isEnabled, undefined, [
    'service-page',
  ])

  return isEnabled ? (
    <ServicesPreview initial={draft} />
  ) : (
    <ServiceList services={published} />
  )
}
