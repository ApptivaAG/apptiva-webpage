import 'server-only'

import { makeSafeQueryRunner } from 'groqd'
import { createClient } from 'next-sanity'

export const token = process.env.SANITY_API_READ_TOKEN

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-08'

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

export const runQuery = makeSafeQueryRunner(
  (query, params: Record<string, number | string> = {}, tags?: string[]) => {
    const isDraftMode = false

    if (isDraftMode && !token) {
      throw new Error(
        'The `SANITY_API_READ_TOKEN` environment variable is required.'
      )
    }

    return client
      .withConfig({ useCdn: !isDraftMode })
      .fetch(query, params, { next: { tags } })
  }
)
