import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import StyledPortableText from '@/components/styled-portable-text'
import { ModuleData } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { Card } from '../ui/card'

export default function CardFlow(props: { module: ModuleData }) {
  const { module } = props
  return (
    <section
      key={module._key}
      className="full bg-primary py-8 text-base-white lg:py-28"
    >
      <div className="content">
        <div className="space-y-20">
          <div className="flex flex-wrap gap-x-32 gap-y-8">
            <Heading level={2} size={3}>
              {module.title}
            </Heading>
            <SanityImage image={module.image} />
            {module.content && (
              <div className="flex-1">
                <PortableText value={module.content} />
              </div>
            )}
          </div>
          <div className="grid gap-7 lg:grid-cols-3">
            {module.cards?.map((card) => (
              <Card
                key={card._key}
                className="flex flex-col gap-6"
                intent={card.layout === 'invert' ? 'dark' : 'light'}
              >
                <Heading level={3} size={5}>
                  {card.title}
                </Heading>
                {card.content && (
                  <div className="flex flex-1 flex-col justify-between gap-6">
                    <StyledPortableText content={card.content} />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
