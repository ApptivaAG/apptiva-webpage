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
          <div className="space-y-20">
            <div className="flex flex-wrap gap-x-32 gap-y-8">
              <Heading level={isLevel(1) ? 2 : 3} size={isLevel(1) ? 3 : 4}>
                {module.title}
              </Heading>
              <SanityImage image={module.image} />
              {module.content && (
                <div className="flex-1">
                  <PortableText value={module.content} />
                </div>
              )}
            </div>
            <div className="flex justify-end">
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
        </div>
      </section>
    </>
  )
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}
