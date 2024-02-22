import Heading from '@/components/heading'
import SanityImage from '@/components/sanity-image'
import { PortableText } from '@portabletext/react'
import { ServiceBySlugQueryData } from '../types'
import StyledPortableText from '@/components/styled-portable-text'

export default function ServiceDetail(props: {
  service: ServiceBySlugQueryData
}) {
  return (
    <>
      <header className="full animate-gradient from-primary-light bg-300% mt-[-8rem] min-h-fit items-center bg-gradient-to-br to-primary-dark pt-44 text-base-white">
        <div className="content ">
          <div className="feature">
            <Heading level={1}>{props.service.header?.title}</Heading>
            <p className="mt-6">{props.service.header?.lead}</p>
            <div className="flex justify-center pb-4 pt-16">
              {props.service.header?.image && (
                <SanityImage image={props.service.header?.image} />
              )}
            </div>
          </div>
        </div>
      </header>

      {props.service.modules?.map((module) => (
        <section
          key={module._key}
          className="full bg-primary py-8 text-base-white lg:py-28"
        >
          <div className="content">
            <div className="flex gap-x-16 gap-y-8">
              <div className="basis-5/12">
                <Heading level={2} size={3}>
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
                  <div
                    key={card._key}
                    className="rounded-lg bg-base-white p-9 text-primary"
                  >
                    <Heading level={3} size={4}>
                      {card.title}
                    </Heading>
                    {card.content && (
                      <div className="pt-6">
                        <StyledPortableText content={card.content} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  )
}
