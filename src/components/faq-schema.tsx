import { FAQQueryModuleData } from '@/sanity/lib/queries'
import portableTextToString from '@/utils/portable-text-to-string'
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

  try {
    return (
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    )
  } catch (error) {
    console.warn('Failed to serialize FAQ schema:', error)
    return null
  }
}

export default FAQSchema
