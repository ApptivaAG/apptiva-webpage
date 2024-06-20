import { queryTags } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { cache } from 'react'

export const getTags = cache(async () => {
  const tags = await runQuery(queryTags, undefined, ['tag'])
  return tags
})
