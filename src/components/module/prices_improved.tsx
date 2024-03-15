import { ModuleData } from '@/sanity/lib/queries'

import SanityImage from '../sanity-image'
import Heading from '../heading'
import { Card } from '../ui/card'
import { PriceCard } from '../ui/price-card'
import { PortableText } from '@portabletext/react'
import { HandHeart } from 'lucide-react'
import Button from '../ui/button'
import StyledPortableText from '../styled-portable-text'

export default function PricesImproved(props: { module: ModuleData }) {
  const { module } = props

  return (
    <section
      key={module._key}
      className="full bg-base-grey py-8 text-primary lg:py-28"
    >
      <div className="content">
        <div className="space-y-20">
          <div className="flex flex-wrap gap-x-32 gap-y-8 ">
            <Heading level={3} size={3} className="text-center">
              {module.title}
            </Heading>
            <SanityImage image={module.image} />
            {module.content && (
              <div className="flex-1">
                <PortableText value={module.content} />
              </div>
            )}
          </div>
          <div className=" grid gap-7 gap-y-14 lg:grid-cols-3 ">
            {props.module.prices?.map((price, index) => (
              <div key={price._key} className="grid grid-rows-3 ">
                <div
                  className={
                    '  row-span-1 row-start-1  flex w-full flex-col items-center rounded-lg border-secondary p-9 pb-10  ' +
                    (index % 2
                      ? 'border-secondary bg-secondary text-primary'
                      : 'bg-primary text-base-white')
                  }
                >
                  <Heading level={4} size={4} className="gap-6">
                    {price.title}
                  </Heading>
                  <p className="text-center">{price.subtitle}</p>
                </div>
                <div className="row-span-2 ">
                  {price.content && (
                    <div className="self-stretch">
                      <StyledPortableText content={price.content} />
                    </div>
                  )}
                </div>
                <div className=" flex items-center justify-center rounded-b-lg bg-base-white  p-12">
                  <Button
                    element="div"
                    intent={index % 2 ? 'secondary' : 'primary'}
                    href={price.link}
                  >
                    <p>{price.linktext}</p>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
