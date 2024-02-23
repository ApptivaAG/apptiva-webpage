import { PortableText } from '@portabletext/react'
import Heading from '../../../../components/heading'
import SanityImage from '../../../../components/sanity-image'
import { ServiceTeaserData } from './types'

const ServiceTeaser = ({
  service,
  rowNumber,
}: {
  service: ServiceTeaserData
  rowNumber: number
}) => {
  return (
    <div className="full flex flex-col lg:flex-row">
      <div
        className={
          'bg-base-grey max-lg:rounded-t-md  lg:w-1/2 ' +
          (rowNumber % 2 ? ' lg:rounded-r-md' : '  lg:rounded-l-md')
        }
      >
        <div className="m-4  text-primary  lg:m-28 lg:w-8/12">
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
          'flex items-center justify-center bg-primary max-lg:rounded-b-md lg:w-1/2' +
          (rowNumber % 2 ? ' lg:rounded-l-md' : '  lg:rounded-r-md')
        }
      >
        <SanityImage
          image={service.illustration}
          style="p-6 object-cover object-center lg:max-w-96 lg:max-h-96"
        />
      </div>
    </div>
  )
}

export default ServiceTeaser
