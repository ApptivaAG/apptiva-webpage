import { glossaryBySlugQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Item from './item'
import GlossaryItemPreview from './preview'
import { Metadata } from 'next'
import portableTextToString from '@/domain/portable-text-to-string'

export async function generateMetadata(props: {
  params: { slug: string }
}): Promise<Metadata> {
  const { published: glossary } = await load(
    glossaryBySlugQuery,
    false,
    props.params,
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
  params: { slug: string }
}) {
  const { published, draft } =
    (await load(glossaryBySlugQuery, draftMode().isEnabled, props.params, [
      'glossary',
    ])) ?? notFound()
  return (
    <>
      {draftMode().isEnabled ? (
        <GlossaryItemPreview initial={draft} params={props.params} />
      ) : (
        <Item glossary={published} />
      )}
    </>
  )
}
