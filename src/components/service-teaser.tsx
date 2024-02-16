import { PortableText } from '@portabletext/react'
import Heading from './heading'
import SanityImage from './sanity-image'

const ServiceTeaser = ({
  service,
  rowNumber,
}: {
  service: any
  rowNumber: number
}) => {
  console.log('servcies', service)

  const text = (
    <div className="w-1/2 ">
      <div className="m-28 text-primary">
        <Heading level={2} size={3} className="pb-6">
          {service.header.title}
        </Heading>
        {service.teaser?.map((content: any) => (
          <PortableText key={content._key} value={content} />
        ))}
      </div>
    </div>
  )

  const image = (
    <div className="w-1/2 rounded-md  bg-primary">
      <div className="h-[99%] w-[99%] ">
        {/* <SanityImage image={service.illustration} /> */}
      </div>
    </div>
  )
  return (
    <div className="full">
      <div className="m-auto flex rounded-md p-2 pt-2">
        {rowNumber % 2 ? (
          <div className="flex rounded-md bg-base-grey">
            {image}
            {text}
          </div>
        ) : (
          <div className="flex  rounded-md bg-base-grey">
            {text}
            {image}
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceTeaser
