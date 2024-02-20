import 'server-only'

import { BaseQuery, makeSafeQueryRunner, z } from 'groqd'
import { client } from './client'
import { token } from '../env'
import { loadQuery } from './store'
import { SanityDocument } from 'next-sanity'

export const runQuery = makeSafeQueryRunner(
  (query, params: Record<string, number | string> = {}, tags?: string[]) => {
    const isDraftMode = false

    if (isDraftMode && !token) {
      throw new Error(
        'The `SANITY_API_READ_TOKEN` environment variable is required.'
      )
    }
    console.log('at runQuery, draft mode on? ', isDraftMode)

    // return client
    //   .withConfig({
    //     token: token,
    //     perspective: isDraftMode ? 'previewDrafts' : 'published',
    //     useCdn: isDraftMode ? false : true,
    //     stega: {
    //       enabled: false,
    //       studioUrl: '/studio',
    //     },
    //   })
    //   .fetch(query, params, { next: { tags } })

    return client
      .withConfig({
        token: token,
        perspective: isDraftMode ? 'previewDrafts' : 'published',
        useCdn: isDraftMode ? false : true,
        stega: {
          enabled: false,
          studioUrl: '/studio',
        },
      })
      .fetch(query, params, { next: { tags } })
  }
)

export type GroqdQuery = BaseQuery<z.ZodTypeAny>

export async function load(query: GroqdQuery, isDraftMode = false, params: Record<string, number | string> = {}, tags?: string[]) {
  const result = await loadQuery<SanityDocument[]>(
    query.query,
    params,
    {
      perspective: isDraftMode ? 'previewDrafts' : 'published',
      next: { tags }
    }
  )

  return {
    draft: result,
    published: query.schema.parse(result.data)
  }
}
