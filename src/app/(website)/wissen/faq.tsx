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
            <p>
              <u>
                Hier kommt der FAQ Text, der wohl noch geschrieben werden muss
                :-)
              </u>
            </p>
          </div>
          {faqs && <FAQsComponent faqs={faqs}></FAQsComponent>}
        </div>
      </Section>
    </>
  )
}
