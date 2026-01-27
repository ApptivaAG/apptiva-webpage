import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import Section from '@/components/section'
import StyledPortableText from '@/components/styled-portable-text'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import { formatIds } from '@/utils/format-ids'
import { PortableText } from '@portabletext/react'
import { Card } from '../../ui/card'
import { moduleStyleToSectionIntent } from '../utils'
import { cleanStega } from '@/utils/clean-stega'

export default function CardFlow(props: { module: ModuleData }) {
  const { module } = props
  const style = cleanStega(module.style)
  const darkBg = style === 'dark-bg'
  const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  const colStyle =
    module.layout === '2-column' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'
  return (
    <>
      <Section
        intent={moduleStyleToSectionIntent(style)}
        level={isLevel(1) ? 'one' : 'two'}
        id={formatIds(module.title)}
      >
        <div className="content gap-y-7 lg:gap-y-14">
          {isLevel(2) && (
            <hr className="text-primary max-lg:hidden lg:-translate-y-12" />
          )}
          {module.title && (
            <Heading
              level={isLevel(2) ? 3 : 2}
              size={isLevel(2) ? 4 : 3}
              className="col-left"
            >
              {module.title}
            </Heading>
          )}
          {module.content && (
            <div className="col-right">
              <PortableText value={module.content} />
            </div>
          )}
          <div className={cn('grid gap-8', colStyle)}>
            {module.cards?.map((card) => {
              const style = xor(darkBg, cleanStega(card.style) !== 'inverted')
                ? 'dark'
                : 'light'
              return (
                <Card
                  key={card._key}
                  className="relative flex flex-col gap-6 overflow-visible"
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
                        'absolute -bottom-6 left-9 mr-9 line-clamp-2 rounded-full px-7 py-3',
                        style === 'light' &&
                          'border bg-primary text-base-white',
                        style === 'dark' && 'border bg-base-white text-primary'
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
      </Section>
    </>
  )
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}
