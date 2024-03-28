import { glossaryBySlugQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Item from './item'
import GlossaryItemPreview from './preview'

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
