import { servicesTeaserQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import ServicesTeaserPreview from './preview'
import ServiceTeaserList from './list'

export default async function ServiceTeasers () {
  const {published, draft} = await load(servicesTeaserQuery, draftMode().isEnabled, undefined, [
    'service-page-teasers',
  ])

  return draftMode().isEnabled ? <ServicesTeaserPreview initial={draft} /> : <ServiceTeaserList services={published} />
}
