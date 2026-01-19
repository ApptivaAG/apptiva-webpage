// ./sanity/lib/store.ts

import * as queryStore from '@sanity/react-loader'

import { client } from '@/sanity/lib/client'
import { token } from '../env.server'

queryStore.setServerClient(client.withConfig({ token }))

export const { loadQuery } = queryStore
