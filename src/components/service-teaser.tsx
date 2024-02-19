import { PortableText } from '@portabletext/react'
import Heading from './heading'
import SanityImage from './sanity-image'

import { urlForImage } from '@/sanity/lib/image'
import { SanityImageWithAlt } from '@/utils/types'
import { getImageDimensions } from '@sanity/asset-utils'
import Image, { ImageProps } from 'next/image'

const ServiceTeaser = ({
  service,
  rowNumber,
}: {
  service: any
  rowNumber: number
}) => {
  return (
    <div className="full flex ">
      <div
        className={
          'w-1/2 bg-base-grey' +
          (rowNumber % 2 ? ' rounded-r-md' : ' rounded-l-md')
        }
      >
        <div className="m-28  w-8/12  text-primary">
          <Heading level={2} size={3} className="pb-6">
            {service.header.title}
          </Heading>
          {service.teaser?.map((content: any) => (
            <PortableText key={content._key} value={content} />
          ))}
        </div>
      </div>
      <div
        className={
          'flex w-1/2 items-center justify-center bg-primary ' +
          (rowNumber % 2 ? ' rounded-l-md' : ' rounded-r-md')
        }
      >
        {/* <div className={'mx-auto my-auto h-[80%] w-[80%]'}>
          <SanityImage image={service.illustration} />
        </div> */}
        {/* <div className="h-96 w-96 bg-[fuchsia] object-contain	object-center"> */}
        {/* <SanityImage image={service.illustration} /> */}
        <SanityImage
          image={service.illustration}
          style="h-96 w-96 object-cover object-center"
        />
        {/* <Image
          className="h-96 w-96 bg-[fuchsia] object-contain	object-center"
          key={service.illustration.toString()}
          src={urlForImage(service.illustration).url()}
          alt={service.illustration.alt}
          width={getImageDimensions(service.illustration).width}
          height={getImageDimensions(service.illustration).height}
          placeholder="blur"
          blurDataURL={urlForImage(service.illustration)
            .width(24)
            .height(24)
            .blur(10)
            .url()}
          sizes="(max-width: 768px) 100vw,
        (max-width: 1200px) 50vw,
        40vw"
        /> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default ServiceTeaser
