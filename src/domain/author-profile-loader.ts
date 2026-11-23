import 'server-only'

import { draftMode } from 'next/headers'
import { cache } from 'react'
import { load } from '@/sanity/lib/sanityFetch'
import { authorProfileQuery } from './author-profile'

export const loadAuthorProfile = cache(async (slug: string) => {
  const { isEnabled } = await draftMode()
  const result = await load(authorProfileQuery, isEnabled, { slug }, [
    'person',
    'blog',
  ])
  return { ...result, isDraftMode: isEnabled }
})
