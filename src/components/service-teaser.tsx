import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from 'react'
import Heading from './heading'
import { PortableText } from '@portabletext/react'
import SanityImage from './sanity-image'

const ServiceTeaser = ({ service }: { service: any }) => {
  console.log('servcies', service)

  return (
    <div className="full m-4">
      <div className="border-fuchsia-400  border-2">
        <Heading level={2}>{service.header.title}</Heading>
        <SanityImage image={service.illustration} />
        {service.teaser?.map((content: any) => (
          <PortableText key={content._key} value={content} />
        ))}
      </div>
    </div>
  )
}

export default ServiceTeaser
