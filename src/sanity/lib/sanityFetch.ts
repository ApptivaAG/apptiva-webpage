import 'server-only'

import { makeSafeQueryRunner } from 'groqd'
import { client } from './client'
//import { token } from './token'
//import { token } from './token'

const token = process.env.SANITY_API_READ_TOKEN

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
