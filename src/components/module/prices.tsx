import { ModuleData } from '@/sanity/lib/queries'

import SanityImage from '../sanity-image'
import Heading from '../heading'
import { Card } from '../ui/card'
import { PriceCard } from '../ui/price-card'
import { PortableText } from '@portabletext/react'
import { HandHeart } from 'lucide-react'
import Button from '../ui/button'
import StyledPortableText from '../styled-portable-text'

export default function Prices(props: { module: ModuleData }) {
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
              <div
                key={price._key}
                className="grid content-start justify-items-center  rounded-b-lg rounded-t-lg bg-base-white"
              >
                {price.isFavourite && (
                  <div className=" z-0 m-[-1.5rem] flex h-10 place-items-center rounded-[40px] bg-primary px-6 py-1.5 text-base-white">
                    <HandHeart className=" h-4 w-4 shrink-0 transition-transform duration-200" />
                    <div className=" pl-2">Favorit</div>
                  </div>
                )}
                {/* upper part: blue or green */}
                <div
                  className={
                    '  flex w-full flex-col items-center rounded-lg border-secondary p-9 pb-10  ' +
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
                {/* middle part */}
                <div className=" m-[-1.5rem]  h-10 rounded-[40px] bg-base-grey px-6 py-1.5">
                  {price.pillText}
                </div>
                {/* lower part: always on white bg */}
                <div className="flex flex-col items-center gap-6  p-4 pt-10 text-primary">
                  {price.content && (
                    <div className="self-stretch">
                      <StyledPortableText content={price.content} />
                    </div>
                  )}
                  <div className="align-self-end mb-4 flex flex-initial ">
                    <Button
                      element="a"
                      intent={index % 2 ? 'secondary' : 'primary'}
                      href={price.link}
                    >
                      <p>{price.linktext}</p>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
