import { FAQQueryModuleData } from '@/sanity/lib/queries'
import portableTextToString from '@/utils/portable-text-to-string'
import { Schema } from './schema'
import type { WithContext, FAQPage } from 'schema-dts'

interface FAQSchemaProps {
  faqs: FAQQueryModuleData
}

const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  if (!faqs || faqs.length === 0) {
    return null
  }

  const faqSchema: WithContext<FAQPage> = {
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

  return <Schema data={faqSchema} />
}

export default FAQSchema
