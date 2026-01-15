import { buildBreadcrumbSchema } from '../breadcrumb'

export function blogBreadcrumbs(post: {
  name?: string
  slug: { current: string }
}) {
  return buildBreadcrumbSchema([
    {
      name: 'Home',
      url: 'https://apptiva.ch',
    },
    {
      name: 'Blog',
      url: 'https://apptiva.ch/blog',
    },
    {
      name: post.name ?? 'Blog',
      url: `https://apptiva.ch/blog/${post.slug.current}`,
    },
  ])
}
