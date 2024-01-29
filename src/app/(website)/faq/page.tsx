// ./nextjs-app/app/page.tsx

import { faqsQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'

export default async function Home() {
  const faqs = await runQuery(faqsQuery)

  return (
    <div className="container mx-auto px-4">
      <h1>FAQ</h1>
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
