'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'

import { HomepageDataQueries, homepageQuery } from '@/sanity/lib/queries'
import ModuleWrapper from './modules'

export default function ModulesPreview(props: {
  initial: QueryResponseInitial<HomepageDataQueries>
  customers: React.ReactNode
  testimonials: React.ReactNode
}) {
  const { data } = useQuery<HomepageDataQueries>(
    homepageQuery.query,
    undefined,
    {
      initial: props.initial,
    }
  )

  return (
    <ModuleWrapper
      data={data}
      customers={props.customers}
      testimonials={props.testimonials}
    />
  )
}
