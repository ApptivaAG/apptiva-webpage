// ./nextjs-app/app/page.tsx

import Heading from '@/components/heading'
import { glossaryQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import { GlossaryList } from './list'
import GlossaryPreview from './preview'
import { Metadata } from 'next'

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
  const glossary = await load(glossaryQuery, draftMode().isEnabled, undefined, [
    'glossary',
  ])

  return (
    <>
      <Heading level={2}>Glossar</Heading>
      {draftMode().isEnabled ? (
        <GlossaryPreview initial={glossary.draft} />
      ) : (
        <GlossaryList data={glossary.published} />
      )}
    </>
  )
}
