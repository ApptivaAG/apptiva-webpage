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
  return (
    <div className="full flex ">
      <div
        className={
          'w-1/2 bg-base-grey' +
          (rowNumber % 2 ? ' rounded-r-md' : ' rounded-l-md')
        }
      >
        <div className="m-28 text-primary">
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
          'w-1/2 bg-primary ' +
          (rowNumber % 2 ? ' rounded-l-md' : ' rounded-r-md')
        }
      >
        <div className={'mx-auto my-auto h-[80%] w-[80%]'}>
          {/* <SanityImage image={service.illustration} /> */}
        </div>
      </div>
    </div>
  )
}

export default ServiceTeaser
