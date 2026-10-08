import Link from 'next/link'
import FAQSchema from '@/components/faq-schema'
import FAQsComponent from '@/components/faqs'
import Heading from '@/components/heading'
import Section from '@/components/section'
import UnderlineForLink from '@/components/ui/underline-for-link'
import { FAQQueryData } from '@/sanity/lib/queries'

export default function FAQ(props: { data: FAQQueryData }) {
  const faqs = props.data.slice(0, 5)

  return (
    <>
      <FAQSchema faqs={faqs} />
      <Section intent="dark">
        <div className="content">
          <Heading level={2} size={3} className="col-left">
            FAQ
          </Heading>
          <div className="col-right max-lg:mt-4">
            <p>Was wir immer mal wieder gefragt werden.</p>
          </div>
          {faqs && <FAQsComponent faqs={faqs}></FAQsComponent>}
          <div className="col-right mt-4">
            <Link className="self-end" href="/faq">
              <UnderlineForLink>Alle Fragen →</UnderlineForLink>
            </Link>
          </div>
        </div>
      </Section>
    </>
  )
}
