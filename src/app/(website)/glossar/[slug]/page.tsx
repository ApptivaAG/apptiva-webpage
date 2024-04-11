import { glossaryBySlugQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Item from './item'
import GlossaryItemPreview from './preview'
import { Metadata } from 'next'
import portableTextToString from '@/utils/portable-text-to-string'

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

  return {
    title: `${glossary.title ?? 'Ohne Titel'} | Glossar`,
    description: glossary.summary
      ? portableTextToString(glossary.summary)
      : 'Ohne Zusammenfassung',
    alternates: { canonical: url },
    openGraph: {
      title: glossary.title ?? 'Ohne Titel',
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
