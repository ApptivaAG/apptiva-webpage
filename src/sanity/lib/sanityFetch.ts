import 'server-only'

import { client } from '@/sanity/lib/client'
import { makeSafeQueryRunner } from 'groqd'

export const token = process.env.SANITY_API_READ_TOKEN

export const runQuery = makeSafeQueryRunner(
  (query, params: Record<string, number | string> = {}) => {
    const isDraftMode = false

    if (isDraftMode && !token) {
      throw new Error(
        'The `SANITY_API_READ_TOKEN` environment variable is required.'
      )
    }

    return client.withConfig({ useCdn: !isDraftMode }).fetch(query, params)
  }
)
