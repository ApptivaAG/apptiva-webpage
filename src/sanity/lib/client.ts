import { createClient } from '@sanity/client/stega'
import { apiVersion, dataset, projectId, useCdn } from '../env'
import { draftMode } from 'next/headers'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn: false,
  // These settings will be overridden in
  // ./sanity/lib/store.ts when draftMode is enabled
  //perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})
