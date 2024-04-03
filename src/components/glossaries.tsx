import StyledPortableText from './styled-portable-text'
import { PortableText as PortableTextType } from '@/utils/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'
import { FAQQueryData } from '@/sanity/lib/queries'

const FAQsComponent = (props: { faqs: FAQQueryData }) => {
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
