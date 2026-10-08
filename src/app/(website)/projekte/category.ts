export const categories = ['dev', 'chatbots', ''] as const
export type Category = (typeof categories)[number]

export function projectPath(category: Category = '', slug?: string) {
  const categoryPath = category === 'dev' ? 'development' : category
  return ['/projekte', categoryPath, slug].filter(Boolean).join('/')
}

export function matchesCategory(
  project: { tags?: (string | undefined)[] | null },
  category: Category
) {
  if (category === 'chatbots')
    return Boolean(project.tags?.includes('Chatbots'))
  if (category === 'dev') return !project.tags?.includes('Chatbots')
  return true
}
