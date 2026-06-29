import { defineEnableDraftMode } from 'next-sanity/draft-mode'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/env'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token }),
})
