import { FAQQueryModuleData } from '@/sanity/lib/queries'
import StyledPortableText from './styled-portable-text'
import { Accordion, AccordionContent, AccordionItem } from './ui/accordion'

const FAQsComponent = (props: { faqs: FAQQueryModuleData }) => {
  const { faqs } = props

  return (
    <>
      <div className="col-right mt-4">
        <div className="w-full max-w-lg">
          <Accordion
            className="w-full divide-y"
            transition
            transitionTimeout={200}
          >
            {faqs?.map((faq) => (
              <AccordionItem
                key={faq._id}
                header={faq.question ?? 'no-question'}
              >
                {faq.answerStyled && (
                  <AccordionContent>
                    <StyledPortableText content={faq.answerStyled} />
                  </AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  )
}
export default FAQsComponent
