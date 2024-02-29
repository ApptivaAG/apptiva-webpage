import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import StyledPortableText from '@/components/styled-portable-text'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { ModuleData } from '@/sanity/lib/queries'
import { cn } from '@/utils/cn'
import { PortableText } from '@portabletext/react'
import { Card } from '../../ui/card'

export default function CardCarousel(props: { module: ModuleData }) {
  const { module } = props
  const darkBg = module.style === 'dark-bg'
  //   const isLevel = (level: 1 | 2) => (module.level ?? 1) == level

  return (
    <>
      {/* {isLevel(2) && <hr />} */}
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
              <Heading level={2}>{module.title}</Heading>
              <SanityImage image={module.image} />
              {module.content && (
                <div className="flex-1">
                  <PortableText value={module.content} />
                </div>
              )}
            </div>
          </div>
        </div>
        <Carousel
          opts={{ loop: true }}
          layout={'threeSlides'}
          numberOfSlides={module.cards?.length || 0}
          className="pb-20"
        >
          <CarouselContent>
            {module.cards?.map((card, index) => (
              <CarouselItem key={index} index={index}>
                <div className="relativ">
                  <Card
                    key={card._key}
                    className="my-8 flex h-full w-full flex-col gap-16 pt-20 md:flex-row"
                    intent={
                      xor(darkBg, card.style !== 'inverted') ? 'dark' : 'light'
                    }
                  >
                    <div className="relative w-full md:w-2/3">
                      <div className="clear-both h-16">
                        <div className="flex shrink">
                          {card.pill && (
                            <div className="inline-block rounded-lg bg-base-white px-4 py-1.5 text-primary">
                              {card.pill}
                            </div>
                          )}

                          <div className="w-full"></div>
                          <div className="h-10 md:hidden">
                            <SanityImage
                              className="h-full w-full"
                              image={card.image}
                            ></SanityImage>
                          </div>
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
                    <div className="hidden w-1/2 md:block  md:w-1/3">
                      <SanityImage
                        className="h-full w-full"
                        image={card.image}
                      ></SanityImage>
                    </div>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </>
  )
}

function xor(a: boolean, b: boolean) {
  return (a || b) && !(a && b)
}
