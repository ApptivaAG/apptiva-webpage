import ServiceTeaser from './item'
import { ServiceTeaserData } from './types'

export default function ServiceTeaserList(props: {
  services: ServiceTeaserData[]
}) {
  return (
    <div className="feature space-y-4 py-4 lg:p-4 lg:[&>*:nth-child(even)]:flex-row-reverse ">
      {props.services.map((service: any, index: number) => (
        <ServiceTeaser key={index} service={service} rowNumber={index} />
      ))}
    </div>
  )
}
