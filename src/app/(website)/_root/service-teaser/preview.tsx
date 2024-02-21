'use client'

import { servicesTeaserQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import ServiceTeaserList from './list'
import { ServiceTeaserData } from './types'

export default function ServicesTeaserPreview({
  initial,
}: {
  initial: QueryResponseInitial<ServiceTeaserData[]>
}) {
  const {data} = useQuery<ServiceTeaserData[]>(servicesTeaserQuery.query, undefined, {initial})
  return <ServiceTeaserList services={data} />

}
