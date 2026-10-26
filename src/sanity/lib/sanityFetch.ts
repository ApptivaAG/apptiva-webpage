import 'server-only'

import type { IGroqBuilder } from 'groqd'
import { cacheLife, cacheTag } from 'next/cache'
import { draftMode } from 'next/headers'
import { token } from '../env'
import { client } from './client'
import { loadQuery } from './store'

export type GroqdQuery = IGroqBuilder<any>

export async function runQuery<TResult>(
  query: IGroqBuilder<TResult>,
  params: Record<string, number | string> = {},
  tags?: string[]
): Promise<TResult> {
  const isDraftMode = (await draftMode()).isEnabled
  const data = await fetchCachedQuery(query.query, params, tags, isDraftMode)

  return query.parse(nullFieldsToUndefined(data))
}

async function fetchCachedQuery(
  query: string,
  params: Record<string, number | string>,
  tags: string[] | undefined,
  isDraftMode: boolean
) {
  'use cache'
  cacheLife('max')
  if (tags?.length) cacheTag(...tags)

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
    .fetch<unknown>(query, params, { next: { tags } })
}

export async function load<TResult>(
  query: IGroqBuilder<TResult>,
  isDraftMode = false,
  params: Record<string, number | string> = {},
  cacheTags?: string[]
) {
  const result = await loadCachedQuery<TResult>(
    query.query,
    isDraftMode,
    params,
    cacheTags
  )

  let error: Error | undefined
  try {
    query.parse(nullFieldsToUndefined(result.data))
  } catch (cause) {
    error =
      cause instanceof Error ? cause : new Error('Could not parse query result')
  }

  return {
    draft: result,
    published: result.data,
    error,
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

function nullFieldsToUndefined(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(nullFieldsToUndefined)
  }

  if (typeof value !== 'object' || value === null) {
    return value
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, field]) => [
      key,
      field === null ? undefined : nullFieldsToUndefined(field),
    ])
  )
}
