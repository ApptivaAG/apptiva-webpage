import type { Category } from './category'

type ProjectRoute =
  | { kind: 'listing'; category: Category }
  | { kind: 'detail'; category: Category; slug: string }

export function parseProjectRoute(
  segments: string[]
): ProjectRoute | undefined {
  const [first, second] = segments
  const category =
    first === 'chatbots'
      ? 'chatbots'
      : first === 'development'
        ? 'dev'
        : undefined

  if (segments.length === 1 && first) {
    return category
      ? { kind: 'listing', category }
      : { kind: 'detail', category: '', slug: first }
  }

  if (segments.length === 2 && category && second) {
    return { kind: 'detail', category, slug: second }
  }
}
