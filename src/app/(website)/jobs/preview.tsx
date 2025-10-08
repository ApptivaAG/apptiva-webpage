'use client'

import { jobsPageQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import Jobs from './jobs'
import { JobsPageQueryData } from './types'

export default function JobsPreview(props: {
  initial: QueryResponseInitial<JobsPageQueryData>
  customers: React.ReactNode
  testimonials: React.ReactNode
  partners: React.ReactNode
}) {
  const { data } = useQuery<JobsPageQueryData>(jobsPageQuery.query, undefined, {
    initial: props.initial,
  })
  return (
    <Jobs
      data={data}
      customers={props.customers}
      testimonials={props.testimonials}
      partners={props.partners}
    />
  )
}
