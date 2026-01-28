'use client'

import { mediaPageQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import Media from './media'
import { MediaPageQueryData } from './types'

export default function MediaPreview(props: {
  initial: QueryResponseInitial<MediaPageQueryData>
  customers: React.ReactNode
  testimonials: React.ReactNode
  partners: React.ReactNode
}) {
  const { data } = useQuery<MediaPageQueryData>(
    mediaPageQuery.query,
    undefined,
    { initial: props.initial }
  )
  return (
    <Media
      data={data}
      customers={props.customers}
      testimonials={props.testimonials}
      partners={props.partners}
    />
  )
}
