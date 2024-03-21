import Customers from '@/components/customers'
import Testimonials from '@/components/testimonials'
import { serviceBySlugQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import type { Group } from '@/utils/customers'
import { draftMode } from 'next/headers'
import ServiceDetail from './detail'
import ServicePreview from './preview'

export default async function Home(props: { params: { slug: string } }) {
  const { isEnabled } = draftMode()
  const { published, draft } = await load(
    serviceBySlugQuery,
    isEnabled,
    props.params,
    ['service-page']
  )

  const customers = (
    <>
      <Testimonials />
      <Customers groups={mapSlugToGroup(props.params.slug)} />
    </>
  )
  return isEnabled ? (
    <ServicePreview
      initial={draft}
      params={props.params}
      customers={customers}
    />
  ) : (
    <ServiceDetail service={published} customers={customers} />
  )
}

function mapSlugToGroup(slug: string): Group[] | undefined {
  switch (slug) {
    case 'chatbots':
      return ['chatbot']
    case 'development':
      return ['web', 'mobile']
    default:
      return undefined
  }
}
