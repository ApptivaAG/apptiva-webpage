import { getServiceTeasers } from '@/utils/service-teasers'
import ServiceTeaser from './service-teaser'

const ServiceTeasers = async () => {
  const services = await getServiceTeasers()
  console.log('servcies', services)

  return (
    <div className="feature space-y-4 p-4 [&>*:nth-child(even)]:flex-row-reverse ">
      {services.map((service: any, index: number) => (
        <ServiceTeaser key={index} service={service} rowNumber={index} />
      ))}
    </div>
  )
}

export default ServiceTeasers
