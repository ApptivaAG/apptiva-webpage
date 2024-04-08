import Customers from '@/components/customers'
import Testimonials from '@/components/testimonials'
import { serviceBySlugQuery, servicesQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import type { Group } from '@/utils/customers'
import { draftMode } from 'next/headers'
import ServiceDetail from './detail'
import ServicePreview from './preview'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const { published: services } = await load(servicesQuery, false, undefined, [
    'service-page',
  ])

  return services.map(({ slug, subPageOf }) => ({
    slug: subPageOf ? [subPageOf.slug, slug] : [slug],
  }))
}

function getLastParam(params: { slug: string[] }) {
  return { slug: params.slug[params.slug.length - 1] }
}

export default async function Home(props: { params: { slug: string[] } }) {
  const lastParam = props.params.slug.at(-1) ?? notFound()
  const { isEnabled } = draftMode()
  const { published, draft } = await load(
    serviceBySlugQuery,
    isEnabled,
    getLastParam(props.params),
    ['service-page']
  )

  const customers = (
    <>
      <Testimonials />
      <Customers groups={mapSlugToGroup(lastParam)} />
    </>
  )
  return isEnabled ? (
    <ServicePreview
      initial={draft}
      params={getLastParam(props.params)}
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
