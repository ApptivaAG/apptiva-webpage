import { glossaryQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { orderGlossaryByTitle } from '@/domain/glossary'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { GlossaryList } from './list'
import GlossaryPreview from './preview'

const url = '/glossar'
const title = 'Glossar'
export const metadata: Metadata = {
  title,
  description:
    'Hier haben wir alle wichtigen Fachbegriffe rund um die Themen  Chatbot und Conversational AI für dich zusammengestellt.',
  alternates: { canonical: url },
  openGraph: {
    title,
    url,
  },
}

export default async function Glossary() {
  const isDraft = (await draftMode()).isEnabled
  const glossary = await load(glossaryQuery, isDraft, undefined, ['glossary'])

  return (
    <>
      {isDraft ? (
        <GlossaryPreview initial={glossary.draft} />
      ) : (
        <GlossaryList data={orderGlossaryByTitle(glossary.published)} />
      )}
    </>
  )
}
