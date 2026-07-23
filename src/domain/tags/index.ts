import { cache } from 'react'
import { queryTags } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'

export const getTags = cache(async () => {
  const tags = await runQuery(queryTags, undefined, ['tag'])
  return tags
})
