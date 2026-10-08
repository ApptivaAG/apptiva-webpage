import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { orderGlossaryByTitle } from '@/domain/glossary'
import { glossaryBySlugQuery, glossaryQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import portableTextToString from '@/utils/portable-text-to-string'
import Item from './item'
import GlossaryItemPreview from './preview'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { published: glossary } = await load(
    glossaryBySlugQuery,
    false,
    await props.params,
    ['glossary']
  )

  if (!glossary) notFound()

  const url = `/glossar/${glossary.slug}`
  const title = glossary.header?.title
    ? portableTextToString(glossary.header.title)
    : 'Glossareintrag'

  return {
    title: `${title} | Glossar`,
    description:
      glossary.header?.meta?.description ??
      (glossary.summary
        ? portableTextToString(glossary.summary)
        : 'Ohne Zusammenfassung'),
    alternates: { canonical: url },
    openGraph: {
      title,
      url,
    },
  }
}

export async function generateStaticParams() {
  const { published: glossary } = await load(glossaryQuery, false, undefined, [
    'glossary',
  ])
  return glossary.filter((entry) => entry.slug).map(({ slug }) => ({ slug }))
}

export default async function GlossaryItem(props: {
  params: Promise<{ slug: string }>
}) {
  const isDraft = (await draftMode()).isEnabled
  const params = await props.params
  const { published, draft } = await load(
    glossaryBySlugQuery,
    isDraft,
    params,
    ['glossary']
  )
  if (!isDraft && !published) notFound()

  const { published: allGlossary } = await load(
    glossaryQuery,
    false,
    undefined,
    ['glossary']
  )
  const slugs = orderGlossaryByTitle(allGlossary ?? [])
    .map((entry) => entry.slug)
    .filter((slug): slug is string => Boolean(slug))
  const currentIndex = slugs.indexOf(params.slug)
  const previousSlug = currentIndex > 0 ? slugs[currentIndex - 1] : undefined
  const nextSlug =
    currentIndex >= 0 ? (slugs[currentIndex + 1] ?? undefined) : undefined

  return (
    <>
      {isDraft ? (
        <GlossaryItemPreview
          initial={draft}
          params={params}
          previousSlug={previousSlug}
          nextSlug={nextSlug}
        />
      ) : (
        <Item
          glossary={published}
          previousSlug={previousSlug}
          nextSlug={nextSlug}
        />
      )}
    </>
  )
}
