import { ModuleData } from '@/sanity/lib/queries'

import SanityImage from '../sanity-image'
import Heading from '../heading'
import { Card } from '../ui/card'
import { PriceCard } from '../ui/price-card'
import { PortableText } from '@portabletext/react'

export default function Prices(props: { module: ModuleData }) {
  const { module } = props

  return (
    <section
      key={module._key}
      className="full bg-base-grey py-8 text-primary lg:py-28"
    >
      {/* {module.prices?.map((price) => <p key={price.title}>{price.title}</p>)} */}
      <div className="content">
        <div className="space-y-20">
          <div className="flex flex-wrap gap-x-32 gap-y-8">
            <Heading level={3} size={3}>
              {module.title}
            </Heading>
            <SanityImage image={module.image} />
            {module.content && (
              <div className="flex-1">
                <PortableText value={module.content} />
              </div>
            )}
          </div>
          <div className="grid gap-7 lg:grid-cols-3 ">
            {props.module.prices?.map((price) => (
              <div
                key={price._key}
                className="grid justify-items-center  rounded-b-lg rounded-t-lg bg-base-white"
              >
                {price.isFavourite && (
                  <div className=" z-0 m-[-1.5rem] h-10 rounded-[40px] bg-primary px-6 py-1.5 text-base-white">
                    yes
                  </div>
                )}
                {/* upper part: blue or green */}

                <div className=" flex flex-col items-center rounded-lg border-secondary p-9 pb-10 odd:bg-primary odd:text-base-white even:border-secondary even:bg-secondary even:text-primary">
                  <Heading level={4} size={4} className="gap-6">
                    {price.title}
                  </Heading>
                  <p className="text-center">{price.subtitle}</p>
                </div>
                {/* middle part */}
                <div className=" m-[-1.5rem]  h-10 rounded-[40px] bg-base-grey px-6 py-1.5">
                  {price.pillText}
                </div>
                {/* lower part: always on white bg */}
                <div className="flex flex-col items-center gap-6  p-4 pt-10 text-primary">
                  {module.content && (
                    <div className="flex-1">
                      <PortableText value={module.content} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
