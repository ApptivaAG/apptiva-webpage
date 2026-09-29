'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { InferType } from 'groqd'
import { glossaryBySlugQuery } from '@/sanity/lib/queries'
import Item from './item'

type Data = InferType<typeof glossaryBySlugQuery>
export default function GlossaryItemPreview({
  initial,
  params,
  previousSlug,
  nextSlug,
}: {
  initial: QueryResponseInitial<Data>
  params: { slug: string }
  previousSlug?: string
  nextSlug?: string
}) {
  const { data } = useQuery<Data>(glossaryBySlugQuery.query, params, {
    initial,
  })
  return (
    <Item glossary={data} previousSlug={previousSlug} nextSlug={nextSlug} />
  )
}
