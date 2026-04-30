import { parseAsStringLiteral, createLoader } from 'nuqs/server'

export const categories = ['dev', 'chatbots', ''] as const
export type Category = (typeof categories)[number]

export const coordinatesSearchParams = {
  category: parseAsStringLiteral(categories).withDefault(''),
}

export const loadSearchParams = createLoader(coordinatesSearchParams)
