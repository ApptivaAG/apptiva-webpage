import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import StyledPortableText from '@/components/styled-portable-text'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import { PortableText } from '@portabletext/react'
import { Card } from '../../ui/card'

export default function CardFlow(props: { module: ModuleData }) {
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
              <Heading level={isLevel(2) ? 3 : 2} size={isLevel(2) ? 4 : 3}>
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
                  intent={
                    xor(darkBg, card.style !== 'inverted') ? 'dark' : 'light'
                  }
                >
                  <Heading level={isLevel(2) ? 4 : 3} size={5}>
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
    </>
  )
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}
