import FAQsComponent from '@/components/faqs'
import Heading from '@/components/heading'
import Section from '@/components/section'
import { FAQQueryData } from '@/sanity/lib/queries'

export default function FAQ(props: { data: FAQQueryData }) {
  const faqs = props.data

  return (
    <>
      <Section intent="dark">
        <div className="content">
          <Heading level={2} size={3} className="col-left">
            FAQ
          </Heading>
          <div className="col-right max-lg:mt-4">
            <p>Was wir immer mal wieder gefragt werden.</p>
          </div>
          {faqs && <FAQsComponent faqs={faqs}></FAQsComponent>}
        </div>
      </Section>
    </>
  )
}
