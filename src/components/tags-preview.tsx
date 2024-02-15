// ./components/PostPreview.tsx

'use client'

import { QueryResponseInitial, useQuery } from '@sanity/react-loader'
import { SanityDocument } from 'next-sanity'
import Posts from './tags'
import { queryTags } from '@/sanity/lib/queries'

export default function TagsPreview({
  initial,
}: {
  initial: QueryResponseInitial<SanityDocument[]>
}) {
  const { data } = useQuery<SanityDocument[] | null>(
    queryTags.query,
    {},
    { initial }
  )

  return data ? (
    <Posts tags={queryTags.schema.parse(data)} />
  ) : (
    <div className="bg-red-100">No posts found</div>
  )
}
