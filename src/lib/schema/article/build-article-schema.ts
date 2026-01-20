import type { Article, WithContext } from 'schema-dts'

export function buildArticleSchema(post: {
  name: string
  slug: string
  publishDate: string
  modifiedDate?: string
  author?: string
  articleType: 'blog' | 'apptiva-lernt'
  description?: string
  image?: string
  tags?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.name,
    datePublished: post.publishDate,
    dateModified: post.modifiedDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://apptiva.ch/${post.articleType}/${post.slug}`,
    },
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      '@id': 'https://apptiva.ch/#organization',
    },
    image: post.image,
    keywords: post.tags,
    inLanguage: 'de-CH',
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': `https://apptiva.ch/${post.articleType}`,
      name: post.articleType === 'blog' ? 'Blog' : 'Apptiva lernt',
    },
  } as WithContext<Article>
}
