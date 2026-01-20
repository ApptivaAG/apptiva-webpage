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

// 'force-static': Force static rendering and cache the data of a layout or page by forcing cookies, headers() and useSearchParams() to return empty values. It is possible to revalidate, revalidatePath, or revalidateTag, in pages or layouts rendered with force-static.
export const dynamic = 'force-static'

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
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const { published: service } = await load(
    serviceBySlugQuery,
    false,
    getLastParam(await props.params),
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

export default async function Home(props: {
  params: Promise<{ slug: string[] }>
}) {
  const subpageSlug = (await props.params).slug.at(0) ?? notFound()
  const { isEnabled } = await draftMode()
  const { published, draft, error } = await load(
    serviceBySlugQuery,
    isEnabled,
    getLastParam(await props.params),
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
      params={getLastParam(await props.params)}
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
