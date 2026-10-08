import 'server-only'

import { BaseQuery, InferType, makeSafeQueryRunner, z } from 'groqd'
import { cacheLife, cacheTag } from 'next/cache'
import { draftMode } from 'next/headers'
import { token } from '../env'
import { client } from './client'
import { loadQuery } from './store'

export const runQuery = makeSafeQueryRunner(
  async (
    query,
    params: Record<string, number | string> = {},
    tags?: string[]
  ) => {
    'use cache'
    cacheLife('max')
    if (tags?.length) cacheTag(...tags)
    const isDraftMode = (await draftMode()).isEnabled

    if (isDraftMode && !token) {
      throw new Error(
        'The `SANITY_API_READ_TOKEN` environment variable is required.'
      )
    }

    return client
      .withConfig({
        token: token,
        perspective: isDraftMode ? 'previewDrafts' : 'published',
        useCdn: !isDraftMode,
        stega: {
          enabled: isDraftMode,
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
  const result = await loadCachedQuery<InferType<T>>(
    query.query,
    isDraftMode,
    params,
    cacheTags
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

async function loadCachedQuery<T>(
  query: string,
  isDraftMode: boolean,
  params: Record<string, number | string>,
  tags?: string[]
) {
  'use cache'
  cacheLife('max')
  if (tags?.length) cacheTag(...tags)
  return loadQuery<T>(
    query,
    params,
    isDraftMode
      ? { perspective: 'previewDrafts', useCdn: false, stega: true }
      : {}
  )
}
