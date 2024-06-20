'use client'

import { glossaryQuery } from '@/sanity/lib/queries'
import { orderGlossaryByTitle } from '@/domain/glossary'
import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { InferType } from 'groqd'
import { GlossaryList } from './list'

type Data = InferType<typeof glossaryQuery>

export default function GlossaryPreview({
  initial,
}: {
  initial: QueryResponseInitial<Data>
}) {
  const { data } = useQuery<Data>(glossaryQuery.query, undefined, { initial })
  return <GlossaryList data={orderGlossaryByTitle(data)} />
}
