import { buildBreadcrumbSchema } from '../breadcrumb'

export function apptivaLerntBreadcrumbs(post: {
  name?: string
  slug: { current: string }
}) {
  return buildBreadcrumbSchema([
    {
      name: 'Home',
      url: 'https://apptiva.ch',
    },
    {
      name: 'Apptiva lernt',
      url: 'https://apptiva.ch/apptiva-lernt',
    },
    {
      name: post.name ?? 'Artikel',
      url: `https://apptiva.ch/apptiva-lernt/${post.slug.current}`,
    },
  ])
}
