import { queryTags } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { cache } from 'react'
import { CmsContent } from './types'

export const getTags = cache(async () => {
  const tags = await runQuery(queryTags)
  return tags
})
