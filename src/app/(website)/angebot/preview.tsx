'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { servicesQuery } from '@/sanity/lib/queries'
import ServiceList from './list'
import { ServiceQueryData } from './types'

export default function ServicesPreview({
  initial,
}: {
  initial: QueryResponseInitial<ServiceQueryData[]>
}) {
  const { data } = useQuery<ServiceQueryData[]>(
    servicesQuery.query,
    undefined,
    { initial }
  )
  return <ServiceList services={data} />
}
