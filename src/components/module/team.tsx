import { ModuleData } from '@/sanity/lib/queries'
import Link from 'next/link'
import Heading from '../heading'
import SanityImage from '../sanity-image'
import StyledPortableText from '../styled-portable-text'
import { Card } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel'
import UnderlineForLink from '../ui/underline-for-link'

export default function Team(props: { module: ModuleData }) {
  const { module } = props

  const teamSorted = [
    ...module.persons.filter((p) => p.contact),
    ...module.persons.filter((p) => !p.contact),
  ]

  return (
    <section key={module._key} className="full py-8 text-primary lg:py-28">
      <div className="content">
        <Heading level={3}>{module.title}</Heading>
        {module.introduction && (
          <div className="mt-4">
            <StyledPortableText content={module.introduction} />
          </div>
        )}
      </div>
      <Carousel
        darkTheme={false}
        numberOfSlides={module.persons.length}
        className="full pb-20"
      >
        <CarouselContent>
          {teamSorted.map((person, index) => {
            return (
              <CarouselItem key={index} index={index}>
                <Card
                  key={index}
                  className="flex h-full w-80 max-w-full flex-col overflow-visible border-none"
                  padding="none"
                >
                  <SanityImage
                    image={person.image}
                    className="-translate-x-2 rounded-lg"
                  ></SanityImage>
                  <div className="flex-1 pt-6 md:mx-0">
                    <Heading level={4}>{person.personName}</Heading>
                    <Heading level={5}>{person.role}</Heading>
                  </div>
                  <div className="mt-auto pt-4 md:mx-0">
                    <div>
                      <Link href={`mailto:${person.contact?.mail}`}>
                        <UnderlineForLink>
                          {person.contact?.mail}
                        </UnderlineForLink>
                      </Link>
                    </div>
                    <div>
                      <Link href={`tel:${person.contact?.phone}`}>
                        <UnderlineForLink>
                          {person.contact?.phone}
                        </UnderlineForLink>
                      </Link>
                    </div>
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
