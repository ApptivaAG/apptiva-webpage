'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import type { InferResultType } from 'groqd'
import { orderGlossaryByTitle } from '@/domain/glossary'
import { glossaryQuery } from '@/sanity/lib/queries'
import { GlossaryList } from './list'

type Data = InferResultType<typeof glossaryQuery>

export default function GlossaryPreview({
  initial,
}: {
  initial: QueryResponseInitial<Data>
}) {
  const { data } = useQuery<Data>(glossaryQuery.query, undefined, { initial })
  return <GlossaryList data={orderGlossaryByTitle(data)} />
}
