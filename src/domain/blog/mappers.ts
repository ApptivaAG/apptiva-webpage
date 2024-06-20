import { PostBySlugQueryData } from '@/sanity/lib/queries'
import portableTextToString from '../../utils/portable-text-to-string'
import { CmsBlog, CmsContent } from '../types'
import { mapTags } from '../tags/map-tags'
import { vercelStegaCleanAll } from '@sanity/client/stega'

export function mapCmsPost(post: PostBySlugQueryData | null) {
  if (!post || !post.slug) {
    return undefined
  }

  const description = post.header?.lead ?? 'Ohne Einleitung'
  const title = post.header?.title
    ? typeof post.header.title === 'string'
      ? post.header.title
      : portableTextToString(post.header.title)
    : 'Ohne Titel'
  return {
    kind: 'cms',
    content: post.content as CmsContent,
    image: post.header?.image,
    title,
    description,
    meta: {
      title: post.header?.meta?.title ?? title,
      description: post.header?.meta?.description ?? description,
    },
    slug: post.slug,
    author: post.author ?? 'Anonymous',
    publishDate: post.publishedAt ?? post._createdAt,
    modifiedDate: post._updatedAt,
    breadcrumb: post.breadcrumb,
    tags: mapTags(post.tags),
  } satisfies CmsBlog
}

export function hasTag(kind: 'blog' | 'apptiva-lernt') {
  return (post: { tags?: string[] }) => {
    const cleanTags = post.tags?.map((tag) => vercelStegaCleanAll(tag)) ?? []

    return kind === 'apptiva-lernt'
      ? cleanTags.includes('Apptiva lernt')
      : !cleanTags.includes('Apptiva lernt')
  }
}
