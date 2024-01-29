// ./nextjs-app/app/page.tsx

import { getGlossary } from '@/utils/glossary'
import Link from 'next/link'

export default async function Home() {
  const glossary = await getGlossary()
  const glossaryEntries = Array.from(glossary.values())

  return (
    <div className="container mx-auto px-4">
      <h1>Glossar</h1>
      <ul>
        {glossaryEntries.map((glossaryEntry) => (
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
