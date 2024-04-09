import { FAQQueryModuleData } from '@/sanity/lib/queries'
import StyledPortableText from './styled-portable-text'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

const FAQsComponent = (props: {
  faqs: FAQQueryModuleData
  width?: 'full' | 'col'
}) => {
  const { faqs, width } = props
  const colContainer =
    width?.includes('col') || width === undefined ? 'col-right' : ''
  const col = width?.includes('col') || width === undefined ? 'max-w-lg' : ''

  return (
    <>
      <div className={`${colContainer} mt-4 `}>
        <div className={`w-full ${col}`}>
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
