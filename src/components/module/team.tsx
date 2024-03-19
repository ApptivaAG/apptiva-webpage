import { ModuleData } from '@/sanity/lib/queries'
import Heading from '../heading'
import SanityImage from '../sanity-image'
import StyledPortableText from '../styled-portable-text'
import { Card } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'

export default function Team(props: { module: ModuleData }) {
  const { module } = props

  return (
    <section key={module._key} className="full py-8 text-primary lg:py-28">
      <div className="content">
        <Heading level={2}>{module.title}</Heading>
        {module.introduction && (
          <div className="mt-4">
            <StyledPortableText content={module.introduction} />
          </div>
        )}
      </div>
      <Carousel
        layout={'fiveSlides'}
        darkTheme={false}
        numberOfSlides={module.persons.length}
        loop={true}
        className="full md:pb-8"
      >
        <CarouselContent>
          {module.persons.map((person, index) => {
            return (
              <CarouselItem key={index} index={index}>
                <Card
                  key={index}
                  className="flex w-full flex-col border-none"
                  padding="none"
                >
                  <SanityImage
                    image={person.image}
                    className="rounded"
                  ></SanityImage>
                  <div className="mx-auto w-[90%] pt-12 md:mx-0">
                    <Heading level={4}>{person.personName}</Heading>
                    <Heading level={5}>{person.claim}</Heading>
                    <p className="pt-8">{person.slogan}</p>
                  </div>
                  <div className="mx-auto mt-auto w-[90%] py-8 md:mx-0">
                    <p>{person.contact?.mail}</p>
                    <p>{person.contact?.phone}</p>
                  </div>
                </Card>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
