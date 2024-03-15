import { ModuleData } from '@/sanity/lib/queries'

import { cn } from '@/utils/cn'
import { PortableText } from '@portabletext/react'
import { HandHeart } from 'lucide-react'
import Heading from '../heading'
import SanityImage from '../sanity-image'
import StyledPortableText from '../styled-portable-text'
import Button from '../ui/button'

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
          <div className=" grid gap-7 gap-y-14 lg:grid-cols-3">
            {props.module.prices?.map((price, index) => (
              <div
                key={price._key}
                className="grid grid-rows-3 rounded-lg bg-base-white"
              >
                {/* upper part: blue or green */}
                <div
                  className={
                    'relative row-span-1 row-start-1 flex w-full flex-col items-center justify-center rounded-lg border-secondary p-10   ' +
                    (index % 2
                      ? 'border-secondary bg-secondary text-primary'
                      : 'bg-primary text-base-white')
                  }
                >
                  {/* show favourite badge */}
                  {price.isFavourite && (
                    <div
                      className={cn(
                        'absolute -top-6 line-clamp-2 flex justify-items-center rounded-full  bg-primary  px-7 py-3 text-base-white',
                        !(index % 2) && ' border bg-primary'
                      )}
                    >
                      <HandHeart className=" h-5 w-5 shrink-0 transition-transform duration-200" />
                      <div className=" pl-2">Favorit</div>
                    </div>
                  )}
                  <Heading level={4} size={4} className="gap-6 pb-2">
                    {price.title}
                  </Heading>
                  <p className="text-center">{price.subtitle}</p>
                  {/* pill part */}
                  <div className="absolute -bottom-6 line-clamp-2 rounded-full bg-base-grey px-7 py-3 text-primary">
                    {price.pillText}
                  </div>
                </div>

                {/* lower part: always on white bg */}
                <div className=" m:px-[20%] row-span-2 bg-base-white px-[5%] pt-16 lg:px-4">
                  {price.content && (
                    <div className="self-stretch">
                      <StyledPortableText
                        className="m:px-[20%] space-y-2 pl-[5%] lg:pl-4"
                        content={price.content}
                      />
                    </div>
                  )}
                </div>
                <div className=" flex items-center justify-center p-10 pb-12">
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
