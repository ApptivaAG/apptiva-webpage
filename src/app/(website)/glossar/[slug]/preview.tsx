'use client'

import { glossaryBySlugQuery } from '@/sanity/lib/queries'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { InferType } from 'groqd'
import Item from './item'

type Data = InferType<typeof glossaryBySlugQuery>
export default function GlossaryItemPreview({
  initial,
  params
}: {
  initial: QueryResponseInitial<Data>
  params: { slug: string } 
}) {

  const {data} = useQuery<Data>(glossaryBySlugQuery.query, params, {initial})

  return <Item glossary={data} />
}
