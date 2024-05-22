import { FAQQueryModuleData } from '@/sanity/lib/queries'
import { PortableTextComponents } from '@portabletext/react'
import Heading from './heading'
import StyledPortableText from './styled-portable-text'
import { Accordion, AccordionContent, AccordionItem } from './ui/accordion'

const FAQsComponent = (props: { faqs: FAQQueryModuleData }) => {
  const { faqs } = props
  const portableTextComponents: PortableTextComponents = {
    block: {
      h3: ({ children }) => (
        <Heading level={3} size={5} className="pt-16">
          {children}
        </Heading>
      ),
    },
  }

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
                    <StyledPortableText
                      content={faq.answerStyled}
                      individualComponents={portableTextComponents}
                    />
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
