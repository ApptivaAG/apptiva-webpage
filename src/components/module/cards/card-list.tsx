import Section from '@/components/section'
import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import StyledPortableText from '@/components/styled-portable-text'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ModuleData } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { MinusCircle, PlusCircle } from 'lucide-react'
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
        <div className="col-right space-y-10 max-lg:mt-10">
          {module.cards?.map((card) => (
            <Card key={card._key}>
              <Collapsible>
                <div className="flex items-start justify-between gap-2">
                  <Heading level={isLevel(1) ? 3 : 4} size={4}>
                    {card.title}
                  </Heading>
                  <CollapsibleTrigger className="group grid *:size-8 *:transition-all *:[grid-area:1/1]">
                    <PlusCircle className="rotate-0 scale-100 group-data-[state=open]:-rotate-90 group-data-[state=open]:scale-0" />
                    <MinusCircle className="rotate-90 scale-0 group-data-[state=open]:rotate-0 group-data-[state=open]:scale-100" />
                    <span className="sr-only">Aufklappen</span>
                  </CollapsibleTrigger>
                </div>
                {card.content && (
                  <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="pt-6">
                      <StyledPortableText content={card.content} />
                    </div>
                  </CollapsibleContent>
                )}
              </Collapsible>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  )
}
