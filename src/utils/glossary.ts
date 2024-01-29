import { glossaryBySlugQuery, glossaryQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { InferType } from 'groqd'
import { cache } from 'react'
import { mapTags } from './tags'
import { Glossary } from './types'

export const getGlossaryItemBySlug = cache(async (slug: string) => {
  const glossaryFromCms = await runQuery(glossaryBySlugQuery, {
    slug,
  })

  if (!glossaryFromCms.slug) {
    return undefined
  }

  return {
    slug: glossaryFromCms.slug,
    title: glossaryFromCms.title,
    modules: glossaryFromCms.modules,
    summary: glossaryFromCms.summary,
    tags: mapTags(glossaryFromCms.tags),
  } satisfies Glossary
})

export const getGlossary = cache(async () => {
  const glossary = new Map<string, Glossary>()
  const glossaryFromCms = await runQuery(glossaryQuery)

  type CmsGlossaryWithSlug = InferType<typeof glossaryQuery>[number] & {
    slug: string
  }

  glossaryFromCms
    .filter(
      (glossaryEntry): glossaryEntry is CmsGlossaryWithSlug =>
        !!glossaryEntry.slug
    )
    .forEach((glossaryEntry) => {
      glossary.set(glossaryEntry.slug, {
        title: glossaryEntry.title ?? 'Ohne Titel',
        slug: glossaryEntry.slug,
        summary: glossaryEntry.summary,
        modules: glossaryEntry.modules,
        tags: glossaryEntry.tags?.filter((tag): tag is string => !!tag),
      })
    })

  return glossary
})
