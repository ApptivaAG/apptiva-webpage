import Module from '@/components/module'
import { PageHeader } from '@/components/page-header'
import ProductSchema from '@/components/product-schema'

import { ErrorBoundary } from 'react-error-boundary'
import Button from '@/components/ui/button'
import Heading from '@/components/heading'
import { ServiceBySlugQueryData } from '@/sanity/lib/queries'
import Link from 'next/link'
import portableTextToString from '@/utils/portable-text-to-string'

export default function ServiceDetail(props: {
  service: ServiceBySlugQueryData
  customers: React.ReactNode
  testimonials: React.ReactNode
  partners: React.ReactNode
  isPreview?: boolean
}) {
  const serviceUrl = `/angebot/${buildBreadcrumbPath(props.service.slug, props.service.subPageOf)}`
  
  return (
    <>
      {props.service.isProduct && (
        <ProductSchema
          name={
            props.service.productName ||
            (props.service.header?.title
              ? portableTextToString(props.service.header.title)
              : 'Produkt')
          }
          description={
            props.service.productDescription ||
            props.service.header?.lead ||
            undefined
          }
          price={props.service.price}
          priceCurrency={props.service.priceCurrency}
          priceValidUntil={props.service.priceValidUntil}
          availability={props.service.availability}
          image={props.service.header?.image?.asset?.url}
          url={serviceUrl}
        />
      )}
      
      <PageHeader
        title={props.service.header?.title}
        lead={props.service.header?.lead}
        image={props.service.header?.image}
        links={buildBreadcrumbs(props.service, 'angebot')}
        callToAction={
          props.service.callToAction?.href ? (
            <Link href={props.service.callToAction.href}>
              <Button intent="secondary">
                {props.service.callToAction.name}
              </Button>
            </Link>
          ) : undefined
        }
      />

      {props.service.modules?.map((module) => (
        <CatchErrors key={module._key} isPreview={props.isPreview}>
          <Module
            partners={props.partners}
            module={module}
            customers={props.customers}
            testimonials={props.testimonials}
          />
        </CatchErrors>
      ))}
    </>
  )
}

function CatchErrors(props: {
  isPreview?: boolean
  children: React.ReactNode
}) {
  return props.isPreview ? (
    <ErrorBoundary fallbackRender={fallbackRender}>
      {props.children}
    </ErrorBoundary>
  ) : (
    <>{props.children}</>
  )
}

function fallbackRender(props: {
  error: { message: string }
  resetErrorBoundary: () => void
}) {
  return (
    <div role="alert" className="space-y-8 py-8">
      <Heading level={2} size={3}>
        Dieses Modul ist fehlerhaft
      </Heading>
      <Button onClick={props.resetErrorBoundary}>Nochmals versuchen</Button>
      <div>
        <p>Fehlermeldung</p>
        <pre className="opacity-50">{props.error.message}</pre>
      </div>
    </div>
  )
}

type Breadcrumb = Pick<
  ServiceBySlugQueryData,
  'breadcrumb' | 'slug' | 'subPageOf'
> & { subPageOf?: Breadcrumb | null }

function buildBreadcrumbs(
  service: Breadcrumb,
  parentSlug: string
): { name: string; href?: string }[] {
  const { slug: name = 'Angebot' } = service

  const currentCrumb = {
    name: service.breadcrumb ?? name.charAt(0).toUpperCase() + name.slice(1),
    href: `/${parentSlug}/${buildBreadcrumbPath(service.slug, service.subPageOf)}`,
  }

  if (service.subPageOf?.breadcrumb && service.subPageOf?.slug) {
    return [...buildBreadcrumbs(service.subPageOf, parentSlug), currentCrumb]
  }

  return [{ name: 'Angebot' }, currentCrumb]
}

const buildBreadcrumbPath = (
  slug?: string,
  subPageOf?: Breadcrumb
): string | undefined => {
  if (subPageOf) {
    return buildBreadcrumbPath(`${subPageOf.slug}/${slug}`, subPageOf.subPageOf)
  }
  return slug
}
