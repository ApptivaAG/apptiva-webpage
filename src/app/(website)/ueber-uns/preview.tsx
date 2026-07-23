'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { aboutPageQuery } from '@/sanity/lib/queries'
import About from './about'
import { AboutPageQueryData } from './types'

export default function AboutPreview(props: {
  initial: QueryResponseInitial<AboutPageQueryData>
  customers: React.ReactNode
  testimonials: React.ReactNode
  partners: React.ReactNode
}) {
  const { data } = useQuery<AboutPageQueryData>(
    aboutPageQuery.query,
    undefined,
    { initial: props.initial }
  )
  return (
    <About
      data={data}
      customers={props.customers}
      testimonials={props.testimonials}
      partners={props.partners}
    />
  )
}
