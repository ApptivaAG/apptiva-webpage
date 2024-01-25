import { glossaryQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { InferType } from 'groqd'
import { cache } from 'react'
import { Glossary } from './types'

const glossary = new Map<string, Glossary>()

export const getGlossary = cache(async () => {
  await getCmsGlossary()
  return glossary
})

const getCmsGlossary = cache(async () => {
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
})
