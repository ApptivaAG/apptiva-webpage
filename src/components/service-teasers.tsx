import ServiceTeaser from './service-teaser'

const ServiceTeasers = ({ services }: { services: any[] }) => {
  console.log('servcies', services)

  return (
    // <div className="full  space-y-4 p-4">
    <div>
      <div className="full space-y-4 p-4 [&>*:nth-child(even)]:flex-row-reverse ">
        {services.map((service: any, index: number) => (
          <ServiceTeaser service={service} rowNumber={index} />
        ))}
      </div>
      <p>******************************</p>
      <div className="full  space-y-4 p-4">
        <div className="flex w-full">
          <div className="w-1/2 rounded bg-base-grey">text</div>
          <div className="w-1/2 rounded-md bg-primary ">biild</div>
        </div>
        {/* second child: flex-row-reverse */}
        <div className="flex w-full flex-row-reverse">
          <div className="w-1/2 rounded bg-base-grey">text</div>
          <div className="w-1/2 rounded-md bg-primary ">biild</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 rounded bg-base-grey">text</div>
          <div className="w-1/2 rounded-md bg-primary ">biild</div>
        </div>
      </div>
      <p>******************************</p>
      <div className="full space-y-4  p-4 [&>*:nth-child(even)]:flex-row-reverse">
        <div className="flex w-full">
          <div className="w-1/2 rounded bg-base-grey">text</div>
          <div className="w-1/2 rounded-md bg-primary ">biild</div>
        </div>
        {/* second child: flex-row-reverse */}
        <div className="flex w-full ">
          <div className="w-1/2 rounded bg-base-grey">text</div>
          <div className="w-1/2 rounded-md bg-primary ">biild</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 rounded bg-base-grey">text</div>
          <div className="w-1/2 rounded-md bg-primary ">biild</div>
        </div>
      </div>
    </div>
  )
}

export default ServiceTeasers
