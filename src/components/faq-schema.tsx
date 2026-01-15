import { FAQQueryModuleData } from '@/sanity/lib/queries'
import portableTextToString from '@/utils/portable-text-to-string'
import Head from 'next/head'
import Script from 'next/script'

interface FAQSchemaProps {
  faqs: FAQQueryModuleData
}

const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  if (!faqs || faqs.length === 0) {
    return null
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question || '',
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answerStyled ? portableTextToString(faq.answerStyled) : '',
      },
    })),
  }

  return (
    <Head>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </Head>
  )
}

export default FAQSchema
