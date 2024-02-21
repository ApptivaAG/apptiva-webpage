'use client'

import { serviceBySlugQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { ServiceBySlugQueryData } from '../types'
import ServiceDetail from './detail'

export default function ServicePreview({
  initial,
  params
}: {
  initial: QueryResponseInitial<ServiceBySlugQueryData>
  params:  {
    slug: string,
  }
}) {
  const {data} = useQuery<ServiceBySlugQueryData>(serviceBySlugQuery.query, params, {initial})
  return <ServiceDetail service={data} />

}
