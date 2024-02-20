// ./nextjs-app/app/page.tsx

import Heading from '@/components/heading'
import { glossaryQuery } from '@/sanity/lib/queries'
import { load } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'
import Link from 'next/link'

export default async function Home() {
  const glossary = await load(glossaryQuery, draftMode().isEnabled, undefined, ['glossary'])

  return (
    <div className="container mx-auto px-4">
      <Heading level={2}>Glossar</Heading>
      <ul>
        {glossary.published.map((glossaryEntry) => (
          <li key={glossaryEntry.slug}>
            <Link href={`/glossar/${glossaryEntry.slug}`}>
              {glossaryEntry.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
