import FAQsComponent from '@/components/faqs'
import Heading from '@/components/heading'
import { getFAQs } from '@/utils/faq'

export default async function FAQ() {
  const faqs = await getFAQs()
  return (
    <>
      <section className="full py-16 text-primary">
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
      </section>
    </>
  )
}
