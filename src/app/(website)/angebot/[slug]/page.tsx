import { serviceBySlugQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import ServiceDetail from './detail'
import ServicePreview from './preview'

export default async function Home(props: { params: { slug: string } }) {
  const {isEnabled} = draftMode()
  const {published, draft} = await load(serviceBySlugQuery, isEnabled, props.params, [
    'service-page-teasers',
  ])

  return isEnabled ? <ServicePreview initial={draft} params={props.params} /> : <ServiceDetail service={published} />
}
