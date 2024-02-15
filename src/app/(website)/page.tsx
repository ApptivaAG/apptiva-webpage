// ./nextjs-app/app/page.tsx
import Tags from '@/components/tags'
import TagsPreview from '@/components/tags-preview'
import { queryTags } from '@/sanity/lib/queries'
import { loadQuery } from '@/sanity/lib/store'
import type { InferType } from "groqd"
import { SanityDocument } from 'next-sanity'
import { draftMode } from 'next/headers'

export type Tags = InferType<typeof queryTags>

export default async function Home() {
  const {query, schema} = queryTags
  const result = await loadQuery<SanityDocument[]>(
    query,
    {},
    {
      perspective: draftMode().isEnabled ? 'previewDrafts' : 'published',
    }
  )

  return draftMode().isEnabled ? (
    <TagsPreview initial={result} />
  ) : (
    <Tags tags={schema.parse(result.data)} />
  )
}
