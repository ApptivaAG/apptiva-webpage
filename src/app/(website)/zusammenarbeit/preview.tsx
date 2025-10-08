'use client'

import { zusammenarbeitPageQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { ZusammenarbeitPageQueryData } from './types'
import Zusammenarbeit from './zusammenarbeit'

export default function ZusammenarbeitPreview(props: {
  initial: QueryResponseInitial<ZusammenarbeitPageQueryData>
  customers: React.ReactNode
  testimonials: React.ReactNode
  partners: React.ReactNode
}) {
  const { data } = useQuery<ZusammenarbeitPageQueryData>(
    zusammenarbeitPageQuery.query,
    undefined,
    {
      initial: props.initial,
    }
  )
  return (
    <Zusammenarbeit
      data={data}
      customers={props.customers}
      testimonials={props.testimonials}
      partners={props.partners}
    />
  )
}
