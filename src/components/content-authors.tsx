import Link from 'next/link'
import type { ContentAuthorData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import Heading from './heading'
import SanityImage from './sanity-image'
import Section from './section'

export default function ContentAuthors({
  authors,
}: {
  authors?: ContentAuthorData[] | null
}) {
  if (!authors?.length) return null

  return (
    <Section id="autoren" className="border-t border-primary/10">
      <div className="content">
        <Heading level={2} size={2} className="text-center">
          {authors.length === 1 ? 'Über den Autor' : 'Über die Autoren'}
        </Heading>
        <div
          className={cn(
            'mt-12 grid gap-12 lg:mt-20 lg:gap-x-20',
            authors.length > 1 ? 'lg:grid-cols-2' : 'mx-auto max-w-3xl'
          )}
        >
          {authors.map((author) => (
            <article key={author._id} className="min-w-0">
              <div className="flex items-center gap-5 sm:gap-7">
                {author.image && (
                  <SanityImage
                    image={author.image}
                    className="h-20 w-20 shrink-0 rounded-full border-4 border-base-white object-cover shadow-lg sm:h-28 sm:w-28"
                    sizes="(min-width: 640px) 112px, 80px"
                  />
                )}
                <div className="min-w-0">
                  <Heading level={3} size={4}>
                    {author.personName}
                  </Heading>
                  {author.role && (
                    <p className="mt-2 text-sm font-bold uppercase tracking-wide text-primary/70">
                      {author.role}
                    </p>
                  )}
                  {author.hasAuthorProfile && author.slug && (
                    <Link
                      href={`/autoren/${author.slug}`}
                      className="mt-4 inline-flex items-center gap-3 font-bold underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      <span aria-hidden="true">→</span>
                      Zum Autorenprofil
                      <span className="sr-only"> von {author.personName}</span>
                    </Link>
                  )}
                </div>
              </div>
              {author.summary && (
                <p className="mt-7 whitespace-pre-line text-lg leading-relaxed text-primary/85">
                  {author.summary}
                </p>
              )}
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
