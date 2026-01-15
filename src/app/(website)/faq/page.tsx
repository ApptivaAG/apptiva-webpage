// ./nextjs-app/app/page.tsx

import FAQSchema from '@/components/faq-schema'
import Heading from '@/components/heading'
import StyledPortableText from '@/components/styled-portable-text'
import { faqsQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'
import { Metadata } from 'next'

const url = '/faq'
const title = 'FAQ'
export const metadata: Metadata = {
  title,
  description:
    'Häufig gestellte Fragen und Antworten rund um die Themen Chatbot und Softwareentwicklung.',
  alternates: { canonical: url },
  openGraph: {
    title,
    url,
  },
}

export default async function Home() {
  const faqs = await runQuery(faqsQuery, undefined, ['faq'])

  return (
    <>
      <FAQSchema faqs={faqs} />
      <div className="container mx-auto px-4">
        <Heading level={2}>FAQ</Heading>
        {faqs.map((faq) => (
          <>
            <b>{faq.question}</b>
            {faq.answerStyled && (
              <StyledPortableText content={faq.answerStyled} />
            )}
          </>
        ))}
      </div>
    </>
  )
}
