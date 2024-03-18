import Heading from '@/components/heading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ModuleData } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import Section from '../section'
import { moduleStyleToSectionIntent } from './utils'

export default function FAQs(props: { module: ModuleData }) {
  const { module } = props

  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  return (
    <>
      {isLevel(2) && <hr />}

      <Section
        intent={moduleStyleToSectionIntent(module.style)}
        level={isLevel(2) ? 'two' : 'one'}
      >
        <div className="content">
          <Heading
            level={isLevel(1) ? 2 : 3}
            size={isLevel(1) ? 3 : 4}
            className="col-left"
          >
            {module.title}
          </Heading>
          {module.content && (
            <div className="col-right max-lg:mt-4">
              <PortableText value={module.content} />
            </div>
          )}
          <div className="col-right mt-4">
            <div className="w-full max-w-lg">
              <Accordion type="single" collapsible className="w-full">
                {module.faqs?.map((faq) => (
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
        </div>
      </Section>
    </>
  )
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}
