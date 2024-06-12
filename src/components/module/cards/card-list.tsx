import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import Section from '@/components/section'
import StyledPortableText from '@/components/styled-portable-text'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion'
import { ModuleData } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { PiMinusCircle, PiPlusCircle } from 'react-icons/pi'
import { Card } from '../../ui/card'
import { moduleStyleToSectionIntent } from '../utils'

export default function CardList(props: { module: ModuleData }) {
  const { module } = props
  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  return (
    <Section
      intent={moduleStyleToSectionIntent(module.style)}
      level={isLevel(1) ? 'one' : 'two'}
    >
      <div className="content">
        <div className="col-left">
          <Heading level={isLevel(1) ? 2 : 3} size={isLevel(1) ? 3 : 4}>
            {module.title}
          </Heading>
          <SanityImage image={module.image} />
          {module.content && (
            <div className="pt-6">
              <PortableText value={module.content} />
            </div>
          )}
        </div>
        <div className="col-right space-y-4 max-lg:mt-10">
          {module.cards?.map((card) => (
            <Card key={card._key} padding="small">
              <Accordion
                className="w-full divide-y"
                transition
                transitionTimeout={200}
              >
                <AccordionItem
                  className="w-full py-0"
                  header={
                    <div className="grid auto-cols-auto grid-flow-col items-start justify-between gap-2">
                      <Heading
                        level={isLevel(1) ? 3 : 4}
                        size={4}
                        className="text-start md:text-2xl"
                      >
                        {card.title}
                      </Heading>
                    </div>
                  }
                  icon={
                    <div
                      className="grid justify-self-end *:size-8 *:transition-all *:[grid-area:1/1]"
                      data-state="closed"
                    >
                      <PiPlusCircle className="rotate-0 scale-100 group-aria-expanded:-rotate-90 group-aria-expanded:scale-0" />
                      <PiMinusCircle className="rotate-90 scale-0 group-aria-expanded:rotate-0 group-aria-expanded:scale-100" />
                      <span className="sr-only">Aufklappen</span>
                    </div>
                  }
                >
                  {card.content && (
                    <AccordionContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                      <div className="pt-6">
                        <StyledPortableText content={card.content} />
                      </div>
                    </AccordionContent>
                  )}
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
