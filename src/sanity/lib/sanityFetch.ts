import 'server-only'

import { BaseQuery, InferType, makeSafeQueryRunner, z } from 'groqd'
import { client } from './client'
import { draftMode } from 'next/headers'
import { stegaEnabled, token } from '../env'
import { loadQuery } from './store'

export const runQuery = makeSafeQueryRunner(
  async (
    query,
    params: Record<string, number | string> = {},
    tags?: string[]
  ) => {
    return client
      .withConfig({
        token: token,
        perspective: 'published',
        useCdn: true,
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
  const result = await loadQuery<InferType<T>>(query.query, params, {
    next: { tags: cacheTags },
  })

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
