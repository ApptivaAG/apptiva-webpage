import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, stegaEnabled, useCdn } from '../env'

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
    enabled: stegaEnabled,
    studioUrl: '/studio',
  },
})
