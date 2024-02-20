import { ServiceTeaser } from '@/utils/service-teasers'
import { PortableText } from '@portabletext/react'
import Heading from './heading'
import SanityImage from './sanity-image'

const ServiceTeaser = ({
  service,
  rowNumber,
}: {
  service: ServiceTeaser[number]
  rowNumber: number
}) => {
  return (
    <div className="full flex flex-col lg:flex-row">
      <div
        className={
          'bg-base-grey max-lg:rounded-md lg:w-1/2 ' +
          (rowNumber % 2 ? 'lg:rounded-r-md' : '  lg:rounded-l-md')
        }
      >
        {/* <div className="m-28  w-8/12  text-primary"> */}
        <div className="m-28  w-8/12  text-primary">
          <Heading level={2} size={3} className="pb-6">
            {service.header?.title}
          </Heading>
          {service.teaser?.map((content: any) => (
            <PortableText key={content._key} value={content} />
          ))}
        </div>
      </div>
      <div
        className={
          'flex items-center justify-center bg-primary max-lg:rounded-md lg:w-1/2' +
          (rowNumber % 2 ? ' lg:rounded-l-md' : ' lg:rounded-r-md')
        }
      >
        {/* {service.illustration && (
          <SanityImage
            image={service.illustration}
            style="p-6 object-cover object-center"
          />
        )} */}
      </div>
    </div>
  )
}

export default ServiceTeaser
