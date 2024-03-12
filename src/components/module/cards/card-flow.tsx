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

  const colStyle =
    module.layout === '2-column' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
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
            level={isLevel(2) ? 3 : 2}
            size={isLevel(2) ? 4 : 3}
            className="[grid-column:content-start/content-gap-start]"
          >
            {module.title}
          </Heading>
          {module.content && (
            <div className="[grid-column:content-gap-end/content-end] max-md:mt-4">
              <PortableText value={module.content} />
            </div>
          )}
          <div className={cn('mt-20 grid gap-7', colStyle)}>
            {module.cards?.map((card) => {
              const style = xor(darkBg, card.style !== 'inverted')
                ? 'dark'
                : 'light'
              return (
                <Card
                  key={card._key}
                  className="relative flex flex-col gap-6"
                  intent={style}
                >
                  <div className="flex items-start gap-4">
                    <SanityImage image={card.image} className="flex-none" />
                    <Heading level={isLevel(2) ? 4 : 3} size={5}>
                      {card.title}
                    </Heading>
                  </div>
                  {card.content && (
                    <div
                      className={cn(
                        'flex flex-1 flex-col justify-between gap-6',
                        card.pill && 'pb-8'
                      )}
                    >
                      <StyledPortableText content={card.content} />
                    </div>
                  )}
                  {card.pill && (
                    <div
                      className={cn(
                        'absolute -bottom-5 left-9 mr-9 line-clamp-2 rounded-full px-7 py-3',
                        style === 'light' &&
                          'border bg-primary text-base-white',
                        style === 'dark' && 'bg-base-white text-primary'
                      )}
                    >
                      {card.pill}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}
