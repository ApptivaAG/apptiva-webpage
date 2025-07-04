import { buildServicePath, buildServiceUrl } from '@/app/sitemap'
import Customers from '@/components/customers'
import Partners from '@/components/partners'
import Testimonials from '@/components/testimonials'
import type { Group } from '@/domain/customers'
import { serviceBySlugQuery, servicesQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import portableTextToString from '@/utils/portable-text-to-string'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import ServiceDetail from './detail'
import ServicePreview from './preview'

export const dynamicParams = false

export async function generateStaticParams() {
  const { published: services } = await load(servicesQuery, false, undefined, [
    'service-page',
  ])
  const params = services?.map(({ slug, subPageOf }) => ({
    slug: buildServicePath(slug, subPageOf)?.split('/') ?? [],
  }))
  return params
}

export async function generateMetadata(props: {
  params: { slug: string[] }
}): Promise<Metadata> {
  const { published: service } = await load(
    serviceBySlugQuery,
    false,
    getLastParam(props.params),
    ['service-page']
  )

  const url = buildServiceUrl(service?.slug, service?.subPageOf)

  const headerTitle = service?.header?.title
    ? portableTextToString(service?.header?.title)
    : undefined

  const currentPageTitle =
    service?.header?.meta?.title ??
    service?.breadcrumb ??
    headerTitle ??
    'Angebot'

  const description =
    service?.header?.meta?.description ??
    service?.header?.lead ??
    'Ohne Beschreibung'

  return {
    title: currentPageTitle,
    description: description,
    alternates: { canonical: url },
    openGraph: {
      title: service?.header?.meta?.title ?? headerTitle ?? 'Angebot',
      description: description,
      type: 'article',
      url,
      publishedTime: service?._createdAt,
      modifiedTime: service?._updatedAt,
    },
  }
}

function getLastParam(params: { slug: string[] }) {
  return { slug: params.slug[params.slug.length - 1] }
}

export default async function Home(props: { params: { slug: string[] } }) {
  const subpageSlug = props.params.slug.at(0) ?? notFound()
  const { isEnabled } = draftMode()
  const { published, draft, error } = await load(
    serviceBySlugQuery,
    isEnabled,
    getLastParam(props.params),
    ['service-page']
  )

  if (!draft.data && !published) {
    notFound()
  }

  const customers = <Customers groups={mapSlugToGroup(subpageSlug)} />
  const testimonials = <Testimonials />
  const partners = <Partners />

  return isEnabled ? (
    <ServicePreview
      initial={draft}
      params={getLastParam(props.params)}
      customers={customers}
      testimonials={testimonials}
      partners={partners}
    />
  ) : (
    <ServiceDetail
      partners={partners}
      service={published}
      customers={customers}
      testimonials={testimonials}
    />
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
