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
          <div className="grid gap-7 lg:grid-cols-3">
            {props.module.prices?.map((price) => (
              <div key={price._key}>
                <PriceCard
                  key={price._key}
                  className=" flex flex-col items-center gap-6 bg-primary text-base-white"
                >
                  {/* [&>*:nth-child(even)] */}
                  <Heading level={5} size={5}>
                    {price.title}
                  </Heading>
                  <Heading level={6} size={6} className=" text-center">
                    {price.subtitle}
                  </Heading>
                </PriceCard>
                <div>{price.pillText}</div>
                {module.content && (
                  <div className="flex-1">
                    <PortableText value={module.content} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
