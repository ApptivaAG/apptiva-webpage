import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { glossaryBySlugQuery } from '@/sanity/lib/queries'
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

export default async function GlossaryItem(props: {
  params: Promise<{ slug: string }>
}) {
  const isDraft = (await draftMode()).isEnabled
  const params = await props.params
  const { published, draft } =
    (await load(glossaryBySlugQuery, isDraft, params, ['glossary'])) ??
    notFound()
  return (
    <>
      {isDraft ? (
        <GlossaryItemPreview initial={draft} params={params} />
      ) : (
        <Item glossary={published} />
      )}
    </>
  )
}
