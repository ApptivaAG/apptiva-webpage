// ./nextjs-app/app/page.tsx

import SanityImage from '@/components/sanity-image'
import { getGlossary } from '@/utils/glossary'
import { PortableText } from '@portabletext/react'

export default async function Home() {
  const glossary = await getGlossary()
  const glossaryEntries = Array.from(glossary.values())

  return (
    <div className="container mx-auto px-4">
      <h1>Glossar</h1>
      <ul>
        {glossaryEntries.map((glossaryEntry) => (
          <li key={glossaryEntry.slug}>
            <b>{glossaryEntry.title}:</b>
            {glossaryEntry.summary?.map((summary) => (
              <PortableText key={summary._key} value={summary} />
            ))}
            {glossaryEntry?.modules?.map((module) => (
              <>
                <h2>{module.title}</h2>
                <SanityImage image={module.image} />
                {module.content?.map((content) => (
                  <PortableText key={content._key} value={content} />
                ))}
              </>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}
