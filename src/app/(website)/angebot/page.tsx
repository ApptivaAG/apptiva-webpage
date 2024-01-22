// ./nextjs-app/app/page.tsx

import { servicePagesQuery } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/sanityFetch'
import { SanityDocument } from 'next-sanity'

export default async function Home() {
  const servicePages = await sanityFetch<SanityDocument[]>({
    query: servicePagesQuery,
  })

  return (
    <div className="container mx-auto px-4">
      <h1>Angebot</h1>
      <ul>
        {servicePages.map((servicePage) => (
          <li key={servicePage._id}>
            <a href={'angebot/' + servicePage.slug?.current}>
              {servicePage.header.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
