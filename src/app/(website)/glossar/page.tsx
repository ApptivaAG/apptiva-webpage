// ./nextjs-app/app/page.tsx

import Heading from '@/components/heading'
import { glossaryQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import { GlossaryList } from './list'
import GlossaryPreview from './preview'

export default async function Glossary() {
  const glossary = await load(glossaryQuery, draftMode().isEnabled, undefined, [
    'glossary',
  ])

  return (
    <div className="container mx-auto px-4">
      <Heading level={2}>Glossar</Heading>
      {draftMode().isEnabled ? (
        <GlossaryPreview initial={glossary.draft} />
      ) : (
        <GlossaryList data={glossary.published} />
      )}
    </div>
  )
}
