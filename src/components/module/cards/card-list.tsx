import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import StyledPortableText from '@/components/styled-portable-text'
import { ModuleData } from '@/sanity/lib/queries'
import { PortableText } from '@portabletext/react'
import { Card } from '../../ui/card'

export default function CardList(props: { module: ModuleData }) {
  const { module } = props
  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  return (
    <section
      key={module._key}
      className="full bg-primary py-8 text-base-white lg:py-28"
    >
      <div className="content">
        <div className="flex flex-col gap-x-16 gap-y-8 lg:flex-row">
          <div className="basis-5/12">
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
          <div className="basis-7/12 space-y-10">
            {module.cards?.map((card) => (
              <Card key={card._key}>
                <Heading level={isLevel(1) ? 3 : 4} size={4}>
                  {card.title}
                </Heading>
                {card.content && (
                  <div className="pt-6">
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