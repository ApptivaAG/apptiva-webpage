import { queryTags } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import { cache } from 'react'

export const getTags = cache(async () => {
  const tags = await runQuery(
    queryTags,
    undefined,
    ['tag'],
    draftMode().isEnabled
  )
  return tags
})

export const mapTags = (
  tags: (string | undefined)[] | null
): string[] | undefined =>
  tags?.filter((tag): tag is string => typeof tag === 'string') ?? undefined
