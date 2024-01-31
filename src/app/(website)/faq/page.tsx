// ./nextjs-app/app/page.tsx

import Heading from '@/components/heading'
import { faqsQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'

export default async function Home() {
  const faqs = await runQuery(faqsQuery, undefined, ['faq'])

  return (
    <div className="container mx-auto px-4">
      <Heading level={2}>FAQ</Heading>
      {faqs.map((faq) => (
        <>
          <b>{faq.question}</b>
          <p>{faq.answer}</p>
        </>
      ))}
    </div>
  )
}
