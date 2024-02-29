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
              <Heading level={2} size={4}>
                {module.title}
              </Heading>
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
        >
          <CarouselContent>
            {module.cards?.map((card, index) => (
              <CarouselItem key={index} index={index}>
                <Card
                  key={card._key}
                  className="my-8 flex h-full w-full flex-row gap-24"
                  intent={
                    xor(darkBg, card.style !== 'inverted') ? 'dark' : 'light'
                  }
                >
                  <div className="ml-6 w-2/3">
                    <div className="mb-8 inline-block rounded-lg bg-base-white px-4 py-1.5 text-primary">
                      <p>Systemintegration</p>
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
                  <div className="mr-6 h-full w-1/3">
                    <SanityImage
                      className="h-full"
                      image={card.image}
                    ></SanityImage>
                  </div>
                </Card>
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
