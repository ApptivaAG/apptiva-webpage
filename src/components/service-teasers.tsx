import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  PromiseLikeOfReactNode,
} from 'react'
import Heading from './heading'
import ServiceTeaser from './service-teaser'

const ServiceTeasers = ({ services }: { services: any[] }) => {
  console.log('servcies', services)

  return (
    <div className="full ">
      <div className="m-4 ">
        <div className="m-auto w-8/12 font-[600]">
          {services.map((service: any) => (
            <ServiceTeaser service={service} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServiceTeasers
