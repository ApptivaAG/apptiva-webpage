import 'server-only'

import * as queryStore from '@sanity/react-loader'
import { makeSafeQueryRunner } from 'groqd'
import { client } from './client'

export const token = process.env.SANITY_API_READ_TOKEN

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-08'

// todo: in loadQuery, draftMode().isEnabled works  because it uses react-loader
// todo: how to use loadQuery with makeSafeQueryRunner OR how to use makeSafeQueryRunner with queryStore???
//queryStore.setServerClient(client.withConfig({ token }))
//export const { loadQuery } = queryStore

export const runQuery = makeSafeQueryRunner(
  (
    query,
    params: Record<string, number | string> = {},
    tags?: string[],
    isDraftMode = false
  ) => {
    //console.log('are we in draft mode? ', draftMode().isEnabled)
    //const isDraftMode = draftMode().isEnabled
    //const isDraftMode = true
    const perspective = isDraftMode ? 'previewDrafts' : 'published'

    if (isDraftMode && !token) {
      throw new Error(
        'The `SANITY_API_READ_TOKEN` environment variable is required.'
      )
    }

    // todo: wenn draft mode, perspektive umschalten auf previewDrafts.
    console.log('perspective for client: ', perspective, tags)

    return client
      .withConfig({ token, perspective, useCdn: isDraftMode ? false : true })
      .fetch(query, params, { next: { tags } })
  }
)
