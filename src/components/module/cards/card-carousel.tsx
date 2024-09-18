import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import Section from '@/components/section'
import StyledPortableText from '@/components/styled-portable-text'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { ModuleData } from '@/sanity/lib/queries'
import { formatIds } from '@/utils/format-ids'
import { PortableText } from '@portabletext/react'
import { Card } from '../../ui/card'
import { moduleStyleToSectionIntent } from '../utils'

export default function CardCarousel(props: { module: ModuleData }) {
  const { module } = props
  const darkBg = module.style === 'dark-bg'

  return (
    <>
      <Section
        intent={moduleStyleToSectionIntent(module.style)}
        id={formatIds(module.title)}
      >
        <div className="content space-y-4 lg:space-y-6">
          <Heading level={2} size={3}>
            {module.title}
          </Heading>
          {module.content && (
            <div className="max-w-2xl">
              <PortableText value={module.content} />
            </div>
          )}
        </div>
        <Carousel
          numberOfSlides={module.cards?.length || 0}
          align="center"
          className="pb-12 md:pb-20"
        >
          <CarouselContent>
            {module.cards?.map((card, index) => (
              <CarouselItem key={index} index={index} className="basis-full">
                <Card
                  key={card._key}
                  className="flex h-full flex-col gap-24 md:flex-row"
                  intent={
                    xor(darkBg, card.style !== 'inverted') ? 'dark' : 'light'
                  }
                >
                  <div className="relative md:pl-10 md:pt-10 lg:py-16 lg:pl-16">
                    <div className="clear-both h-16">
                      <div className="flex gap-2">
                        {card.pill && (
                          <div className="w-full">
                            <div className="inline-block rounded-lg bg-base-white px-4 py-1.5 text-primary">
                              {card.pill}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <Heading level={3} className="mb-7">
                      {card.title}
                    </Heading>
                    {card.content && (
                      <div className="flex flex-1 flex-col justify-between gap-6">
                        <StyledPortableText content={card.content} />
                      </div>
                    )}
                  </div>
                  <div className="hidden shrink-0 basis-72 self-center lg:block lg:pr-16">
                    <SanityImage sizes="224px" image={card.image}></SanityImage>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Section>
    </>
  )
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}
