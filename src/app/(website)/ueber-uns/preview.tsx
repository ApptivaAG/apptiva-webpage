'use client'

import { aboutPageQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import About from './about'
import { AboutPageQueryData } from './types'

export default function AboutPreview(props: {
  initial: QueryResponseInitial<AboutPageQueryData>
  customers: React.ReactNode
  testimonials: React.ReactNode
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
    />
  )
}
