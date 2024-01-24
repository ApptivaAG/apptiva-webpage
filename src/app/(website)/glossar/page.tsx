// ./nextjs-app/app/page.tsx

import { urlForImage } from '@/sanity/lib/image'
import { getGlossary } from '@/utils/glossary'
import { PortableText } from '@portabletext/react'
import { getImageDimensions } from '@sanity/asset-utils'
import Image from 'next/image'

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
                {module.image && (
                  <Image
                    key={module.image.toString()}
                    src={urlForImage(module.image).url()}
                    alt={module.image.alt}
                    width={getImageDimensions(module.image).width}
                    height={getImageDimensions(module.image).height}
                    placeholder="blur"
                    blurDataURL={urlForImage(module.image)
                      .width(24)
                      .height(24)
                      .blur(10)
                      .url()}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  />
                )}
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
