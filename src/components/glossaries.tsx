import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion'

type FAQs = {
  _id: string
  question?: string
  answer?: string
}[]

const FAQsComponent = (props: { faqs: FAQs }) => {
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
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  )
}
export default FAQsComponent
