import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import { PortableText } from '@portabletext/react'

export default function FAQs(props: { module: ModuleData }) {
  const { module } = props

  const darkBg = module.style === 'dark-bg'
  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  return (
    <>
      {isLevel(2) && <hr />}

      <section
        key={module._key}
        className={cn(
          'full py-8 lg:py-28',
          darkBg ? 'bg-primary text-base-white' : 'text-primary'
        )}
      >
        <div className="content">
          <Heading
            level={isLevel(1) ? 2 : 3}
            size={isLevel(1) ? 3 : 4}
            className="[grid-column:content-start/content-gap-start]"
          >
            {module.title}
          </Heading>
          {module.content && (
            <div className="[grid-column:content-gap-end/content-end] max-lg:mt-4">
              <PortableText value={module.content} />
            </div>
          )}
          <div className="mt-4 [grid-column:content-gap-end/content-end]">
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
      </section>
    </>
  )
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}
