import { createClient } from '@sanity/client'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  // These settings will be overridden in
  // ./sanity/lib/store.ts when draftMode is enabled
  // maybe it is alswo overridden in sanityFetch.ts
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
})
