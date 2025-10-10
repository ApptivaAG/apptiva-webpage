import 'server-only'

import { BaseQuery, InferType, makeSafeQueryRunner, z } from 'groqd'
import { client } from './client'
import { token } from '../env'
import { loadQuery } from './store'

export const runQuery = makeSafeQueryRunner(
  (query, params: Record<string, number | string> = {}, tags?: string[]) => {
    const isDraftMode = false

    if (isDraftMode && !token) {
      throw new Error(
        'The `SANITY_API_READ_TOKEN` environment variable is required.'
      )
    }

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

export async function load<T extends GroqdQuery>(
  query: T,
  isDraftMode = false,
  params: Record<string, number | string> = {},
  cacheTags?: string[]
) {
  const result = await loadQuery<InferType<T>>(
    query.query,
    params,
    isDraftMode
      ? {
          perspective: 'drafts',
          useCdn: false,
          stega: true,
          next: { tags: cacheTags },
        }
      : {
          next: { tags: cacheTags },
        }
  )

  const parsed = query.schema.safeParse(result.data) as z.SafeParseReturnType<
    InferType<T>,
    any
  >

  return {
    draft: result,
    published: result.data as InferType<T>,
    error: !parsed.success ? parsed.error : undefined,
  }
}
