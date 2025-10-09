import { parseAsStringLiteral, createLoader } from 'nuqs/server'

export const topics = [
  { name: 'Alle', value: '' },
  { name: 'App Entwicklung', value: 'App Entwicklung' },
  { name: 'Webentwicklung', value: 'Webentwicklung' },
  { name: 'Chatbots', value: 'Chatbots' },
] as const
export type Topics = (typeof topics)[number]['value']

export const coordinatesSearchParams = {
  topic: parseAsStringLiteral(topics.map((t) => t.value)).withDefault(''),
}

export const loadSearchParams = createLoader(coordinatesSearchParams)
