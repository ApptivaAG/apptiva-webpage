'use client'

import {
  ServiceBySlugQueryData,
  serviceBySlugQuery,
} from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'

import ServiceDetail from './detail'

export default function ServicePreview(props: {
  initial: QueryResponseInitial<ServiceBySlugQueryData>
  params: {
    slug: string
  }
  customers: React.ReactNode
  testimonials: React.ReactNode
}) {
  const { data } = useQuery<ServiceBySlugQueryData>(
    serviceBySlugQuery.query,
    props.params,
    { initial: props.initial }
  )

  return <ServiceDetail service={data} customers={props.customers} testimonials={props.testimonials} isPreview />
}
