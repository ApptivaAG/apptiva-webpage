import type { Article, WithContext } from 'schema-dts'
import { rootUrl } from '@/app/env'
import { Schema } from './schema'

interface ProjectArticleSchemaProps {
  projectName: string
  slug: string
  description?: string
  imageUrl?: string
  customerName?: string
  technologies?: string
  tags?: (string | null | undefined)[]
  dateCreated?: string
  dateModified?: string
}

export default function ProjectArticleSchema({
  projectName,
  slug,
  description,
  imageUrl,
  customerName,
  technologies,
  tags,
  dateCreated,
  dateModified,
}: ProjectArticleSchemaProps) {
  // Combine technologies and tags as keywords
  const keywords = [
    ...(technologies?.split(',').map((t) => t.trim()) || []),
    ...(tags?.filter((t): t is string => t != null && t !== undefined) || []),
  ].filter(Boolean)

  const articleSchema: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: projectName,
    description: description,
    datePublished: dateCreated,
    dateModified: dateModified || dateCreated,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${rootUrl}/projekte/${slug}`,
    },
    author: {
      '@type': 'Organization',
      '@id': `${rootUrl}/#organization`,
      name: 'Apptiva AG',
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${rootUrl}/#organization`,
    },
    ...(imageUrl && {
      image: imageUrl.startsWith('http') ? imageUrl : `${rootUrl}${imageUrl}`,
    }),
    ...(keywords.length > 0 && { keywords }),
    ...(customerName && {
      about: {
        '@type': 'Organization',
        name: customerName,
      },
    }),
    inLanguage: 'de-CH',
    genre: 'Case Study',
    isPartOf: {
      '@type': 'CollectionPage',
      '@id': `${rootUrl}/projekte`,
      name: 'Projekte',
    },
  }

  return <Schema data={articleSchema} />
}
