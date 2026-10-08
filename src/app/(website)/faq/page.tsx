import { Metadata } from 'next'
import FAQSchema from '@/components/faq-schema'
import FAQsComponent from '@/components/faqs'
import Heading from '@/components/heading'
import { PageHeader } from '@/components/page-header'
import { faqsQuery } from '@/sanity/lib/queries'
import { runQuery } from '@/sanity/lib/sanityFetch'

const url = '/faq'
const title = 'FAQ'
const description =
  'Häufig gestellte Fragen und Antworten rund um die Themen Chatbot und Softwareentwicklung.'
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    url,
  },
}

export default async function FAQPage() {
  const faqs = await runQuery(faqsQuery, undefined, ['faq'])

  return (
    <>
      <FAQSchema faqs={faqs} />
      <PageHeader
        title={title}
        lead={description}
        links={[{ name: title, href: url }]}
      />
      <div className="full text-primary">
        <div className="content">
          <section className="full py-16 text-primary">
            <div className="content">
              <Heading level={2} size={3} className="col-left">
                FAQ
              </Heading>
              <FAQsComponent faqs={faqs} />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
