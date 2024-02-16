import ServiceTeaser from './service-teaser'

const ServiceTeasers = ({ services }: { services: any[] }) => {
  console.log('servcies', services)

  return (
    <div className="full ">
      {services.map((service: any, index: number) => (
        <ServiceTeaser service={service} rowNumber={index} />
      ))}
    </div>
  )
}

export default ServiceTeasers
