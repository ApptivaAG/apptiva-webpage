import { FAQQueryData, FAQQueryModuleData } from '@/sanity/lib/queries'
import StyledPortableText from './styled-portable-text'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

const FAQsComponent = (props: { faqs: FAQQueryModuleData }) => {
  const { faqs } = props
  return (
    <>
      <div className="col-right mt-4">
        <div className="w-full max-w-lg">
          <Accordion type="single" collapsible className="w-full">
            {faqs?.map((faq) => (
              <AccordionItem
                key={faq._id}
                value={faq.question ?? 'no-question'}
              >
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                {faq.answerStyled && (
                  <AccordionContent>
                    <StyledPortableText content={faq.answerStyled} />)
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
