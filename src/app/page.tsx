// ./nextjs-app/app/page.tsx

import { SanityDocument } from 'next-sanity'
import { faqsQuery } from '@/sanity/lib/queries'
import { sanityFetch, token } from '@/sanity/lib/sanityFetch'
import { draftMode } from 'next/headers'

export default async function Home() {
  const faqs = await sanityFetch<SanityDocument[]>({ query: faqsQuery })

  return (
    <div className="container mx-auto px-4">
      <h1>Apptiva</h1>
      <ul>
        {faqs.map((faq) => (
          <li key={faq._id}>
            <a href={faq.slug}>{faq.question}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
