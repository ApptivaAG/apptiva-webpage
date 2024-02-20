// ./nextjs-app/app/page.tsx
import Tags from '@/components/tags'
import TagsPreview from '@/components/tags-preview'
import { queryTags } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import type { BaseQuery, InferType, z } from "groqd"
import { SanityDocument } from 'next-sanity'
import { DraftMode } from 'next/dist/client/components/draft-mode'
import { draftMode } from 'next/headers'

export type Tags = InferType<typeof queryTags>

export default async function Home() {

  const {draft, published} = await load(queryTags, draftMode().isEnabled)

  return draftMode().isEnabled ? (
    <TagsPreview initial={draft} />
  ) : (
    <Tags tags={published} />
  )
}


