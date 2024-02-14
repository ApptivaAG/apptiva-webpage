import { settingsQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { cache } from 'react'

export const getSettings = cache(async () => {
  const settings = await runQuery(settingsQuery, undefined, ['settings'])
  return settings[0]
})
